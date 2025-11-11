"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CityInput from "./components/CityInput";
import { categories } from "./data/categories";
import { getUserType, type UserType } from "./utils/auth";
import { useTranslation } from "./i18n/useTranslation";

export default function Home() {
  const { t } = useTranslation();
  const [userType, setUserType] = useState<UserType>("guest");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [city, setCity] = useState("");

  // Рекламные слайды (заглушки)
  const adSlides = [
    { id: 1, width: 1200, height: 400 },
    { id: 2, width: 1200, height: 400 },
    { id: 3, width: 1200, height: 400 },
  ];

  useEffect(() => {
    const handleAuthChange = () => {
      setUserType(getUserType());
    };
    window.addEventListener("auth-change", handleAuthChange);
    handleAuthChange(); // Инициализация
    
    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  // Автоматическая смена слайдов
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % adSlides.length);
    }, 3500); // 3.5 секунды

    return () => clearInterval(interval);
  }, [adSlides.length]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header activePage="/" />

      {/* Main Content */}
      <main className="w-full lg:max-w-7xl lg:mx-auto px-3 sm:px-4 md:px-8 lg:px-8 py-6 sm:py-8">
        {/* Hero Section with Search */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {t("home.title")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            {t("home.subtitle")}
          </p>
          
          {/* Search Form - стиль Ozon/Avito */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
            <form action="/search" method="get" className="flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-end">
              <div className="w-full md:flex-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  {t("common.city")}
                </label>
                <CityInput
                  value={city}
                  onChange={setCity}
                  name="city"
                  placeholder={t("home.cityPlaceholder")}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                />
              </div>
              
              <div className="w-full md:flex-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  {t("common.category")}
                </label>
                <select 
                  name="category"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                >
                  <option value="">{t("common.allCategories")}</option>
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>{cat.title}</option>
                  ))}
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full md:w-auto bg-primary text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium whitespace-nowrap text-sm sm:text-base"
              >
                {t("common.find")}
              </button>
            </form>
          </div>
        </div>

        {/* Categories Section - стиль Ozon/Avito */}
        <section className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t("common.categories")}</h2>
            <Link href="/categories" className="text-primary hover:underline text-xs sm:text-sm font-medium">
              {t("home.allCategoriesLink")}
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
            {categories.map((category, idx) => {
              const radiusClasses = [
                'rounded-xl',
                'rounded-2xl',
                'rounded-xl',
                'rounded-2xl',
                'rounded-xl',
                'rounded-2xl',
                'rounded-xl',
                'rounded-2xl'
              ];
              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className={`${radiusClasses[idx]} hover:shadow-lg transition-all duration-300 min-h-[100px] sm:min-h-[120px] group border border-gray-200 hover:border-gray-300 overflow-hidden relative aspect-[4/3]`}
                >
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    unoptimized
                  />
                  <h3 className="absolute top-3 left-3 sm:top-4 sm:left-4 text-base sm:text-lg md:text-xl font-bold text-white drop-shadow-lg">
                    {category.title}
                  </h3>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Ad Slider Section */}
        <section className="mb-8 sm:mb-12">
          <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-white border border-gray-200">
            <div className="relative h-[200px] sm:h-[300px] md:h-[400px]">
              {adSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center">
                    <div className="text-center p-4">
                      <p className="text-gray-600 text-sm sm:text-base mb-2">
                        Рекламный баннер
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        Размер: {slide.width} × {slide.height}px
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {adSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "w-8 bg-primary"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Перейти к слайду ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Masters List */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">{t("common.masters")}</h2>
          <div className="space-y-3 sm:space-y-4">
            {[1, 2, 3, 4, 5].map((id) => (
            <Link
              key={id}
              href={`/master/${id}`}
              className="block bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Image
                  src={`https://i.pravatar.cc/150?img=${id + 10}`}
                  alt="Иван Петров"
                  width={96}
                  height={96}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg flex-shrink-0 mx-auto sm:mx-0 object-cover"
                  unoptimized
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                        Иван Петров
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm">Астана</p>
                    </div>
                    <div className="text-left sm:text-right flex-shrink-0">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-sm sm:text-base">★</span>
                        <span className="font-semibold text-sm sm:text-base">4.8</span>
                        <span className="text-gray-500 text-xs sm:text-sm">(24)</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3 text-sm sm:text-base">
                    Профессиональный мебельщик с опытом работы 10+ лет. 
                    Изготовление кухонь, шкафов, мебели на заказ.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm">
                      Кухни
                    </span>
                    <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm">
                      Шкафы
                    </span>
                    <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm">
                      Мебель на заказ
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

