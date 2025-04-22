import { createContext, ReactNode, useState } from "react";
import CompanyContextType from "../utils/types/CompanyContextType";

export const CompanyContext = createContext<CompanyContextType>({
    ticker: '',
    companyName: '',
    setCompanyName: () => {},
    setTicker: () => {},
})

export const CompanyContextProvider = ({ children }: { children: ReactNode }) => {
    const [ticker, setTicker] = useState<string>('MSFT');
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