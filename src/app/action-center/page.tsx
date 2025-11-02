"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Navigation } from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Search, Megaphone, Map } from "lucide-react";

export default function ActionCenter() {
  const { t, language } = useLanguage();
  const [showComingSoon, setShowComingSoon] = useState(false);

  const actionCards = [
    {
      id: "research",
      icon: Search,
      title: t("Research Calls", "研究招募"),
      description: t(
        "Contribute your voice to projects at the forefront of East Asian gender research. Find ethically vetted surveys, interviews, and research opportunities here.",
        "为处于东亚性别研究前沿的项目贡献您的声音。在此查找经过伦理审查的问卷、访谈及研究机会。"
      ),
      cta: t("Participate Now", "立即参与"),
      color: "#004a94",
      borderColor: "border-l-4 border-[#004a94]"
    },
    {
      id: "advocacy",
      icon: Megaphone,
      title: t("Advocacy Hub", "倡导发声"),
      description: t(
        "From research to advocacy. Join our evidence-based online campaigns, policy education activities, or use our toolkits to advance East Asian Gender Justice.",
        "将研究转化为倡导。参与我们基于循证的线上活动、政策教育，或使用我们的工具包，推动东亚性别公义的进步。"
      ),
      cta: t("Join Advocacy", "加入倡导"),
      color: "#8e2d18",
      borderColor: "border-l-4 border-[#8e2d18]"
    },
    {
      id: "resources",
      icon: Map,
      title: t("Resource Map", "互助资源地图"),
      description: t(
        "Organize and provide practical gender-related support and learning resources. A compilation of mental health support, legal aid, educational materials, and NGO directories across East Asia to build a mutual aid network.",
        "整合并提供实用的性别相关支持与学习资源。汇集东亚地区的心理支持、法律援助、教育材料和 NGO 名录，构建互助网络。"
      ),
      cta: t("Find Resources", "查找资源"),
      color: "#009d9a",
      borderColor: "border-l-4 border-[#009d9a]"
    }
  ];

  const handleActionClick = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumb currentPage="Action Center" currentPageZh="行动中心" />

        <AnimatedSection immediate={true}>
          <div className="mb-16">
            {/* Page Header - Left Aligned */}
            <h1 className="text-4xl sm:text-6xl font-black mb-4">
              {t("Action Center", "行动中心")}
            </h1>
            <p className="text-base sm:text-xl text-gray-600 mb-12">
              {t("Transform Knowledge into Action", "将知识转化为行动")}
            </p>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {actionCards.map((card, index) => (
                <Card
                  key={card.id}
                  className={`p-6 hover:shadow-lg transition-shadow ${card.borderColor} flex flex-col`}
                >
                  {/* Icon */}
                  <div className="mb-4">
                    <card.icon className="w-10 h-10" style={{ color: card.color }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-2xl font-bold mb-3">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 flex-grow">
                    {card.description}
                  </p>

                  {/* CTA Button */}
                  <button
                    onClick={handleActionClick}
                    className="text-gray-900 hover:text-gray-600 font-semibold text-sm transition-colors flex items-center"
                  >
                    {card.cta} →
                  </button>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Coming Soon Toast */}
      {showComingSoon && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-up">
          <div className="bg-gray-900 text-white px-8 py-4 rounded-full shadow-2xl">
            <p className="text-lg font-semibold">
              {t("Coming Soon", "即将推出")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
