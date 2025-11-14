"use client";

import Link from "next/link";
import Image from "next/image";
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
      className={`bg-[#2196F3] sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md border-b border-blue-600" : "border-b border-blue-600"
      }`}
    >
      <div className="w-full lg:max-w-7xl lg:mx-auto px-3 sm:px-4 md:px-8 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20 lg:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Image 
              src="/logo-full.svg" 
              alt="MebelSpace Logo" 
              width={745} 
              height={149} 
              className="h-8 w-auto sm:h-9 md:h-10 lg:h-12"
            />
          </Link>

          {/* Desktop Navigation - показываем с md экрана */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" suppressHydrationWarning>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 md:px-4 md:py-2 rounded-lg transition-all duration-200 text-sm md:text-base md:whitespace-nowrap ${
                  getActivePage(link.href)
                    ? "text-white font-semibold bg-blue-600"
                    : "text-white hover:text-[#FFC107] hover:bg-blue-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 border border-blue-400 rounded-lg overflow-hidden">
              <button
                onClick={() => setLanguage("ru")}
                className={`px-2 py-1 text-xs sm:text-sm font-medium transition-colors ${
                  language === "ru"
                    ? "bg-white text-[#2196F3]"
                    : "bg-blue-500 text-white hover:bg-blue-400"
                }`}
                aria-label="Русский"
              >
                RU
              </button>
              <button
                onClick={() => setLanguage("kk")}
                className={`px-2 py-1 text-xs sm:text-sm font-medium transition-colors ${
                  language === "kk"
                    ? "bg-white text-[#2196F3]"
                    : "bg-blue-500 text-white hover:bg-blue-400"
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
                    className="px-3 py-2 md:px-4 md:py-2 text-white hover:text-[#FFC107] transition-colors font-medium text-sm md:text-base"
                  >
                    {t("common.login")}
                  </Link>
                </div>

                {/* Mobile Login Button */}
                <Link
                  href="/login"
                  className="sm:hidden px-3 py-2 bg-white text-[#2196F3] rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm"
                >
                  {t("common.login")}
                </Link>
              </>
            ) : (
              <>
                {/* User Profile - показываем с sm экрана */}
                <Link
                  href="/profile"
                  className="hidden sm:flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center text-[#2196F3] font-semibold text-sm md:text-base">
                    С
                  </div>
                  <span className="hidden md:inline text-sm font-medium text-white">
                    {t("common.specialist")}
                  </span>
                </Link>

                {/* Logout Button - показываем с sm экрана */}
                <button
                  onClick={handleLogout}
                  className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-white hover:text-[#FFC107]"
                  title={t("common.logout")}
                >
                  <span className="text-sm font-medium">{t("common.logout")}</span>
                </button>

                {/* Settings Link - показываем с lg экрана */}
                <Link
                  href="/settings"
                  className="hidden lg:flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-lg hover:bg-blue-600 transition-colors text-white hover:text-[#FFC107]"
                  title={t("common.settings")}
                >
                  <span className="text-lg md:text-xl">⚙️</span>
                </Link>
              </>
            )}

            {/* Mobile/Tablet Menu Button - показываем до lg экрана */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-blue-600 transition-colors"
              aria-label={t("common.menu")}
              aria-expanded={isMobileMenuOpen}
            >
              <span className="text-xl sm:text-2xl text-white">{isMobileMenuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Menu - показываем до lg экрана */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-blue-400 py-4 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                    getActivePage(link.href)
                      ? "text-white font-semibold bg-blue-600"
                      : "text-white hover:text-[#FFC107] hover:bg-blue-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {userType === "guest" && (
                <>
                  <div className="border-t border-blue-400 my-2"></div>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 bg-white text-[#2196F3] rounded-lg hover:bg-gray-100 transition-colors font-medium text-center"
                  >
                    {t("common.login")}
                  </Link>
                </>
              )}

              {userType !== "guest" && (
                <>
                  <div className="border-t border-blue-400 my-2"></div>
                  <Link
                    href="/settings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-white hover:text-[#FFC107] hover:bg-blue-600 transition-colors"
                  >
                    {t("common.settings")}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 rounded-lg text-white hover:text-red-300 hover:bg-red-600 transition-colors text-left w-full"
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

