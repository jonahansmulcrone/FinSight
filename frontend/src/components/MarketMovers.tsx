import React, { useEffect, useRef, useState } from 'react'
import WatchListChart from './WatchlistChart';
import WatchlistService from '../services/WatchlistService';
import MarketMoverItem from './MarketMoverItem';
import MarketMoverData from '../utils/types/MarketMoverData';

const MarketMovers: React.FC = () => {
    const [marketMoversItems, setMarketMoversItems] = useState<any>();
    const [currentPanel, setCurrentPanel] = useState('Gainers');
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

    const handlePanelChange = (panel: string) => {
        setCurrentPanel(panel);
    }

    return (
        <div className=''>
            <div ref={ref} className='flex flex-col justify-start items-start w-sm p-4'>
                <div className='p-2 text-black font-semibold text-md mb-3'>Market Movers</div>
                <div className='flex flex-row gap-3 mb-3'>
                    <button
                        className={`text-xs px-2 py-1 rounded-full border-2 transition-colors ${currentPanel === 'Gainers'
                            ? 'bg-gray-700 text-white border-gray-700'
                            : 'bg-white text-gray-700 border-gray-300'
                            }`}
                        onClick={() => handlePanelChange('Gainers')}
                    >
                        Gainers
                    </button>
                    <button
                        className={`text-xs px-2 py-1 rounded-full border-2 transition-colors ${currentPanel === 'Losers'
                            ? 'bg-gray-700 text-white border-gray-700'
                            : 'bg-white text-gray-700 border-gray-300'
                            }`}
                        onClick={() => handlePanelChange('Losers')}
                    >
                        Losers
                    </button>
                </div>
                {marketMoversItems && (
                    currentPanel === 'Gainers' ? (
                        marketMoversItems.gainers.map((item: MarketMoverData) => (
                            <MarketMoverItem key={item.ticker} data={item} />
                        ))
                    ) : (
                        marketMoversItems.losers.map((item: MarketMoverData) => (
                            <MarketMoverItem key={item.ticker} data={item} />
                        ))
                    )
                )}

            </div>
        </div>
    )
}

export default MarketMovers;
