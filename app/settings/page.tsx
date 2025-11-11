"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика сохранения настроек
    console.log("Сохранение настроек", notifications);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header userType="guest" activePage="/settings" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Настройки</h1>

        <div className="space-y-6">
          {/* Уведомления */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Уведомления</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                <span className="text-gray-700">Email уведомления</span>
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                  className="rounded"
                />
              </label>
              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                <span className="text-gray-700">SMS уведомления</span>
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                  className="rounded"
                />
              </label>
              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                <span className="text-gray-700">Push уведомления</span>
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                  className="rounded"
                />
              </label>
              <button
                type="submit"
                className="w-full bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition-colors font-medium mt-4"
              >
                Сохранить настройки
              </button>
            </form>
          </div>

          {/* Безопасность */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Безопасность</h2>
            <div className="space-y-3">
              <Link
                href="/reset-password"
                className="block p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-900 font-medium">Изменить пароль</span>
              </Link>
              <button className="w-full text-left p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-red-600 font-medium">
                Удалить аккаунт
              </button>
            </div>
          </div>

          {/* Помощь */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Помощь</h2>
            <div className="space-y-3">
              <Link
                href="/help"
                className="block p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-900 font-medium">Часто задаваемые вопросы</span>
              </Link>
              <Link
                href="/about"
                className="block p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-900 font-medium">О нас</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

