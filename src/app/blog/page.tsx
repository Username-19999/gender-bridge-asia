"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function BlogPage() {
  const { t } = useLanguage();

  const articles = [
    {
      id: 1,
      date: "25 October, 2025",
      title: t("Bias Amplification in Visual Recognition: How Structured Models Perpetuate and Exacerbate Social Stereotypes", "视觉识别任务中的偏见放大：结构化模型如何固化并恶化社会刻板印象"),
      excerpt: t("Visual recognition tasks that incorporate language are increasingly combining structured prediction and deep learning. However, research by Zhao et al. (2017) warns that these methods may discover and exploit societal biases present in web corpora.", "视觉识别任务越来越多地结合结构化预测和深度学习。然而，赵洁玉等人进行的研究（2017）警告说，这种方法存在风险，即它可能会发现并利用底层网络语料库中存在的社会偏见。"),
      category: t("Research", "研究"),
      color: "border-l-4 border-[#00a19a]"
    },
    {
      id: 2,
      date: "30 October, 2025",
      title: t("Algorithmic Discrimination: A New Perspective on Cost-Driven Information Inequality", "算法歧视的新视角：成本效益驱动下的信息分配不均"),
      excerpt: t("The increasing adoption of algorithms in decision-making has generated concerns about discriminatory outcomes. This empirical study by Lambrecht and Tucker (2018) provides a nuanced explanation by examining the display of ads promoting STEM career opportunities.", "算法在自动化决策中的应用日益普遍，引发了人们对自动化选择可能产生歧视性结果的深切关注。Lambrecht 和 Tucker (2018) 通过一项针对 STEM 职业机会广告投放的实证研究，提供了一个新颖的解释。"),
      category: t("Research", "研究"),
      color: "border-l-4 border-[#00a19a]"
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumb currentPage="Blog" currentPageZh="博客" />

        <AnimatedSection>
          <div className="mb-16">
            <h1 className="text-6xl font-black mb-4">{t("Research Blog", "研究博客")}</h1>
            <p className="text-xl text-gray-600 mb-12">
              {t("Explore cutting-edge research directions in gender studies and regional insights from across East Asia", "探索性别研究的前沿方向，并获取东亚地区的区域洞察")}
            </p>

            <div className="grid gap-8">
              {articles.map((article, index) => (
                <AnimatedSection key={article.id} delay={index * 100}>
                  <Card className={`p-8 bg-white hover:shadow-xl transition-all ${article.color}`}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div className="mb-2 md:mb-0">
                        <span className="inline-block bg-gray-100 px-3 py-1 text-sm font-bold mb-2">{article.category}</span>
                        <p className="text-sm text-gray-500">{article.date}</p>
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">{article.title}</h2>
                    <p className="text-gray-700 text-lg mb-6 leading-relaxed line-clamp-2">{article.excerpt}</p>
                    <Link href={`/blog/${article.id}`} className="inline-flex items-center text-[#00a19a] font-bold text-lg hover:underline">
                      {t("Read Full Article", "阅读全文")} →
                    </Link>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
