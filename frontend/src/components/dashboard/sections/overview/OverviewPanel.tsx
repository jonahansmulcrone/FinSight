import CandlestickChart from "./CandlestickChart";
import TradingInfo from "./TradingInfo";

const OverviewPanel: React.FC = () => {
    return (
        <div className='h-full mt-10'>
            <div className='flex flex-col mb-10 gap-1'>
                <div className='flex items-start text-3xl'>
                    $111.26
                </div>
                <div className='flex flex-row justify-between items-center'>
                    <div className='text-green-600 text-s'>
                        $1.34 (0.14%)
                    </div>
                </div>
            </div>
            <CandlestickChart />
            <TradingInfo />
        </div>
    )
}

export default OverviewPanel;