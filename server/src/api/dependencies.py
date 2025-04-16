from fastapi import Depends
from services.overview_service import OverviewService
from providers.yfinance_provider import YahooFinanceProvider

def get_market_data_provider():
    return YahooFinanceProvider()

def get_overview_service(
        market_data_provider=Depends(get_market_data_provider)
        ):
    
    return OverviewService(market_data_provider=market_data_provider)