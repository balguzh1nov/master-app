"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { use } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useTranslation } from "../../i18n/useTranslation";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  specialistName: string;
}

function ContactModal({ isOpen, onClose, specialistName }: ContactModalProps) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [formattedPhone, setFormattedPhone] = useState("+7 (7");

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, "");
    if (numbers.length === 0) return "+7 (7";
    const phoneNumbers = numbers.startsWith("7") 
      ? numbers.slice(1) 
      : numbers;
    let formatted = "+7 (";
    if (phoneNumbers.length > 0) formatted += phoneNumbers.slice(0, 3);
    if (phoneNumbers.length >= 4) formatted += ") " + phoneNumbers.slice(3, 6);
    if (phoneNumbers.length >= 7) formatted += "-" + phoneNumbers.slice(6, 8);
    if (phoneNumbers.length >= 9) formatted += "-" + phoneNumbers.slice(8, 10);
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length < formattedPhone.length) {
      const numbers = formattedPhone.replace(/[^\d]/g, "");
      const newNumbers = numbers.slice(0, -1);
      const formatted = formatPhoneNumber(newNumbers);
      setFormattedPhone(formatted);
      setPhone(newNumbers.length > 0 ? `+7${newNumbers}` : "");
      return;
    }
    const formatted = formatPhoneNumber(value);
    setFormattedPhone(formatted);
    const numbers = value.replace(/[^\d]/g, "");
    const phoneNumbers = numbers.startsWith("7") 
      ? numbers.slice(1) 
      : numbers;
    setPhone(phoneNumbers.length > 0 ? `+7${phoneNumbers}` : "");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode === 88 && e.ctrlKey === true) ||
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 11 || !name.trim()) {
      return;
    }
    console.log("Запрос на связь отправлен:", { specialistName, name, phone });
    alert("Ваш запрос отправлен! Специалист свяжется с вами.");
    setName("");
    setPhone("");
    setFormattedPhone("+7 (7");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {t("master.contactWithSpecialist")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={t("common.close")}
          >
            <span className="text-2xl">×</span>
          </button>
        </div>

        <p className="text-gray-600 mb-2">
          {specialistName}
        </p>
        <p className="text-sm text-gray-500 mb-6">
          {t("master.contactDescription")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("vacancies.yourName")}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("vacancies.namePlaceholder")}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("vacancies.yourPhone")}
            </label>
            <div className="relative">
              <input
                type="tel"
                value={formattedPhone}
                onChange={handlePhoneChange}
                onKeyDown={handleKeyDown}
                placeholder=""
                maxLength={18}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-transparent relative z-10"
                required
              />
              {formattedPhone === "+7 (7" && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 z-0">
                  +7 (<span className="text-gray-300">777</span>) <span className="text-gray-300">123</span>-<span className="text-gray-300">45</span>-<span className="text-gray-300">67</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:flex-1 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700"
            >
              {t("common.cancel")}
            </button>
            <button
              type="submit"
              disabled={phone.length < 11 || !name.trim()}
              className="w-full sm:flex-1 px-4 py-3 bg-primary text-white rounded-xl hover:opacity-90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("master.contact")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function MasterProfile({ params }: { params: Promise<{ id: string }> }) {
  const { t } = useTranslation();
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [currentReviewImageIndex, setCurrentReviewImageIndex] = useState(0);
  
  const portfolioImages = [1, 2, 3, 4, 5, 6];
  // Все картинки из отзывов (по 2 картинки в каждом отзыве, всего 3 отзыва)
  const reviewImages = [1, 2, 3, 4, 5, 6];

  // Обработка клавиатуры для слайдера портфолио
  useEffect(() => {
    if (!isPortfolioModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPortfolioModalOpen(false);
      } else if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
      } else if (e.key === 'ArrowRight' && currentImageIndex < portfolioImages.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPortfolioModalOpen, currentImageIndex, portfolioImages.length]);

  // Обработка клавиатуры для слайдера отзывов
  useEffect(() => {
    if (!isReviewModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsReviewModalOpen(false);
      } else if (e.key === 'ArrowLeft' && currentReviewImageIndex > 0) {
        setCurrentReviewImageIndex(currentReviewImageIndex - 1);
      } else if (e.key === 'ArrowRight' && currentReviewImageIndex < reviewImages.length - 1) {
        setCurrentReviewImageIndex(currentReviewImageIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isReviewModalOpen, currentReviewImageIndex, reviewImages.length]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header userType="guest" />

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
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Астана</p>
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
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 bg-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:opacity-90 transition-colors font-medium text-center text-sm sm:text-base"
                >
                  {t("master.contact")}
                </button>
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Портфолио</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                {portfolioImages.map((item, idx) => {
                  const radiusClasses = ['rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-xl', 'rounded-2xl', 'rounded-3xl'];
                  return (
                    <button
                      key={item}
                      onClick={() => {
                        setCurrentImageIndex(idx);
                        setIsPortfolioModalOpen(true);
                      }}
                      className={`aspect-square bg-gray-200 ${radiusClasses[idx]} hover:opacity-80 transition-opacity cursor-pointer`}
                    ></button>
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
                      {[0, 1].map((imgIdx) => {
                        const globalIndex = (review - 1) * 2 + imgIdx;
                        return (
                          <button
                            key={imgIdx}
                            onClick={() => {
                              setCurrentReviewImageIndex(globalIndex);
                              setIsReviewModalOpen(true);
                            }}
                            className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gray-200 ${imgIdx === 0 ? 'rounded-xl' : 'rounded-2xl'} hover:opacity-80 transition-opacity cursor-pointer`}
                          ></button>
                        );
                      })}
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

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        specialistName="Иван Петров"
      />

      {/* Portfolio Modal with Slider */}
      {isPortfolioModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsPortfolioModalOpen(false)}
        >
          <div className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={() => setIsPortfolioModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
              aria-label="Закрыть"
            >
              <span className="text-3xl">×</span>
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (currentImageIndex > 0) {
                  setCurrentImageIndex(currentImageIndex - 1);
                }
              }}
              disabled={currentImageIndex === 0}
              className={`absolute left-2 sm:left-4 text-white transition-all z-10 bg-black bg-opacity-50 rounded-full p-2 sm:p-3 ${
                currentImageIndex > 0 
                  ? 'hover:text-gray-300 hover:bg-opacity-70 cursor-pointer' 
                  : 'opacity-30 cursor-not-allowed'
              }`}
              aria-label="Предыдущее фото"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Image */}
            <div 
              className="w-full h-full flex items-center justify-center px-12 sm:px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                key={currentImageIndex}
                className="bg-gray-200 rounded-xl max-w-full max-h-[90vh] w-full flex items-center justify-center transition-opacity duration-300"
                style={{ aspectRatio: '1/1', minHeight: '300px' }}
              >
                {/* Здесь будет изображение, пока заглушка */}
                <span className="text-gray-500 text-base sm:text-lg">Фото {currentImageIndex + 1}</span>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (currentImageIndex < portfolioImages.length - 1) {
                  setCurrentImageIndex(currentImageIndex + 1);
                }
              }}
              disabled={currentImageIndex === portfolioImages.length - 1}
              className={`absolute right-2 sm:right-4 text-white transition-all z-10 bg-black bg-opacity-50 rounded-full p-2 sm:p-3 ${
                currentImageIndex < portfolioImages.length - 1 
                  ? 'hover:text-gray-300 hover:bg-opacity-70 cursor-pointer' 
                  : 'opacity-30 cursor-not-allowed'
              }`}
              aria-label="Следующее фото"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 rounded-full px-4 py-2 text-sm">
              {currentImageIndex + 1} / {portfolioImages.length}
            </div>
          </div>
        </div>
      )}

      {/* Review Images Modal with Slider */}
      {isReviewModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsReviewModalOpen(false)}
        >
          <div className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
              aria-label="Закрыть"
            >
              <span className="text-3xl">×</span>
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (currentReviewImageIndex > 0) {
                  setCurrentReviewImageIndex(currentReviewImageIndex - 1);
                }
              }}
              disabled={currentReviewImageIndex === 0}
              className={`absolute left-2 sm:left-4 text-white transition-all z-10 bg-black bg-opacity-50 rounded-full p-2 sm:p-3 ${
                currentReviewImageIndex > 0 
                  ? 'hover:text-gray-300 hover:bg-opacity-70 cursor-pointer' 
                  : 'opacity-30 cursor-not-allowed'
              }`}
              aria-label="Предыдущее фото"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Image */}
            <div 
              className="w-full h-full flex items-center justify-center px-12 sm:px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                key={currentReviewImageIndex}
                className="bg-gray-200 rounded-xl max-w-full max-h-[90vh] w-full flex items-center justify-center transition-opacity duration-300"
                style={{ aspectRatio: '1/1', minHeight: '300px' }}
              >
                {/* Здесь будет изображение, пока заглушка */}
                <span className="text-gray-500 text-base sm:text-lg">Фото отзыва {currentReviewImageIndex + 1}</span>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (currentReviewImageIndex < reviewImages.length - 1) {
                  setCurrentReviewImageIndex(currentReviewImageIndex + 1);
                }
              }}
              disabled={currentReviewImageIndex === reviewImages.length - 1}
              className={`absolute right-2 sm:right-4 text-white transition-all z-10 bg-black bg-opacity-50 rounded-full p-2 sm:p-3 ${
                currentReviewImageIndex < reviewImages.length - 1 
                  ? 'hover:text-gray-300 hover:bg-opacity-70 cursor-pointer' 
                  : 'opacity-30 cursor-not-allowed'
              }`}
              aria-label="Следующее фото"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 rounded-full px-4 py-2 text-sm">
              {currentReviewImageIndex + 1} / {reviewImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

