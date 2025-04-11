import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Statistiques = ({ userData = {} }) => {
  // Valeurs par défaut pour userData
  const defaultData = {
    categories: ["Commandes Passées", "Commandes En Cours", "Commandes Annulées"],
    sales: [10, 7, 3],
    revenues: [500, 700, 200],
    products: ["Produit A", "Produit B", "Produit C"],
    productSales: [300, 150, 50],
  };

  // Fusionner userData avec les valeurs par défaut
  const data = { ...defaultData, ...userData };

  // Données pour le graphique en barres
  const barData = {
    labels: data.categories,
    datasets: [
      {
        label: "Statistiques des Commandes",
        data: data.sales,
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
        borderColor: ["#388E3C", "#FFA000", "#D32F2F"],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Statistiques des Commandes (Barres)",
      },
    },
  };

  // Données pour le graphique en lignes
  const lineData = {
    labels: data.categories,
    datasets: [
      {
        label: "Revenus",
        data: data.revenues,
        fill: false,
        borderColor: "#2196F3",
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenus par Catégorie (Lignes)",
      },
    },
  };

  // Données pour le graphique en secteurs (Pie)
  const pieData = {
    labels: data.products,
    datasets: [
      {
        label: "Répartition des Ventes",
        data: data.productSales,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverOffset: 4,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Répartition des Ventes (Pie)",
      },
    },
  };

  return (
    <div className="ml-60 p-4">
      {/* <h1 className="text-3xl font-bold mb-6">Statistiques</h1> */}

      {/* Disposition en grille */}
      <div className="grid grid-cols-3 gap-8">
        {/* Graphique en barres */}
        <div className="col-span-2 bg-white p-4 shadow-lg rounded-lg" style={{ height: "250px" }}>
          <Bar data={barData} options={barOptions} />
        </div>

        {/* Graphique en secteurs */}
        <div className="bg-white p-4 shadow-lg rounded-lg" style={{ height: "250px" }}>
          <Pie data={pieData} options={pieOptions} />
        </div>

        {/* Graphique en lignes */}
        <div className="col-span-3 bg-white p-4 shadow-lg rounded-lg" style={{ height: "250px" }}>
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>
    </div>
  );
};

export default Statistiques;