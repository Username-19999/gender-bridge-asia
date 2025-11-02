"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Navigation } from "@/components/Navigation";
import { AcademicHubIcon, CommunitySpaceIcon, ActionCenterIcon } from "@/components/SectionLogos";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const { language, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: t("Academic Hub", "学术中心"),
      description: t(
        "Explore cutting-edge research directions in gender studies and regional insights from across East Asian",
        "探索性别研究的前沿方向，并获取东亚地区的区域洞察。"
      ),
      link: "/academic-hub",
      gradient: "from-[#f5fbf9] to-[#f5fbf9]", // light mint background
      textColor: "text-[#00357a]",
      icon: <AcademicHubIcon />,
    },
    {
      title: t("Community Space", "社区空间"),
      description: t(
        "Test your knowledge about gender equality through interactive quizzes and educational games",
        "通过互动测验和教育游戏测试您的性别平等知识"
      ),
      link: "/community-space",
      gradient: "from-[#f5fbf9] to-[#f5fbf9]", // light mint background
      textColor: "text-[#00357a]",
      icon: <CommunitySpaceIcon />,
    },
    {
      title: t("Action Center", "行动中心"),
      description: t(
        "Join our initiatives and take meaningful action towards creating a more equitable society",
        "加入我们的倡议，为创建更加公平的社会采取有意义的行动"
      ),
      link: "/action-center",
      gradient: "from-[#f5fbf9] to-[#f5fbf9]", // light mint background
      textColor: "text-[#00357a]",
      icon: <ActionCenterIcon />,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-[#A7D9E4] noise-texture pt-8 pb-20 relative overflow-hidden border-b border-black/5 shadow-sm">
        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center">
              <div className="relative min-h-[350px] sm:min-h-[450px] md:min-h-[550px] flex items-center justify-center py-4 -mb-8 md:my-[-16px]">
                <div className="relative">
                  <h1 className="text-[4rem] sm:text-[6rem] md:text-[9rem] lg:text-[12rem] xl:text-[14rem] font-black leading-none tracking-tighter text-[#0E3D8C] opacity-15 whitespace-nowrap">
                    EAST ASIAN
                  </h1>
                  <div className="absolute top-[8%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black leading-none tracking-tight whitespace-nowrap text-[#0C2D6C]">
                      GENDER
                    </h2>
                  </div>
                  <div className="absolute top-[94%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black leading-none tracking-tight whitespace-nowrap text-[#0C2D6C]">
                      BRIDGE
                    </h2>
                  </div>
                </div>
              </div>
              <div className="max-w-4xl mx-auto">
                <p className="text-sm md:text-base leading-[1.9] text-[#000]">
                  {language === "en" ? (
                    <>
                      East Asian Gender Bridge transcends boundaries to connect{" "}
                      <span className="font-semibold text-[#000000] md:font-bold">gender knowledge</span> and{" "}
                      <span className="font-semibold text-[#000] md:font-bold">local action</span>. We empower individuals to drive{" "}
                      <span className="font-semibold text-[#000] md:font-bold">equitable and insightful change</span>, fostering{" "}
                      <span className="font-semibold text-[#000] md:font-bold">understanding and progress</span> across East Asian societies.
                    </>
                  ) : (
                    <>
                      东亚性别桥梁 跨越界限，连接<span className="font-semibold text-[#2E2E2E]">性别知识</span>与<span className="font-semibold text-[#2E2E2E]">在地行动</span>。我们赋能个体，推动<span className="font-semibold text-[#2E2E2E]">平等且富有洞察力的变革</span>，促进东亚社会的<span className="font-semibold text-[#2E2E2E]">理解与进步</span>。
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Full-Screen Slides */}
      <section className="bg-[#F8FAFB] relative overflow-hidden border-b border-black/5 shadow-sm">
        <div className="min-h-[500px] md:min-h-[550px] lg:h-[600px] w-full relative">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentSlide
                  ? "opacity-100 translate-x-0"
                  : index < currentSlide
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
              }`}
            >
              <div className={`h-full w-full bg-gradient-to-br ${slide.gradient} flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 md:py-12`}>
                <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
                  <div className="text-[#0E3D8C] animate-fade-in px-2 sm:px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-3 sm:mb-4 md:mb-6 leading-tight whitespace-nowrap">{slide.title}</h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 leading-relaxed text-[#000]">{slide.description}</p>
                    <Link href={slide.link}>
                      <Button className="bg-[#0E3D8C] text-white hover:bg-[#00A8A8] hover:scale-105 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg font-bold rounded-none shadow-lg transition-all duration-300">
                        {t("Explore", "探索")} →
                      </Button>
                    </Link>
                  </div>
                  <div className="hidden md:flex items-center justify-center transition-transform hover:scale-105 duration-500">
                    {slide.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 sm:h-3 rounded-full transition-all ${
                  index === currentSlide ? "bg-[#0E3D8C] w-6 sm:w-8" : "bg-[#0E3D8C]/50 w-2 sm:w-3"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="bg-[#EDEFF1] py-16 sm:py-20 border-b border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-5xl font-black mb-4 text-black animate-fade-in">{t("Latest Updates", "最新动态")}</h2>
              <p className="text-sm sm:text-lg max-w-2xl mx-auto text-gray-700 px-4">
                {t(
                  "Explore the latest research findings from the East Asian Gender Bridge, where we analyze emerging trends, test new concepts, and translate evidence-based solutions into public dialogue and action.",
                  "探索来自东亚性别桥梁的最新研究发现。我们在此分析新兴趋势、验证新概念，并将基于证据的解决方案转化为公共对话与行动。"
                )}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="p-6 bg-white border-none transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style={{boxShadow: '0 4px 8px rgba(0,0,0,0.05)'}}>
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-gray-500">25 October, 2025</p>
                  <h3 className="text-lg sm:text-2xl font-bold transition-colors hover:text-[#d62e39]">
                    {t("Bias Amplification in Visual Recognition: How Structured Models Perpetuate and Exacerbate Social Stereotypes", "视觉识别任务中的偏见放大：结构化模型如何固化并恶化社会刻板印象")}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 line-clamp-2">
                    {t(
                      "Visual recognition tasks that incorporate language are increasingly combining structured prediction and deep learning. However, research by Zhao et al. (2017) warns that these methods may discover and exploit societal biases...",
                      "视觉识别任务越来越多地结合结构化预测和深度学习。然而，赵洁玉等人进行的研究（2017）警告说，这种方法存在风险，即它可能会发现并利用底层网络语料库中存在的社会偏见..."
                    )}
                  </p>
                  <Link href="/blog/1" className="inline-flex items-center text-sm sm:text-base text-[#00A8A8] font-semibold hover:underline hover:translate-x-2 transition-transform">
                    {t("View Item", "查看详情")} →
                  </Link>
                </div>
              </Card>

              <Card className="p-6 bg-white border-none transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style={{boxShadow: '0 4px 8px rgba(0,0,0,0.05)'}}>
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-gray-500">30 October, 2025</p>
                  <h3 className="text-lg sm:text-2xl font-bold transition-colors hover:text-[#d62e39]">
                    {t("Algorithmic Discrimination: A New Perspective on Cost-Driven Information Inequality", "算法歧视的新视角：成本效益驱动下的信息分配不均")}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 line-clamp-2">
                    {t(
                      "The increasing adoption of algorithms in decision-making has generated concerns about discriminatory outcomes. This empirical study by Lambrecht and Tucker (2018) provides a nuanced explanation...",
                      "算法在自动化决策中的应用日益普遍，引发了人们对自动化选择可能产生歧视性结果的深切关注。Lambrecht 和 Tucker (2018) 通过一项针对 STEM 职业机会广告投放的实证研究，提供了一个新颖的解释..."
                    )}
                  </p>
                  <Link href="/blog/2" className="inline-flex items-center text-sm sm:text-base text-[#00A8A8] font-semibold hover:underline hover:translate-x-2 transition-transform">
                    {t("View Item", "查看详情")} →
                  </Link>
                </div>
              </Card>
            </div>

            <div className="text-right">
              <Link href="/blog" className="text-base sm:text-2xl font-bold hover:underline hover:text-[#00A8A8] transition-all hover:translate-x-2 inline-block">
                {t("View All", "查看全部")} →
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Footer with Follow Us */}
      <footer className="bg-[#F6F7F8] py-8 sm:py-12 lg:py-16 border-t-2 border-[#4B4B4B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-lg sm:text-3xl lg:text-5xl font-black mb-2 sm:mb-4 lg:mb-6 text-black">{t("Follow Us", "关注我们")}</h2>
            <p className="text-xs sm:text-base lg:text-xl text-[#333] mb-4 sm:mb-6 lg:mb-8">{t("Join our community and stay connected", "加入我们的社区，保持联系")}</p>

            <div className="flex justify-center space-x-3 sm:space-x-5 lg:space-x-8">
              <a href="#" className="group" title="Twitter">
                <div className="w-8 h-8 sm:w-11 sm:h-11 lg:w-14 lg:h-14 rounded-full bg-black flex items-center justify-center group-hover:bg-[#d62e39] transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 text-white transition-transform group-hover:rotate-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
              </a>
              <a href="#" className="group" title="Facebook">
                <div className="w-8 h-8 sm:w-11 sm:h-11 lg:w-14 lg:h-14 rounded-full bg-black flex items-center justify-center group-hover:bg-[#d62e39] transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 text-white transition-transform group-hover:rotate-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>

          <div className="border-t-2 border-gray-300 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="space-y-2 text-center md:text-left">
                <p className="text-sm">
                  <span className="font-semibold">E:</span>{" "}
                  <a href="mailto:contact.eagenderbridge@gmail.com" className="hover:underline">
                    contact.eagenderbridge@gmail.com
                  </a>
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm">{t("Designed & Developed by", "设计与开发")}</p>
                <span className="font-bold">Yara,LI</span>
              </div>
            </div>
            <div className="mt-8 text-center text-sm text-gray-600">© 2025 East Asian Gender Bridge</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
