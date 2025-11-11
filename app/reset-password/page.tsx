"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "code" | "new">("email");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("code");
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("new");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }
    // Здесь будет логика сброса пароля
    console.log("Сброс пароля для", email);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header userType="guest" />

      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Восстановление пароля
            </h1>
            
            {step === "email" && (
              <>
                <p className="text-gray-600 mb-6">
                  Введите email, на который мы отправим код для восстановления пароля.
                </p>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary text-white px-6 py-4 rounded-xl hover:opacity-90 transition-colors font-semibold text-lg"
                  >
                    Отправить код
                  </button>
                </form>
              </>
            )}

            {step === "code" && (
              <>
                <p className="text-gray-600 mb-6">
                  Мы отправили код на {email}. Введите его ниже.
                </p>
                <form onSubmit={handleCodeSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Введите код"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg text-center tracking-widest"
                    maxLength={6}
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary text-white px-6 py-4 rounded-xl hover:opacity-90 transition-colors font-semibold text-lg"
                  >
                    Подтвердить
                  </button>
                </form>
                <button
                  onClick={() => setStep("email")}
                  className="mt-4 text-primary hover:opacity-80 underline text-sm w-full"
                >
                  Изменить email
                </button>
              </>
            )}

            {step === "new" && (
              <>
                <p className="text-gray-600 mb-6">
                  Введите новый пароль.
                </p>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Новый пароль"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                    required
                  />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Подтвердите пароль"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary text-white px-6 py-4 rounded-xl hover:opacity-90 transition-colors font-semibold text-lg"
                  >
                    Сохранить пароль
                  </button>
                </form>
              </>
            )}

            <div className="mt-6 text-center">
              <Link href="/login" className="text-primary hover:opacity-80 underline text-sm">
                Вернуться к входу
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

