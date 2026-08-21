import React from 'react'
import {
    ResponsiveContainer,
    BarChart as ReBarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from 'recharts'

const BarChart = ({
    data = [],
    bars = [],
    xKey = 'name',
    height = 300,
    showGrid = true,
    showLegend = true
}) => {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <ReBarChart
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    left: 0,
                    bottom: 5
                }}
            >
                {showGrid && (
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                    />
                )}

                <XAxis dataKey={xKey} />

                <YAxis />

                <Tooltip />

                {showLegend && (
                    <Legend
                        verticalAlign="top"
                        align="right"
                        iconType="circle"
                    />
                )}

                {bars.map((bar, index) => (
                    <Bar
                        key={index}
                        dataKey={bar.dataKey}
                        name={bar.name || bar.dataKey}
                        fill={bar.color || '#3b82f6'}
                        radius={[6, 6, 0, 0]}
                        barSize={bar.barSize || 25}
                    />
                ))}
            </ReBarChart>
        </ResponsiveContainer>
    )
}

export default BarChart