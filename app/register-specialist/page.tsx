"use client";

import { useState } from "react";
import { categories } from "../data/categories";

interface FormData {
  name: string;
  categories: string[];
  subcategories: string[];
  experience: string;
  description: string;
  priceFrom: string;
  priceTo: string;
  city: string;
  serviceArea: string[];
  portfolio: string[];
}

const steps = [
  { id: 1, title: "Детали профиля", icon: "👤" },
  { id: 2, title: "Специализация", icon: "🪑" },
  { id: 3, title: "Опыт и услуги", icon: "💼" },
  { id: 4, title: "Цены и локация", icon: "📍" },
];

const serviceAreas = [
  "Выезд на дом",
  "Выезд в офис",
  "Работа в мастерской",
  "Доставка и установка",
];

const cities = [
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

export default function RegisterSpecialist() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    categories: [],
    subcategories: [],
    experience: "",
    description: "",
    priceFrom: "",
    priceTo: "",
    city: "",
    serviceArea: [],
    portfolio: [],
  });

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Здесь будет логика отправки данных
    // После успешной регистрации редирект на профиль
  };

  const toggleCategory = (categorySlug: string) => {
    const newCategories = formData.categories.includes(categorySlug)
      ? formData.categories.filter(c => c !== categorySlug)
      : [...formData.categories, categorySlug];
    setFormData({ ...formData, categories: newCategories });
  };

  const toggleSubcategory = (subcategorySlug: string) => {
    const newSubcategories = formData.subcategories.includes(subcategorySlug)
      ? formData.subcategories.filter(s => s !== subcategorySlug)
      : [...formData.subcategories, subcategorySlug];
    setFormData({ ...formData, subcategories: newSubcategories });
  };

  const toggleServiceArea = (area: string) => {
    const newAreas = formData.serviceArea.includes(area)
      ? formData.serviceArea.filter(a => a !== area)
      : [...formData.serviceArea, area];
    setFormData({ ...formData, serviceArea: newAreas });
  };

  const selectedCategories = categories.filter(cat => 
    formData.categories.includes(cat.slug)
  );

  return (
    <div className="min-h-screen bg-slate-100 flex relative">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="fixed left-4 top-4 z-30 bg-white px-4 py-3 rounded-xl shadow-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
        aria-label="Вернуться назад"
      >
        <span className="text-xl">←</span>
        <span className="text-sm font-medium text-gray-700">Вернуться назад</span>
      </button>


      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-[5]"
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <aside className={`md:hidden fixed left-0 top-0 bottom-0 w-72 bg-white shadow-2xl z-[15] transition-transform duration-300 ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full p-4 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-gray-900">Специалист</h1>
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Закрыть меню"
            >
              <span className="text-gray-600 text-xl">✕</span>
            </button>
          </div>
          
          <nav className="flex-1 space-y-1">
            {steps.map((step) => {
              const isActive = currentStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setCurrentStep(step.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all relative ${
                    isActive
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full"></div>
                  )}
                  <span className={`text-xl flex-shrink-0 ${
                    isActive ? "opacity-100" : "opacity-70"
                  }`}>
                    {step.icon}
                  </span>
                  <div className="flex-1 text-left">
                    <p className={`font-medium ${
                      isActive ? "text-blue-900" : "text-gray-700"
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {isActive && (
                    <span className="text-xs text-blue-600 font-medium flex-shrink-0">
                      {Math.round(progress)}%
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content Container */}
      <div className="flex-1 px-3 py-3 sm:px-4 sm:py-4 md:px-8 md:py-6 lg:px-12 lg:py-12 pt-20 md:pt-20">
        <div className="flex items-start gap-3 max-w-6xl mx-auto">
          {/* Desktop/Tablet Sidebar */}
          <aside className={`hidden md:block transition-all duration-300 ${
            isSidebarCollapsed ? 'w-20' : 'w-72'
          } flex-shrink-0`}>
            <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                {!isSidebarCollapsed && (
                  <h1 className="text-xl font-bold text-gray-900">Специалист</h1>
                )}
                <button
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className="ml-auto p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label={isSidebarCollapsed ? "Развернуть меню" : "Свернуть меню"}
                >
                  <span className="text-gray-600 text-lg">
                    {isSidebarCollapsed ? "→" : "←"}
                  </span>
                </button>
              </div>
              
              {/* Navigation */}
              <nav className="space-y-1">
                {steps.map((step) => {
                  const isActive = currentStep === step.id;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(step.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all relative ${
                        isActive
                          ? "bg-blue-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full"></div>
                      )}
                      
                      <span className={`text-xl flex-shrink-0 ${
                        isActive ? "opacity-100" : "opacity-70"
                      }`}>
                        {step.icon}
                      </span>
                      
                      {!isSidebarCollapsed && (
                        <>
                          <div className="flex-1 text-left">
                            <p className={`font-medium ${
                              isActive ? "text-blue-900" : "text-gray-700"
                            }`}>
                              {step.title}
                            </p>
                          </div>
                          {isActive && (
                            <span className="text-xs text-blue-600 font-medium flex-shrink-0">
                              {Math.round(progress)}%
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 transition-all duration-300">
            <div className="max-w-3xl">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8 lg:p-12">
              {/* Mobile Progress */}
              <div className="md:hidden mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Шаг {currentStep} из {steps.length}
                  </span>
                  <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mt-4">
                  {steps[currentStep - 1].title}
                </h2>
              </div>

              {/* Step 1: Profile Details */}
              {currentStep === 1 && (
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                    Как вас зовут?
                  </h1>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base">
                    Укажите ваше имя или название компании. Это имя увидят клиенты
                  </p>
                  
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Например: Иван Петров или ООО 'МебельМастер'"
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base md:text-lg mb-6 sm:mb-8"
                    autoFocus
                  />

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Опыт работы
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { value: "less-1", label: "Меньше года" },
                        { value: "1-3", label: "1-3 года" },
                        { value: "3-5", label: "3-5 лет" },
                        { value: "5+", label: "5+ лет" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, experience: option.value })}
                          className={`p-3 border-2 rounded-xl transition-all ${
                            formData.experience === option.value
                              ? "border-primary bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <span className="text-sm font-medium text-gray-900">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Specialization */}
              {currentStep === 2 && (
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                    В каких категориях вы работаете?
                  </h1>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base">
                    Выберите все категории, в которых у вас есть опыт. Можно выбрать несколько
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    {categories.map((category) => (
                      <button
                        key={category.slug}
                        type="button"
                        onClick={() => toggleCategory(category.slug)}
                        className={`p-4 border-2 rounded-xl text-left transition-all ${
                          formData.categories.includes(category.slug)
                            ? "border-primary bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{category.icon}</span>
                          <span className="font-semibold text-gray-900">{category.title}</span>
                        </div>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </button>
                    ))}
                  </div>

                  {selectedCategories.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Выберите подкатегории (необязательно)
                      </h3>
                      <div className="space-y-4">
                        {selectedCategories.map((category) => (
                          <div key={category.slug}>
                            <h4 className="font-medium text-gray-700 mb-2">{category.title}</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {category.subcategories.map((sub) => (
                                <button
                                  key={sub.slug}
                                  type="button"
                                  onClick={() => toggleSubcategory(sub.slug)}
                                  className={`p-2 border rounded-lg text-left transition-all text-sm ${
                                    formData.subcategories.includes(sub.slug)
                                      ? "border-primary bg-blue-50"
                                      : "border-gray-200 hover:border-gray-300"
                                  }`}
                                >
                                  <span className="text-gray-900">{sub.title}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Experience and Services */}
              {currentStep === 3 && (
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                    Расскажите о ваших услугах
                  </h1>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base">
                    Опишите, что вы умеете делать, какие материалы используете, ваш подход к работе
                  </p>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Описание услуг
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Опишите ваши услуги, опыт работы, используемые материалы, подход к работе. Чем подробнее, тем больше клиентов вас найдут..."
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Где вы работаете?
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {serviceAreas.map((area) => (
                          <button
                            key={area}
                            type="button"
                            onClick={() => toggleServiceArea(area)}
                            className={`p-3 border-2 rounded-xl transition-all ${
                              formData.serviceArea.includes(area)
                                ? "border-primary bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <span className="font-medium text-gray-900">{area}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Prices and Location */}
              {currentStep === 4 && (
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                    Укажите цены и локацию
                  </h1>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base">
                    Это поможет клиентам понять стоимость ваших услуг и возможность работы в их районе
                  </p>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Стоимость работ
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            От (₽)
                          </label>
                          <input
                            type="number"
                            value={formData.priceFrom}
                            onChange={(e) => setFormData({ ...formData, priceFrom: e.target.value })}
                            placeholder="5000"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            До (₽)
                          </label>
                          <input
                            type="number"
                            value={formData.priceTo}
                            onChange={(e) => setFormData({ ...formData, priceTo: e.target.value })}
                            placeholder="100000"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Можно указать примерный диапазон или оставить пустым
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Ваша локация
                      </h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Город
                        </label>
                        <select
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                        >
                          <option value="">Выберите город</option>
                          {cities.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  ← Назад
                </button>
                
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-white rounded-xl hover:opacity-90 transition-colors font-medium text-sm sm:text-base"
                >
                  {currentStep === steps.length ? "Завершить регистрацию →" : "Продолжить →"}
                </button>
              </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

