"use client";

import Link from "next/link";
import Image from "next/image";
import { use } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useTranslation } from "../../i18n/useTranslation";

interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  readTime: string;
  image?: string;
  video?: string;
  tags: string[];
  publishedAt: string;
  author?: string;
}

export default function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { t } = useTranslation();
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  // Моковые данные статей с полным контентом
  const articles: Article[] = [
    {
      id: "1",
      slug: "kak-nachat-rabotu-na-platforme",
      title: "Как начать работу на платформе",
      description: "Пошаговое руководство для новичков: регистрация, заполнение профиля, первые заказы",
      content: `# Как начать работу на платформе

Добро пожаловать на платформу "Мебельщики"! Это руководство поможет вам быстро начать работу.

## Шаг 1: Регистрация

Первым делом вам нужно зарегистрироваться на платформе. Перейдите на страницу регистрации и заполните необходимые данные:
- Ваше имя или название компании
- Номер телефона или email
- Пароль

## Шаг 2: Заполнение профиля

После регистрации важно заполнить профиль:
- Добавьте фото профиля
- Опишите ваши услуги и опыт работы
- Выберите категории работ
- Укажите город и район работы
- Добавьте портфолио с фотографиями ваших работ

## Шаг 3: Первые заказы

Когда профиль готов, вы можете начать искать заказы:
- Просматривайте доступные заявки в разделе "Заявки"
- Выбирайте подходящие по категории и расположению
- Откликайтесь на интересующие заявки
- Общайтесь с клиентами в чате

## Полезные советы

- Чем полнее профиль, тем больше доверия у клиентов
- Регулярно обновляйте портфолио новыми работами
- Отвечайте на сообщения клиентов оперативно
- Соблюдайте сроки выполнения работ`,
      category: "Для новичков",
      readTime: "5 мин",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop",
      tags: ["начало работы", "регистрация", "профиль"],
      publishedAt: "15 января 2024",
      author: "Команда платформы"
    },
    {
      id: "2",
      slug: "kak-sozdat-kachestvennyy-profil",
      title: "Как создать качественный профиль",
      description: "Советы по оформлению профиля, добавлению портфолио и привлечению клиентов",
      content: `# Как создать качественный профиль

Качественный профиль - это ваш визитная карточка на платформе. Вот как сделать его привлекательным для клиентов.

## Фото профиля

Выберите качественное фото, которое:
- Хорошо вас представляет
- Имеет хорошее освещение
- Выглядит профессионально

## Описание услуг

В описании укажите:
- Ваш опыт работы
- Специализацию
- Используемые материалы
- Подход к работе
- Гарантии качества

## Портфолио

Добавьте лучшие работы в портфолио:
- Используйте качественные фотографии
- Показывайте разные типы работ
- Добавляйте описания к каждой работе
- Регулярно обновляйте портфолио

## Категории работ

Выберите все категории, в которых вы работаете. Это поможет клиентам найти вас при поиске.`,
      category: "Для специалистов",
      readTime: "7 мин",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      tags: ["профиль", "портфолио", "маркетинг"],
      publishedAt: "12 января 2024",
      author: "Команда платформы"
    },
    {
      id: "3",
      slug: "osnovy-raboty-s-klientami",
      title: "Основы работы с клиентами",
      description: "Как правильно общаться с клиентами, договариваться о цене и условиях работы",
      content: `# Основы работы с клиентами

Эффективная коммуникация с клиентами - ключ к успешной работе на платформе.

## Первый контакт

При первом контакте с клиентом:
- Представьтесь и расскажите о себе
- Проявите интерес к задаче клиента
- Задайте уточняющие вопросы
- Предложите решение

## Обсуждение цены

При обсуждении цены:
- Учитывайте сложность работы
- Уточняйте все детали
- Предлагайте варианты
- Будьте готовы к переговорам

## Согласование условий

Важно согласовать:
- Сроки выполнения
- Материалы и их стоимость
- Способ оплаты
- Гарантии

## После выполнения

После завершения работы:
- Убедитесь, что клиент доволен
- Попросите оставить отзыв
- Поддерживайте связь для будущих заказов`,
      category: "Для специалистов",
      readTime: "10 мин",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      tags: ["коммуникация", "клиенты", "переговоры"],
      publishedAt: "10 января 2024",
      author: "Команда платформы"
    },
    {
      id: "4",
      slug: "kak-nayti-podkhodyashchiy-zakaz",
      title: "Как найти подходящий заказ",
      description: "Рекомендации по выбору заказов, оценке сложности и планированию работы",
      content: `# Как найти подходящий заказ

Правильный выбор заказов поможет вам эффективно работать и получать хорошие отзывы.

## Критерии выбора

При выборе заказа учитывайте:
- Соответствие вашей специализации
- Расположение объекта
- Сложность работы
- Бюджет клиента
- Сроки выполнения

## Оценка сложности

Оцените:
- Объем работ
- Необходимые материалы
- Требуемые навыки
- Время на выполнение

## Планирование

После выбора заказа:
- Составьте план работы
- Подготовьте необходимые материалы
- Согласуйте сроки с клиентом
- Подготовьте инструменты`,
      category: "Для специалистов",
      readTime: "6 мин",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
      tags: ["заказы", "планирование", "выбор"],
      publishedAt: "8 января 2024",
      author: "Команда платформы"
    },
    {
      id: "5",
      slug: "pravilnoe-oformlenie-zayavki",
      title: "Правильное оформление заявки",
      description: "Как клиенту правильно описать задачу, указать бюджет и сроки для получения качественных откликов",
      content: `# Правильное оформление заявки

Хорошо оформленная заявка привлечет больше качественных специалистов.

## Описание задачи

В описании укажите:
- Что именно нужно сделать
- Размеры и параметры
- Предпочтения по материалам
- Особые требования
- Желаемый стиль

## Бюджет

Укажите реалистичный бюджет:
- Учитывайте сложность работы
- Исследуйте средние цены
- Оставляйте запас на материалы
- Указывайте диапазон, если не уверены

## Сроки

Укажите желаемые сроки:
- Когда нужно начать работу
- Когда нужно завершить
- Есть ли жесткие дедлайны
- Возможна ли гибкость

## Фотографии

Добавьте фотографии:
- Текущего состояния
- Примеров желаемого результата
- Особых деталей
- Размеров и планировки`,
      category: "Для клиентов",
      readTime: "4 мин",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
      tags: ["заявка", "клиенты", "описание"],
      publishedAt: "5 января 2024",
      author: "Команда платформы"
    },
    {
      id: "6",
      slug: "bezopasnost-i-zashchita",
      title: "Безопасность и защита",
      description: "Как защитить себя от мошенников, правильно оформлять договоры и получать оплату",
      content: `# Безопасность и защита

Безопасность важна для всех участников платформы.

## Защита от мошенников

Признаки мошенников:
- Слишком низкие цены
- Требование предоплаты без гарантий
- Отказ от официальных договоров
- Давление и спешка

## Оформление договоров

Всегда оформляйте договор:
- Указывайте все условия
- Фиксируйте сроки и стоимость
- Описывайте объем работ
- Указывайте способ оплаты

## Оплата

Безопасные способы оплаты:
- Через платформу
- По факту выполнения
- Частичная предоплата с гарантиями
- Банковский перевод

## Что делать при проблемах

Если возникли проблемы:
- Свяжитесь со службой поддержки
- Сохраните все переписки
- Имеете право на возврат средств
- Можете оставить отзыв`,
      category: "Безопасность",
      readTime: "8 мин",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
      tags: ["безопасность", "договоры", "оплата"],
      publishedAt: "3 января 2024",
      author: "Команда платформы"
    }
  ];

  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header activePage="/knowledge-base" />
        <main className="w-full lg:max-w-4xl lg:mx-auto px-3 sm:px-4 md:px-8 lg:px-8 py-6 sm:py-8">
          <Link href="/knowledge-base" className="text-primary hover:underline mb-6 inline-block text-sm sm:text-base">
            {t("knowledgeBase.backToArticles")}
          </Link>
          <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-12 text-center">
            <p className="text-gray-600">{t("knowledgeBase.articleNotFound")}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Простой парсер markdown для заголовков
  const parseContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('# ')) {
        return <h1 key={idx} className="text-2xl sm:text-3xl font-bold text-gray-900 mt-6 mb-4">{line.substring(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={idx} className="text-xl sm:text-2xl font-bold text-gray-900 mt-6 mb-3">{line.substring(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-lg sm:text-xl font-semibold text-gray-900 mt-4 mb-2">{line.substring(4)}</h3>;
      }
      if (line.trim() === '') {
        return <br key={idx} />;
      }
      return <p key={idx} className="text-gray-700 mb-4 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header activePage="/knowledge-base" />

      <main className="w-full lg:max-w-4xl lg:mx-auto px-3 sm:px-4 md:px-8 lg:px-8 py-6 sm:py-8">
        <Link href="/knowledge-base" className="text-primary hover:underline mb-6 inline-block text-sm sm:text-base">
          {t("knowledgeBase.backToArticles")}
        </Link>

        <article className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden">
          {/* Заголовок и изображение/видео */}
          {article.image && (
            <div className="relative w-full h-64 sm:h-80 overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                width={1200}
                height={400}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          )}
          {article.video && !article.image && (
            <div className="relative w-full h-64 sm:h-80 bg-gray-200">
              <iframe
                src={article.video}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <div className="p-4 sm:p-6 md:p-8">
            {/* Метаинформация */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs sm:text-sm px-3 py-1 bg-blue-50 text-blue-700 rounded-lg font-medium">
                {article.category}
              </span>
              <span className="text-sm text-gray-500">{article.readTime}</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{article.publishedAt}</span>
              {article.author && (
                <>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{article.author}</span>
                </>
              )}
            </div>

            {/* Заголовок */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>

            {/* Описание */}
            <p className="text-lg text-gray-600 mb-6">
              {article.description}
            </p>

            {/* Теги */}
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-lg"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Контент */}
            <div className="prose max-w-none">
              {parseContent(article.content)}
            </div>

            {/* Видео в середине статьи (если есть) */}
            {article.video && article.image && (
              <div className="my-8">
                <div className="relative w-full h-64 sm:h-96 bg-gray-200 rounded-xl overflow-hidden">
                  <iframe
                    src={article.video}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Навигация */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between gap-4">
          <Link
            href="/knowledge-base"
            className="text-primary hover:underline font-medium text-sm sm:text-base"
          >
            ← {t("knowledgeBase.backToArticles")}
          </Link>
          <Link
            href="/help"
            className="text-primary hover:underline font-medium text-sm sm:text-base"
          >
            {t("common.help")} →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

