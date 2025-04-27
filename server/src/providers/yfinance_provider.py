import yfinance as yf
from typing import Dict, Any
import asyncio

class YahooFinanceProvider():
    async def get_trading_info(self, ticker) -> Any:
        
        try:
            response = await asyncio.to_thread(lambda: yf.Ticker(ticker).info)

            if not response:
                return {"error": "No data returned"}
            
            result = {
                "Previous Close": response.get("previousClose", "NaN") or "NaN",
                "Open": response.get("open", "NaN"),
                "Day's Range": f"{response.get('dayHigh', 'NaN')} - {response.get('dayLow', 'NaN')}",
                "52-Week Range": f"{response.get('fiftyTwoWeekLow', 'NaN')} - {response.get('fiftyTwoWeekHigh', 'NaN')}",
                "Market Cap": response.get("marketCap", "NaN"),
                "Enterprise Value": response.get("enterpriseValue", "NaN"),
                "Beta (5Y Monthly)": response.get("beta", "NaN"),
                "Forward Dividend Yield": f"{response.get('dividendRate', 'NaN')} ({round(response.get('dividendYield', 0) * 100, 2)}%)"
                    if response.get('dividendYield') is not None else "NaN",
                "Bid": response.get("bid", "NaN"),
                "Ask": response.get("ask", "NaN"),
                "Volume": response.get("volume", "NaN"),
                "EPS (TTM)": response.get("trailingEps", "NaN")
            }

            return result

        except Exception as e:
            return {"error": str(e)}
        
    async def get_company_info(self, ticker) -> Any:
        try:
            response = await asyncio.to_thread(lambda: yf.Ticker(ticker).info)

            if not response:
                return {"error": "No data returned"}
            
            result = { 
                "companyName": response["shortName"]
            }

            return result

        except Exception as e:
            return {"error": str(e)}
            
