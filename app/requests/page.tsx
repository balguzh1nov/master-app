import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Requests() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="specialist" activePage="/requests" />

      <main className="w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Заявки от клиентов</h1>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((request, idx) => {
            const radiusClasses = ['rounded-2xl', 'rounded-3xl', 'rounded-xl', 'rounded-2xl', 'rounded-3xl'];
            return (
            <div
              key={request}
              className={`bg-white border border-gray-200 ${radiusClasses[idx]} p-4 sm:p-6 hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 bg-gray-200 ${idx % 2 === 0 ? 'rounded-xl' : 'rounded-full'} flex-shrink-0`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">Анна Смирнова</p>
                      <p className="text-sm text-gray-500">Астана</p>
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    Изготовление кухни
                  </h3>
                  <p className="text-gray-700 mb-3 text-sm sm:text-base">
                    Нужна кухня 3 метра, современный стиль, белый цвет. 
                    Материал - МДФ с пленкой. Нужно сделать до конца месяца.
                  </p>
                  <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                    <span>Бюджет: <strong className="text-gray-900">50 000 ₽</strong></span>
                    <span>Сроки: <strong className="text-gray-900">В течение месяца</strong></span>
                  </div>
                </div>
                <div className="flex-shrink-0 sm:ml-6">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Новая
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/chat/${request}`}
                  className="flex-1 bg-primary text-white px-6 py-2 rounded-xl hover:opacity-90 transition-colors font-medium text-center"
                >
                  Открыть чат
                </Link>
                <button className="flex-1 bg-white border-2 border-primary text-primary px-6 py-2 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                  Откликнуться
                </button>
              </div>
            </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}

