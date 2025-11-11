"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { login } from "../utils/auth";

export default function Login() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [formattedPhone, setFormattedPhone] = useState("+7 (7");

  // Форматирование номера телефона (казахстанский формат)
  const formatPhoneNumber = (value: string) => {
    // Удаляем все нецифровые символы кроме +
    const numbers = value.replace(/[^\d]/g, "");
    
    if (numbers.length === 0) {
      return "+7 (7";
    }
    
    // Убираем первую 7 если есть
    const phoneNumbers = numbers.startsWith("7") 
      ? numbers.slice(1) 
      : numbers;
    
    let formatted = "+7 (";
    
    if (phoneNumbers.length > 0) {
      formatted += phoneNumbers.slice(0, 3); // Первые 3 цифры (код оператора, например 777)
    }
    
    if (phoneNumbers.length >= 4) {
      formatted += ") " + phoneNumbers.slice(3, 6);
    }
    
    if (phoneNumbers.length >= 7) {
      formatted += "-" + phoneNumbers.slice(6, 8);
    }
    
    if (phoneNumbers.length >= 9) {
      formatted += "-" + phoneNumbers.slice(8, 10);
    }
    
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Если пользователь удаляет символы, обрабатываем это
    if (value.length < formattedPhone.length) {
      // Удаляем последнюю цифру из форматированного номера
      const numbers = formattedPhone.replace(/[^\d]/g, "");
      const newNumbers = numbers.slice(0, -1);
      const formatted = formatPhoneNumber(newNumbers);
      setFormattedPhone(formatted);
      setPhone(newNumbers.length > 0 ? `+7${newNumbers}` : "");
      return;
    }
    
    const formatted = formatPhoneNumber(value);
    setFormattedPhone(formatted);
    
    // Сохраняем только цифры для отправки
    const numbers = value.replace(/[^\d]/g, "");
    const phoneNumbers = numbers.startsWith("7") 
      ? numbers.slice(1) 
      : numbers;
    setPhone(phoneNumbers.length > 0 ? `+7${phoneNumbers}` : "");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Разрешаем удаление, backspace, tab, escape, enter
    if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
      // Разрешаем Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode === 88 && e.ctrlKey === true) ||
      // Разрешаем home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      return;
    }
    // Запрещаем все кроме цифр
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 11) {
      return;
    }
    // Моковая авторизация
    login({
      type: "specialist",
      phone: phone || formattedPhone,
      name: "Специалист"
    });
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header userType="guest" activePage="/login" />

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Вход
            </h1>
            <p className="text-gray-600 mb-6">
              Введите номер телефона для входа в систему
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Номер телефона
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={formattedPhone}
                    onChange={handlePhoneChange}
                    onKeyDown={handleKeyDown}
                    placeholder=""
                    maxLength={18}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg bg-transparent relative z-10"
                    required
                  />
                  {formattedPhone === "+7 (7" && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-lg text-gray-400 z-0">
                      +7 (<span className="text-gray-300">777</span>) <span className="text-gray-300">123</span>-<span className="text-gray-300">45</span>-<span className="text-gray-300">67</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Введите 10 цифр номера телефона
                </p>
              </div>
              
              <button
                type="submit"
                disabled={phone.length < 11}
                className="w-full bg-primary text-white px-6 py-4 rounded-xl hover:opacity-90 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Войти
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/register-specialist"
                className="w-full bg-white border-2 border-primary text-primary px-6 py-4 rounded-xl hover:bg-blue-50 transition-colors font-semibold text-lg flex items-center justify-center gap-2"
              >
                Зарегистрироваться
              </Link>
              <p className="text-xs text-gray-500 text-center mt-2">
                После регистрации вы заполните профиль через удобный опросник
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

