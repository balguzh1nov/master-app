"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "../i18n/useTranslation";

interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  image?: string;
  video?: string;
  tags: string[];
  publishedAt: string;
}

export default function KnowledgeBase() {
  const { t } = useTranslation();

  // Моковые данные статей
  const articles: Article[] = [
    {
      id: "1",
      slug: "kak-nachat-rabotu-na-platforme",
      title: "Как начать работу на платформе",
      description: "Пошаговое руководство для новичков: регистрация, заполнение профиля, первые заказы",
      category: "Для новичков",
      readTime: "5 мин",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop",
      tags: ["начало работы", "регистрация", "профиль"],
      publishedAt: "15 января 2024"
    },
    {
      id: "2",
      slug: "kak-sozdat-kachestvennyy-profil",
      title: "Как создать качественный профиль",
      description: "Советы по оформлению профиля, добавлению портфолио и привлечению клиентов",
      category: "Для специалистов",
      readTime: "7 мин",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      tags: ["профиль", "портфолио", "маркетинг"],
      publishedAt: "12 января 2024"
    },
    {
      id: "3",
      slug: "osnovy-raboty-s-klientami",
      title: "Основы работы с клиентами",
      description: "Как правильно общаться с клиентами, договариваться о цене и условиях работы",
      category: "Для специалистов",
      readTime: "10 мин",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      tags: ["коммуникация", "клиенты", "переговоры"],
      publishedAt: "10 января 2024"
    },
    {
      id: "4",
      slug: "kak-nayti-podkhodyashchiy-zakaz",
      title: "Как найти подходящий заказ",
      description: "Рекомендации по выбору заказов, оценке сложности и планированию работы",
      category: "Для специалистов",
      readTime: "6 мин",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
      tags: ["заказы", "планирование", "выбор"],
      publishedAt: "8 января 2024"
    },
    {
      id: "5",
      slug: "pravilnoe-oformlenie-zayavki",
      title: "Правильное оформление заявки",
      description: "Как клиенту правильно описать задачу, указать бюджет и сроки для получения качественных откликов",
      category: "Для клиентов",
      readTime: "4 мин",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
      tags: ["заявка", "клиенты", "описание"],
      publishedAt: "5 января 2024"
    },
    {
      id: "6",
      slug: "bezopasnost-i-zashchita",
      title: "Безопасность и защита",
      description: "Как защитить себя от мошенников, правильно оформлять договоры и получать оплату",
      category: "Безопасность",
      readTime: "8 мин",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
      tags: ["безопасность", "договоры", "оплата"],
      publishedAt: "3 января 2024"
    }
  ];

  const categories = ["Все", "Для новичков", "Для специалистов", "Для клиентов", "Безопасность"];
  const [selectedCategory, setSelectedCategory] = useState("Все");

  const filteredArticles = selectedCategory === "Все" 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header activePage="/knowledge-base" />

      <main className="w-full lg:max-w-7xl lg:mx-auto px-3 sm:px-4 md:px-8 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            {t("knowledgeBase.title")}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            {t("knowledgeBase.subtitle")}
          </p>
        </div>

        {/* Фильтр по категориям */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm sm:text-base font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Список статей */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredArticles.map((article, idx) => {
            const radiusClasses = ['rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-xl', 'rounded-2xl', 'rounded-xl'];
            return (
              <Link
                key={article.id}
                href={`/knowledge-base/${article.slug}`}
                className={`bg-white border border-gray-200 ${radiusClasses[idx]} overflow-hidden hover:shadow-lg transition-all duration-300 group`}
              >
                {article.image && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                    {article.video && (
                      <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-lg text-xs">
                        Видео
                      </div>
                    )}
                  </div>
                )}
                {article.video && !article.image && (
                  <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-lg text-xs">
                      Видео
                    </div>
                  </div>
                )}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs sm:text-sm px-2 py-1 bg-blue-50 text-blue-700 rounded-lg font-medium">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">{article.readTime}</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    {article.description.length > 120 ? `${article.description.substring(0, 120)}...` : article.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{article.publishedAt}</span>
                    <span className="text-primary text-sm font-medium group-hover:underline">
                      {t("knowledgeBase.readMore")} →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredArticles.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-12 text-center">
            <p className="text-gray-600">{t("knowledgeBase.noArticles")}</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

