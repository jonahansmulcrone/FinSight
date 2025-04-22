import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import WatchListChart from './WatchlistChart';
import WatchlistService from '../services/WatchlistService';
import TickerDropdownItem from './TickerDropdownItem';
import { useOutsideClick } from '../hooks/useOutsideClick';

const WatchList: React.FC = () => {
    const [watchlistItems, setWatchlistItems] = useState<any>();
    const [isCustomizing, setIsCustomizing] = useState(false);
    const [isSearchingTicker, setIsSearchingTicker] = useState(false);
    const [currentTicker, setCurrentTicker] = useState('');
    const [filteredTickers, setFilteredTickers] = useState<string[]>([]);
    const [error, setError] = useState('');
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await WatchlistService.fetchWatchlist()
                setWatchlistItems(data)
            } catch (error) {
                console.log(`Error fetching watchlist data: ${error}.`)
            }
        }

        fetchData();
    }, [])

    useOutsideClick(ref, () => setIsSearchingTicker(false));

    const tickers = [
        "AAPL", "MSFT", "NVDA", "GOOG", "GOOGL", "META", "TSLA", "AMD",
        "INTC", "ORCL", "JPM", "BAC", "WFC", "GS", "MS", "C", "V", "MA",
        "PYPL", "AXP", "UNH", "JNJ", "PFE", "MRNA", "LLY", "BMY", "GILD",
        "CVS", "VRTX", "BIIB", "AMZN", "HD", "NKE", "SBUX", "MCD", "TSCO",
        "TJX", "LOW", "TGT", "ROST", "XOM", "CVX", "COP", "PSX", "SLB",
        "BA", "CAT", "LMT", "UPS", "DE"
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
    }, [currentTicker])

    const handleCustomizeWatchlist = useCallback(() => {
        setIsCustomizing(true);
    }, []);

    const handleCloseCustomization = () => {
        setIsCustomizing(false);
    }

    const handleSearchTicker = () => {
        setIsSearchingTicker(true)
    }

    const handleTickerChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCurrentTicker(value);
    }

    const handleAddTicker = (ticker: string) => {
    }

    return (
        <div>
            <div ref={ref} className='flex-col justify-items-start w-sm p-4'>
                {isCustomizing && !isSearchingTicker ? (
                    <div className='flex justify-between items-center w-full p-2'>
                        <div onClick={handleSearchTicker} className='flex items-center justify-center gap-4 cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <div className='text-gray-400 text-md'>Search to add ticker</div>
                        </div>
                        <button className='text-blue-500 text-sm cursor-pointer' onClick={handleCloseCustomization}>Done</button>
                    </div>
                ) : isSearchingTicker ? (
                    <div className='relative w-full'>
                        <div className='w-full flex items-center justify-center gap-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <input
                                onChange={handleTickerChange}
                                className="w-full rounded-md border-0 text-base text-gray-400 placeholder-gray-400 placeholder:text-md focus:outline-none focus:ring-0 focus:border-transparent"
                                type="text"
                                placeholder="Symbol or Company Name"
                            />
                        </div>
                        {filteredTickers && (
                            <div className='absolute top-full left-0 w-full bg-white border-t-1 border-gray-100 z-50'>
                                <div className='border-t-1 border-gray-100'></div>
                                {filteredTickers.map((ticker) =>
                                    <TickerDropdownItem ticker={ticker} handleAddTicker={handleAddTicker} />
                                )}

                                <div className='drop-shadow-lg border-b-1 rounded-b-2xl h-5'>
                                    {error && (
                                        <p className='text-red-600'>{error}</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className='p-2 text-black font-semibold text-md'>Watchlist</div>
                )}
                {watchlistItems && (
                    Object.entries(watchlistItems.tickers).map(([tickerName, tickerData]) => (
                        <WatchListChart key={tickerName} ticker={tickerName} data={tickerData} isCustomizing={isCustomizing} />
                    ))
                )}
                <div className="w-full flex justify-center">
                    {!isCustomizing && !isSearchingTicker && (
                        <button onClick={handleCustomizeWatchlist} className="w-80 cursor-pointer bg-white text-sm hover:bg-gray-50 text-gray-800 font-semibold py-2 mt-4 rounded-full px-4 border-2 border-solid">
                            <div className='flex items-center justify-center gap-x-3'>
                                <div>
                                    Customize Watchlist
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                </svg>
                            </div>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default WatchList;
