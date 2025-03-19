import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const WatchListChart: React.FC<any> = ({ ticker, data, isCustomizing }) => {

    const prices = (data: any) => {
        if (!data.data || data.data.length === 0) {
            return [];
        }
        return data.data.map((item: { close: number }) => item.close);
    };

    const closingPrice = data.data?.[data.data.length - 1]?.close.toFixed(2);
    const openingPrice = data.data?.[0]?.close.toFixed(2);

    const openHigherThanClose = openingPrice > closingPrice;

    let lineColor;
    let priceChangeColor;

    if (openHigherThanClose) {
        lineColor = '#DC143C';
        priceChangeColor = 'text-red-600';
    } else {
        lineColor = '#0BDA51';
        priceChangeColor = 'text-green-600';
    }

    const options: ApexOptions = {
        xaxis: {
            categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
            labels: {
                show: false,
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                }
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: false,
            labels: {
                show: false,
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                },
            }
        },
        chart: {
            sparkline: {
                enabled: true
            },
            height: "100%",
            width: "100%",
            type: "area",
            fontFamily: "Inter, sans-serif",
            dropShadow: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            enabled: false,
            x: {
                show: false,
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                opacityFrom: 0.55,
                opacityTo: 0,
                shade: "#1C64F2",
                gradientToColors: ["#1C64F2"],
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 1.2,
        },
        legend: {
            show: false
        },
        grid: {
            show: false,
        },
    };

    const series = [
        {
            name: "Close Price",
            data: prices(data),
            color: lineColor,
        },
    ];

    return (
        <div className="flex w-full bg-white p-2 hover:bg-gray-50 cursor-pointer">
            <div className="w-full flex justify-between items-center">
                <div className="flex-col justify-items-start">
                    <div className="text-black font-bold text-sm">
                        {ticker}
                    </div>
                    <div className="text-black text-xs">
                        Name of Stock
                    </div>
                </div>
                <ReactApexChart
                    options={options}
                    series={series}
                    type="area"
                    height={50}
                    width="35%"
                />
                {!isCustomizing ? (
                    <div className="flex-column justify-end">
                        <div className="flex-col justify-items-end">
                            <div className="text-black text-sm font-bold">
                                ${closingPrice}
                            </div>
                            <div className={`text-xs font-semibold ${priceChangeColor}`}>
                                ${(closingPrice - openingPrice).toFixed(2)} (
                                {(((closingPrice - openingPrice) / openingPrice) * 100).toFixed(2)}%)
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-column justify-end">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="red" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WatchListChart;