import ContentProps from "../interfaces/ContentProps";

const Content: React.FC<ContentProps> = ({ children }) => {
    return (
        <main className='w-2/4 overflow-y-auto mt-15'>
            {children}
        </main>
    );
}

export default Content;