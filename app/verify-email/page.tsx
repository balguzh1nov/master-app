"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function VerifyEmail() {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика проверки кода
    console.log("Проверка кода:", code);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header userType="guest" />

      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Подтверждение email
            </h1>
            <p className="text-gray-600 mb-6">
              Мы отправили код подтверждения на ваш email. Введите код для завершения регистрации.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Введите код"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg text-center tracking-widest"
                  maxLength={6}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary text-white px-6 py-4 rounded-xl hover:opacity-90 transition-colors font-semibold text-lg"
              >
                Подтвердить
              </button>
            </form>

            <div className="mt-4 text-center">
              <button className="text-primary hover:opacity-80 underline text-sm">
                Отправить код повторно
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

