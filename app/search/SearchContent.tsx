"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getCategoryBySlug, getSubcategoryBySlug, categories } from "../data/categories";

// Функция для форматирования чисел с фиксированной локалью
function formatPrice(price: number): string {
  return price.toLocaleString('ru-RU');
}

export default function SearchContent() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category") || "";
  const subcategorySlug = searchParams.get("subcategory") || "";
  const cityParam = searchParams.get("city") || "";

  const [city, setCity] = useState(cityParam);
  const [selectedCategory, setSelectedCategory] = useState(categorySlug);
  const [selectedSubcategory, setSelectedSubcategory] = useState(subcategorySlug);
  const [ratingFilter, setRatingFilter] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const category = selectedCategory ? getCategoryBySlug(selectedCategory) : null;
  const subcategory = category && selectedSubcategory 
    ? getSubcategoryBySlug(selectedCategory, selectedSubcategory) 
    : null;

  // Моковые данные специалистов
  const masters = [
    {
      id: 1,
      name: "Иван Петров",
      city: "Астана",
      rating: 4.8,
      reviewsCount: 24,
      price: 5000,
      description: "Профессиональный мебельщик с опытом работы 10+ лет. Изготовление кухонь, шкафов, мебели на заказ.",
      tags: ["Кухни под заказ", "Шкафы-купе", "Гардеробные"]
    },
    {
      id: 2,
      name: "Сергей Смирнов",
      city: "Астана",
      rating: 4.9,
      reviewsCount: 45,
      price: 7000,
      description: "Специалист по изготовлению корпусной мебели. Индивидуальный подход к каждому проекту.",
      tags: ["Комоды и тумбы", "Стенки и ТВ-зоны"]
    },
    {
      id: 3,
      name: "Александр Козлов",
      city: "Санкт-Петербург",
      rating: 4.7,
      reviewsCount: 18,
      price: 4500,
      description: "Опытный мастер по сборке и установке мебели. Быстро и качественно выполню любую задачу.",
      tags: ["Сборка мебели", "Установка кухонь"]
    },
    {
      id: 4,
      name: "Дмитрий Волков",
      city: "Астана",
      rating: 5.0,
      reviewsCount: 32,
      price: 8500,
      description: "Дизайнер мебели с портфолио более 200 проектов. Создам уникальную мебель для вашего дома.",
      tags: ["Дизайн мебели", "3D-визуализация"]
    },
    {
      id: 5,
      name: "Михаил Новиков",
      city: "Астана",
      rating: 4.6,
      reviewsCount: 15,
      price: 4000,
      description: "Ремонт и реставрация мебели. Верну вашей мебели вторую жизнь.",
      tags: ["Ремонт фасадов", "Покраска"]
    },
    {
      id: 6,
      name: "Андрей Лебедев",
      city: "Астана",
      rating: 4.9,
      reviewsCount: 56,
      price: 6000,
      description: "Изготовление офисной мебели. Работаю с крупными компаниями и частными заказчиками.",
      tags: ["Рабочие столы", "Столы переговоров"]
    }
  ];

  const filteredMasters = masters.filter(master => {
    if (city && master.city.toLowerCase() !== city.toLowerCase()) return false;
    if (ratingFilter && master.rating < parseFloat(ratingFilter)) return false;
    if (priceFrom && master.price < parseInt(priceFrom)) return false;
    if (priceTo && master.price > parseInt(priceTo)) return false;
    return true;
  });

  const sortedMasters = [...filteredMasters].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "reviews":
        return b.reviewsCount - a.reviewsCount;
      case "rating":
      default:
        return b.rating - a.rating;
    }
  });

  return (
    <>
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-primary">Главная</Link>
        {category && (
          <>
            <span className="mx-2">/</span>
            <Link href={`/category/${category.slug}`} className="hover:text-primary">
              {category.title}
            </Link>
          </>
        )}
        {subcategory && (
          <>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{subcategory.title}</span>
          </>
        )}
        {!category && <span className="mx-2">/</span>}
        {!category && <span className="text-gray-900">Поиск</span>}
      </nav>

      {/* Search Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          {subcategory 
            ? `Специалисты: ${subcategory.title}`
            : category 
            ? `Специалисты: ${category.title}`
            : "Поиск специалистов"
          }
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Найдено специалистов: {sortedMasters.length}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="lg:hidden w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <span className="font-medium text-gray-900">Фильтры</span>
          <span className="text-xl">{isFiltersOpen ? "✕" : "☰"}</span>
        </button>

        {/* Sidebar Filters */}
        <aside className={`${isFiltersOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Фильтры</h2>

            {/* City Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Город
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Астана"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Категория
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubcategory("");
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                <option value="">Все категории</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Filter */}
            {category && category.subcategories.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Подкатегория
                </label>
                <select
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option value="">Все подкатегории</option>
                  {category.subcategories.map((sub) => (
                    <option key={sub.slug} value={sub.slug}>
                      {sub.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Rating Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Рейтинг от
              </label>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                <option value="">Любой</option>
                <option value="4">4+</option>
                <option value="4.5">4.5+</option>
                <option value="4.7">4.7+</option>
                <option value="4.9">4.9+</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Цена, ₽
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={priceFrom}
                  onChange={(e) => setPriceFrom(e.target.value)}
                  placeholder="От"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <input
                  type="number"
                  value={priceTo}
                  onChange={(e) => setPriceTo(e.target.value)}
                  placeholder="До"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setCity("");
                setSelectedCategory("");
                setSelectedSubcategory("");
                setRatingFilter("");
                setPriceFrom("");
                setPriceTo("");
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Сбросить фильтры
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Sort Bar */}
          <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <span className="text-xs sm:text-sm text-gray-600">
              Найдено: {sortedMasters.length} специалистов
            </span>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <span className="text-xs sm:text-sm text-gray-600">Сортировка:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-xs sm:text-sm"
              >
                <option value="rating">По рейтингу</option>
                <option value="price-asc">По цене: сначала дешевле</option>
                <option value="price-desc">По цене: сначала дороже</option>
                <option value="reviews">По количеству отзывов</option>
              </select>
            </div>
          </div>

          {/* Masters List */}
          <div className="space-y-4">
            {sortedMasters.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                <p className="text-gray-600 text-lg mb-2">Специалисты не найдены</p>
                <p className="text-gray-500 text-sm">
                  Попробуйте изменить параметры поиска или сбросить фильтры
                </p>
              </div>
            ) : (
              sortedMasters.map((master, idx) => {
                const radiusClasses = [
                  'rounded-xl',
                  'rounded-2xl',
                  'rounded-xl',
                  'rounded-2xl',
                  'rounded-xl',
                  'rounded-2xl'
                ];
                return (
                  <Link
                    key={master.id}
                    href={`/master/${master.id}`}
                    className={`block bg-white border border-gray-200 ${radiusClasses[idx]} p-4 sm:p-6 hover:shadow-lg hover:border-primary transition-all duration-300`}
                  >
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <div className={`w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 ${idx % 2 === 0 ? 'rounded-xl' : 'rounded-2xl'} flex-shrink-0 mx-auto sm:mx-0`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                              {master.name}
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm">{master.city}</p>
                          </div>
                          <div className="text-left sm:text-right flex-shrink-0">
                            <div className="flex items-center gap-1 mb-1">
                              <span className="text-yellow-500 text-sm sm:text-base">★</span>
                              <span className="font-semibold text-sm sm:text-base">{master.rating}</span>
                              <span className="text-gray-500 text-xs sm:text-sm">({master.reviewsCount})</span>
                            </div>
                            <p className="text-gray-900 font-semibold text-sm sm:text-base">от {formatPrice(master.price)} ₽</p>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3 text-sm sm:text-base">{master.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {master.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

