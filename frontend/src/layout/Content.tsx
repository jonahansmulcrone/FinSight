import ContentProps from "../utils/interfaces/ContentProps";

const Content: React.FC<ContentProps> = ({ children }) => {
    return (
        <main className='w-2/4 flex flex-col gap-15'>
            {children}
        </main>
    );
}

export default Content;