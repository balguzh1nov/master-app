"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CityInput from "../../components/CityInput";
import { useTranslation } from "../../i18n/useTranslation";
import { getUserType, type UserType } from "../../utils/auth";
import { useEffect } from "react";

export default function CreateVacancy() {
  const { t } = useTranslation();
  const router = useRouter();
  const [userType, setUserType] = useState<UserType>("guest");
  const [formData, setFormData] = useState({
    position: "",
    description: "",
    requirements: "",
    salary: "",
    city: "",
    contactPhone: "",
  });
  const [formattedPhone, setFormattedPhone] = useState("+7 (7");

  useEffect(() => {
    const handleAuthChange = () => {
      setUserType(getUserType());
    };
    window.addEventListener("auth-change", handleAuthChange);
    handleAuthChange();
    
    // Редирект если не специалист
    if (getUserType() !== "specialist") {
      router.push("/login");
    }
    
    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, [router]);

  // Форматирование номера телефона (казахстанский формат)
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
      setFormData({ ...formData, contactPhone: newNumbers.length > 0 ? `+7${newNumbers}` : "" });
      return;
    }
    const formatted = formatPhoneNumber(value);
    setFormattedPhone(formatted);
    const numbers = value.replace(/[^\d]/g, "");
    const phoneNumbers = numbers.startsWith("7") 
      ? numbers.slice(1) 
      : numbers;
    setFormData({ ...formData, contactPhone: phoneNumbers.length > 0 ? `+7${phoneNumbers}` : "" });
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
    // Здесь будет отправка вакансии
    console.log("Вакансия создана:", formData);
    alert("Вакансия успешно опубликована!");
    router.push("/vacancies");
  };

  if (userType !== "specialist") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header activePage="/vacancies" />

      <main className="w-full lg:max-w-4xl lg:mx-auto px-3 sm:px-4 md:px-8 lg:px-8 py-6 sm:py-8">
        <Link href="/vacancies" className="text-primary hover:underline mb-6 inline-block text-sm sm:text-base">
          {t("vacancies.backToVacancies")}
        </Link>

        <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
            {t("vacancies.createVacancy")}
          </h1>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            {t("vacancies.createDescription")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("vacancies.position")} *
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                placeholder={t("vacancies.positionPlaceholder")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("vacancies.description")} *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={t("vacancies.descriptionPlaceholder")}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("vacancies.requirements")} *
              </label>
              <textarea
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder={t("vacancies.requirementsPlaceholder")}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("vacancies.salary")} *
                </label>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  placeholder={t("vacancies.salaryPlaceholder")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("vacancies.city")} *
                </label>
                <CityInput
                  value={formData.city}
                  onChange={(value) => setFormData({ ...formData, city: value })}
                  placeholder={t("register.selectCity")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("vacancies.contactPhone")} *
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

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t border-gray-200">
              <Link
                href="/vacancies"
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700 text-center text-sm sm:text-base"
              >
                {t("common.cancel")}
              </Link>
              <button
                type="submit"
                className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-white rounded-xl hover:opacity-90 transition-colors font-medium text-sm sm:text-base"
              >
                {t("vacancies.publish")}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

