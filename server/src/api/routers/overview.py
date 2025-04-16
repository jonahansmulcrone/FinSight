from fastapi import APIRouter, Depends, HTTPException
from ..dependencies import get_overview_service
from services.overview_service import OverviewService
from providers.yfinance_provider import YahooFinanceProvider

# Grouping path operations using APIRouter Class.

overview_router = APIRouter(
    prefix="/overview",
    tags=["overview"],
)

@overview_router.get("/{ticker}")
async def get_company_overview(
    ticker: str,
    overview_service: OverviewService = Depends(get_overview_service)
):
    data = await overview_service.get_overview_info(ticker=ticker)
    print("DATA", data)
    return data