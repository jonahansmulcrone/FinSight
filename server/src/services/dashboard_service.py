from typing import Dict, Any
import json
from providers.yfinance_provider import YahooFinanceProvider
from providers.finnhub_provider import FinnhubProvider

class DashboardService:
    def __init__(self, yfinance: YahooFinanceProvider, finnhub: FinnhubProvider, redis):
        self.yfinance = yfinance
        self.finnhub = finnhub
        self.redis = redis
        self.cache_expiry = 3000

    async def get_company_info(self, ticker: str) -> Any:
        """
        Get high-level company data for a given ticker.
        """
                
        try:
            company_info = await self.yfinance.get_company_info(ticker)
            return company_info
        except Exception as e:
            return {"error": str(e)}
        
    async def get_symbols(self, ticker: str) -> Any:
        """
        Get list of related ticker-symbols for a given ticker.
        """

        cache_key = f"symbols{ticker}"
        cache = self.redis.get(cache_key)

        if cache:
            return json.loads(cache)
                
        try:
            symbols = await self.finnhub.get_symbols(ticker)
            self.redis.setex(
                cache_key,
                self.cache_expiry,
                json.dumps(symbols)
            )
            
            return symbols
        except Exception as e:
            return {"error": str(e)}