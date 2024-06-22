import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Payments } from '@/interfaces/Payments';

ChartJS.register(ArcElement, Tooltip, Legend);



const OutcomesChart = ({ payments }: { payments: Payments[] }) => {
  const categoryTotals: { [category: string]: number } = {};

  payments?.forEach(payment => {
    const { monto, categoria } = payment;
    if (categoria) {
      categoryTotals[categoria] = (categoryTotals[categoria] || 0) + monto;
    }
  });

  // Prepare data for the chart
  const chartData = {
    labels: Object.keys(categoryTotals), 
    datasets: [
      {
        label: 'Valor Total $',
        data: Object.values(categoryTotals), // Use calculated totals as data
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(59, 112, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(59, 112, 235, 0.6)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          boxWidth: 20,
          padding: 10,
          usePointStyle: true,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  };

  

  return (
    <div className='pt-1 flex items-center justify-center h-full'>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default OutcomesChart;
