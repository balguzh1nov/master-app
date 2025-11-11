"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getUserType, logout, type UserType } from "../utils/auth";
import { useTranslation, useLanguage } from "../i18n/useTranslation";

interface HeaderProps {
  userType?: UserType;
  activePage?: string;
}

export default function Header({ userType: propUserType, activePage }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
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
    { href: "/", label: t("common.home") },
    { href: "/vacancies", label: t("common.vacancies") },
    { href: "/help", label: t("common.help") },
    { href: "/about", label: t("common.about") },
  ];

  const specialistLinks = [
    { href: "/", label: t("common.home") },
    { href: "/vacancies", label: t("common.vacancies") },
    { href: "/profile", label: t("common.profile") },
  ];

  const links = userType === "specialist" ? specialistLinks : guestLinks;

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
            <span>{t("header.brand")}</span>
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
            {/* Language Switcher */}
            <div className="flex items-center gap-1 border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setLanguage("ru")}
                className={`px-2 py-1 text-xs sm:text-sm font-medium transition-colors ${
                  language === "ru"
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                aria-label="Русский"
              >
                RU
              </button>
              <button
                onClick={() => setLanguage("kk")}
                className={`px-2 py-1 text-xs sm:text-sm font-medium transition-colors ${
                  language === "kk"
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                aria-label="Қазақша"
              >
                KZ
              </button>
            </div>

            {userType === "guest" ? (
              <>
                {/* Tablet/Desktop Login Button */}
                <div className="hidden sm:flex items-center gap-2 md:gap-3">
                  <Link
                    href="/login"
                    className="px-3 py-2 md:px-4 md:py-2 text-gray-700 hover:text-primary transition-colors font-medium text-sm md:text-base"
                  >
                    {t("common.login")}
                  </Link>
                </div>

                {/* Mobile Login Button */}
                <Link
                  href="/login"
                  className="sm:hidden px-3 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
                >
                  {t("common.login")}
                </Link>
              </>
            ) : (
              <>
                {/* User Profile - показываем с sm экрана */}
                <Link
                  href="/profile"
                  className="hidden sm:flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm md:text-base">
                    С
                  </div>
                  <span className="hidden md:inline text-sm font-medium text-gray-700">
                    {t("common.specialist")}
                  </span>
                </Link>

                {/* Logout Button - показываем с sm экрана */}
                <button
                  onClick={handleLogout}
                  className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-600 hover:text-gray-900"
                  title={t("common.logout")}
                >
                  <span className="text-sm font-medium">{t("common.logout")}</span>
                </button>

                {/* Settings Link - показываем с lg экрана */}
                <Link
                  href="/settings"
                  className="hidden lg:flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-lg hover:bg-gray-50 transition-colors text-gray-600 hover:text-primary"
                  title={t("common.settings")}
                >
                  <span className="text-lg md:text-xl">⚙️</span>
                </Link>
              </>
            )}

            {/* Mobile/Tablet Menu Button - показываем до lg экрана */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label={t("common.menu")}
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
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-center"
                  >
                    {t("common.login")}
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
                    {t("common.settings")}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors text-left w-full"
                  >
                    {t("common.logout")}
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

