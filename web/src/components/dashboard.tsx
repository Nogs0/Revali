import { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { api } from "../services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

export function Dashboard() {
  const [chartData, setChartData] = useState(null);
  const [donutData1, setDonutData1] = useState(null);
  const [donutData2, setDonutData2] = useState(null);

  const token = localStorage.getItem("token-validate");

  const fetchBarChartData = async () => {
    try {
      const response = await api.get("/quantidade-doacoes-por-banco", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.data;
      setChartData(formatChartData(data, "Doações por banco de alimento (kg)"));
    } catch (error) {
      console.error("Erro ao buscar dados do gráfico de barras:", error);
    }
  };

  const fetchDonutData1 = async () => {
    try {
      const response = await api.get("/quantidade-produtos-por-banco", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.data;
      setDonutData1(formatChartData(data, "Produtos para resgate"));
    } catch (error) {
      console.error("Erro ao buscar dados do primeiro gráfico de donut:", error);
    }
  };

  const fetchDonutData2 = async () => {
    try {
      const response = await api.get("/quantidade-resgates-por-banco", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.data;
      setDonutData2(formatChartData(data, "Resgates por banco de alimentos"));
    } catch (error) {
      console.error("Erro ao buscar dados do segundo gráfico de donut:", error);
    }
  };

  const formatChartData = (data, label) => {
    const labels = Object.keys(data);
    const values = Object.values(data);
    return {
      labels,
      datasets: [
        {
          label,
          data: values,
          backgroundColor: ["#89c480", "#a2d8e4", "#f9e47e"],
          borderWidth: 1,
        },
      ],
    };
  };

  useEffect(() => {
    fetchBarChartData();
    fetchDonutData1();
    fetchDonutData2();
  }, []);

  if (!chartData || !donutData1 || !donutData2)
    return (
      <div className="flex items-center justify-center py-3">
        <div className="loader border-t-4 border-green-medium rounded-full w-8 h-8 animate-spin"></div>
      </div>
    );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
      <div className="col-span-1 lg:col-span-2 bg-white rounded-xl p-4 shadow-md h-96">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return `${context.dataset.label}: ${context.parsed.y} kg`;
                  },
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => `${value} kg`,
                },
              },
            },
          }}
        />
      </div>
      <div className="col-span-1 bg-white rounded-xl p-4 shadow-md h-96">
        <Doughnut
          data={donutData1}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: "Produtos para resgate",
                font: {
                  size: 16,
                },
              },
            },
          }}
        />
      </div>
      <div className="col-span-1 bg-white rounded-xl p-4 shadow-md h-96">
        <Doughnut
          data={donutData2}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: "Resgates por banco de alimentos",
                font: {
                  size: 16,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
