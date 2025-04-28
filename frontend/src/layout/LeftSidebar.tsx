import WatchList from "../components/Watchlist";
import MarketMovers from "../components/MarketMovers";
"use client";

import { Button, Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { useState } from "react";


const LeftSidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => setIsOpen(false);
  
    return (
      <>
        <div className="h-4/5 w-lg mt-15 border-r border-r-gray-200 items-center justify-center">
          <Button onClick={() => setIsOpen(true)} color={"#ffff"}>Show drawer</Button>
        </div>
        <Drawer open={isOpen} onClose={handleClose} className="w-1/4">
          <DrawerHeader title="Menu" />
          <DrawerItems className="flex w-4/5 mx-auto">
            <div>
                <div className='flex items-center justify-center'>
                    <WatchList />
                </div>
                <div className='flex items-center justify-center'>
                    <MarketMovers />
                </div>
            </div>
          </DrawerItems>
        </Drawer>
      </>
    );
        // <div className='h-2/3 w-lg mt-15 border-r border-r-gray-200'>
        //     <div className='flex items-center justify-center'>
        //         <WatchList />
        //     </div>
        //     <div className='flex items-center justify-center'>
        //         <MarketMovers />
        //     </div>
        // </div>
    //);
}

export default LeftSidebar;