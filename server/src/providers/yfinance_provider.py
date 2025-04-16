from functools import partial
import yfinance as yf
from typing import Dict, Any
from providers.market_data_provider import MarketDataProvider
import asyncio

class YahooFinanceProvider(MarketDataProvider):
    async def get_overview_info(self, ticker) -> Any:
        
        try:
            info = await asyncio.to_thread(lambda: yf.Ticker(ticker).info)

            if not info:
                return {"error": "No data returned"}
            
            result = {
                "Previous Close": info["previousClose"],
                "Open": info["open"],
                "Day's Range": {info['dayHigh']} - {info['dayLow']},
                "52-Week Range": f"{info['fiftyTwoWeekLow']} - {info['fiftyTwoWeekHigh']}",
                "Market Cap": info["marketCap"],
                "Enterprise Value": info["enterpriseValue"],
                "Beta (5Y Monthly)": info["beta"],
                "Forward Dividend Yield": f"{info['dividendRate']} ({round(info['dividendYield'] * 100, 2)}%)",
                "Bid": info["bid"],
                "Ask": info["ask"],
                "Volume": info["volume"],
                "EPS (TTM)": info["trailingEps"]
            }

            return result

        except Exception as e:
            return {"error": str(e)}