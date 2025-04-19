class DashboardService {
    private API_URL = "http://localhost:8000/overview/dashboard/";

    async getCompanyInfo(ticker: string) {
        try {
            const response = await fetch(this.API_URL + `${ticker}`);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            };

            const data = await response.json().catch(() => {
                throw new Error("Invalid JSON response");
            });

            return data;
        } catch (error) {
            console.error("Failed to fetch company info:", error);
            return null;
        }
    }
}

export default new DashboardService;