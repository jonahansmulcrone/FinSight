import { createContext, ReactNode, useState } from "react";
import CompanyContextType from "../utils/types/CompanyContextType";

export const CompanyContext = createContext<CompanyContextType>({
    ticker: 'AAPL',
    companyName: 'Apple Inc.',
    setCompanyName: () => {},
    setTicker: () => {},
})

export const CompanyContextProvider = ({ children }: { children: ReactNode }) => {
    const [ticker, setTicker] = useState<string>('');
    const [companyName, setCompanyName] = useState<string>('');

    return (
        <CompanyContext.Provider
            value={{
                ticker,
                companyName,
                setCompanyName,
                setTicker
            }}
        >
            {children}
        </CompanyContext.Provider>
    )

};