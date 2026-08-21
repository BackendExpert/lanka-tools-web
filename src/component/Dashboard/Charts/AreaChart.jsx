import React from 'react'
import {
    ResponsiveContainer,
    AreaChart as ReAreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from 'recharts'

const AreaChart = ({
    data = [],
    areas = [],
    xKey = 'name',
    height = 300,
    showGrid = true,
    showLegend = true
}) => {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <ReAreaChart
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

                {areas.map((area, index) => (
                    <Area
                        key={index}
                        type="monotone"
                        dataKey={area.dataKey}
                        name={area.name || area.dataKey}
                        stroke={area.color || '#3b82f6'}
                        fill={area.color || '#3b82f6'}
                        fillOpacity={area.opacity || 0.25}
                        strokeWidth={area.strokeWidth || 2}
                    />
                ))}
            </ReAreaChart>
        </ResponsiveContainer>
    )
}

export default AreaChart