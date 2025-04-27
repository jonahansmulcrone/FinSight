const formatCurrency = (amount: string): string => {
    const num = Number(amount);

    if (isNaN(num)) return 'NaN';

    if (num >= 1_000_000_000) {
        return `$${(num / 1_000_000_000).toFixed(2)}B`;
    } else {
        return `$${new Intl.NumberFormat().format(Number(num.toFixed(2)))}`;
    }
}

export default formatCurrency;