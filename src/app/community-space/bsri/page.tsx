"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { useState } from "react";
import { Scale, User, UserCircle, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

type Question = {
  statement: { en: string; zh: string };
  category: "masculine" | "feminine" | "neutral";
};

export default function BSRIGame() {
  const { t, updateGameProgress, language } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(true);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    concept: false,
    innovation: false,
    results: false
  });

  // BSRI 60 questions (same in both languages)
  const questions: Question[] = [
    // Masculine traits (1-20)
    {
      statement: { en: "Acts as a leader", zh: "表现为领导者" },
      category: "masculine"
    },
    {
      statement: { en: "Aggressive", zh: "好斗/进取心强" },
      category: "masculine"
    },
    {
      statement: { en: "Ambitious", zh: "有抱负" },
      category: "masculine"
    },
    {
      statement: { en: "Analytical", zh: "善于分析" },
      category: "masculine"
    },
    {
      statement: { en: "Assertive", zh: "坚定自信" },
      category: "masculine"
    },
    {
      statement: { en: "Athletic", zh: "运动型/体格健壮" },
      category: "masculine"
    },
    {
      statement: { en: "Competitive", zh: "好胜/有竞争心" },
      category: "masculine"
    },
    {
      statement: { en: "Defends own beliefs", zh: "维护自己的信念" },
      category: "masculine"
    },
    {
      statement: { en: "Dominant", zh: "支配性强" },
      category: "masculine"
    },
    {
      statement: { en: "Forceful", zh: "强硬" },
      category: "masculine"
    },
    {
      statement: { en: "Has leadership abilities", zh: "具有领导能力" },
      category: "masculine"
    },
    {
      statement: { en: "Independent", zh: "独立" },
      category: "masculine"
    },
    {
      statement: { en: "Individualistic", zh: "强调自我/个人主义" },
      category: "masculine"
    },
    {
      statement: { en: "Makes decisions easily", zh: "容易做决定" },
      category: "masculine"
    },
    {
      statement: { en: "Masculine", zh: "男性化/有男子气概" },
      category: "masculine"
    },
    {
      statement: { en: "Self-reliant", zh: "自立" },
      category: "masculine"
    },
    {
      statement: { en: "Self-sufficient", zh: "自足/自给自足" },
      category: "masculine"
    },
    {
      statement: { en: "Strong personality", zh: "个性强" },
      category: "masculine"
    },
    {
      statement: { en: "Willing to take a stand", zh: "愿意表明立场" },
      category: "masculine"
    },
    {
      statement: { en: "Willing to take risks", zh: "愿意冒险" },
      category: "masculine"
    },
    // Feminine traits (21-40)
    {
      statement: { en: "Affectionate", zh: "亲切/多情" },
      category: "feminine"
    },
    {
      statement: { en: "Cheerful", zh: "快活" },
      category: "feminine"
    },
    {
      statement: { en: "Childlike", zh: "天真/孩子气" },
      category: "feminine"
    },
    {
      statement: { en: "Compassionate", zh: "富有同情心" },
      category: "feminine"
    },
    {
      statement: { en: "Does not use harsh language", zh: "不说粗话" },
      category: "feminine"
    },
    {
      statement: { en: "Eager to soothe hurt feelings", zh: "乐于安慰受伤的感情" },
      category: "feminine"
    },
    {
      statement: { en: "Feminine", zh: "女性化" },
      category: "feminine"
    },
    {
      statement: { en: "Flatterable", zh: "容易被恭维" },
      category: "feminine"
    },
    {
      statement: { en: "Gentle", zh: "温柔" },
      category: "feminine"
    },
    {
      statement: { en: "Gullible", zh: "轻信" },
      category: "feminine"
    },
    {
      statement: { en: "Loves children", zh: "喜爱孩子" },
      category: "feminine"
    },
    {
      statement: { en: "Loyal", zh: "忠诚" },
      category: "feminine"
    },
    {
      statement: { en: "Sensitive to the needs of others", zh: "对他人的需求敏感" },
      category: "feminine"
    },
    {
      statement: { en: "Shy", zh: "害羞" },
      category: "feminine"
    },
    {
      statement: { en: "Soft-spoken", zh: "说话温和" },
      category: "feminine"
    },
    {
      statement: { en: "Sympathetic", zh: "同情的" },
      category: "feminine"
    },
    {
      statement: { en: "Tender", zh: "温和/体贴" },
      category: "feminine"
    },
    {
      statement: { en: "Understanding", zh: "善解人意" },
      category: "feminine"
    },
    {
      statement: { en: "Warm", zh: "温暖/热情" },
      category: "feminine"
    },
    {
      statement: { en: "Yielding", zh: "顺从" },
      category: "feminine"
    },
    // Neutral traits (41-60)
    {
      statement: { en: "Adaptable", zh: "适应性强" },
      category: "neutral"
    },
    {
      statement: { en: "Conceited", zh: "自负" },
      category: "neutral"
    },
    {
      statement: { en: "Conscientious", zh: "认真负责" },
      category: "neutral"
    },
    {
      statement: { en: "Conventional", zh: "循规蹈矩/传统" },
      category: "neutral"
    },
    {
      statement: { en: "Friendly", zh: "友好" },
      category: "neutral"
    },
    {
      statement: { en: "Happy", zh: "快乐" },
      category: "neutral"
    },
    {
      statement: { en: "Helpful", zh: "乐于助人" },
      category: "neutral"
    },
    {
      statement: { en: "Inefficient", zh: "低效" },
      category: "neutral"
    },
    {
      statement: { en: "Jealous", zh: "嫉妒" },
      category: "neutral"
    },
    {
      statement: { en: "Likable", zh: "讨人喜欢" },
      category: "neutral"
    },
    {
      statement: { en: "Moody", zh: "喜怒无常" },
      category: "neutral"
    },
    {
      statement: { en: "Reliable", zh: "可靠" },
      category: "neutral"
    },
    {
      statement: { en: "Secretive", zh: "深藏不露/保密" },
      category: "neutral"
    },
    {
      statement: { en: "Sincere", zh: "真诚" },
      category: "neutral"
    },
    {
      statement: { en: "Solemn", zh: "严肃" },
      category: "neutral"
    },
    {
      statement: { en: "Tactful", zh: "老练得体" },
      category: "neutral"
    },
    {
      statement: { en: "Theatrical", zh: "戏剧化/夸张" },
      category: "neutral"
    },
    {
      statement: { en: "Truthful", zh: "诚实" },
      category: "neutral"
    },
    {
      statement: { en: "Unpredictable", zh: "不可预知" },
      category: "neutral"
    },
    {
      statement: { en: "Unsystematic", zh: "无条理" },
      category: "neutral"
    }
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setAssessmentCompleted(true);
      // Calculate scores when completing
      let masculineScore = 0;
      let feminineScore = 0;
      let neutralScore = 0;
      let masculineCount = 0;
      let feminineCount = 0;
      let neutralCount = 0;

      newAnswers.forEach((answer, index) => {
        const question = questions[index];
        if (question.category === "masculine") {
          masculineScore += value;
          masculineCount++;
        } else if (question.category === "feminine") {
          feminineScore += value;
          feminineCount++;
        } else {
          neutralScore += value;
          neutralCount++;
        }
      });

      const avgMasculine = masculineCount > 0 ? masculineScore / masculineCount : 0;
      const avgFeminine = feminineCount > 0 ? feminineScore / feminineCount : 0;
      const avgNeutral = neutralCount > 0 ? neutralScore / neutralCount : 0;

      updateGameProgress('bsri', true);
      updateGameProgress('bsriScore', Math.round((avgMasculine + avgFeminine + avgNeutral) / 3 * 20)); // Scale to 0-100
    }
  };

  const calculateScores = () => {
    let masculineScore = 0;
    let feminineScore = 0;
    let neutralScore = 0;
    let masculineCount = 0;
    let feminineCount = 0;
    let neutralCount = 0;

    answers.forEach((answer, index) => {
      const question = questions[index];
      if (question.category === "masculine") {
        masculineScore += answer;
        masculineCount++;
      } else if (question.category === "feminine") {
        feminineScore += answer;
        feminineCount++;
      } else {
        neutralScore += answer;
        neutralCount++;
      }
    });

    return {
      masculine: masculineCount > 0 ? masculineScore / masculineCount : 0,
      feminine: feminineCount > 0 ? feminineScore / feminineCount : 0,
      neutral: neutralCount > 0 ? neutralScore / neutralCount : 0
    };
  };

  const getResult = () => {
    const scores = calculateScores();
    const { masculine, feminine } = scores;

    // Determine gender role type
    if (masculine >= 4.5 && feminine >= 4.5) {
      return {
        type: t("Androgynous", "双性化"),
        icon: Scale,
        color: "text-purple-600",
        bg: "bg-purple-50",
        message: {
          en: "You show both masculine and feminine characteristics, indicating psychological androgyny.",
          zh: "你表现出男性和女性特征，表明心理双性化。"
        }
      };
    } else if (masculine >= 4.5 && feminine < 4.5) {
      return {
        type: t("Masculine", "男性化"),
        icon: User,
        color: "text-blue-600",
        bg: "bg-blue-50",
        message: {
          en: "You show predominantly masculine characteristics.",
          zh: "你表现出主要的男性特征。"
        }
      };
    } else if (masculine < 4.5 && feminine >= 4.5) {
      return {
        type: t("Feminine", "女性化"),
        icon: UserCircle,
        color: "text-pink-600",
        bg: "bg-pink-50",
        message: {
          en: "You show predominantly feminine characteristics.",
          zh: "你表现出主要的女性特征。"
        }
      };
    } else {
      return {
        type: t("Undifferentiated", "未分化"),
        icon: HelpCircle,
        color: "text-gray-600",
        bg: "bg-gray-50",
        message: {
          en: "You show low levels of both masculine and feminine characteristics.",
          zh: "你表现出较低的男性和女性特征。"
        }
      };
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setAssessmentCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#059669]/10 to-[#10b981]/10">
      <Navigation />
      
      {/* Privacy & Ethics Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-black mb-6 text-center text-[#059669]">
                {t("Privacy & Ethics", "隐私与伦理")}
              </h2>
              
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>
                  {language === "en" 
                    ? "This self-assessment is designed for educational purposes and personal reflection only. It does not constitute a clinical diagnosis, psychological evaluation, or selection tool."
                    : "本自测工具仅用于教育和自我反思目的，不构成临床诊断、心理评估或选拔工具。"
                  }
                </p>
                <p>
                  {language === "en" 
                    ? "All your responses are processed and displayed locally in your browser. We do not collect, store, or transmit your answers to any server. Your privacy is fully protected."
                    : "您的所有回答均在浏览器本地处理和显示，我们不会收集、存储或传输您的答案到任何服务器。您的隐私受到充分保护。"
                  }
                </p>
                <p>
                  {language === "en" 
                    ? "You may exit this assessment at any time without any consequences. We recommend participants be at least 16 years old. If any content makes you uncomfortable, please stop immediately."
                    : "您可以随时退出本测评，不会产生任何后果。我们建议参与者年满16岁。如果任何内容让您感到不适，请立即停止。"
                  }
                </p>
                <p className="text-sm text-gray-600 italic">
                  {language === "en" 
                    ? "By clicking 'I Understand', you acknowledge that you have read and understood this notice."
                    : "点击\"我已了解\"即表示您已阅读并理解本声明。"
                  }
                </p>
              </div>
              
              <div className="mt-8 flex justify-center">
                <Button 
                  onClick={() => setShowPrivacyModal(false)}
                  className="bg-[#059669] text-white hover:bg-[#10b981] px-8 py-3 text-lg font-bold rounded-full shadow-lg transition-all hover:scale-105"
                >
                  {t("I Understand", "我已了解")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-sm text-gray-600 mb-8">
          <Link href="/" className="text-[#00a19a] font-semibold hover:underline">
            {language === "en" ? "Home" : "首页"}
          </Link>
          <span className="mx-2">&gt;&gt;</span>
          <Link href="/community-space" className="text-[#00a19a] font-semibold hover:underline">
            {language === "en" ? "Community Space" : "社区空间"}
          </Link>
          <span className="mx-2">&gt;&gt;</span>
          <span className="font-semibold text-black">
            {language === "en" ? "BSRI Assessment" : "性别角色自测"}
          </span>
        </div>

        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-6xl font-black mb-4 whitespace-nowrap">
              {t("Gender Role Self-Test", "性别角色自测")}
            </h1>
            <p className="text-base sm:text-xl text-gray-700">
              {t("BSRI Assessment", "BSRI评估")}
            </p>
          </div>

          {/* Scale Reference - Now first */}
          <Card className="p-6 bg-gray-50 border-gray-200 mb-6">
            <div className="text-center">
              <h3 className="text-lg font-bold mb-3 text-gray-800">
                {t("Scale Reference", "量表来源")}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Bem, S. L. (1974/1981). <span className="font-semibold">Bem Sex-Role Inventory.</span>
              </p>
              <p className="text-xs text-gray-500">
                {language === "en" 
                  ? "The BSRI measures psychological androgyny by assessing masculine, feminine, and neutral traits."
                  : "BSRI通过评估男性化、女性化和中性特征来测量心理双性化。"
                }
              </p>
            </div>
          </Card>

          {/* Version Description */}
          <Card className="p-6 bg-green-50 border-green-200 mb-8">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4 text-[#059669]">
                {t("Version Description", "版本说明")}
              </h3>
              <div className="space-y-2 text-sm text-[#059669]">
                <p>
                  {language === "en" 
                    ? "BSRI: Using original 60 questions (20 masculine, 20 feminine, 20 neutral traits)"
                    : "BSRI：采用原版60题（20个男性化、20个女性化、20个中性特征）"
                  }
                </p>
                <p className="text-xs italic">
                  {language === "en" 
                    ? "Both English and Chinese versions use the same 60 questions for consistency."
                    : "中英文版本均采用相同的60道题，确保一致性。"
                  }
                </p>
              </div>
            </div>
          </Card>

          {!assessmentCompleted ? (
            <Card className="p-8 bg-white shadow-xl">
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">
                  {t("Question", "问题")} {currentQuestion + 1} / {questions.length}
                </p>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div className="bg-[#059669] h-2 rounded-full transition-all" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-8 text-center">{questions[currentQuestion].statement[language]}</h3>

              <div className="space-y-3">
                {[
                  { value: 1, label: { en: "Almost never true", zh: "几乎完全不符合" } },
                  { value: 2, label: { en: "Usually not true", zh: "通常不符合" } },
                  { value: 3, label: { en: "Sometimes true", zh: "有时符合" } },
                  { value: 4, label: { en: "Often true", zh: "经常符合" } },
                  { value: 5, label: { en: "Usually true", zh: "通常符合" } },
                  { value: 6, label: { en: "Almost always true", zh: "几乎总是符合" } }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full p-4 rounded-lg border-2 border-gray-300 hover:border-[#059669] hover:bg-green-50 transition-all text-center font-semibold"
                  >
                    {option.label[language]}
                  </button>
                ))}
              </div>

              {currentQuestion > 0 && (
                <Button
                  onClick={() => {
                    setCurrentQuestion(currentQuestion - 1);
                    setAnswers(answers.slice(0, -1));
                  }}
                  className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white py-4 text-lg font-bold"
                >
                  ← {t("Previous Question", "上一题")}
                </Button>
              )}

              <p className="text-center mt-6 text-sm text-gray-500">
                {t("Answer honestly for accurate self-reflection", "诚实作答以获得准确的自我反思")}
              </p>
            </Card>
          ) : (
            <Card className="p-12 bg-white shadow-xl">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  {(() => {
                    const ResultIcon = getResult().icon;
                    return <ResultIcon className={`w-32 h-32 ${getResult().color}`} strokeWidth={1.5} />;
                  })()}
                </div>
                <h2 className="text-4xl font-black mb-4">{t("Assessment Complete!", "评估完成！")}</h2>
                <div className={`inline-block px-8 py-4 rounded-lg ${getResult().bg} mb-6`}>
                  <p className={`text-3xl font-black ${getResult().color}`}>{getResult().type}</p>
                </div>
                <p className="text-lg text-gray-700 mb-8">{getResult().message[language]}</p>
              </div>

              {/* Score Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {(() => {
                  const scores = calculateScores();
                  return [
                    {
                      title: t("Masculine Traits", "男性化特征"),
                      score: scores.masculine.toFixed(2),
                      color: "bg-blue-50 text-blue-600",
                      icon: User
                    },
                    {
                      title: t("Feminine Traits", "女性化特征"),
                      score: scores.feminine.toFixed(2),
                      color: "bg-pink-50 text-pink-600",
                      icon: UserCircle
                    },
                    {
                      title: t("Neutral Traits", "中性特征"),
                      score: scores.neutral.toFixed(2),
                      color: "bg-gray-50 text-gray-600",
                      icon: Scale
                    }
                  ].map((item, index) => (
                    <div key={index} className={`p-6 rounded-lg ${item.color}`}>
                      <div className="text-center">
                        <div className="flex justify-center mb-2">
                          <item.icon className="w-12 h-12" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                        <p className="text-2xl font-black">{item.score}</p>
                        <p className="text-sm opacity-75">1-7 scale</p>
                      </div>
                    </div>
                  ));
                })()}
              </div>

              {/* Collapsible Information Panels */}
          <div className="mt-12 space-y-4">
            {/* Section 1: Defining Gender Role */}
            <div className="border-2 border-green-100 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('concept')}
                className="w-full px-6 py-4 bg-green-50 hover:bg-green-100 transition-colors flex justify-between items-center text-left"
              >
                <h3 className="text-xl font-bold text-gray-900">
                  {language === "en" ? "I. Defining Gender Role" : "一、性别角色定义"}
                </h3>
                {expandedSections.concept ? (
                  <ChevronUp className="w-6 h-6 text-[#059669]" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-[#059669]" />
                )}
              </button>
              {expandedSections.concept && (
                <div className="px-6 py-6 bg-white animate-in slide-in-from-top duration-300">
                  <p className="text-lg leading-relaxed text-gray-700 mb-4">
                    <span className="font-bold">
                      {language === "en" ? "Definition and Distinction: " : "定义与区分："}
                    </span>
                    {language === "en"
                      ? "Gender Role refers to a set of personalities, behaviors, and traits that an individual exhibits and which are culturally defined as either masculine (e.g., independent, assertive) or feminine (e.g., gentle, affectionate). Crucially, gender role is culturally constructed and is not determined by biological sex or sexual orientation."
                      : "性别角色（Gender Role）指的是一个人所展现的，且被社会文化定义为男性化（如独立、果断）或女性化（如温柔、有爱心）的一系列性格、行为和特质。关键在于，性别角色是文化建构的，并非生理性别或性取向的决定因素。"
                    }
                  </p>
                </div>
              )}
            </div>

                {/* Section 2: BSRI Innovation */}
                <div className="border-2 border-green-100 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('innovation')}
                    className="w-full px-6 py-4 bg-green-50 hover:bg-green-100 transition-colors flex justify-between items-center text-left"
                  >
                    <h3 className="text-xl font-bold text-gray-900">
                      {language === "en" ? "II. BSRI's Genesis and Innovation" : "二、BSRI 量表的诞生与创新"}
                    </h3>
                    {expandedSections.innovation ? (
                      <ChevronUp className="w-6 h-6 text-[#059669]" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-[#059669]" />
                    )}
                  </button>
                  {expandedSections.innovation && (
                    <div className="px-6 py-6 bg-white animate-in slide-in-from-top duration-300">
                      <div className="space-y-4">
                        <div>
                          <p className="font-bold text-lg mb-2">
                            {language === "en" ? "1. Context and Purpose of the BSRI:" : "1）BSRI 的时代背景和目的："}
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            {language === "en"
                              ? "In the 1970s, the prevailing view in psychology was that 'masculinity' and 'femininity' were mutually exclusive, operating on a bipolar continuum. American psychologist Sandra Bem introduced the BSRI, aiming to challenge this traditional binary view of gender. Her purpose was to demonstrate through measurement that individuals could possess high levels of both trait categories simultaneously."
                              : "在 20 世纪 70 年代，心理学界普遍认为「男性化」与「女性化」是非此即彼的对立两端。美国心理学家 Sandra Bem 提出 BSRI，旨在挑战这种传统的二元性别观。她的目的在于通过测量，证明个体可以同时拥有这两类特质。"
                            }
                          </p>
                        </div>
                        <div>
                          <p className="font-bold text-lg mb-2">
                            {language === "en" ? "2. BSRI's Innovation and Measurement Goals:" : "2）BSRI 的创新点和测量目标："}
                          </p>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            {language === "en"
                              ? "The BSRI's innovation lies in treating masculinity and femininity as two independent, simultaneously existing dimensions. Its measurement targets two dimensions of positive traits:"
                              : "BSRI 的创新在于将男性化和女性化视为两把独立的、可以同时存在的尺子。它测量的目标是两个维度的积极特质："
                            }
                          </p>
                          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li>
                              <span className="font-semibold">
                                {language === "en" ? "Instrumental Traits: " : "工具性特质（Instrumental）："}
                              </span>
                              {language === "en"
                                ? "Traits universally defined by society as 'masculine' (e.g., confidence, leadership)."
                                : "即社会普遍认定的「男性化」特质（如自信、领导力）。"
                              }
                            </li>
                            <li>
                              <span className="font-semibold">
                                {language === "en" ? "Expressive Traits: " : "表达性特质（Expressive）："}
                              </span>
                              {language === "en"
                                ? "Traits universally defined by society as 'feminine' (e.g., empathy, nurturing)."
                                : "即社会普遍认定的「女性化」特质（如共情、关怀）。"
                              }
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Section 3: Results Interpretation and Theoretical Significance */}
                <div className="border-2 border-green-100 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('results')}
                    className="w-full px-6 py-4 bg-green-50 hover:bg-green-100 transition-colors flex justify-between items-center text-left"
                  >
                    <h3 className="text-xl font-bold text-gray-900">
                      {language === "en" ? "III. Results Interpretation and Theoretical Significance" : "三、结果解读与理论意义"}
                    </h3>
                    {expandedSections.results ? (
                      <ChevronUp className="w-6 h-6 text-[#059669]" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-[#059669]" />
                    )}
                  </button>
                  {expandedSections.results && (
                    <div className="px-6 py-6 bg-white animate-in slide-in-from-top duration-300">
                      <div className="space-y-4">
                        <div>
                          <p className="font-bold text-lg mb-2">
                            {language === "en" ? "1. Explanation and Significance of Test Results:" : "1）测试结果的说明和意义："}
                          </p>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            {language === "en"
                              ? "Based on your scores in the two dimensions, the BSRI classifies your gender role into four types: Masculine, Feminine, Androgynous, or Undifferentiated."
                              : "BSRI 根据您在上述两个维度上的得分高低，将您的性别角色划分为四种类型：男性化、女性化、双性化、未分化。"
                            }
                          </p>
                          <p className="text-gray-700 leading-relaxed mb-2">
                            <span className="font-semibold">
                              {language === "en" ? "Theoretical Significance:" : "理论意义："}
                            </span>
                          </p>
                          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li>
                              {language === "en"
                                ? "'Androgynous' individuals, who possess high levels of both instrumental and expressive traits, are generally regarded as having the highest level of adaptability and psychological resilience, allowing them to respond flexibly to various situational demands."
                                : "「双性化」个体同时具备高水平的工具性和表达性特质，被认为拥有最高的适应性和心理弹性，能够灵活应对不同情境的需求。"
                              }
                            </li>
                            <li>
                              {language === "en"
                                ? "'Undifferentiated' individuals score low on both trait dimensions and are typically considered to have lower levels of psychological adjustment."
                                : "「未分化」个体则两方面的特质均不突出，通常被认为适应性较弱。"
                              }
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-bold text-lg mb-2">
                            {language === "en" ? "2. Limitations and Critical Reflection on the BSRI:" : "2）BSRI 测量的局限性与批判性思考："}
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            {language === "en"
                              ? "The BSRI's measurement of 'masculinity' and 'femininity' refers to prevailing societal stereotypes. We recognize today that traits such as independence, confidence, and assertiveness are positive human qualities shared by all, and are not exclusive to any single gender. The true value of the BSRI lies precisely in its ability to help us see how we can transcend the limitations imposed by these stereotypes."
                              : "BSRI 测量的「男性化」和「女性化」，指的是社会上普遍存在的刻板印象。我们今天知道，独立、自信、果断等特质是人类共有的、积极的品质，它们不属于任何一个性别。BSRI 的真正价值，恰恰在于帮助我们看到自己如何超越这些刻板印象的限制。"
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Section 4: Conclusion - Independent Card (Always Visible) */}
              <div className="mt-8 border-4 border-[#059669] rounded-lg bg-gradient-to-br from-green-50 to-white p-8 shadow-lg">
                <h3 className="text-2xl font-black text-[#059669] mb-6">
                  {language === "en" ? "Conclusion" : "总结"}
                </h3>
                <p className="text-lg leading-relaxed text-gray-700">
                  <span className="font-bold text-gray-900">
                    {language === "en" ? "Beyond the Score: " : "从量表到自我赋能（Beyond the Score）："}
                  </span>
                  {language === "en"
                    ? "Please regard your test results as a starting point, not an endpoint. Understanding your gender role style can help you recognize which positive traits you already possess and which traits (regardless of their \"masculine\" or \"feminine\" label) you wish to further develop. The ultimate goal is to achieve the integration of traits and the full realization of personal potential."
                    : "请将您的测试结果视为一个起点，而非终点。了解自己的性别角色风格，可以帮助您认识到哪些积极特质您已经拥有，哪些特质您希望进一步发展，最终目标是实现特质的整合与个人的充分发展。"
                  }
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button onClick={restart} className="bg-[#059669] hover:bg-[#10b981] text-white px-8 py-6 text-lg font-bold">
                  {t("Retake Assessment", "重新测评")}
                </Button>
                <Link href="/community-space">
                  <Button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-6 text-lg font-bold">
                    {t("Try Other Games", "尝试其他游戏")}
                  </Button>
                </Link>
              </div>
            </Card>
          )}

        </AnimatedSection>
      </div>
    </div>
  );
}
