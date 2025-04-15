const TradingInfo: React.FC = () => {
    const data = ["Previous Close", "Day's Range", "Market Cap", "Enterprise Value", "Open", "52-Week Range", "Beta (5Y Monthly)", "Forward Dividend Yield", "Bid", "Ask", "Volume", "EPS (TTM)"]

    return (
        <div className='flex flex-col gap-8 justify-start items-start select-none'>
            <div className='font-semibold text-lg'>
                Trading Information
            </div>
            <div className='w-full grid grid-cols-4 gap-10'>
                {data.map((item) =>
                    <div className='flex flex-col items-start justify-start gap-1.5'>
                        <div className='text-sm flex flex-row justify-between items-center w-full'>
                            <div>
                                {item}
                            </div>
                            <div className='font-semibold'>
                                $5.00
                            </div>
                        </div>
                        <div className='w-full h-[1px] bg-gray-200' />
                    </div>
                )}

            </div>
        </div>
    )
}

export default TradingInfo;