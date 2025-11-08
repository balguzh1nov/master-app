import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default async function Chat({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header userType="client" activePage="/my-chats" />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-8 py-8 flex flex-col">
        <Link href={`/master/${id}`} className="text-primary hover:underline mb-6 inline-block">
          ← Назад к профилю
        </Link>

        <div className="flex-1 bg-white border border-gray-200 rounded-2xl flex flex-col">
          {/* Chat Header */}
          <div className="border-b border-gray-200 p-3 sm:p-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-xl flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-gray-900 text-sm sm:text-base truncate">Иван Петров</h2>
                <p className="text-xs sm:text-sm text-gray-500">Онлайн</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 sm:p-6 overflow-y-auto space-y-4">
            <div className="flex gap-2 sm:gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="bg-gray-100 rounded-xl p-3 inline-block max-w-[85%] sm:max-w-md">
                  <p className="text-gray-900 text-sm sm:text-base break-words">Здравствуйте! Интересует изготовление кухни.</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">10:30</p>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3 justify-end">
              <div className="flex-1 flex justify-end min-w-0">
                <div className="max-w-[85%] sm:max-w-md">
                  <div className="bg-primary text-white rounded-xl p-3 inline-block">
                    <p className="text-sm sm:text-base break-words">Добрый день! Расскажите, пожалуйста, какие размеры и какой стиль вас интересует?</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-right">10:32</p>
                </div>
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded-xl flex-shrink-0"></div>
            </div>

            <div className="flex gap-2 sm:gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-xl flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="bg-gray-100 rounded-xl p-3 inline-block max-w-[85%] sm:max-w-md">
                  <p className="text-gray-900 text-sm sm:text-base break-words">Кухня 3 метра, современный стиль, белый цвет.</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">10:35</p>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-3 sm:p-4">
            <form className="flex gap-2 sm:gap-3">
              <input
                type="text"
                placeholder="Написать сообщение..."
                className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 sm:px-6 py-2 rounded-xl hover:opacity-90 transition-colors font-medium text-sm sm:text-base whitespace-nowrap"
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

