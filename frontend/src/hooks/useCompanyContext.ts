import { useContext } from "react";
import { CompanyContext } from "../contexts/CompanyContext"

export const useCompanyContext = () => {
    const context = useContext(CompanyContext);

    if (!context) {
        throw new Error('useCompanyContext must be used within an CompanyContextProvider');
    }

    return context;
}