from typing import Dict, Any, Optional
from providers.market_data_provider import MarketDataProvider

class DashboardService:
    def __init__(self, market_data_provider: MarketDataProvider):
        self.market_data_provider = market_data_provider

    async def get_company_info(self, ticker: str) -> Any:
        """
        Get high-level company data for a given ticker.
        """
                
        try:
            company_info = await self.market_data_provider.get_company_info(ticker)
            return company_info
        except Exception as e:
            return {"error": str(e)}