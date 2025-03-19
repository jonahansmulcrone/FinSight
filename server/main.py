from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import httpx
from datetime import date, datetime, timedelta
from typing import Optional, Dict, Any
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import asyncio

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HourlyDataResponse(BaseModel):
    status: str
    requested_date_range: str
    tickers: Dict[str, Any]

@app.get("/api/v1/watchlist", response_model=HourlyDataResponse)
async def get_watchlist(
    tickers: str = "TSLA,UAA,NVDA,SQQQ,SPY",
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    multiplier: int = 1,
    limit: int = 1000
):
    api_key = os.getenv("POLYGON_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="API key not configured in .env file")
    
    ticker_list = [ticker.strip().upper() for ticker in tickers.split(",")]
    
    if not start_date:
        # Default to previous trading day
        previous_day = date.today() - timedelta(days=1)
        # Adjust if it's a weekend
        if previous_day.weekday() >= 5:  # 5=Saturday, 6=Sunday
            previous_day = previous_day - timedelta(days=previous_day.weekday() - 4)  # Go back to Friday
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
                
                # Format the data for the response
                hourly_data = []
                for entry in data["results"]:
                    # Convert timestamp to readable time
                    timestamp = entry["t"]  # Unix timestamp in milliseconds
                    dt = datetime.fromtimestamp(timestamp/1000)
                    time_str = dt.strftime('%Y-%m-%d %H:%M')
                    
                    # Get the date part to group by day
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
                
                grouped_by_date = {}
                for entry in hourly_data:
                    date_key = entry["date"]
                    if date_key not in grouped_by_date:
                        grouped_by_date[date_key] = []
                    grouped_by_date[date_key].append(entry)
                
                trading_hours = {date: len(hours) for date, hours in grouped_by_date.items()}
                
                return {
                    "data": hourly_data,
                    "count": len(hourly_data),
                    "trading_hours": trading_hours
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
    tasks = [get_ticker_data(ticker) for ticker in ticker_list]
    results_list = await asyncio.gather(*tasks) # gather() concurrently runs multiple coroutines.
    
    # Map results to tickers
    results = {ticker: result for ticker, result in zip(ticker_list, results_list)}

    # Check if we're getting full day data
    for ticker, result in results.items():
        if "trading_hours" in result:
            trading_hours = result["trading_hours"]
            for date_str, hours in trading_hours.items():
                if hours < 7:
                    print(f"Warning: Only {hours} hours of data for {ticker} on {date_str}")
    
    return HourlyDataResponse(
        status="success",
        requested_date_range=f"{start_date} to {end_date}",
        tickers=results,
    )