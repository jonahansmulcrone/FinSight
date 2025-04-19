import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useCompanyContext } from "../hooks/useCompanyContext";
import TickerDropdownItem from "../components/TickerDropdownItem";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Header: React.FC = () => {

    const { setTicker } = useCompanyContext();
    const [searchInput, setSearchInput] = useState('');
    const ref = useRef<HTMLDivElement>(null);
    const [filteredTickers, setFilteredTickers] = useState<string[]>([]);
    const [currentTicker, setCurrentTicker] = useState('');
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
    }

    const tickers = [
        "AAPL", "MSFT", "NVDA", "GOOG", "GOOGL", "META", "TSLA", "AMD",
        "INTC", "ORCL"
    ];

    useEffect(() => {
        const filterTickers = async () => {
            try {
                let updatedTickers = tickers.filter((ticker) => ticker.includes(currentTicker.toUpperCase())).slice(0, 10);
                setFilteredTickers(updatedTickers)
            } catch (error) {
                console.log(`Error filtering tickers: ${error}`);
            }
        }

        filterTickers();
    }, [searchInput])

    return (
        <header className='w-screen mt-10'>
            <div className='flex flex-row items-center justify-center'>
                <div className='relative' ref={ref}>
                    <input type='text'
                        onClick={handleDropdown}
                        onChange={handleInputChange}
                        className='text-gray-900 w-xl placeholder:text-gray-400 focus:ring-0 focus:ring-offset-0 border-none rounded-full bg-gray-100 w-96 py-2 px-4'
                        placeholder='Please search company or ticker' />

                    {/* Dropdown positioned to match input width exactly */}
                    {isSearchingTicker && tickers.length > 0 && (
                        <div className='absolute left-0 right-0 top-full mt-1 bg-white shadow-lg rounded-md overflow-hidden z-50'>
                            {tickers.map((ticker, index) => (
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
