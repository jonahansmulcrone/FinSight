from pydantic import BaseModel, Field

class StockOverview(BaseModel):
    ticker: str
    # TODO: Determine data format coming back from YFinance