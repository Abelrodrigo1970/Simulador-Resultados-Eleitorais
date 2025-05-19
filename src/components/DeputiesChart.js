import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LabelList } from 'recharts';
import '../styles/DeputiesChart.css';

const DeputiesChart = ({ data }) => {
  // Usar os dados reais dos mandatos
  const deputiesData = data.nationalPartyResults
    .filter(party => party.mandates > 0) // Apenas partidos com mandatos
    .map(party => ({
      name: party.name,
      value: party.mandates,
      color: party.color
    }));

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={14}
        fontWeight="bold"
      >
        {value}
      </text>
    );
  };

  return (
    <div className="deputies-chart">
      <h3>Distribuição de Deputados</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={deputiesData}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={100}
              outerRadius={200}
              paddingAngle={2}
              dataKey="value"
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {deputiesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name) => [`${value} deputados - ${name}`, '']}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '8px'
              }}
            />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              wrapperStyle={{ paddingTop: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="deputies-summary">
        <p>Total de Deputados: {deputiesData.reduce((sum, item) => sum + item.value, 0)}</p>
      </div>
    </div>
  );
};

export default DeputiesChart;