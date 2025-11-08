import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getCategoryBySlug, categories } from "../../data/categories";

// Функция для форматирования чисел с фиксированной локалью
function formatPrice(price: number): string {
  return price.toLocaleString('ru-RU');
}

// Моковые данные специалистов
const mockMasters = [
  {
    id: 1,
    name: "Иван Петров",
    city: "Москва",
    rating: 4.8,
    reviewsCount: 24,
    price: 5000,
    description: "Профессиональный мебельщик с опытом работы 10+ лет. Изготовление кухонь, шкафов, мебели на заказ.",
    experience: "10+ лет",
    completedOrders: 156
  },
  {
    id: 2,
    name: "Сергей Смирнов",
    city: "Москва",
    rating: 4.9,
    reviewsCount: 45,
    price: 7000,
    description: "Специалист по изготовлению корпусной мебели. Индивидуальный подход к каждому проекту.",
    experience: "8+ лет",
    completedOrders: 203
  },
  {
    id: 3,
    name: "Александр Козлов",
    city: "Санкт-Петербург",
    rating: 4.7,
    reviewsCount: 18,
    price: 4500,
    description: "Опытный мастер по сборке и установке мебели. Быстро и качественно выполню любую задачу.",
    experience: "6+ лет",
    completedOrders: 89
  },
  {
    id: 4,
    name: "Дмитрий Волков",
    city: "Москва",
    rating: 5.0,
    reviewsCount: 32,
    price: 8500,
    description: "Дизайнер мебели с портфолио более 200 проектов. Создам уникальную мебель для вашего дома.",
    experience: "12+ лет",
    completedOrders: 234
  },
  {
    id: 5,
    name: "Михаил Новиков",
    city: "Москва",
    rating: 4.6,
    reviewsCount: 15,
    price: 4000,
    description: "Ремонт и реставрация мебели. Верну вашей мебели вторую жизнь.",
    experience: "5+ лет",
    completedOrders: 67
  },
  {
    id: 6,
    name: "Андрей Лебедев",
    city: "Москва",
    rating: 4.9,
    reviewsCount: 56,
    price: 6000,
    description: "Изготовление офисной мебели. Работаю с крупными компаниями и частными заказчиками.",
    experience: "9+ лет",
    completedOrders: 189
  }
];

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Декодируем slug на случай проблем с кодировкой
  const decodedSlug = decodeURIComponent(slug);
  const category = getCategoryBySlug(decodedSlug);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header userType="guest" activePage="/" />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-8">
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Категория не найдена</h1>
            <p className="text-gray-600 mb-6">
              Категория "{decodedSlug}" не существует или была удалена
            </p>
            <Link 
              href="/" 
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              ← Вернуться на главную
            </Link>
            <div className="mt-8">
              <p className="text-sm text-gray-500 mb-4">Популярные категории:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.slice(0, 4).map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="guest" activePage="/" />

      {/* Main Content */}
      <main className="w-full lg:max-w-7xl lg:mx-auto px-3 sm:px-4 md:px-8 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumbs */}
        <nav className="mb-4 sm:mb-6 text-xs sm:text-sm text-gray-600 flex items-center gap-2">
          <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{category.title}</span>
        </nav>

        {/* Category Header - улучшенный дизайн */}
        <div className={`${category.bgColor} rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 mb-6 sm:mb-8 border border-gray-200 shadow-sm relative overflow-hidden`}>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6">
              <div className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl">{category.icon}</div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {category.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-3 sm:mb-4">
                  {category.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="font-semibold">{category.subcategories.length}</span>
                    <span>подкатегорий</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="font-semibold">{mockMasters.length}</span>
                    <span>специалистов</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subcategories Section - улучшенный дизайн */}
        <section className="mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Подкатегории</h2>
            <Link 
              href={`/search?category=${category.slug}`}
              className="text-primary hover:underline text-xs sm:text-sm font-medium"
            >
              Все специалисты →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {category.subcategories.map((subcategory, idx) => (
              <Link
                key={subcategory.slug}
                href={`/search?category=${category.slug}&subcategory=${subcategory.slug}`}
                className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-lg hover:border-primary transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {subcategory.title}
                  </h3>
                  <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2">→</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {subcategory.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Masters List - улучшенный дизайн */}
        <section>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Специалисты</h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Найдено {mockMasters.length} специалистов в категории "{category.title}"
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <select className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-xs sm:text-sm bg-white">
                <option>По рейтингу</option>
                <option>По цене: сначала дешевле</option>
                <option>По цене: сначала дороже</option>
                <option>По количеству отзывов</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            {mockMasters.map((master, idx) => {
              const radiusClasses = [
                'rounded-xl',
                'rounded-2xl',
                'rounded-xl',
                'rounded-2xl',
                'rounded-xl',
                'rounded-2xl'
              ];
              return (
                <Link
                  key={master.id}
                  href={`/master/${master.id}`}
                  className={`block bg-white border border-gray-200 ${radiusClasses[idx]} p-4 sm:p-6 hover:shadow-lg hover:border-primary transition-all duration-300 group`}
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <div className={`w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 ${idx % 2 === 0 ? 'rounded-xl' : 'rounded-2xl'} flex-shrink-0 flex items-center justify-center text-3xl sm:text-4xl mx-auto sm:mx-0`}>
                      👤
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors truncate">
                            {master.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              📍 {master.city}
                            </span>
                            <span>•</span>
                            <span>Опыт: {master.experience}</span>
                            <span>•</span>
                            <span>Выполнено: {master.completedOrders} заказов</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-left sm:text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-yellow-500 text-sm sm:text-base lg:text-lg">★</span>
                            <span className="font-semibold text-sm sm:text-base lg:text-lg">{master.rating}</span>
                            <span className="text-gray-500 text-xs sm:text-sm">({master.reviewsCount})</span>
                          </div>
                          <p className="text-gray-900 font-bold text-sm sm:text-base lg:text-lg">от {formatPrice(master.price)} ₽</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                        {master.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {category.subcategories.slice(0, 3).map((sub) => (
                          <span 
                            key={sub.slug}
                            className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                          >
                            {sub.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

