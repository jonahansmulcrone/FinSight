import React, { useEffect, useRef, useState } from 'react'
import WatchListChart from './WatchlistChart';
import WatchlistService from '../services/WatchlistService';
import MarketMoverItem from './MarketMoverItem';
import MarketMoverData from '../utils/types/MarketMoverData';

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

    return (
        <div>
            <div ref={ref} className='flex-col justify-items-start w-sm p-4'> 
                <div className='p-2 text-black font-semibold text-sm'>Market Movers</div>    
                <div className='p-2 text-black font-semibold text-sm'>Gainers</div>            
                {marketMoversItems && (
                    marketMoversItems.gainers.map((item : MarketMoverData) => (
                        <MarketMoverItem key={item.ticker} data={item}/>
                    ))
                )}            
                <div className='p-2 text-black font-semibold text-sm'>Losers</div>
                {marketMoversItems && (
                    marketMoversItems.losers.map((item : MarketMoverData) => (
                        <MarketMoverItem key={item.ticker} data={item}/>
                    ))
                )}
                
            </div>
        </div>
    )
}

export default MarketMovers;
