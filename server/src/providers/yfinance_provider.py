from functools import partial
import yfinance as yf
from typing import Dict, Any
from providers.market_data_provider import MarketDataProvider
import asyncio

class YahooFinanceProvider(MarketDataProvider):
    async def get_trading_info(self, ticker) -> Any:
        
        try:
            response = await asyncio.to_thread(lambda: yf.Ticker(ticker).response)

            if not response:
                return {"error": "No data returned"}
            
            result = {
                "Previous Close": response["previousClose"],
                "Open": response["open"],
                "Day's Range": {response['dayHigh']} - {response['dayLow']},
                "52-Week Range": f"{response['fiftyTwoWeekLow']} - {response['fiftyTwoWeekHigh']}",
                "Market Cap": response["marketCap"],
                "Enterprise Value": response["enterpriseValue"],
                "Beta (5Y Monthly)": response["beta"],
                "Forward Dividend Yield": f"{response['dividendRate']} ({round(response['dividendYield'] * 100, 2)}%)",
                "Bid": response["bid"],
                "Ask": response["ask"],
                "Volume": response["volume"],
                "EPS (TTM)": response["trailingEps"]
            }

            return result

        except Exception as e:
            return {"error": str(e)}
        
    async def get_company_info(self, ticker) -> Any:
        try:
            response = await asyncio.to_thread(lambda: yf.Ticker(ticker).basic_info)

            if not response:
                return {"error": "No data returned"}
            
            result = { 

            }

            print(response)

        except Exception as e:
            return {"error": str(e)}
            
