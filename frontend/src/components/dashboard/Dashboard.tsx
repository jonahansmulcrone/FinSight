import { useState } from "react";
import DashboardNav from "./DashboardNav";
import OverviewPanel from "./sections/OverviewPanel";
import RiskPanel from "./sections/RiskPanel";

const Dashboard: React.FC = () => {
    const [currentPanel, setCurrentPanel] = useState('Overview');
    const handleSwitchPanel = (panel: string) => {
        setCurrentPanel(panel);
    }

    const sectionsMap: Record<string, React.ReactNode> = {
        Overview: <OverviewPanel />,
        Risk: <RiskPanel />,
    };

    return (
        <div className='w-full'>
            <div className='flex flex-col gap-1'>
                <div className='flex items-start text-3xl font-bold '>
                    TSLA
                </div>
                <div className='flex flex-row justify-between items-center'>
                    <div>
                        Tesla Inc.
                    </div>
                    <div>
                        <button className='hover:bg-gray-50 border-2 cursor-pointer text-sm rounded-full py-1 px-3'>Watch (+)</button>
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