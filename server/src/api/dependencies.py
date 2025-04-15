from fastapi import Depends
from src.services.overview_service import OverviewService

def get_market_data_provider():
    return YahooFinanceProvider()

def get_overview_service(market_data_provider=Depends(get_market_data_provider)):
    return OverviewService(market_data_provider=market_data_provider)