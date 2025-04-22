from typing import Any
import finnhub
import asyncio

class FinnhubProvider():
    def __init__(self, api_key: str):
        self.client = finnhub.Client(api_key=api_key)

    async def get_symbols(self, ticker) -> Any:

        try:
            response = await asyncio.to_thread(self.client.symbol_lookup, ticker)
            common_stock = {"tickers" : []}
            
            if "result" in response and response["result"]:
                for k in range(response["count"]):
                    asset = response["result"][k]

                    if asset["type"] == "Common Stock" and "." not in asset["displaySymbol"]:
                        common_stock["tickers"].append(response["result"][k]["displaySymbol"])

            return common_stock
        except Exception as e:
            return {"error", str(e)} 

