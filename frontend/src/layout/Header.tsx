const Header: React.FC = () => {
    return (
        <header className='w-screen mt-10'>
            <div className='flex flex-row items-center justify-center'>
                <div className='text-gray-500 italic relative flex-grow'>
                    <input type='text' className='text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:ring-offset-0 border-none rounded-full bg-gray-100 w-xl py-2' placeholder='Please search company or ticker' />
                </div>
            </div>
        </header>
    );
}

export default Header;  