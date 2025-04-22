from fastapi import APIRouter, Depends
from ..dependencies import get_overview_service
from services.overview_service import OverviewService

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
