import React from 'react'
import {
    ResponsiveContainer,
    PieChart as RePieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from 'recharts'

const PieChart = ({ data = [] }) => {
    const chartData = data.map((item) => ({
        name: item.name || 'Unknown',
        value: item.value || 0,
        color: item.color || '#8884d8'
    }))

    return (
        <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="35%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={50}

                    label
                >
                    {chartData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                    ))}
                </Pie>

                <Tooltip />

                <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    iconType="circle"
                    iconSize={10}
                />
            </RePieChart>
        </ResponsiveContainer>
    )
}

export default PieChart