from fastapi import APIRouter, Depends
from services.dashboard_service import DashboardService
from ..dependencies import get_dashboard_service

dashboard_router = APIRouter(
    prefix="/dashboard",
    tags=["dashboard"],
)

@dashboard_router.get("/companyInfo/{ticker}")
async def get_company_info(
    ticker: str,
    dashboard_service: DashboardService=Depends(get_dashboard_service)
):
    try:
        data = await dashboard_service.get_company_info(ticker=ticker)
        return data
    except Exception as e:
        return {"error": str(e)}
    
@dashboard_router.get("/getSymbols/{ticker}")
async def get_symbols(
    ticker: str,
    dashboard_service: DashboardService=Depends(get_dashboard_service)
):
    try:
        data = await dashboard_service.get_symbols(ticker=ticker)
        return data
    except Exception as e:
        return {"error": str(e)}


