import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, BarElement } from 'chart.js';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
// Registra las escalas y elementos necesarios
Chart.register(LinearScale, CategoryScale, BarElement);

export function GraphicGoals() {
  const {
    countStateGoals,
  } = useSelector((state) => state);
  const options = {
    responsive: true,
    animation: {
      duration: 1500,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 20,
        grid: {
          color: '#5254b1',
        },
        ticks: {
          color: '#5254b1',
        },
      },
      x: {
        ticks: {
          color: '#5254b1',
        },
      },
    },
  };

  const data = {
    labels: ['Inicio', 'Organización', 'Ejecución', 'Cierre'],
    datasets: [
      {
        label: 'Estado de metas:',
        data: countStateGoals && countStateGoals,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)', // Rojo
          'rgba(255, 193, 7, 0.8)', // Amarillo
          'rgba(0, 123, 255, 0.8)', // Azul
          'rgba(0, 220, 195, 0.8)', // Verde azulado
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(0, 123, 255, 1)',
          'rgba(0, 220, 195, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} options={options} />;
}