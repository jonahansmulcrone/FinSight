import { useEffect, useState } from "react";
import DashboardNav from "./DashboardNav";
import OverviewPanel from "./sections/overview/OverviewPanel";
import RiskPanel from "./sections/risk/RiskPanel";
import { useCompanyContext } from "../../hooks/useCompanyContext";
import DashboardService from "../../services/DashboardService";

const Dashboard: React.FC = () => {
    const [currentPanel, setCurrentPanel] = useState('Overview');
    const { ticker, companyName, setCompanyName } = useCompanyContext();
    const handleSwitchPanel = (panel: string) => {
        setCurrentPanel(panel);
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await DashboardService.getCompanyInfo(ticker);
    //             setCompanyName(response)
    //         } catch (error) {
    //             console.log(`Error fetching watchlist data: ${error}.`)
    //         }
    //     };

    //     fetchData();
    // }, [ticker]);

    const sectionsMap: Record<string, React.ReactNode> = {
        Overview: <OverviewPanel />,
        Risk: <RiskPanel />,
    };

    return (
        <div className='w-full'>
            <div className='flex flex-col gap-1'>
                <div className='flex items-start text-3xl font-bold '>
                    {ticker}
                </div>
                <div className='flex flex-row justify-between items-center'>
                    <div>
                        TSLA
                    </div>
                    <div>
                        <button className='hover:bg-gray-50 gap-1 flex items-center justify-center border-2 cursor-pointer text-md rounded-full py-1.5 px-5'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                        </svg>Watch</button>
                    </div>
                </div>
            </div>
            <DashboardNav currentPanel={currentPanel} handleSwitchPanel={handleSwitchPanel} />
            <div className='mt-6'>
                {sectionsMap[currentPanel] || <OverviewPanel />}
            </div>
        </div>
    );
}

export default Dashboard;