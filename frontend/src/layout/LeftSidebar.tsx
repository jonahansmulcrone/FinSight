import WatchList from "../components/Watchlist";
import MarketMovers from "../components/MarketMovers";

const LeftSidebar: React.FC = () => {
    return (
        <div className='h-2/3 w-lg mt-15 border-r border-r-gray-200'>
            <div className='flex items-center justify-center'>
                <WatchList />
            </div>
            <div className='flex items-center justify-center'>
                <MarketMovers />
            </div>
        </div>
    );
}

export default LeftSidebar;