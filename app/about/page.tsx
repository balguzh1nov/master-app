import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header userType="guest" activePage="/about" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">О нас</h1>

        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              О платформе Мебельщики
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Мебельщики — это платформа для поиска профессиональных мастеров по изготовлению и ремонту мебели. 
              Мы помогаем клиентам находить проверенных специалистов, а мастерам — находить новых заказчиков.
            </p>
            <p className="text-sm sm:text-base text-gray-600">
              Наша миссия — сделать процесс поиска мастера и выполнения работ максимально простым и удобным 
              для всех участников процесса.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Контакты
            </h2>
            <div className="space-y-2 text-sm sm:text-base text-gray-600">
              <p>Email: support@mebelchiki.ru</p>
              <p>Телефон: +7 (495) 123-45-67</p>
              <p>Адрес: Астана, ул. Примерная, д. 1</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Режим работы
            </h2>
            <div className="space-y-2 text-sm sm:text-base text-gray-600">
              <p>Понедельник - Пятница: 9:00 - 18:00</p>
              <p>Суббота - Воскресенье: 10:00 - 16:00</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

