"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "../i18n/useTranslation";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Для специалистов */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t("footer.forSpecialists")}</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/profile" className="hover:text-primary transition-colors">
                  {t("common.profile")}
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-primary transition-colors">
                  {t("common.login")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Информация */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t("footer.information")}</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/knowledge-base" className="hover:text-primary transition-colors">
                  {t("knowledgeBase.title")}
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-primary transition-colors">
                  {t("common.help")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  {t("common.about")}
                </Link>
              </li>
              <li>
                <Link href="/category/сантехника" className="hover:text-primary transition-colors">
                  {t("common.categories")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t("footer.contacts")}</h3>
            <ul className="space-y-2 text-gray-600">
              <li>{t("footer.email")}</li>
              <li>{t("footer.phone")}</li>
              <li>{t("footer.address")}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            {t("footer.copyright")}
          </p>
          <div className="flex gap-4">
            <a
              href="https://wa.me/79951234567"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-xl hover:opacity-80 transition-opacity"
              aria-label="WhatsApp"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                width={32}
                height={32}
                className="w-8 h-8 rounded-xl"
                unoptimized
              />
            </a>
            <a
              href="https://instagram.com/mebelchiki"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-2xl hover:opacity-80 transition-opacity"
              aria-label="Instagram"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram"
                width={32}
                height={32}
                className="w-8 h-8 rounded-2xl"
                unoptimized
              />
            </a>
            <a
              href="https://t.me/mebelchiki"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-xl hover:opacity-80 transition-opacity"
              aria-label="Telegram"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
                alt="Telegram"
                width={32}
                height={32}
                className="w-8 h-8 rounded-xl"
                unoptimized
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

