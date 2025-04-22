from fastapi import Depends
from services.overview_service import OverviewService
from providers.yfinance_provider import YahooFinanceProvider
from providers.finnhub_provider import FinnhubProvider
from config import FINNHUB_API_KEY
from services.dashboard_service import DashboardService
from redis_connection import r

def get_redis():
    return r

def get_yfinance_provider():
    return YahooFinanceProvider()

def get_finnhub_provider():
    return FinnhubProvider(api_key=FINNHUB_API_KEY)

def get_overview_service(
        yfinance=Depends(get_yfinance_provider),
        finnhub=Depends(get_finnhub_provider)
        ):
    
    return OverviewService(
        yfinance=yfinance,
        finnhub=finnhub
        )

def get_dashboard_service(
        yfinance=Depends(get_yfinance_provider),
        finnhub=Depends(get_finnhub_provider),
        redis=Depends(get_redis)
        ):
    
    return DashboardService(
        yfinance=yfinance,
        finnhub=finnhub,
        redis=redis 
        )