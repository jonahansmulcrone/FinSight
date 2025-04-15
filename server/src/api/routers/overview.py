from fastapi import APIRouter, Depends, HTTPException
from server.src.api.dependencies import get_overview_service
from src.schemas import StockOverview
from src.services.overview_service import OverviewService

router = APIRouter(
    prefix="/overview",
    tags=["overview"],
)

@router.get("/{ticker}", response_model=StockOverview)
async def get_company_overview(
    ticker: str,
    overview_service: OverviewService = Depends(get_overview_service)
):
    pass
    