"use client";

import Link from "next/link";
import { useState, use } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useTranslation } from "../../i18n/useTranslation";
import { getUserType, type UserType } from "../../utils/auth";
import { useEffect } from "react";

interface ResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  vacancyId: number;
  vacancyPosition: string;
}

function ResponseModal({ isOpen, onClose, vacancyId, vacancyPosition }: ResponseModalProps) {
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
    console.log("Отклик отправлен:", { vacancyId, name, phone });
    alert("Отклик успешно отправлен!");
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
            {t("vacancies.respondToVacancy")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={t("common.close")}
          >
            <span className="text-2xl">×</span>
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          {vacancyPosition}
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
              {t("vacancies.sendResponse")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function VacancyDetail({ params }: { params: Promise<{ id: string }> }) {
  const { t } = useTranslation();
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const [userType, setUserType] = useState<UserType>("guest");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleAuthChange = () => {
      setUserType(getUserType());
    };
    window.addEventListener("auth-change", handleAuthChange);
    handleAuthChange();
    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  // Моковые данные вакансий (в реальном приложении здесь будет запрос к API)
  const vacancies: any[] = [
    {
      id: 1,
      position: "Мебельщик",
      description: "Требуется опытный мебельщик для работы в мастерской. Изготовление корпусной мебели на заказ.",
      requirements: "Опыт работы от 3 лет, знание работы с МДФ, ЛДСП, массивом дерева",
      salary: "от 80 000 ₽",
      city: "Астана",
      specialistName: "Иван Петров",
      specialistId: 1,
      publishedAt: "15 января 2024",
      contactPhone: "+7 (999) 123-45-67"
    },
    {
      id: 2,
      position: "Сборщик мебели",
      description: "Ищем сборщика мебели для работы с выездом к клиентам. Сборка корпусной мебели, кухонь, шкафов.",
      requirements: "Опыт работы от 1 года, наличие инструментов, ответственность",
      salary: "от 60 000 ₽",
      city: "Алматы",
      specialistName: "Мария Сидорова",
      specialistId: 2,
      publishedAt: "14 января 2024",
      contactPhone: "+7 (999) 123-45-67"
    },
    {
      id: 3,
      position: "Мастер по ремонту мебели",
      description: "Требуется мастер для ремонта и реставрации мебели. Работа в мастерской и выезд к клиентам.",
      requirements: "Опыт работы от 2 лет, знание различных материалов и техник ремонта",
      salary: "от 70 000 ₽",
      city: "Астана",
      specialistName: "Алексей Козлов",
      specialistId: 3,
      publishedAt: "13 января 2024",
      contactPhone: "+7 (999) 123-45-67"
    }
  ];

  const vacancy = vacancies.find(v => v.id === parseInt(id));

  if (!vacancy) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header activePage="/vacancies" />
        <main className="w-full lg:max-w-7xl lg:mx-auto px-3 sm:px-4 md:px-8 lg:px-8 py-6 sm:py-8">
          <Link href="/vacancies" className="text-primary hover:underline mb-6 inline-block text-sm sm:text-base">
            {t("vacancies.backToVacancies")}
          </Link>
          <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-12 text-center">
            <p className="text-gray-600">{t("vacancies.noVacancies")}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header activePage="/vacancies" />

      <main className="w-full lg:max-w-4xl lg:mx-auto px-3 sm:px-4 md:px-8 lg:px-8 py-6 sm:py-8">
        <Link href="/vacancies" className="text-primary hover:underline mb-6 inline-block text-sm sm:text-base">
          {t("vacancies.backToVacancies")}
        </Link>

        <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{vacancy.position}</h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600">
                <span>{vacancy.city}</span>
                <span className="hidden sm:inline">•</span>
                <span>{vacancy.publishedAt}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 mb-6 p-3 sm:p-4 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-xl flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <Link
                href={`/master/${vacancy.specialistId}`}
                className="font-semibold text-gray-900 hover:text-primary block truncate"
              >
                {vacancy.specialistName}
              </Link>
              <p className="text-sm text-gray-500">{vacancy.city}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{t("vacancies.description")}</h2>
            <p className="text-gray-700 whitespace-pre-line">{vacancy.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{t("vacancies.requirements")}</h2>
            <p className="text-gray-700 whitespace-pre-line">{vacancy.requirements}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">{t("vacancies.salary")}</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">{vacancy.salary}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">{t("vacancies.city")}</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">{vacancy.city}</p>
            </div>
          </div>

          {userType !== "specialist" && (
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition-colors font-medium"
              >
                {t("vacancies.respond")}
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <ResponseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vacancyId={vacancy.id}
        vacancyPosition={vacancy.position}
      />
    </div>
  );
}

