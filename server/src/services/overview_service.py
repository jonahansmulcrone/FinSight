from typing import Dict, Any, Optional
from src.schemas import StockOverview

class OverviewService:
    def __init__(self, market_data_provider: MarketDataProvider):
        self.market_data_provider = market_data_provider

    async def get_stock_overview(self, ticker: str) ->  StockOverview:
        """
        Get comprehensive trading data for a given company.
        """

        overview_data = await self.market_data_provider.get_info(ticker)