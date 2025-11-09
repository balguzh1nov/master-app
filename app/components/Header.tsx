"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getUserType, logout, type UserType } from "../utils/auth";

interface HeaderProps {
  userType?: UserType;
  activePage?: string;
}

export default function Header({ userType: propUserType, activePage }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentUserType, setCurrentUserType] = useState<UserType>("guest");

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Слушаем изменения авторизации
    const handleAuthChange = () => {
      setCurrentUserType(getUserType());
    };
    window.addEventListener("auth-change", handleAuthChange);
    handleAuthChange(); // Инициализация
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  // Используем propUserType если передан, иначе берем из auth
  const userType = propUserType || currentUserType;

  const handleLogout = () => {
    logout();
    router.push("/");
    setIsMobileMenuOpen(false);
  };

  // Определяем активную страницу автоматически, если не передана явно
  const getActivePage = (href: string) => {
    if (activePage) return activePage === href;
    if (!mounted) return false; // Предотвращаем hydration mismatch
    return pathname === href || pathname?.startsWith(href + "/");
  };

  const guestLinks = [
    { href: "/", label: "Главная" },
    { href: "/help", label: "Помощь" },
    { href: "/about", label: "О нас" },
  ];

  const clientLinks = [
    { href: "/", label: "Главная" },
    { href: "/my-requests", label: "Мои заявки" },
    { href: "/my-chats", label: "Мои чаты" },
    { href: "/help", label: "Помощь" },
  ];

  const specialistLinks = [
    { href: "/", label: "Главная" },
    { href: "/requests", label: "Заявки" },
    { href: "/my-chats", label: "Мои чаты" },
    { href: "/profile", label: "Профиль" },
  ];

  const links = userType === "client" ? clientLinks : userType === "specialist" ? specialistLinks : guestLinks;

  return (
    <header 
      className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md border-b border-gray-200" : "border-b border-gray-200"
      }`}
    >
      <div className="w-full lg:max-w-7xl lg:mx-auto px-3 sm:px-4 md:px-8 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20 lg:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-primary hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl">🪑</span>
            <span>Мебельщики</span>
          </Link>

          {/* Desktop Navigation - показываем с md экрана */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" suppressHydrationWarning>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 md:px-4 md:py-2 rounded-lg transition-all duration-200 text-sm md:text-base md:whitespace-nowrap ${
                  getActivePage(link.href)
                    ? "text-primary font-semibold bg-blue-50"
                    : "text-gray-700 hover:text-primary hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {userType === "guest" ? (
              <>
                {/* Tablet/Desktop Login Buttons */}
                <div className="hidden sm:flex items-center gap-2 md:gap-3">
                  <Link
                    href="/login-client"
                    className="px-3 py-2 md:px-4 md:py-2 text-gray-700 hover:text-primary transition-colors font-medium text-sm md:text-base"
                  >
                    Вход
                  </Link>
                  <Link
                    href="/login-specialist"
                    className="px-3 py-2 md:px-5 md:py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-sm text-sm md:text-base whitespace-nowrap"
                  >
                    Для специалистов
                  </Link>
                </div>

                {/* Mobile Login Button */}
                <Link
                  href="/login-client"
                  className="sm:hidden px-3 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
                >
                  Вход
                </Link>
              </>
            ) : (
              <>
                {/* User Profile - показываем с sm экрана */}
                <Link
                  href={userType === "client" ? "/profile" : "/profile"}
                  className="hidden sm:flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm md:text-base">
                    {userType === "client" ? "К" : "С"}
                  </div>
                  <span className="hidden md:inline text-sm font-medium text-gray-700">
                    {userType === "client" ? "Клиент" : "Специалист"}
                  </span>
                </Link>

                {/* Logout Button - показываем с sm экрана */}
                <button
                  onClick={handleLogout}
                  className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-600 hover:text-gray-900"
                  title="Выйти"
                >
                  <span className="text-sm font-medium">Выйти</span>
                </button>

                {/* Settings Link - показываем с lg экрана */}
                <Link
                  href="/settings"
                  className="hidden lg:flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-lg hover:bg-gray-50 transition-colors text-gray-600 hover:text-primary"
                  title="Настройки"
                >
                  <span className="text-lg md:text-xl">⚙️</span>
                </Link>
              </>
            )}

            {/* Mobile/Tablet Menu Button - показываем до lg экрана */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="Меню"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="text-xl sm:text-2xl">{isMobileMenuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Menu - показываем до lg экрана */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                    getActivePage(link.href)
                      ? "text-primary font-semibold bg-blue-50"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {userType === "guest" && (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                  <Link
                    href="/login-specialist"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-center"
                  >
                    Вход для специалистов
                  </Link>
                </>
              )}

              {userType !== "guest" && (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                  <Link
                    href="/settings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                  >
                    Настройки
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors text-left w-full"
                  >
                    Выйти
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

