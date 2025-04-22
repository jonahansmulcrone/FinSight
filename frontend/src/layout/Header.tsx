import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useCompanyContext } from "../hooks/useCompanyContext";
import TickerDropdownItem from "../components/TickerDropdownItem";
import { useOutsideClick } from "../hooks/useOutsideClick";
import DashboardService from "../services/DashboardService";

const Header: React.FC = () => {

    const { setTicker } = useCompanyContext();

    const ref = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [searchInput, setSearchInput] = useState('');
    const [filteredTickers, setFilteredTickers] = useState<string[]>([]);
    const [isSearchingTicker, setIsSearchingTicker] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchInput(value);
    }

    useOutsideClick(ref, () => setIsSearchingTicker(false));

    const handleDropdown = () => {
        setIsSearchingTicker(true);
    }

    const handleSubmit = (ticker: string) => {
        if (ticker) {
            setTicker(ticker.toUpperCase());
        } else {
            setTicker(searchInput.toUpperCase())
        }
    };


    {/* Debouncing Search Results */}
    useEffect(() => {

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        const filterTickers = async () => {
            try {
                const response = await DashboardService.getSymbols(searchInput);
                setFilteredTickers(response.tickers)
            } catch (error) {
                console.log(`Error filtering tickers: ${error}`);
            }
        }

        if (searchInput) {
            timeoutRef.current = setTimeout(() => {
                filterTickers();
            }, 300);
        } else {
            setFilteredTickers([]);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [searchInput])

    return (
        <header className='w-full mt-10 flex items-start'>
            <div className='flex flex-row justify-center'>
                <div className='relative' ref={ref}>
                    <input type='text'
                        onClick={handleDropdown}
                        onChange={handleInputChange}
                        className='text-gray-900 w-xl placeholder:text-gray-400 focus:ring-0 focus:ring-offset-0 border-none rounded-full bg-gray-100 w-96 py-2 px-4'
                        placeholder='Please search company or ticker' />

                    {isSearchingTicker && filteredTickers.length > 0 && (
                        <div className='absolute left-0 right-0 top-full mt-1 bg-white shadow-lg rounded-md overflow-hidden z-50'>
                            {filteredTickers.map((ticker, index) => (
                                <TickerDropdownItem
                                    key={index}
                                    ticker={ticker}
                                    handleAddTicker={handleSubmit}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
