import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { STATUSES, STATUS_COLORS } from "../constants";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function StatsChart({ counts }) {
  const values = STATUSES.map((s) => counts[s]);
  const colors = STATUSES.map((s) => STATUS_COLORS[s]);
  const total = values.reduce((a, b) => a + b, 0);

  if (total === 0) {
    return <p className="empty">Add an application to see your statistics.</p>;
  }

  const doughnutData = {
    labels: STATUSES,
    datasets: [{ data: values, backgroundColor: colors, borderWidth: 0 }],
  };

  const barData = {
    labels: STATUSES,
    datasets: [
      {
        label: "Applications",
        data: values,
        backgroundColor: colors,
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, ticks: { precision: 0, stepSize: 1 } },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "62%",
    plugins: { legend: { position: "bottom" } },
  };

  return (
    <div className="charts">
      <div className="chart-box">
        <Doughnut data={doughnutData} options={doughnutOptions} />
      </div>
      <div className="chart-box">
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
}
