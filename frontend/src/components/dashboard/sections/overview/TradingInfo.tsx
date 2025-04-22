import { useEffect, useState } from "react";
import OverviewService from "../../../../services/OverviewService";
import TradingInfoData from "../../../../utils/interfaces/TradingInfoData";
import { useCompanyContext } from "../../../../hooks/useCompanyContext";

const TradingInfo: React.FC = () => {
    const { ticker } = useCompanyContext();

    const [tradingInfo, setTradingInfo] = useState<TradingInfoData>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await OverviewService.getTradingInfo(ticker);
                setTradingInfo(data);
            } catch (error) {
                console.log(`Error fetching watchlist data: ${error}.`)
            }
        }

        fetchData();
    }, [ticker])

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