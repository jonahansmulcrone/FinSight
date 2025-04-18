from typing import Dict, Any, Optional
from providers.market_data_provider import MarketDataProvider

class OverviewService:
    def __init__(self, market_data_provider: MarketDataProvider):
        self.market_data_provider = market_data_provider

    async def get_overview_info(self, ticker: str) -> Any:
        """
        Get comprehensive trading data for a given company.
        """
        
        try:
            overview_info = await self.market_data_provider.get_overview_info(ticker)
            return overview_info
        except Exception as e:
            return {"error": str(e)}