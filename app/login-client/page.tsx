"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LoginClient() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки кода
    console.log("Отправка кода на", email);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header userType="guest" activePage="/login-client" />

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Вход и регистрация
            </h1>
            <p className="text-gray-600 mb-6">
              Специалисты не видят ваш номер. Вы сами решите, кому он будет доступен.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gray-900 text-white px-6 py-4 rounded-xl hover:opacity-90 transition-colors font-semibold text-lg"
              >
                Войти
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/register-client"
                className="w-full bg-primary text-white px-6 py-4 rounded-xl hover:opacity-90 transition-colors font-semibold text-lg flex items-center justify-center gap-2"
              >
                Зарегистрироваться
              </Link>
              <p className="text-xs text-gray-500 text-center mt-2">
                После регистрации вы пройдёте короткий опрос для подбора специалистов
              </p>
            </div>
          </div>

          <div className="mt-6 text-center space-y-2">
            <Link
              href="/login-specialist-email"
              className="text-primary hover:opacity-80 underline inline-flex items-center gap-1 block"
            >
              Вход для специалистов →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

