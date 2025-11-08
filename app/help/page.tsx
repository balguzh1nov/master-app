import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Help() {
  const faqs = [
    {
      question: "Как создать заявку?",
      answer: "Перейдите на профиль мебельщика и нажмите кнопку 'Создать заявку'. Заполните описание работы, укажите бюджет и сроки, при необходимости добавьте фото."
    },
    {
      question: "Как связаться с мебельщиком?",
      answer: "Вы можете написать мебельщику в чате, нажав кнопку 'Написать' на его профиле, или создать заявку, и мебельщик сам свяжется с вами."
    },
    {
      question: "Как оставить отзыв?",
      answer: "После завершения заказа вы сможете оставить отзыв на странице 'Мои заявки', выбрав выполненную заявку и нажав 'Оставить отзыв'."
    },
    {
      question: "Как откликнуться на заявку?",
      answer: "В разделе 'Заявки' вы увидите все доступные заявки. Нажмите 'Откликнуться' или 'Открыть чат' для связи с клиентом."
    },
    {
      question: "Как изменить профиль?",
      answer: "Перейдите в раздел 'Профиль' в навигации. Там вы сможете изменить фото, описание, категории работ и другую информацию."
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header userType="guest" activePage="/help" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Помощь</h1>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const radiusClasses = ['rounded-2xl', 'rounded-3xl', 'rounded-xl', 'rounded-2xl', 'rounded-xl'];
            return (
              <div
                key={idx}
                className={`bg-white border border-gray-200 ${radiusClasses[idx]} p-4 sm:p-6`}
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {faq.answer}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 sm:mt-8 bg-gray-50 rounded-2xl p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            Нужна дополнительная помощь?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            Свяжитесь с нашей службой поддержки
          </p>
          <button className="w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition-colors font-medium text-sm sm:text-base">
            Связаться с поддержкой
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

