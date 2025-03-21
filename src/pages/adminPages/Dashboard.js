import { User, ShoppingCart, ShoppingBag, Star, MoreVertical } from "lucide-react";

const cards = [
  { title: "Total Users", value: 277, subtitle: "Last Month", color: "bg-green-500", icon: <User className="w-8 h-8 text-white/50" /> },
  { title: "Total Users", value: 277, subtitle: "Last Month", color: "bg-pink-500", icon: <ShoppingCart className="w-8 h-8 text-white/50" /> },
  { title: "Total Users", value: 277, subtitle: "Last Month", color: "bg-blue-500", icon: <ShoppingBag className="w-8 h-8 text-white/50" /> },
  { title: "Total Users", value: 277, subtitle: "Last Month", color: "bg-yellow-500", icon: <Star className="w-8 h-8 text-white/50" /> },
];

const Dashboard = () => {
  return (
    <div className="p-6 grid grid-cols-3 gap-6 items-stretch">
      {/* Cartes utilisateurs en 2 lignes de 2 colonnes */}
      <div className="grid grid-cols-2 gap-6 col-span-2">
        {cards.map((card, index) => (
          <div key={index} className={`${card.color} p-5 rounded-xl shadow-lg text-white flex flex-col justify-between`}>
            <div className="flex justify-between">
              <h3 className="text-sm font-medium">{card.title}</h3>
              <MoreVertical className="text-white/50 cursor-pointer" />
            </div>
            <p className="text-3xl font-bold">{card.value}</p>
            <div className="flex justify-between items-center">
              <p className="text-sm opacity-75">{card.subtitle}</p>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Carte des ventes à droite */}
      <div className="bg-blue-600 p-6 rounded-xl shadow-lg text-white flex flex-col justify-between">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium">Total Sales</h3>
          <MoreVertical className="text-white/50 cursor-pointer" />
        </div>
        <p className="text-2xl font-bold">$3,787,681.00</p>
        <p className="text-sm opacity-75">$3,578.90 in last month</p>
        <div className="flex justify-center">
          <img src="https://www.chartjs.org/img/chartjs-logo.svg" alt="Chart" className="w-32" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
