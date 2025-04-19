from fastapi import APIRouter, Depends, HTTPException
from services.dashboard_service import DashboardService
from ..dependencies import get_overview_service
from services.overview_service import OverviewService

# Grouping path operations using APIRouter Class.

overview_router = APIRouter(
    prefix="/overview",
    tags=["overview"],
)

@overview_router.get("/{ticker}")
async def get_trading_overview(
    ticker: str,
    overview_service: OverviewService = Depends(get_overview_service)
):
    
    try:
        data = await overview_service.get_trading_info(ticker=ticker)
        return data
    except Exception as e:
        return {"error": str(e)}
    
@overview_router.get("/dashboard/{ticker}")
async def get_company_info(
    ticker: str,
    dashboard_service: DashboardService = Depends(get_overview_service)
):
    
    try:
        data = await dashboard_service.get_company_info(ticker=ticker)
        return data
    except Exception as e:
        return {"error": str(e)}
         
