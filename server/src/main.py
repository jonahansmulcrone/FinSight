from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import ResponseValidationError
from api.routers.overview import overview_router
from api.routers.dashboard import dashboard_router
import httpx
import json
from redis_connection import r
from datetime import date, datetime, timedelta
from typing import Optional, Dict, Any
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import asyncio
from polygon import RESTClient
import requests

load_dotenv()

app = FastAPI()
app.include_router(overview_router)
app.include_router(dashboard_router)

class APITimeoutException(Exception):
    def __init__(self, api:str):
        self.message = f"{api} api has timed out or reached the rate limit"
        super().__init__(self.message)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class WatchlistDataResponse(BaseModel):
    status: str
    requested_date_range: str
    tickers: Dict[str, Any]

class GainersLosersDataResponse(BaseModel):
    status: str
    gainers: list[Any]
    losers: list[Any]

@app.get("/api/v1/batch_watchlist", response_model=WatchlistDataResponse)
async def get_watchlist(
    tickers: str = "TSLA,UAA,NVDA,SQQQ,SPY",
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    multiplier: int = 1,
    limit: int = 1000
):
    cache = r.get('user_1')

    if cache:
        print('cache hit')
        cached_data = json.loads(cache)
        return WatchlistDataResponse(
        status="success",
        requested_date_range=f"{start_date} to {end_date}",
        tickers=cached_data,
        )
    else:
        api_key = os.getenv("POLYGON_API_KEY")
        if not api_key:
            raise HTTPException(status_code=500, detail="API key not configured in .env file")
        
        ticker_list = [ticker.strip().upper() for ticker in tickers.split(",")]
        client = RESTClient(api_key)
        
        if not start_date:
            # Default to previous trading day
            previous_day = date.today() - timedelta(days=1)
            
            if previous_day.weekday() >= 5:
                previous_day = previous_day - timedelta(days=previous_day.weekday() - 4)
            start_date = previous_day.strftime("%Y-%m-%d")
        
        if not end_date:
            end_date = start_date
        
        async def get_ticker_data(ticker):
            url = f"https://api.polygon.io/v2/aggs/ticker/{ticker}/range/{multiplier}/hour/{start_date}/{end_date}"
            params = {
                "adjusted": "true",
                "sort": "asc",
                "limit": limit, 
                "apiKey": api_key
            }
            
            try:
                async with httpx.AsyncClient() as client:
                    response = await client.get(url, params=params)

                    response.raise_for_status()
                    data = response.json()
                    
                    if "results" not in data or not data["results"]:
                        return {
                            "error": f"No hourly data found for {ticker} between {start_date} and {end_date}"
                        }
                    
                    hourly_data = []
                    for entry in data["results"]:
                        # Convert timestamp to readable time
                        timestamp = entry["t"]
                        dt = datetime.fromtimestamp(timestamp/1000)
                        time_str = dt.strftime('%Y-%m-%d %H:%M')
                        
                        date_str = dt.strftime('%Y-%m-%d')
                        
                        hourly_data.append({
                            "time": time_str,
                            "date": date_str,
                            "hour": dt.strftime('%H:%M'),
                            "open": entry["o"],
                            "high": entry["h"],
                            "low": entry["l"],
                            "close": entry["c"],
                            "volume": entry["v"],
                            "timestamp": timestamp,
                        })
                    
                    return {
                        "data": hourly_data,
                        "count": len(hourly_data)
                    }
                    
            except httpx.HTTPStatusError as e:
                return {
                    "error": f"HTTP error: {e.response.status_code} - {e.response.text}"
                }
            except Exception as e:
                return {
                    "error": str(e)
                }
        
        async def get_ticker_info(ticker):
            try:
                details = client.get_ticker_details(ticker)
                return {
                    "name": details.name,
                }
            
            except httpx.HTTPStatusError as e:
                return {
                    "error": f"HTTP error: {e.response.status_code} - {e.response.text}"
                }
            except Exception as e:
                return {
                    
                    "error": str(e)
                }
        # Process each ticker concurrently
        ticker_info_tasks = [get_ticker_info(ticker) for ticker in ticker_list]
        ticker_info_results = await asyncio.gather(*ticker_info_tasks)
        tasks = [get_ticker_data(ticker) for ticker in ticker_list]
        results_list = await asyncio.gather(*tasks) # gather() concurrently runs multiple coroutines.
        
        #TODO: there is almost certainly a better way to do this, just doing this to for testing/proto
        if len(ticker_info_results) > 0 and "name" in ticker_info_results[0]:
            for i in range(len(results_list)):
                results_list[i]["name"] = ticker_info_results[i]["name"]

        # Map results to tickers
        results = {ticker: result for ticker, result in zip(ticker_list, results_list)}

        r.set('user_1', json.dumps(results))
        
        return WatchlistDataResponse(
            status="success",
            requested_date_range=f"{start_date} to {end_date}",
            tickers=results,
        )
    

@app.get("/api/v1/batch_market_movers", response_model=GainersLosersDataResponse)
async def get_market_movers():
    alpha_api_key = os.getenv("ALPHA_API_KEY")
    #cache = r.get('user_1_market_movers')
    try:
        # replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
        url = f'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey={alpha_api_key}'
        r = requests.get(url)
        data = r.json()
        if "Information" in data:
            raise APITimeoutException("alpha")
        gainers = data["top_gainers"][:5]
        losers = data["top_losers"][:5]
    # TODO: add better error handling
    except APITimeoutException as e:
        print(e)
        return GainersLosersDataResponse(
            status=f"error, {e}",
            gainers=[],
            losers=[]
        )

    except Exception as e:
        print(e)
        return GainersLosersDataResponse(
            status="error",
            gainers=[],
            losers=[]
        )
    return GainersLosersDataResponse(
        status="success",
        gainers=gainers,
        losers=losers
    )

        