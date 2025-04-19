import DashboardNavProps from "../../utils/interfaces/DashboardNavProps";

const DashboardNav: React.FC<DashboardNavProps> = ({ handleSwitchPanel, currentPanel }) => {
    const panels = ['Overview', 'Risk', 'Performance', 'Sentiment', 'Backtesting']

    return (
        <div className='mt-10 relative'>
            <div className='flex flex-row gap-10 mb-3 relative z-10'>
                {panels.map((panel, index) => (
                    <div
                        key={index}
                        className='cursor-pointer'
                        onClick={() => handleSwitchPanel(panel)}
                    >
                        <div className='pb-2 relative select-none'>
                            {panel}
                            {currentPanel === panel && (
                                <div className='absolute left-0 bottom-0 w-full h-[2px] bg-black z-20' />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className='absolute bottom-0 left-0 w-full h-[1px] bg-gray-200 z-0' />
        </div>
    );
}

export default DashboardNav;