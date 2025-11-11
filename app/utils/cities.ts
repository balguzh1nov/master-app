// Список городов Казахстана
export const cities = [
  "Алматы",
  "Астана",
  "Шымкент",
  "Актобе",
  "Караганда",
  "Тараз",
  "Павлодар",
  "Усть-Каменогорск",
  "Семей",
  "Атырау",
  "Костанай",
  "Кызылорда",
  "Уральск",
  "Петропавловск",
  "Актау",
  "Темиртау",
  "Туркестан",
  "Кокшетау",
  "Экибастуз",
  "Рудный",
  "Жезказган",
  "Жанаозен",
  "Балхаш",
  "Сарань",
  "Каскелен",
  "Кентау",
  "Риддер",
  "Жаркент",
  "Алтай",
  "Степногорск",
];

// Функция для поиска городов по введенному тексту
export function filterCities(query: string): string[] {
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase();
  return cities.filter(city => 
    city.toLowerCase().startsWith(lowerQuery) || 
    city.toLowerCase().includes(lowerQuery)
  ).slice(0, 5); // Максимум 5 подсказок
}

