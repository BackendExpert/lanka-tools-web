import React from 'react'
import {
    ResponsiveContainer,
    LineChart as ReLineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from 'recharts'

const LineChart = ({
    data = [],
    lines = [],
    xKey = 'name',
    height = 300,
    showGrid = true,
    showLegend = true
}) => {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <ReLineChart
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

                {lines.map((line, index) => (
                    <Line
                        key={index}
                        type="monotone"
                        dataKey={line.dataKey}
                        name={line.name || line.dataKey}
                        stroke={line.color || '#3b82f6'}
                        strokeWidth={line.strokeWidth || 2}
                        dot={{
                            r: line.dotSize || 4
                        }}
                        activeDot={{
                            r: 6
                        }}
                    />
                ))}
            </ReLineChart>
        </ResponsiveContainer>
    )
}

export default LineChart