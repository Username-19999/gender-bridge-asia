"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Navigation } from "@/components/Navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CommunityVoices } from "@/components/CommunityVoices";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { Brain, Link as LinkIcon, Scale, BarChart } from "lucide-react";

export default function CommunitySpace() {
  const { t, gameProgress } = useLanguage();
  
  const completedGames = [gameProgress.quiz, gameProgress.match, gameProgress.asi, gameProgress.bsri].filter(Boolean).length;

  const games = [
    {
      id: "quiz",
      title: t("Gender Knowledge Quiz", "性别知识测验"),
      subtitle: t("Test Your Understanding", "测试你的理解"),
      icon: Brain,
      color: "from-[#00a19a] to-[#008c85]",
      link: "/community-space/quiz"
    },
    {
      id: "match",
      title: t("Gender Terms Match", "性别术语连连看"),
      subtitle: t("Connect and Learn", "连线学习"),
      icon: LinkIcon,
      color: "from-[#e6c839] to-[#f0d95c]",
      link: "/community-space/match"
    },
    {
      id: "asi",
      title: t("Ambivalent Sexism Inventory (ASI)", "矛盾性别偏见自测"),
      subtitle: t("Self-Reflection Tool", "自我反思工具"),
      icon: Scale,
      color: "from-[#00357a] to-[#004a9e]",
      link: "/community-space/asi"
    },
    {
      id: "bsri",
      title: t("Bem Sex-Role Inventory (BSRI)", "性别角色自测"),
      subtitle: t("Self-Assessment Tool", "BSRI自我评估"),
      icon: BarChart,
      color: "from-[#059669] to-[#10b981]",
      link: "/community-space/bsri"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumb currentPage="Community Space" currentPageZh="社区空间" />

        <AnimatedSection immediate={true}>
          <div className="mb-16">
            <h1 className="text-4xl sm:text-6xl font-black mb-4">{t("Community Space", "社区空间")}</h1>
            <p className="text-base sm:text-xl text-gray-600 mb-12">
              {t("Explore interactive tools to deepen your understanding of gender equality", "通过互动工具深化对性别平等的理解")}
            </p>

            <h2 className="text-3xl sm:text-4xl font-black mb-8">{t("Interactive Tools", "互动工具")}</h2>
            
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  {t("Progress", "进度")}
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {completedGames}/4 {t("Completed", "已完成")}
                </span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#00a19a] to-[#008c85] h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(completedGames / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Games Grid - 2x2 Layout */}
            <div className="max-w-6xl mx-auto mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {games.map((game, index) => (
                  <Link key={game.id} href={game.link}>
                    <div className="relative group cursor-pointer h-full">
                      <div className={`bg-gradient-to-br ${game.color} p-6 sm:p-8 rounded-2xl shadow-xl transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl h-full flex flex-col justify-center min-h-[280px] sm:min-h-[320px]`}>
                        <div className="text-center text-white">
                          <div className="flex justify-center mb-3 sm:mb-4">
                            <game.icon className="w-16 h-16 sm:w-20 sm:h-20" strokeWidth={1.5} />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-black mb-2">{game.title}</h3>
                          <p className="text-base sm:text-lg opacity-90 mb-4 sm:mb-6">{game.subtitle}</p>
                          <div className="inline-flex items-center bg-white text-gray-800 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-bold group-hover:bg-gray-100 transition-colors">
                            {game.id === "asi" || game.id === "bsri" ? t("Start Assessment", "开始评估") : t("Start Game", "开始游戏")} →
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Divider */}
        <div className="border-t-4 border-gray-300 my-16"></div>

        {/* Community Voices */}
        <CommunityVoices />
      </div>
    </div>
  );
}
