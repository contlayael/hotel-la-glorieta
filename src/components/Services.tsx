import { servicesData } from "../data/hotelData";
import { BedDouble, CircleDot, Shirt, Tv, Wifi, ShowerHead } from "../components/common/Icons";

const iconMap = {
  bed: <BedDouble className="w-10 h-10 text-amber-600" />,
  tubo: <CircleDot className="w-10 h-10 text-amber-600" />,
  shirt: <Shirt className="w-10 h-10 text-amber-600" />,
  tv: <Tv className="w-10 h-10 text-amber-600" />,
  wifi: <Wifi className="w-10 h-10 text-amber-600" />,
  shower: <ShowerHead className="w-10 h-10 text-amber-600" />,
};

export default function Services() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {servicesData.map((service, index) => (
        <div key={index} className="flex flex-col items-center p-4 rounded-xl shadow">
          {iconMap[service.icon as keyof typeof iconMap]}
          <h3 className="text-lg font-bold mt-2">{service.text}</h3>
          <p className="text-sm text-gray-600 text-center">{service.description}</p>
        </div>
      ))}
    </div>
  );
}
