import yfinance as yf
from typing import Dict, Any, List, Optional
from src.providers.market_data_provider import MarketDataProvider
import asyncio

class YahooFinanceProvider(MarketDataProvider):
    async def get_stock_info(self, ticker) -> Dict[str: Any]:
        return await super().get_stock_info(ticker)