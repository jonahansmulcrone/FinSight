import React, { useEffect, useRef } from 'react';
import {
    createChart,
    ColorType,
    CandlestickSeries,
} from 'lightweight-charts';

const CandlestickChart: React.FC = () => {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                textColor: 'black',
                background: {
                    type: ColorType.Solid,
                    color: 'white',
                },
            },
            width: chartContainerRef.current.clientWidth,
            height: 400,
        });

        const candlestickSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#16a34a', downColor: '#ef5350', borderVisible: false,
            wickUpColor: '#26a69a', wickDownColor: '#ef5350',
        });

        candlestickSeries.setData([
            { time: '2024-02-01', open: 153.82, high: 155.47, low: 152.16, close: 154.79 },
            { time: '2024-02-02', open: 154.92, high: 157.36, low: 154.11, close: 156.73 },
            { time: '2024-02-03', open: 156.44, high: 158.02, low: 155.68, close: 157.16 },
            { time: '2024-02-04', open: 157.21, high: 158.78, low: 153.94, close: 154.23 },
            { time: '2024-02-05', open: 153.86, high: 155.42, low: 149.67, close: 151.34 },
            { time: '2024-02-06', open: 152.07, high: 156.33, low: 151.86, close: 155.92 },
            { time: '2024-02-07', open: 156.14, high: 160.23, low: 155.91, close: 159.68 },
            { time: '2024-02-08', open: 159.42, high: 162.87, low: 158.83, close: 161.94 },
            { time: '2024-02-09', open: 162.17, high: 163.05, low: 158.26, close: 159.43 },
            { time: '2024-02-10', open: 158.76, high: 159.21, low: 156.02, close: 157.59 },
            { time: '2024-02-11', open: 157.83, high: 159.06, low: 155.48, close: 158.34 },
            { time: '2024-02-12', open: 158.91, high: 161.42, low: 158.07, close: 160.86 },
            { time: '2024-02-13', open: 161.03, high: 164.38, low: 160.58, close: 163.72 },
            { time: '2024-02-14', open: 163.95, high: 165.21, low: 162.07, close: 162.53 },
            { time: '2024-02-15', open: 162.35, high: 163.57, low: 159.08, close: 160.13 },
            { time: '2024-02-16', open: 160.47, high: 162.94, low: 159.82, close: 162.37 },
            { time: '2024-02-17', open: 162.18, high: 163.42, low: 160.29, close: 161.86 },
            { time: '2024-02-18', open: 161.62, high: 163.17, low: 158.91, close: 159.23 },
            { time: '2024-02-19', open: 158.95, high: 159.53, low: 155.26, close: 155.98 },
            { time: '2024-02-20', open: 156.32, high: 158.76, low: 155.47, close: 157.82 },
            { time: '2024-02-21', open: 157.63, high: 159.84, low: 156.79, close: 159.37 },
            { time: '2024-02-22', open: 158.92, high: 162.15, low: 157.73, close: 161.53 },
            { time: '2024-02-23', open: 162.01, high: 164.95, low: 161.28, close: 164.36 },
            { time: '2024-02-24', open: 164.82, high: 166.73, low: 163.44, close: 165.09 },
            { time: '2024-02-25', open: 164.87, high: 165.12, low: 160.33, close: 161.18 },
            { time: '2024-02-26', open: 160.91, high: 161.77, low: 158.56, close: 159.42 },
            { time: '2024-02-27', open: 159.89, high: 162.54, low: 159.17, close: 162.16 },
            { time: '2024-02-28', open: 161.76, high: 164.12, low: 161.25, close: 163.87 },
            { time: '2024-02-29', open: 163.59, high: 166.23, low: 162.97, close: 165.74 },
            { time: '2024-03-01', open: 166.12, high: 169.85, low: 165.64, close: 169.37 },
            { time: '2024-03-02', open: 169.58, high: 171.36, low: 167.92, close: 168.45 },
            { time: '2024-03-03', open: 167.98, high: 168.73, low: 165.21, close: 166.58 },
            { time: '2024-03-04', open: 166.12, high: 169.04, low: 165.89, close: 168.72 },
            { time: '2024-03-05', open: 169.14, high: 170.83, low: 168.26, close: 170.32 },
            { time: '2024-03-06', open: 170.56, high: 172.95, low: 169.78, close: 172.47 },
            { time: '2024-03-07', open: 172.83, high: 175.42, low: 172.11, close: 174.96 },
            { time: '2024-03-08', open: 175.23, high: 178.62, low: 174.56, close: 177.85 },
            { time: '2024-03-09', open: 178.14, high: 179.28, low: 175.33, close: 176.19 },
            { time: '2024-03-10', open: 175.76, high: 176.42, low: 172.58, close: 173.34 },
            { time: '2024-03-11', open: 173.89, high: 175.63, low: 172.44, close: 174.53 },
            { time: '2024-03-12', open: 174.76, high: 176.21, low: 173.59, close: 175.95 },
            { time: '2024-03-13', open: 176.32, high: 179.58, low: 175.87, close: 178.82 },
            { time: '2024-03-14', open: 179.23, high: 181.47, low: 177.94, close: 178.36 },
            { time: '2024-03-15', open: 177.95, high: 178.62, low: 173.21, close: 174.59 },
            { time: '2024-03-16', open: 174.13, high: 175.84, low: 172.97, close: 175.42 },
            { time: '2024-03-17', open: 176.03, high: 179.34, low: 175.61, close: 178.95 },
            { time: '2024-03-18', open: 179.37, high: 182.15, low: 178.63, close: 181.72 },
            { time: '2024-03-19', open: 182.06, high: 184.93, low: 181.32, close: 184.27 },
            { time: '2024-03-20', open: 184.53, high: 188.42, low: 183.97, close: 187.86 },
            { time: '2024-03-21', open: 187.34, high: 189.75, low: 185.69, close: 186.34 },
            { time: '2024-03-22', open: 185.87, high: 186.54, low: 182.13, close: 183.46 },
            { time: '2024-03-23', open: 183.79, high: 185.27, low: 181.58, close: 184.75 },
            { time: '2024-03-24', open: 185.12, high: 187.84, low: 184.36, close: 186.93 },
            { time: '2024-03-25', open: 187.21, high: 189.02, low: 186.39, close: 188.57 },
            { time: '2024-03-26', open: 188.92, high: 190.37, low: 187.54, close: 188.19 },
            { time: '2024-03-27', open: 187.83, high: 188.46, low: 184.92, close: 185.73 },
            { time: '2024-03-28', open: 186.04, high: 188.51, low: 185.32, close: 187.96 },
            { time: '2024-03-29', open: 188.25, high: 191.84, low: 187.59, close: 191.24 },
            { time: '2024-03-30', open: 191.57, high: 193.86, low: 190.18, close: 192.36 },
            { time: '2024-03-31', open: 192.04, high: 194.13, low: 189.75, close: 190.82 },
            { time: '2024-04-01', open: 190.53, high: 191.27, low: 186.42, close: 187.29 },
            { time: '2024-04-02', open: 186.87, high: 188.63, low: 184.91, close: 186.34 },
            { time: '2024-04-03', open: 187.05, high: 190.24, low: 186.58, close: 189.76 },
            { time: '2024-04-04', open: 189.32, high: 192.47, low: 188.91, close: 191.83 },
            { time: '2024-04-05', open: 192.16, high: 195.78, low: 191.63, close: 195.42 },
        ]);

        chart.timeScale().fitContent();

        return () => chart.remove();
    }, []);

    return (
        <div ref={chartContainerRef} className='w-full h-[400px] mb-10' />
    );
};

export default CandlestickChart;
