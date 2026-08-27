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
        color: item.color || '#EAB308'
    }))

    return (
        <ResponsiveContainer width="100%" height={330}>
            <RePieChart>
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="43%"
                    outerRadius={88}
                    innerRadius={50}
                    label
                >
                    {chartData.map((entry, index) => (
                        <Cell
                            key={index}
                            fill={entry.color}
                        />
                    ))}
                </Pie>

                <Tooltip />

                <Legend
                    layout="horizontal"
                    align="center"
                    verticalAlign="bottom"
                    iconType="circle"
                    iconSize={10}
                    wrapperStyle={{
                        bottom: 5
                    }}
                />
            </RePieChart>
        </ResponsiveContainer>
    )
}

export default PieChart