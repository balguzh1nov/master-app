"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { categories } from "./data/categories";
import { getUserType, type UserType } from "./utils/auth";

export default function Home() {
  const [userType, setUserType] = useState<UserType>("guest");

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header activePage="/" />

      {/* Main Content */}
      <main className="w-full lg:max-w-7xl lg:mx-auto px-3 sm:px-4 md:px-8 lg:px-8 py-6 sm:py-8">
        {/* Hero Section with Search */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Найдите мебельщика для вашего проекта
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            Более 1000 проверенных специалистов готовы помочь вам
          </p>
          
          {/* Search Form - стиль Ozon/Avito */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
            <form action="/search" method="get" className="flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-end">
              <div className="w-full md:flex-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Город
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="Астана"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                />
              </div>
              
              <div className="w-full md:flex-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Категория
                </label>
                <select 
                  name="category"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                >
                  <option value="">Все категории</option>
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>{cat.title}</option>
                  ))}
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full md:w-auto bg-primary text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium whitespace-nowrap text-sm sm:text-base"
              >
                Найти
              </button>
            </form>
          </div>
        </div>

        {/* Categories Section - стиль Ozon/Avito */}
        <section className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Категории услуг</h2>
            <Link href="/categories" className="text-primary hover:underline text-xs sm:text-sm font-medium">
              Все категории →
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

        {/* Reviews Section */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Отзывы</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            915462 отзыва оставили клиенты за последние 12 месяцев. Из них 885565 — положительные.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                specialistName: "Евгений Шульгин",
                rating: 5.0,
                totalReviews: 56,
                reviewerName: "Диана",
                reviewRating: 5,
                reviewText: "Отличный мастер! Всё сделал быстро и качественно. Рекомендую!",
                date: "сегодня",
                location: "Десёновское",
                serviceType: "сборка мебели"
              },
              {
                specialistName: "Сергей Парватов",
                rating: 4.92,
                totalReviews: 299,
                reviewerName: "Александр",
                reviewRating: 5,
                reviewText: "Профессионал своего дела. Очень доволен результатом работы.",
                date: "вчера",
                location: "м. Марьино",
                serviceType: "вождение (МКПП)"
              },
              {
                specialistName: "Мария Иванова",
                rating: 4.95,
                totalReviews: 128,
                reviewerName: "Ольга",
                reviewRating: 5,
                reviewText: "Прекрасный специалист! Помогла решить все вопросы быстро и эффективно.",
                date: "6 ноября 2025",
                location: "Астана",
                serviceType: "юристы"
              },
              {
                specialistName: "Иван Смирнов",
                rating: 4.88,
                totalReviews: 87,
                reviewerName: "Петр",
                reviewRating: 4.5,
                reviewText: "Хорошая работа, всё сделано аккуратно. Есть небольшие замечания, но в целом доволен.",
                date: "5 ноября 2025",
                location: "Астана",
                serviceType: "обрезка деревьев"
              },
              {
                specialistName: "Анна Петрова",
                rating: 5.0,
                totalReviews: 234,
                reviewerName: "Елена",
                reviewRating: 5,
                reviewText: "Очень профессиональный подход. Всё объяснила доступно и помогла разобраться.",
                date: "4 ноября 2025",
                location: "Астана",
                serviceType: "психология"
              },
              {
                specialistName: "Дмитрий Козлов",
                rating: 4.9,
                totalReviews: 156,
                reviewerName: "Михаил",
                reviewRating: 5,
                reviewText: "Отличный сервис! Всё перевезли аккуратно и в срок. Спасибо!",
                date: "3 ноября 2025",
                location: "Астана",
                serviceType: "перевозка вещей"
              }
            ].map((review, idx) => {
              const radiusClasses = [
                'rounded-2xl',
                'rounded-3xl',
                'rounded-xl',
                'rounded-2xl',
                'rounded-3xl',
                'rounded-xl'
              ];
              return (
                <div
                  key={idx}
                  className={`bg-white border border-gray-200 ${radiusClasses[idx]} p-4 sm:p-6 hover:shadow-lg transition-all duration-300`}
                >
                  {/* Specialist Info */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <Image
                      src={`https://i.pravatar.cc/150?img=${idx + 1}`}
                      alt={review.specialistName}
                      width={48}
                      height={48}
                      className={`w-10 h-10 sm:w-12 sm:h-12 ${idx % 2 === 0 ? 'rounded-xl' : 'rounded-full'} flex-shrink-0 object-cover`}
                      unoptimized
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{review.specialistName}</h3>
                      <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold">{review.rating}</span>
                        <span className="truncate">{review.totalReviews} отзывов</span>
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                      {review.reviewerName} оставила отзыв
                    </p>
                    <div className="flex items-center gap-0.5 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isFull = star <= Math.floor(review.reviewRating);
                        const isHalf = star === Math.ceil(review.reviewRating) && review.reviewRating % 1 !== 0;
                        return (
                          <span
                            key={star}
                            className={`text-base sm:text-lg ${isFull ? 'text-yellow-500' : isHalf ? 'text-yellow-500 opacity-50' : 'text-gray-300'}`}
                          >
                            ★
                          </span>
                        );
                      })}
                    </div>
                    <p className="text-gray-700 mb-3 text-sm sm:text-base">{review.reviewText}</p>
                    <div className="flex flex-wrap gap-1 sm:gap-2 text-xs text-gray-500">
                      <span>{review.date}</span>
                      <span>•</span>
                      <span className="truncate">{review.location}</span>
                      <span>•</span>
                      <span className="bg-gray-100 px-2 py-1 rounded-full">{review.serviceType}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Masters List */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Специалисты</h2>
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
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-yellow-500 text-sm sm:text-base">★</span>
                        <span className="font-semibold text-sm sm:text-base">4.8</span>
                        <span className="text-gray-500 text-xs sm:text-sm">(24)</span>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm">от 5 000 ₽</p>
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

