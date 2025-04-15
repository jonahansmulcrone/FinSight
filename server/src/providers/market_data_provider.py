from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional

class MarketDataProvider(ABC):

    @abstractmethod
    async def get_stock_info(self, ticker: str) -> Dict[str, Any]:
        """
        Get the common trading information for a given company.
        
        Args:
            ticker: The stock ticker symbol.
            
        Returns:
            Dictionary containing common trading metrics (e.g. closing price, volume).
        """
        pass