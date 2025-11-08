"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LoginSpecialist() {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки кода
    console.log("Отправка кода на", phone);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header userType="guest" activePage="/login-specialist" />

      {/* Hero Section */}
      <section className="bg-white py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="w-full lg:max-w-7xl lg:mx-auto px-3 sm:px-4 md:px-8 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                Зарабатывайте на том, что умеете
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8">
                Более 500 000 заказов в месяц в приложении «Для профи»
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-xs sm:w-48 md:w-64 h-48 sm:h-64 md:h-96 bg-gray-200 rounded-2xl sm:rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="bg-gray-50 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="w-full lg:max-w-7xl lg:mx-auto px-3 sm:px-4 md:px-8 lg:px-8">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  Зарегистрируйтесь по номеру телефона
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6">
                  Отправим СМС с кодом подтверждения. Присылать рекламу не будем
                </p>
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <div className="relative">
                      <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 sm:gap-2">
                        <span className="text-lg sm:text-xl md:text-2xl">🇷🇺</span>
                        <span className="text-gray-500 text-xs sm:text-sm md:text-base">+7</span>
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="123 456 78-90"
                        className="w-full pl-14 sm:pl-16 md:pl-20 pr-3 sm:pr-4 py-2 sm:py-3 md:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base md:text-lg"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 md:py-4 rounded-xl hover:opacity-90 transition-colors font-medium text-sm sm:text-base md:text-lg"
                  >
                    Войти
                  </button>
                </form>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link
                    href="/register-specialist"
                    className="w-full bg-primary text-white px-4 sm:px-6 py-2 sm:py-3 md:py-4 rounded-xl hover:opacity-90 transition-colors font-medium text-sm sm:text-base md:text-lg flex items-center justify-center gap-2"
                  >
                    Зарегистрироваться
                  </Link>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    После регистрации вы заполните профиль через удобный опросник
                  </p>
                </div>
                <div className="mt-3 sm:mt-4 text-center">
                  <Link
                    href="/login-specialist-email"
                    className="text-primary hover:opacity-80 underline text-xs sm:text-sm"
                  >
                    Войти по email
                  </Link>
                </div>
              </div>
              <div className="hidden lg:flex flex-col items-center justify-center">
                <div className="w-40 md:w-48 h-40 md:h-48 bg-gray-200 rounded-xl md:rounded-2xl mb-3 md:mb-4 flex items-center justify-center">
                  <span className="text-gray-400 text-xs sm:text-sm">QR-код</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 text-center max-w-xs">
                  Наведите камеру телефона, чтобы отсканировать QR-код и скачать приложение
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="w-full lg:max-w-7xl lg:mx-auto px-3 sm:px-4 md:px-8 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-10 md:mb-12 text-center">
            Как это работает?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                number: "1",
                title: "Клиенты создают заказ",
                description: "Клиенты оставляют заявки на выполнение работ"
              },
              {
                number: "2",
                title: "Вы выбираете интересный заказ",
                description: "Просматривайте доступные заказы и выбирайте подходящие"
              },
              {
                number: "3",
                title: "Откликаетесь и договариваетесь",
                description: "Общайтесь с клиентом в чате, обсуждайте детали и цену"
              },
              {
                number: "4",
                title: "Выполняете заказ и получаете оплату",
                description: "Получайте оплату напрямую от клиента после выполнения"
              }
            ].map((step, idx) => (
              <div key={step.number} className="text-center">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-900 text-white ${idx === 0 ? 'rounded-2xl' : idx === 1 ? 'rounded-3xl' : idx === 2 ? 'rounded-xl' : 'rounded-full'} flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-3 sm:mb-4`}>
                  {step.number}
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tariffs Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="w-full lg:max-w-7xl lg:mx-auto px-3 sm:px-4 md:px-8 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-10 md:mb-12 text-center">
            Тарифы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-200 p-4 sm:p-6 md:p-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 flex items-center justify-center">
                <span className="text-2xl sm:text-3xl">💥</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                Плата за отклик
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                Вы платите сразу, за предложение услуг клиенту. Других платежей нет, но не каждый отклик приводит к заказу. Для первого заказа обычно нужно 7-10 откликов
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 md:p-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-100 rounded-xl sm:rounded-2xl md:rounded-3xl mb-4 sm:mb-6 flex items-center justify-center">
                <span className="text-2xl sm:text-3xl">💰</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                Комиссия за заказ
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                Вы платите потом, если получите заказ. Откликнуться можно бесплатно. Тариф откроется после 10 платных откликов. Доступен репетиторам, тренерам, психологам и автоинструкторам
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Promotion Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="w-full lg:max-w-7xl lg:mx-auto px-3 sm:px-4 md:px-8 lg:px-8">
          <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                  С приложением «Для профи» ещё удобнее
                </h2>
                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                  Заказы и чаты с клиентами всегда под рукой
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <div className="w-24 sm:w-28 md:w-32 h-8 sm:h-9 md:h-10 bg-gray-300 rounded-lg sm:rounded-xl"></div>
                  <div className="w-24 sm:w-28 md:w-32 h-8 sm:h-9 md:h-10 bg-gray-300 rounded-lg sm:rounded-xl"></div>
                  <div className="w-24 sm:w-28 md:w-32 h-8 sm:h-9 md:h-10 bg-gray-300 rounded-lg sm:rounded-xl"></div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-40 sm:w-48 md:w-56 lg:w-48 h-64 sm:h-80 md:h-96 bg-gray-200 rounded-2xl sm:rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="w-full lg:max-w-7xl lg:mx-auto px-3 sm:px-4 md:px-8 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-10 md:mb-12 text-center">
            Отзывы специалистов о Мебельщики
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                name: "Иван Петров",
                profession: "мастер по ремонту",
                review: "Отличная платформа! Много заказов, удобный интерфейс. Клиенты серьезные, оплата всегда вовремя."
              },
              {
                name: "Мария Сидорова",
                profession: "мастер красоты",
                review: "Работаю уже полгода, очень довольна. Заказы приходят регулярно, можно выбрать подходящие по цене и расположению."
              },
              {
                name: "Алексей Калиев",
                profession: "мебельщик",
                review: "Удобное приложение, все заказы в одном месте. Чат с клиентами работает отлично, можно быстро договориться о деталях."
              }
            ].map((review, idx) => (
              <div key={idx} className={`bg-white ${idx === 0 ? 'rounded-xl sm:rounded-2xl' : idx === 1 ? 'rounded-xl sm:rounded-2xl md:rounded-3xl' : 'rounded-xl'} border border-gray-200 p-4 sm:p-6`}>
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 ${idx === 0 ? 'rounded-xl' : idx === 1 ? 'rounded-xl sm:rounded-2xl' : 'rounded-full'} flex-shrink-0`}></div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{review.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">{review.profession}</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-700">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="w-full lg:max-w-7xl lg:mx-auto px-3 sm:px-4 md:px-8 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-10 md:mb-12 gap-4 sm:gap-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              Остались вопросы? Сейчас расскажем
            </h2>
            <button className="w-full sm:w-auto bg-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:opacity-90 transition-colors font-medium text-sm sm:text-base">
              Зарегистрироваться
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              "Зачем нам платить?",
              "Клиенты настоящие?",
              "Как быстро приходят заказы?",
              "Можно ли работать без приложения?",
              "Как происходит оплата?",
              "Что делать при конфликте с клиентом?",
              "Можно ли отменить отклик?",
              "Как повысить рейтинг?",
              "Есть ли комиссия?"
            ].map((question, idx) => (
              <button
                key={idx}
                className={`text-left p-3 sm:p-4 border border-gray-200 ${idx % 3 === 0 ? 'rounded-xl sm:rounded-2xl' : idx % 3 === 1 ? 'rounded-xl' : 'rounded-xl sm:rounded-2xl md:rounded-3xl'} hover:border-gray-300 hover:bg-gray-50 transition-colors text-sm sm:text-base`}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Counter Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="w-full lg:max-w-7xl lg:mx-auto px-3 sm:px-4 md:px-8 lg:px-8 text-center">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4">
            18 934 862
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            клиента доверили дела профи
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 sm:py-12">
        <div className="w-full lg:max-w-7xl lg:mx-auto px-3 sm:px-4 md:px-8 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <Link href="/" className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 block">
                Мебельщики
              </Link>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Клиентам</h3>
              <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                <li><Link href="/" className="hover:text-gray-900">Как это работает</Link></li>
                <li><Link href="/" className="hover:text-gray-900">Помощь</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Специалистам</h3>
              <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                <li><Link href="/login-specialist" className="hover:text-gray-900">Вход для специалистов</Link></li>
                <li><Link href="/" className="hover:text-gray-900">Тарифы</Link></li>
                <li><Link href="/" className="hover:text-gray-900">Помощь</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Компания</h3>
              <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                <li><Link href="/" className="hover:text-gray-900">О нас</Link></li>
                <li><Link href="/" className="hover:text-gray-900">Контакты</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-gray-600 text-xs sm:text-sm">
              © Мебельщики, 2024-2025
            </p>
            <div className="flex gap-3 sm:gap-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-lg sm:rounded-xl"></div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-lg sm:rounded-xl md:rounded-2xl"></div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-lg sm:rounded-xl"></div>
            </div>
          </div>
        </div>
      </footer>
      <Footer />
    </div>
  );
}
