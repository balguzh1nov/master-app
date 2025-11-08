import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MyChats() {
  const chats = [
    {
      id: 1,
      name: "Иван Петров",
      avatar: "",
      lastMessage: "Добрый день! Расскажите, пожалуйста, какие размеры и какой стиль вас интересует?",
      time: "10:32",
      unread: 2,
      requestTitle: "Изготовление кухни"
    },
    {
      id: 2,
      name: "Мария Сидорова",
      avatar: "",
      lastMessage: "Спасибо за заказ! Работа выполнена.",
      time: "Вчера",
      unread: 0,
      requestTitle: "Ремонт шкафа"
    },
    {
      id: 3,
      name: "Алексей Козлов",
      avatar: "",
      lastMessage: "Когда удобно приехать на замер?",
      time: "15:45",
      unread: 1,
      requestTitle: "Изготовление мебели"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header userType="client" activePage="/my-chats" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Мои чаты</h1>

        <div className="space-y-4">
          {chats.map((chat, idx) => {
            const radiusClasses = ['rounded-2xl', 'rounded-3xl', 'rounded-xl'];
            return (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className={`block bg-white border border-gray-200 ${radiusClasses[idx]} p-6 hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gray-200 ${idx % 2 === 0 ? 'rounded-xl' : 'rounded-full'} flex-shrink-0`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-900">{chat.name}</h3>
                        <p className="text-sm text-gray-500">{chat.requestTitle}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                        {chat.unread > 0 && (
                          <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
                            {chat.unread}
                          </span>
                        )}
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm truncate">{chat.lastMessage}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}

