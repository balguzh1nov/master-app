"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { login } from "../utils/auth";

export default function LoginSpecialist() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Моковая авторизация
    login({
      type: "specialist",
      phone: phone || "+7 (999) 123-45-67",
      name: "Специалист"
    });
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header userType="guest" activePage="/login-specialist" />

      {/* Hero Section */}
      <section className="bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="text-center lg:text-left space-y-6">
              <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-2">
                Для специалистов
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Зарабатывайте на том, что умеете
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-xl mx-auto lg:mx-0">
                Более 500 000 заказов в месяц в приложении «Для профи»
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Без комиссии</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Мгновенные выплаты</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end relative">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-blue-100 rounded-3xl transform rotate-3"></div>
                <Image
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
                  alt="Специалист за работой"
                  width={600}
                  height={450}
                  className="relative rounded-3xl shadow-2xl object-cover w-full h-auto"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-blue-50 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-6">
              <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                        Начните зарабатывать уже сегодня
                </h2>
                      <p className="text-gray-600 text-base sm:text-lg">
                  Отправим СМС с кодом подтверждения. Присылать рекламу не будем
                </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Быстрая регистрация</p>
                          <p className="text-sm text-gray-600">Заполните профиль за 5 минут</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                  <div>
                          <p className="font-medium text-gray-900">Мгновенный доступ</p>
                          <p className="text-sm text-gray-600">Начните получать заказы сразу</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8 lg:p-12">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Номер телефона
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                          <span className="text-xl">🇷🇺</span>
                          <span className="text-gray-500 font-medium">+7</span>
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                          placeholder="(999) 123-45-67"
                          className="w-full pl-20 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition-all"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                      className="w-full bg-gray-900 text-white px-6 py-3.5 rounded-xl hover:bg-gray-800 transition-colors font-semibold text-base shadow-lg hover:shadow-xl"
                  >
                    Войти
                  </button>
                </form>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                  <Link
                    href="/register-specialist"
                      className="w-full bg-blue-600 text-white px-6 py-3.5 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    Зарегистрироваться
                  </Link>
                    <p className="text-xs text-gray-500 text-center mt-3">
                    После регистрации вы заполните профиль через удобный опросник
                  </p>
                </div>
                  <div className="mt-6 text-center">
                  <Link
                    href="/login-specialist-email"
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                  >
                      Войти по email →
                  </Link>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-50">
        <div className="w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Как это работает?
          </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Простой процесс от регистрации до получения оплаты
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {[
              {
                number: "1",
                title: "Клиенты создают заказ",
                description: "Клиенты оставляют заявки на выполнение работ",
                icon: "📝"
              },
              {
                number: "2",
                title: "Вы выбираете интересный заказ",
                description: "Просматривайте доступные заказы и выбирайте подходящие",
                icon: "🔍"
              },
              {
                number: "3",
                title: "Откликаетесь и договариваетесь",
                description: "Общайтесь с клиентом в чате, обсуждайте детали и цену",
                icon: "💬"
              },
              {
                number: "4",
                title: "Выполняете заказ и получаете оплату",
                description: "Получайте оплату напрямую от клиента после выполнения",
                icon: "💰"
              }
            ].map((step, idx) => (
              <div key={step.number} className="relative">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 bg-blue-600 text-white ${idx === 0 ? 'rounded-2xl' : idx === 1 ? 'rounded-3xl' : idx === 2 ? 'rounded-xl' : 'rounded-full'} flex items-center justify-center text-2xl font-bold shadow-lg`}>
                  {step.number}
                </div>
                    <div className="text-3xl">{step.icon}</div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                  <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
                </div>
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tariffs Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Выберите удобный тариф
          </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Прозрачные условия без скрытых платежей
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-orange-50 rounded-2xl border-2 border-orange-200 p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl mb-6 flex items-center justify-center shadow-lg">
                <span className="text-3xl">💥</span>
              </div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-3">
                  Популярный
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Плата за отклик
              </h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Вы платите сразу, за предложение услуг клиенту. Других платежей нет, но не каждый отклик приводит к заказу. Для первого заказа обычно нужно 7-10 откликов
              </p>
              <div className="pt-6 border-t border-orange-200">
                <p className="text-sm text-gray-600">✓ Оплата только за отклик</p>
                <p className="text-sm text-gray-600 mt-2">✓ Без комиссии с заказа</p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-2xl border-2 border-blue-200 p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl mb-6 flex items-center justify-center shadow-lg">
                <span className="text-3xl">💰</span>
              </div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-3">
                  Для некоторых категорий
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Комиссия за заказ
              </h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Вы платите потом, если получите заказ. Откликнуться можно бесплатно. Тариф откроется после 10 платных откликов. Доступен репетиторам, тренерам, психологам и автоинструкторам
              </p>
              <div className="pt-6 border-t border-blue-200">
                <p className="text-sm text-gray-600">✓ Бесплатные отклики</p>
                <p className="text-sm text-gray-600 mt-2">✓ Комиссия только с выполненного заказа</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Promotion Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-blue-600">
        <div className="w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                  С приложением «Для профи» ещё удобнее
                </h2>
              <p className="text-xl text-blue-100 mb-8">
                  Заказы и чаты с клиентами всегда под рукой
                </p>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="inline-block">
                  <Image
                    src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&releaseDate=1288569600"
                    alt="Download on App Store"
                    width={150}
                    height={50}
                    className="h-12 w-auto opacity-90 hover:opacity-100 transition-opacity"
                    unoptimized
                  />
                </a>
                <a href="#" className="inline-block">
                  <Image
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                    alt="Get it on Google Play"
                    width={150}
                    height={50}
                    className="h-12 w-auto opacity-90 hover:opacity-100 transition-opacity"
                    unoptimized
                  />
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-3xl transform rotate-6"></div>
                <Image
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=800&fit=crop"
                  alt="Мобильное приложение"
                  width={300}
                  height={600}
                  className="relative rounded-3xl shadow-2xl w-48 sm:w-64 md:w-72"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-50">
        <div className="w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Отзывы специалистов
            </h2>
            <p className="text-lg text-gray-600">
              Более 50 000 специалистов уже работают с нами
            </p>
          </div>
          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-6 min-w-max md:min-w-0 md:grid md:grid-cols-3">
              {[
                {
                  name: "Иван Петров",
                  profession: "мастер по ремонту",
                  review: "Отличная платформа! Много заказов, удобный интерфейс. Клиенты серьезные, оплата всегда вовремя.",
                  rating: 5,
                  avatar: "https://i.pravatar.cc/150?img=12",
                  date: "2 недели назад"
                },
                {
                  name: "Мария Сидорова",
                  profession: "мастер красоты",
                  review: "Работаю уже полгода, очень довольна. Заказы приходят регулярно, можно выбрать подходящие по цене и расположению.",
                  rating: 5,
                  avatar: "https://i.pravatar.cc/150?img=47",
                  date: "месяц назад"
                },
                {
                  name: "Алексей Калиев",
                  profession: "мебельщик",
                  review: "Удобное приложение, все заказы в одном месте. Чат с клиентами работает отлично, можно быстро договориться о деталях.",
                  rating: 5,
                  avatar: "https://i.pravatar.cc/150?img=33",
                  date: "3 недели назад"
                }
              ].map((review, idx) => (
                <div key={idx} className={`bg-white ${idx === 0 ? 'rounded-2xl' : idx === 1 ? 'rounded-3xl' : 'rounded-2xl'} border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow min-w-[320px] md:min-w-0`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        width={40}
                        height={40}
                        className={`w-10 h-10 ${idx === 0 ? 'rounded-xl' : idx === 1 ? 'rounded-2xl' : 'rounded-full'} object-cover flex-shrink-0`}
                        unoptimized
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900 text-sm truncate">{review.name}</p>
                        <p className="text-xs text-gray-500 truncate">{review.profession}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 flex-shrink-0 ml-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">{review.review}</p>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Остались вопросы?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Мы ответим на все ваши вопросы
            </p>
            <Link
              href="/register-specialist"
              className="inline-block bg-blue-600 text-white px-8 py-3.5 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-base shadow-lg hover:shadow-xl"
            >
              Зарегистрироваться
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
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
                className={`text-left p-5 bg-gray-50 border-2 border-transparent ${idx % 3 === 0 ? 'rounded-2xl' : idx % 3 === 1 ? 'rounded-xl' : 'rounded-3xl'} hover:border-blue-200 hover:bg-blue-50 transition-all text-base font-medium text-gray-900 shadow-sm hover:shadow-md`}
              >
                <div className="flex items-center justify-between">
                  <span>{question}</span>
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Counter Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="bg-gray-900 rounded-3xl p-12 sm:p-16 text-center text-white shadow-2xl">
            <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4">
            18 934 862
          </div>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300">
            клиента доверили дела профи
          </p>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
                <div className="text-3xl sm:text-4xl font-bold mb-2">500K+</div>
                <div className="text-gray-400 text-sm sm:text-base">Заказов в месяц</div>
            </div>
            <div>
                <div className="text-3xl sm:text-4xl font-bold mb-2">50K+</div>
                <div className="text-gray-400 text-sm sm:text-base">Специалистов</div>
            </div>
            <div>
                <div className="text-3xl sm:text-4xl font-bold mb-2">4.9</div>
                <div className="text-gray-400 text-sm sm:text-base">Средний рейтинг</div>
            </div>
            <div>
                <div className="text-3xl sm:text-4xl font-bold mb-2">24/7</div>
                <div className="text-gray-400 text-sm sm:text-base">Поддержка</div>
          </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
