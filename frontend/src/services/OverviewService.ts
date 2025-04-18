class OverviewService {

    private API_URL = "http://localhost:8000/overview/"

    async getTradingInfo(ticker: string) {
        try {
            const response = await fetch(this.API_URL + `${ticker}`);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }

            const data = await response.json().catch(() => {
                throw new Error("Invalid JSON response");
            });

            return data;
        } catch(error) {
            console.error("Failed to fetch trading info:", error);
            return null;
        }

    }
}

export default new OverviewService;