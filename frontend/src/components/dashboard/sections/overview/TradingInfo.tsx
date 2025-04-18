import { useEffect, useState } from "react";
import OverviewService from "../../../../services/OverviewService";
import TradingInfoData from "../../../../interfaces/TradingInfoData";

const TradingInfo: React.FC = () => {
    const data = ["Previous Close", "Day's Range", "Market Cap", "Enterprise Value", "Open", "52-Week Range", "Beta (5Y Monthly)", "Forward Dividend Yield", "Bid", "Ask", "Volume", "EPS (TTM)"]

    const [tradingInfo, setTradingInfo] = useState<TradingInfoData>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await OverviewService.getTradingInfo('AAPL');
                console.log(data)
                setTradingInfo(data);
            } catch (error) {
                throw new Error()
            }
        }

        fetchData();
    }, [])

    return (
        <div className='flex flex-col gap-8 justify-start items-start select-none'>
            <div className='font-semibold text-lg'>
                Trading Information
            </div>
            <div className='w-full grid grid-cols-4 gap-10'>
                {tradingInfo && (
                    Object.entries(tradingInfo).map((item) =>
                        <div className='flex flex-col items-start justify-start gap-1.5'>
                            <div className='text-sm flex flex-row justify-between items-center w-full'>
                                {/* Info Type */}
                                <div>
                                    {item[0]}
                                </div>
                                {/* Info Value */}
                                <div className='font-semibold'>
                                    ${item[1]}
                                </div>
                            </div>
                            <div className='w-full h-[1px] bg-gray-200' />
                        </div>
                    )
                )}

            </div>
        </div>
    )
}

export default TradingInfo;