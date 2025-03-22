import TickerDropdownItemProps from "../interfaces/TickerDropdownItemProps";

const TickerDropdownItem: React.FC<TickerDropdownItemProps> = ({ ticker }) => {
    return (
        <div className="flex w-full bg-white p-2 hover:bg-gray-50 cursor-pointer">
            <div className="w-full flex justify-between items-center">
                <div className="flex-col justify-items-start">
                    <div className="text-black font-bold text-sm">
                        {ticker}
                    </div>
                    <div className="text-black text-xs">
                        {ticker}
                    </div>
                </div>

                <div className="flex-column justify-end">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="blue" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>
            </div>
        </div>
    );

}

export default TickerDropdownItem;