import MarketMoverProps from "../interfaces/MarketMoverProps"

const MarketMoverItem : React.FC<MarketMoverProps> = ({data}) => {

    let lineColor;
    let priceChangeColor;

    if (parseFloat(data.change_amount) < 0) {
        lineColor = '#DC143C';
        priceChangeColor = 'text-red-600';
    } else {
        lineColor = '#0BDA51';
        priceChangeColor = 'text-green-600';
    }


    return (
        <div className="flex w-full bg-white p-2 hover:bg-gray-50 cursor-pointer">
            <div className="w-full flex justify-between items-center">
                <div className="flex-col justify-items-start">
                    <div className="text-black font-bold text-sm">
                        {data.ticker}
                    </div>
                </div>
                <div>
                    
                </div>
                <div className="flex-column justify-end">
                    <div className="flex-col justify-items-end">
                        <div className="text-black text-sm font-bold">
                            ${data.price}
                        </div>
                        <div className={`text-xs font-semibold ${priceChangeColor}`}>
                            ${data.change_amount} (
                            {data.change_percentage})
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarketMoverItem