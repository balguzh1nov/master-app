import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default async function Reviews({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header userType="guest" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-8">
        <Link href={`/master/${id}`} className="text-primary hover:underline mb-6 inline-block">
          ← Назад к профилю
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Отзывы</h1>

          <div className="space-y-4 sm:space-y-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((review, idx) => {
              const radiusClasses = ['rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-xl', 'rounded-2xl'];
              return (
              <div key={review} className={`border-b border-gray-200 pb-4 sm:pb-6 last:border-0 last:pb-0 ${idx === 7 ? 'border-0' : ''}`}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 ${idx % 2 === 0 ? 'rounded-xl' : 'rounded-full'} flex-shrink-0`}></div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">Анна Смирнова</p>
                      <p className="text-xs sm:text-sm text-gray-500">15 января 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <span className="text-yellow-500 text-sm sm:text-base">★</span>
                    <span className="text-yellow-500 text-sm sm:text-base">★</span>
                    <span className="text-yellow-500 text-sm sm:text-base">★</span>
                    <span className="text-yellow-500 text-sm sm:text-base">★</span>
                    <span className="text-yellow-500 text-sm sm:text-base">★</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-3 text-sm sm:text-base">
                  Отличная работа! Кухня получилась именно такой, как я хотела. 
                  Качество материалов на высоте, все сделано аккуратно и в срок. 
                  Мастер очень внимательный к деталям, все объяснил и показал.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <div className="w-16 h-16 sm:w-20 sm:h-24 bg-gray-200 rounded-xl"></div>
                  <div className="w-16 h-16 sm:w-20 sm:h-24 bg-gray-200 rounded-2xl"></div>
                  <div className="w-16 h-16 sm:w-20 sm:h-24 bg-gray-200 rounded-xl"></div>
                </div>
              </div>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center">
            <button className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base">
              Загрузить еще
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

