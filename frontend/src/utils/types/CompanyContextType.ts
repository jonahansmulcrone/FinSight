type CompanyContextType = {
    ticker: string;
    companyName: string;
    setCompanyName: (companyName: string) => void;
    setTicker: (ticker: string) => void;
};

export default CompanyContextType;