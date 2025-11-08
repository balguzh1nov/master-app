import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default async function CreateRequest({ params }: { params: Promise<{ masterId: string }> }) {
  const { masterId } = await params;
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header userType="client" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-8">
        <Link href={`/master/${masterId}`} className="text-primary hover:underline mb-6 inline-block">
          ← Назад к профилю
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Создать заявку</h1>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание работы
              </label>
              <textarea
                rows={6}
                placeholder="Опишите, что нужно сделать..."
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Бюджет (₽)
                </label>
                <input
                  type="number"
                  placeholder="50000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Сроки
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base">
                  <option>Срочно</option>
                  <option>В течение недели</option>
                  <option>В течение месяца</option>
                  <option>Не срочно</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Фото (до 5 файлов)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center">
                <p className="text-sm sm:text-base text-gray-600 mb-2">Перетащите файлы сюда или</p>
                <button
                  type="button"
                  className="text-primary hover:underline font-medium text-sm sm:text-base"
                >
                  выберите файлы
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Link
                href={`/master/${masterId}`}
                className="w-full sm:flex-1 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium text-center"
              >
                Отмена
              </Link>
              <button
                type="submit"
                className="w-full sm:flex-1 bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition-colors font-medium"
              >
                Отправить заявку
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

