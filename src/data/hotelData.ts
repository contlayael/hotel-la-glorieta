// Solo datos, sin JSX
export interface ServiceData {
  icon: string; // Aquí guardaremos solo un nombre para el ícono
  text: string;
  description: string;
}

export const servicesData: ServiceData[] = [
  { icon: "bed", text: "Diferentes tipos de habitaciones", description: "Habitaciones para cada tipo de viajero y presupuesto." },
  { icon: "tubo", text: "TuboHotel", description: "Una experiencia original y confortable para aventureros." },
  { icon: "shirt", text: "Servicio de lavandería", description: "Mantén tu ropa impecable durante tu estancia (costo extra)." },
  { icon: "tv", text: "TV con cable", description: "Disfruta de tus programas favoritos en la comodidad de tu cuarto." },
  { icon: "wifi", text: "WIFI Gratuito", description: "Conéctate y comparte tus momentos en nuestras instalaciones." },
  { icon: "shower", text: "Agua caliente las 24hrs", description: "Una ducha relajante a cualquier hora del día." },
];
