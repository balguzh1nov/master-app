"use client";

import Link from "next/link";
import { useState, use } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function CreateReviewClient({ params }: { params: Promise<{ requestId: string }> }) {
  const { requestId } = use(params);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Здесь будет логика отправки отзыва о клиенте
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header userType="specialist" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-8">
        <Link href="/requests" className="text-primary hover:underline mb-6 inline-block">
          ← Назад к заявкам
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Оставить отзыв о клиенте</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Оценка клиента
              </label>
              <div className="flex gap-1 sm:gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-3xl sm:text-4xl focus:outline-none"
                  >
                    <span className={star <= rating ? 'text-yellow-500' : 'text-gray-300'}>
                      ★
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Текст отзыва
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
                placeholder="Расскажите о вашем опыте работы с клиентом..."
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Link
                href="/requests"
                className="w-full sm:flex-1 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium text-center"
              >
                Отмена
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:flex-1 bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition-colors font-medium disabled:opacity-50"
              >
                {isSubmitting ? "Отправка..." : "Отправить отзыв"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

