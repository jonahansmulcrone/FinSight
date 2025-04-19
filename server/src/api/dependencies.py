from fastapi import Depends
from services.overview_service import OverviewService
from providers.yfinance_provider import YahooFinanceProvider
from services.dashboard_service import DashboardService

def get_market_data_provider():
    return YahooFinanceProvider()

def get_overview_service(
        market_data_provider=Depends(get_market_data_provider)
        ):
    
    return OverviewService(market_data_provider=market_data_provider)

def get_dashboard_service(
        market_data_provider=Depends(get_market_data_provider)
        ):
    
    return DashboardService(market_data_provider=market_data_provider)