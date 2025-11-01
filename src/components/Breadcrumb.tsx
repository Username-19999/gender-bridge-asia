"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

type BreadcrumbProps = {
  currentPage: string;
  currentPageZh: string;
};

export function Breadcrumb({ currentPage, currentPageZh }: BreadcrumbProps) {
  const { language } = useLanguage();

  return (
    <div className="text-sm text-gray-600 mb-8">
      <Link href="/" className="text-[#00a19a] font-semibold hover:underline">
        {language === "en" ? "Home" : "首页"}
      </Link>
      <span className="mx-2">&gt;&gt;</span>
      <span className="font-semibold text-black">
        {language === "en" ? currentPage : currentPageZh}
      </span>
    </div>
  );
}
