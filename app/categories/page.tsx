import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { categories } from "../data/categories";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="guest" activePage="/categories" />

      <main className="w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-gray-600 flex items-center gap-2">
          <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Все категории</span>
        </nav>

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Все категории услуг
          </h1>
          <p className="text-lg text-gray-600">
            Выберите категорию, чтобы найти подходящего специалиста
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, idx) => {
            const radiusClasses = [
              'rounded-xl',
              'rounded-2xl',
              'rounded-xl',
              'rounded-2xl',
              'rounded-xl',
              'rounded-2xl',
              'rounded-xl',
              'rounded-2xl'
            ];
            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className={`${category.bgColor} ${radiusClasses[idx]} p-8 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center min-h-[220px] group border border-transparent hover:border-gray-300`}
              >
                <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-600 text-center mb-4 line-clamp-2">
                  {category.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{category.subcategories.length} подкатегорий</span>
                  <span>→</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Subcategories Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Все подкатегории</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.flatMap((category) =>
              category.subcategories.map((subcategory) => (
                <Link
                  key={`${category.slug}-${subcategory.slug}`}
                  href={`/search?category=${category.slug}&subcategory=${subcategory.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                        {subcategory.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{subcategory.description}</p>
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        {category.title}
                      </span>
                    </div>
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity ml-2">→</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

