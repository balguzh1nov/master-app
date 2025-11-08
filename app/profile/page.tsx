import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header userType="specialist" activePage="/profile" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-8 w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Мой профиль</h1>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
          <form className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-2xl flex-shrink-0"></div>
              <div className="flex-1 w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Изменить фото
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Имя
              </label>
              <input
                type="text"
                defaultValue="Иван Петров"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Город
              </label>
              <input
                type="text"
                defaultValue="Москва"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание
              </label>
              <textarea
                rows={6}
                defaultValue="Профессиональный мебельщик с большим опытом работы. Специализируюсь на изготовлении кухонь, шкафов и мебели на заказ."
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Категории работ
              </label>
              <div className="flex flex-wrap gap-2">
                <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Кухни</span>
                </label>
                <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Шкафы</span>
                </label>
                <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Мебель на заказ</span>
                </label>
                <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" className="rounded" />
                  <span>Ремонт мебели</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Контакты
              </label>
              <input
                type="tel"
                placeholder="+7 (999) 123-45-67"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Стоимость работ (от)
              </label>
              <input
                type="number"
                defaultValue="5000"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button
                type="button"
                className="w-full sm:flex-1 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="w-full sm:flex-1 bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition-colors font-medium"
              >
                Сохранить изменения
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

