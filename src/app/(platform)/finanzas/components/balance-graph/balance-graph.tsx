import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { usePayments } from "../../paymentsContext";

// Register the components required by ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BalanceGraphContainer() {
  const { incomePayments, outcomePayments } = usePayments();

  // Calculate total income
  const totalIncome = incomePayments?.reduce((acc, payment) => acc + payment.monto, 0);

  // Calculate total outcome
  const totalOutcome = outcomePayments?.reduce((acc, payment) => acc + payment.monto, 0);

  // Data for the bar chart
  const data = {
    labels: ['Ingresos', 'Egresos'],
    datasets: [{
      label: 'USD $',
      data: [totalIncome, totalOutcome],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    }]
  };

  // Options for the chart
  const options: any = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  return (
    <div className="w-full md:w-1/2 px-1 pt-1">
      <div className="border-2 h-64 rounded-md">
        <div className="flex flex-col justify-between h-full p-4">
          <div className="content-start text-left font-bold h-full">
          Balance General:
          </div>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
