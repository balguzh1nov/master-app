import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default async function RequestDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const request = {
    id: parseInt(id),
    title: "Изготовление кухни",
    description: "Нужна кухня 3 метра, современный стиль, белый цвет. Материал - МДФ с пленкой. Нужно сделать до конца месяца.",
    budget: "50 000 ₽",
    deadline: "В течение месяца",
    date: "15 января 2024",
    status: "В работе",
    statusColor: "bg-blue-100 text-blue-700",
    client: {
      name: "Анна Смирнова",
      avatar: "",
      location: "Астана"
    },
    images: [1, 2, 3]
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header userType="specialist" activePage="/requests" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-8">
        <Link href="/requests" className="text-primary hover:underline mb-6 inline-block">
          ← Назад к заявкам
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{request.title}</h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600">
                <span>{request.date}</span>
                <span className="hidden sm:inline">•</span>
                <span>{request.client.location}</span>
              </div>
            </div>
            <span className={`inline-block px-3 py-1 ${request.statusColor} rounded-full text-sm font-medium w-fit`}>
              {request.status}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 mb-6 p-3 sm:p-4 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-xl flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{request.client.name}</p>
              <p className="text-sm text-gray-500">{request.client.location}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Описание работы</h2>
            <p className="text-gray-700">{request.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Бюджет</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">{request.budget}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Сроки</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">{request.deadline}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Фото</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {request.images.map((img, idx) => {
                const radiusClasses = ['rounded-xl', 'rounded-2xl', 'rounded-xl'];
                return (
                  <div key={img} className={`aspect-square bg-gray-200 ${radiusClasses[idx]}`}></div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition-colors font-medium">
              Откликнуться
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

