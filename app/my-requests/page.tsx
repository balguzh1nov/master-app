import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MyRequests() {
  const requests = [
    {
      id: 1,
      title: "Изготовление кухни",
      masterName: "Иван Петров",
      masterId: 1,
      status: "В работе",
      statusColor: "bg-blue-100 text-blue-700",
      budget: "50 000 ₽",
      date: "15 января 2024",
      description: "Нужна кухня 3 метра, современный стиль, белый цвет."
    },
    {
      id: 2,
      title: "Ремонт шкафа",
      masterName: "Мария Сидорова",
      masterId: 2,
      status: "Новая",
      statusColor: "bg-green-100 text-green-700",
      budget: "15 000 ₽",
      date: "20 января 2024",
      description: "Требуется ремонт дверок шкафа-купе."
    },
    {
      id: 3,
      title: "Изготовление мебели на заказ",
      masterName: "Алексей Козлов",
      masterId: 3,
      status: "Выполнена",
      statusColor: "bg-gray-100 text-gray-700",
      budget: "80 000 ₽",
      date: "10 января 2024",
      description: "Изготовление гардеробной комнаты."
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header userType="guest" activePage="/my-requests" />

      <main className="w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Мои заявки</h1>

        <div className="space-y-4">
          {requests.map((request, idx) => {
            const radiusClasses = ['rounded-2xl', 'rounded-3xl', 'rounded-xl'];
            return (
              <div
                key={request.id}
                className={`bg-white border border-gray-200 ${radiusClasses[idx]} p-6 hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 bg-gray-200 ${idx % 2 === 0 ? 'rounded-xl' : 'rounded-full'} flex-shrink-0`}></div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/master/${request.masterId}`} className="font-semibold text-gray-900 hover:text-primary block truncate">
                          {request.masterName}
                        </Link>
                        <p className="text-sm text-gray-500">{request.date}</p>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {request.title}
                    </h3>
                    <p className="text-gray-700 mb-3 text-sm sm:text-base">{request.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>Бюджет: <strong className="text-gray-900">{request.budget}</strong></span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 sm:ml-6">
                    <span className={`inline-block px-3 py-1 ${request.statusColor} rounded-full text-sm font-medium`}>
                      {request.status}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/request/${request.id}`}
                    className="flex-1 bg-primary text-white px-6 py-2 rounded-xl hover:opacity-90 transition-colors font-medium text-center"
                  >
                    Подробнее
                  </Link>
                  {request.status === "Выполнена" && (
                    <Link
                      href={`/create-review/${request.id}`}
                      className="w-full sm:w-auto px-6 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium text-center"
                    >
                      Оставить отзыв
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}

