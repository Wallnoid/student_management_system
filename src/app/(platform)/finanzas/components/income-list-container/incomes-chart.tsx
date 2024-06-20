'use client';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registro de los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export default function IncomesChart() {
  // Datos para el gráfico
  const data = {
    labels: ['Concursos', 'Charlas','Donaciones','Otros'],
    datasets: [
      {
        label: 'Valor Total',
        data: [200.5,145.23,23,100.5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(59, 112, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(59, 112, 235, 0.6)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Opciones para el gráfico
  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom' as const,
        fullSize: true,
        labels: {
          boxWidth: 20,
          padding: 10,
          usePointStyle: true,
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    }
  };

  return (
    <div className='pt-1 flex items-center justify-center h-full'>
      <Doughnut data={data} options={options} />
    </div>
  );
}