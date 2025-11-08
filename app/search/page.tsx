import { Suspense } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchContent from "./SearchContent";

function SearchLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="guest" activePage="/" />
      <main className="w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6 mb-8"></div>
          <div className="flex gap-6">
            <div className="w-64 h-96 bg-gray-200 rounded-xl"></div>
            <div className="flex-1 space-y-4">
              <div className="h-16 bg-gray-200 rounded-xl"></div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="guest" activePage="/" />
      <main className="w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-8">
        <Suspense fallback={<SearchLoading />}>
          <SearchContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

