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
            { time: '2024-02-01', open: 108.10, high: 110.20, low: 106.50, close: 109.40 },
            { time: '2024-02-02', open: 109.40, high: 111.90, low: 108.20, close: 110.75 },
            { time: '2024-02-03', open: 110.75, high: 112.60, low: 109.30, close: 111.25 },
            { time: '2024-02-04', open: 111.25, high: 113.40, low: 110.10, close: 112.85 },
            { time: '2024-02-05', open: 112.85, high: 114.90, low: 111.70, close: 113.60 },
            { time: '2024-02-06', open: 113.60, high: 116.10, low: 112.50, close: 115.40 },
            { time: '2024-02-07', open: 115.40, high: 117.80, low: 113.80, close: 116.25 },
            { time: '2024-02-08', open: 116.25, high: 117.10, low: 112.90, close: 114.20 },
            { time: '2024-02-09', open: 114.20, high: 115.70, low: 111.50, close: 112.60 },
            { time: '2024-02-10', open: 112.60, high: 114.00, low: 109.60, close: 110.75 },
            { time: '2024-02-11', open: 110.75, high: 113.30, low: 110.20, close: 111.80 },
            { time: '2024-02-12', open: 111.80, high: 113.90, low: 110.30, close: 113.40 },
            { time: '2024-02-13', open: 113.40, high: 115.70, low: 112.80, close: 115.20 },
            { time: '2024-02-14', open: 115.20, high: 117.00, low: 114.60, close: 116.70 },
            { time: '2024-02-15', open: 116.70, high: 119.40, low: 115.10, close: 118.25 },
            { time: '2024-02-16', open: 118.25, high: 120.10, low: 117.30, close: 118.80 },
            { time: '2024-02-17', open: 118.80, high: 119.50, low: 116.20, close: 117.10 },
            { time: '2024-02-18', open: 117.10, high: 118.40, low: 114.30, close: 115.60 },
            { time: '2024-02-19', open: 115.60, high: 116.90, low: 113.10, close: 114.50 },
            { time: '2024-02-20', open: 114.50, high: 115.75, low: 111.80, close: 112.10 },
            { time: '2024-02-21', open: 112.10, high: 113.60, low: 110.20, close: 111.40 },
            { time: '2024-02-22', open: 111.40, high: 114.80, low: 110.30, close: 114.30 },
            { time: '2024-02-23', open: 114.30, high: 116.60, low: 113.20, close: 115.80 },
            { time: '2024-02-24', open: 115.80, high: 117.30, low: 114.40, close: 116.70 },
            { time: '2024-02-25', open: 116.70, high: 118.60, low: 116.00, close: 117.85 },
            { time: '2024-02-26', open: 117.85, high: 119.90, low: 115.80, close: 116.60 },
            { time: '2024-02-27', open: 116.60, high: 117.30, low: 112.90, close: 114.20 },
            { time: '2024-02-28', open: 114.20, high: 116.50, low: 113.10, close: 114.95 },
            { time: '2024-02-29', open: 114.95, high: 116.70, low: 112.70, close: 113.60 },
            { time: '2024-03-01', open: 113.60, high: 115.50, low: 111.20, close: 112.25 },
            { time: '2024-03-02', open: 112.25, high: 113.80, low: 109.50, close: 111.00 },
            { time: '2024-03-03', open: 111.00, high: 113.10, low: 110.00, close: 112.90 },
            { time: '2024-03-04', open: 112.90, high: 115.10, low: 112.00, close: 113.40 },
            { time: '2024-03-05', open: 113.40, high: 116.00, low: 113.10, close: 115.80 },
            { time: '2024-03-06', open: 115.80, high: 117.90, low: 114.50, close: 116.10 },
            { time: '2024-03-07', open: 116.10, high: 117.50, low: 114.00, close: 114.70 },
            { time: '2024-03-08', open: 114.70, high: 115.80, low: 112.40, close: 113.30 },
            { time: '2024-03-09', open: 113.30, high: 114.70, low: 110.20, close: 111.80 },
            { time: '2024-03-10', open: 111.80, high: 113.60, low: 110.00, close: 112.25 },
            { time: '2024-03-11', open: 112.25, high: 114.90, low: 111.50, close: 114.10 },
            { time: '2024-03-12', open: 114.10, high: 116.20, low: 113.40, close: 115.75 },
            { time: '2024-03-13', open: 115.75, high: 117.00, low: 114.20, close: 116.00 },
            { time: '2024-03-14', open: 116.00, high: 118.50, low: 115.20, close: 117.90 },
            { time: '2024-03-15', open: 117.90, high: 120.40, low: 117.10, close: 119.60 },
            { time: '2024-03-16', open: 119.60, high: 121.30, low: 118.00, close: 120.40 },
            { time: '2024-03-17', open: 120.40, high: 122.20, low: 119.10, close: 121.10 },
            { time: '2024-03-18', open: 121.10, high: 122.50, low: 118.60, close: 119.70 },
            { time: '2024-03-19', open: 119.70, high: 120.30, low: 117.10, close: 118.30 },
            { time: '2024-03-20', open: 118.30, high: 119.20, low: 115.60, close: 116.10 },
            { time: '2024-03-21', open: 116.10, high: 117.70, low: 114.90, close: 115.40 },
            { time: '2024-03-22', open: 115.40, high: 116.60, low: 113.40, close: 114.20 },
            { time: '2024-03-23', open: 114.20, high: 115.90, low: 112.80, close: 114.90 },
            { time: '2024-03-24', open: 114.90, high: 116.50, low: 113.70, close: 116.00 },
            { time: '2024-03-25', open: 116.00, high: 118.30, low: 115.40, close: 117.80 },
            { time: '2024-03-26', open: 117.80, high: 119.00, low: 116.30, close: 117.10 },
            { time: '2024-03-27', open: 117.10, high: 118.80, low: 114.90, close: 115.60 },
            { time: '2024-03-28', open: 115.60, high: 116.80, low: 113.40, close: 114.20 },
            { time: '2024-03-29', open: 114.20, high: 115.40, low: 111.60, close: 112.90 },
            { time: '2024-03-30', open: 112.90, high: 114.60, low: 110.40, close: 111.50 },
          ]);

        chart.timeScale().fitContent();

        return () => chart.remove();
    }, []);

    return (
        <div ref={chartContainerRef} className="w-full h-[400px] mb-10" />
    );
};

export default CandlestickChart;
