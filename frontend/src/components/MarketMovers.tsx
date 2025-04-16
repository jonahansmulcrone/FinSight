import React, { useEffect, useRef, useState } from 'react'
import WatchListChart from './WatchlistChart';
import WatchlistService from '../services/WatchlistService';
import { useOutsideClick } from '../hooks/useOutsideClick';

const MarketMovers: React.FC = () => {
    const [marketMoversItems, setMarketMoversItems] = useState<any>();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await WatchlistService.fetchMarketMovers()
                console.log(data)
                setMarketMoversItems(data)
            } catch (error) {
                console.log(`Error fetching watchlist data: ${error}.`)
            }
        }

        fetchData();
    }, [])


    const tickers = [
        "AAPL", "MSFT", "NVDA", "GOOG", "GOOGL", "META", "TSLA", "AMD",
        "INTC", "ORCL", "JPM", "BAC", "WFC", "GS", "MS", "C", "V", "MA",
        "PYPL", "AXP", "UNH", "JNJ", "PFE", "MRNA", "LLY", "BMY", "GILD",
        "CVS", "VRTX", "BIIB", "AMZN", "HD", "NKE", "SBUX", "MCD", "TSCO",
        "TJX", "LOW", "TGT", "ROST", "XOM", "CVX", "COP", "PSX", "SLB",
        "BA", "CAT", "LMT", "UPS", "DE"
    ];

    return (
        <div>
            <div ref={ref} className='flex-col justify-items-start w-sm p-4'> 
                <div className='p-2 text-black font-semibold text-sm'>Market Movers</div>    
                <div className='p-2 text-black font-semibold text-sm'>Gainers</div>            
                {marketMoversItems && (
                    marketMoversItems.gainers.map((item :any) => (
                        <WatchListChart key={item.ticker} ticker={item.ticker} data={item} isCustomizing={false} />
                    ))
                )}            
                <div className='p-2 text-black font-semibold text-sm'>Losers</div>
                {marketMoversItems && (
                    marketMoversItems.losers.map((item :any) => (
                        <WatchListChart key={item.ticker} ticker={item.ticker} data={item} isCustomizing={false} />
                    ))
                )}
                
            </div>
        </div>
    )
}

export default MarketMovers;
