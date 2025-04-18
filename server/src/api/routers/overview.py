from fastapi import APIRouter, Depends, HTTPException
from ..dependencies import get_overview_service
from services.overview_service import OverviewService

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
    
    try:
        data = await overview_service.get_overview_info(ticker=ticker)
        return data
    except Exception as e:
        return {"error": str(e)}
         
