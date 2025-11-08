import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default async function MasterProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header userType="client" />

      <main className="w-full lg:max-w-7xl lg:mx-auto px-3 sm:px-4 md:px-8 lg:px-8 py-6 sm:py-8">
        <Link href="/" className="text-primary hover:underline mb-4 sm:mb-6 inline-block text-sm sm:text-base">
          ← Назад к списку
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gray-200 rounded-xl sm:rounded-2xl flex-shrink-0 mx-auto sm:mx-0"></div>
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Иван Петров
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Москва</p>
                  <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-base sm:text-lg md:text-xl">★</span>
                      <span className="font-semibold text-base sm:text-lg">4.8</span>
                      <span className="text-gray-500 text-xs sm:text-sm">(24 отзыва)</span>
                    </div>
                    <span className="hidden sm:inline text-gray-600">•</span>
                    <span className="text-gray-600 text-xs sm:text-sm md:text-base">Опыт: 10+ лет</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base">
                    Профессиональный мебельщик с большим опытом работы. 
                    Специализируюсь на изготовлении кухонь, шкафов и мебели на заказ. 
                    Работаю с различными материалами: МДФ, массив дерева, ЛДСП. 
                    Гарантирую качество и соблюдение сроков.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                <Link
                  href={`/chat/${id}`}
                  className="flex-1 bg-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:opacity-90 transition-colors font-medium text-center text-sm sm:text-base"
                >
                  Написать
                </Link>
                <Link
                  href={`/create-request/${id}`}
                  className="flex-1 bg-white border-2 border-primary text-primary px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium text-center text-sm sm:text-base"
                >
                  Создать заявку
                </Link>
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Портфолио</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                {[1, 2, 3, 4, 5, 6].map((item, idx) => {
                  const radiusClasses = ['rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-xl', 'rounded-2xl', 'rounded-3xl'];
                  return (
                    <div key={item} className={`aspect-square bg-gray-200 ${radiusClasses[idx]}`}></div>
                  );
                })}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Отзывы</h2>
              <div className="space-y-4 sm:space-y-6">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b border-gray-200 pb-4 sm:pb-6 last:border-0 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-3">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">Анна Смирнова</p>
                        <p className="text-xs sm:text-sm text-gray-500">15 января 2024</p>
                      </div>
                      <div className="flex items-center gap-0.5 sm:gap-1">
                        <span className="text-yellow-500 text-sm sm:text-base">★</span>
                        <span className="text-yellow-500 text-sm sm:text-base">★</span>
                        <span className="text-yellow-500 text-sm sm:text-base">★</span>
                        <span className="text-yellow-500 text-sm sm:text-base">★</span>
                        <span className="text-yellow-500 text-sm sm:text-base">★</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3 text-sm sm:text-base">
                      Отличная работа! Кухня получилась именно такой, как я хотела. 
                      Качество материалов на высоте, все сделано аккуратно и в срок.
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gray-200 rounded-xl"></div>
                      <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gray-200 rounded-2xl"></div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href={`/reviews/${id}`}
                className="mt-4 sm:mt-6 inline-block text-primary hover:underline font-medium text-sm sm:text-base"
              >
                Все отзывы →
              </Link>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:sticky lg:top-24">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Категории работ</h3>
              <ul className="space-y-2 mb-4 sm:mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-primary text-sm sm:text-base">✓</span>
                  <span className="text-gray-700 text-sm sm:text-base">Кухни</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary text-sm sm:text-base">✓</span>
                  <span className="text-gray-700 text-sm sm:text-base">Шкафы</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary text-sm sm:text-base">✓</span>
                  <span className="text-gray-700 text-sm sm:text-base">Мебель на заказ</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary text-sm sm:text-base">✓</span>
                  <span className="text-gray-700 text-sm sm:text-base">Ремонт мебели</span>
                </li>
              </ul>

              <div className="border-t border-gray-200 pt-3 sm:pt-4">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Стоимость работ</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">от 5 000 ₽</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

