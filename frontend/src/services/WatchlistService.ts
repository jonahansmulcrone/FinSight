class WatchlistService {
    private API_URL = 'http://localhost:8000'

    async fetchWatchlist() {
        try {
            const response = await fetch(`${this.API_URL}/api/v1/batch_watchlist`);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }

            const data = await response.json().catch(() => {
                throw new Error("Invalid JSON response");
            });

            return data;
        } catch (error) {
            console.error("Failed to fetch watchlist:", error);
            return null;
        }
    }

    async filterTickerDropdown(ticker: string) {
        try {
            const response = await fetch(`${ticker}`);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }

            const data = await response.json().catch(() => {
                throw new Error("Invalid JSON response");
            });

            return data;

        } catch (error) {
            console.error("Failed to fetch filtered tickers:", error);
            return null;
        }
    }


    async fetchMarketMovers() {
        try {
            const response = await fetch(`${this.API_URL}/api/v1/batch_market_movers`);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }

            const data = await response.json().catch(() => {
                throw new Error("Invalid JSON response");
            });

            return data;
        } catch (error) {
            console.error("Failed to fetch market movers:", error);
            return null;
        }
    }
}

export default new WatchlistService;