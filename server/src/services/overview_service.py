from typing import Any
from providers.yfinance_provider import YahooFinanceProvider
from providers.finnhub_provider import FinnhubProvider

class OverviewService:
    def __init__(self, yfinance: YahooFinanceProvider, finnhub: FinnhubProvider):
        self.yfinance = yfinance
        self.finnhub = finnhub

    async def get_trading_info(self, ticker: str) -> Any:
        """
        Get comprehensive trading data for a given company.
        """
        
        try:
            overview_info = await self.yfinance.get_trading_info(ticker)
            return overview_info
        except Exception as e:
            return {"error": str(e)}