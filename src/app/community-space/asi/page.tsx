"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { useState } from "react";

type Question = {
  statement: { en: string; zh: string };
  reversed: boolean; // true if higher score means less bias
};

export default function ASIGame() {
  const { t, updateGameProgress, language } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(true);

  // English version: 22 questions (original ASI)
  const questionsEN: Question[] = [
    {
      statement: {
        en: "Women exaggerate problems they have at work.",
        zh: "女性夸大她们在工作中的问题。"
      },
      reversed: false
    },
    {
      statement: {
        en: "Women are too easily offended.",
        zh: "女性太容易被冒犯。"
      },
      reversed: false
    },
    {
      statement: {
        en: "Most women interpret innocent remarks as being sexist.",
        zh: "大多数女性把无辜的言论解读为性别歧视。"
      },
      reversed: false
    },
    {
      statement: {
        en: "When women lose to men in a fair competition, they typically complain about being discriminated against.",
        zh: "当女性在公平竞争中输给男性时，她们通常会抱怨被歧视。"
      },
      reversed: false
    },
    {
      statement: {
        en: "Many women are actually seeking special favors under the guise of asking for 'equality.'",
        zh: "许多女性实际上是在以要求'平等'为幌子寻求特殊照顾。"
      },
      reversed: false
    },
    {
      statement: {
        en: "Feminists are making entirely reasonable demands of men.",
        zh: "女权主义者对男性提出的要求是完全合理的。"
      },
      reversed: true
    },
    {
      statement: {
        en: "Feminists are not seeking for women to have more power than men.",
        zh: "女权主义者并不寻求让女性拥有比男性更多的权力。"
      },
      reversed: true
    },
    {
      statement: {
        en: "Women seek power by getting control over men.",
        zh: "女性通过控制男性来寻求权力。"
      },
      reversed: false
    },
    {
      statement: {
        en: "There are actually very few women who get a kick out of teasing men and then refusing their advances.",
        zh: "实际上很少有女性会以戏弄男性然后拒绝他们的追求为乐。"
      },
      reversed: true
    },
    {
      statement: {
        en: "Once a woman gets a man to commit to her, she usually tries to put him on a tight leash.",
        zh: "一旦女性让男性对她承诺，她通常会试图把他拴得很紧。"
      },
      reversed: false
    },
    {
      statement: {
        en: "Most women fail to appreciate all that men do for them.",
        zh: "大多数女性不懂得感激男性为她们所做的一切。"
      },
      reversed: false
    },
    {
      statement: {
        en: "A good woman should be set on a pedestal by her man.",
        zh: "好女人应该被她的男人捧在神坛上。"
      },
      reversed: false
    },
    {
      statement: {
        en: "Women should be cherished and protected by men.",
        zh: "女性应该被男性珍爱和保护。"
      },
      reversed: false
    },
    {
      statement: {
        en: "Men should be willing to sacrifice their own well-being in order to provide financially for the women in their lives.",
        zh: "男性应该愿意为了在经济上供养他们生活中的女性而牺牲自己的福祉。"
      },
      reversed: false
    },
    {
      statement: {
        en: "In a disaster, women need not be rescued first.",
        zh: "在灾难中，女性不需要被首先救援。"
      },
      reversed: true
    },
    {
      statement: {
        en: "Women, compared to men, tend to have a superior moral sensibility.",
        zh: "与男性相比，女性往往具有更高的道德敏感性。"
      },
      reversed: false
    },
    {
      statement: {
        en: "Many women have a quality of purity that few men possess.",
        zh: "许多女性拥有很少有男性具备的纯洁品质。"
      },
      reversed: false
    },
    {
      statement: {
        en: "Women, as compared to men, tend to have a more refined sense of culture and good taste.",
        zh: "与男性相比，女性往往具有更精致的文化和品味感。"
      },
      reversed: false
    },
    {
      statement: {
        en: "Every man ought to have a woman whom he adores.",
        zh: "每个男人都应该有一个他所崇拜的女人。"
      },
      reversed: false
    },
    {
      statement: {
        en: "Men are complete without women.",
        zh: "没有女性，男性也是完整的。"
      },
      reversed: true
    },
    {
      statement: {
        en: "No matter how accomplished he is, a man is not truly complete as a person unless he has the love of a woman.",
        zh: "无论他多么有成就，一个男人如果没有女人的爱，就不是真正完整的人。"
      },
      reversed: false
    },
    {
      statement: {
        en: "People are often truly happy without being romantically involved with a member of the other sex.",
        zh: "人们经常在没有与异性浪漫交往的情况下真正快乐。"
      },
      reversed: true
    }
  ];

  // Chinese version: 16 questions (localized version)
  const questionsZH: Question[] = [
    {
      statement: {
        en: "Women exaggerate problems they have at work.",
        zh: "女性在工作中的问题常被夸大。"
      },
      reversed: false
    },
    {
      statement: {
        en: "Women are too easily offended.",
        zh: "女性太容易被冒犯。"
      },
      reversed: false
    },
    {
      statement: {
        en: "Most women interpret innocent remarks as being sexist.",
        zh: "多数女性把无伤大雅的言论都解读为性别歧视。"
      },
      reversed: false
    },
    {
      statement: {
        en: "When women lose to men in a fair competition, they typically complain about being discriminated against.",
        zh: "在公平竞争中输给男性时，女性通常会抱怨被歧视。"
      },
      reversed: false
    },
    {
      statement: {
        en: "Many women are actually seeking special favors under the guise of asking for 'equality.'",
        zh: "许多女性其实是以'平等'为名寻求特殊照顾。"
      },
      reversed: false
    },
    {
      statement: {
        en: "Women seek power by getting control over men.",
        zh: "女性通过掌控男性来寻求权力。"
      },
      reversed: false
    },
    {
      statement: {
        en: "Once a woman gets a man to commit to her, she usually tries to put him on a tight leash.",
        zh: "一旦让男人与她承诺，女人通常会把男人拴得很紧。"
      },
      reversed: false
    },
    {
      statement: {
        en: "Most women fail to appreciate all that men do for them.",
        zh: "大多数女性不懂得感激男人为她们所做的一切。"
      },
      reversed: false
    },
    {
      statement: {
        en: "A good woman should be set on a pedestal by her man.",
        zh: "好女人应当被她的男人捧在神坛上。"
      },
      reversed: false
    },
    {
      statement: {
        en: "Women should be cherished and protected by men.",
        zh: "男人应当珍爱并保护女人。"
      },
      reversed: false
    },
    {
      statement: {
        en: "Men should be willing to sacrifice their own well-being in order to provide financially for the women in their lives.",
        zh: "男人应该愿意为供养生活中的女人而牺牲自身福祉。"
      },
      reversed: false
    },
    {
      statement: {
        en: "Women, compared to men, tend to have a superior moral sensibility.",
        zh: "女性往往具有更高的道德感。"
      },
      reversed: false
    },
    {
      statement: {
        en: "Many women have a quality of purity that few men possess.",
        zh: "许多女性拥有少有男人具备的纯洁品质。"
      },
      reversed: false
    },
    {
      statement: {
        en: "Women, as compared to men, tend to have a more refined sense of culture and good taste.",
        zh: "女性通常对文化与品味更为精致。"
      },
      reversed: false
    },
    {
      statement: {
        en: "Every man ought to have a woman whom he adores.",
        zh: "每个男人都该有一个他所崇敬的女人。"
      },
      reversed: false
    },
    {
      statement: {
        en: "No matter how accomplished he is, a man is not truly complete as a person unless he has the love of a woman.",
        zh: "无论多么成功，男人没有女人的爱就不算真正圆满。"
      },
      reversed: false
    }
  ];

  const questions = language === "zh" ? questionsZH : questionsEN;

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setAssessmentCompleted(true);
      // Calculate score when completing
      let totalScore = 0;
      newAnswers.forEach((answer, index) => {
        const question = questions[index];
        if (question.reversed) {
          totalScore += answer;
        } else {
          totalScore += (6 - answer);
        }
      });
      const percentage = (totalScore / (questions.length * 5)) * 100;
      updateGameProgress('asi', true);
      updateGameProgress('asiScore', Math.round(percentage));
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    answers.forEach((answer, index) => {
      const question = questions[index];
      if (question && question.reversed) {
        totalScore += answer; // Higher is better
      } else {
        totalScore += (6 - answer); // Lower is better (reversed)
      }
    });

    const percentage = (totalScore / (questions.length * 5)) * 100;
    return percentage;
  };

  const getResult = () => {
    const score = calculateScore();

    if (score >= 75) {
      return {
        level: t("Low Sexism", "性别偏见较低"),
        emoji: "🟢",
        color: "text-green-600",
        bg: "bg-green-50",
        pyramidLevel: "top",
        message: {
          en: "You demonstrate low levels of ambivalent sexism and show respect for gender equality.",
          zh: "你表现出较低的矛盾性别偏见，并显示出对性别平等的尊重。"
        }
      };
    } else if (score >= 50) {
      return {
        level: t("Moderate Sexism", "性别偏见中等"),
        emoji: "🟡",
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        pyramidLevel: "middle",
        message: {
          en: "You show some awareness of gender issues but may hold certain biases. Continue learning about gender equality.",
          zh: "你对性别问题有一定认识，但可能持有某些偏见。继续学习性别平等。"
        }
      };
    } else {
      return {
        level: t("High Sexism", "性别偏见较高"),
        emoji: "🔴",
        color: "text-red-600",
        bg: "bg-red-50",
        pyramidLevel: "bottom",
        message: {
          en: "Your responses suggest higher levels of ambivalent sexism. We encourage you to learn more about gender equality.",
          zh: "你的回答表明较高的矛盾性别偏见。我们鼓励你更多地了解性别平等。"
        }
      };
    }
  };

  const PyramidVisualization = ({ userLevel }: { userLevel: string }) => {
    return (
      <div className="flex items-center justify-center my-8">
        <div className="relative flex flex-col items-center">
          {/* Top Level - Green */}
          <div className={`w-40 h-20 flex items-center justify-center text-white font-bold text-sm mb-1 ${
            userLevel === "top" ? "bg-green-500 shadow-lg scale-110" : "bg-green-300"
          }`}>
            <div className="text-center">
              <div className="text-xs">{t("Low Sexism", "性别偏见较低")}</div>
              <div className="text-xs">75-100%</div>
            </div>
          </div>
          {userLevel === "top" && (
            <div className="absolute left-full ml-4 top-4 text-xl font-bold text-green-600 whitespace-nowrap">
              ⬅ {t("You are here", "你在这里")}
            </div>
          )}
          
          {/* Middle Level - Yellow */}
          <div className={`w-56 h-20 flex items-center justify-center text-white font-bold text-sm mb-1 relative ${
            userLevel === "middle" ? "bg-yellow-500 shadow-lg scale-110" : "bg-yellow-300"
          }`}>
            <div className="text-center">
              <div className="text-xs">{t("Moderate Sexism", "性别偏见中等")}</div>
              <div className="text-xs">50-74%</div>
            </div>
            {userLevel === "middle" && (
              <div className="absolute left-full ml-4 text-xl font-bold text-yellow-600 whitespace-nowrap">
                ⬅ {t("You are here", "你在这里")}
              </div>
            )}
          </div>
          
          {/* Bottom Level - Red */}
          <div className={`w-72 h-20 flex items-center justify-center text-white font-bold text-sm relative ${
            userLevel === "bottom" ? "bg-red-500 shadow-lg scale-110" : "bg-red-300"
          }`}>
            <div className="text-center">
              <div className="text-xs">{t("High Sexism", "性别偏见较高")}</div>
              <div className="text-xs">0-49%</div>
            </div>
            {userLevel === "bottom" && (
              <div className="absolute left-full ml-4 text-xl font-bold text-red-600 whitespace-nowrap">
                ⬅ {t("You are here", "你在这里")}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setAssessmentCompleted(false);
  };

  // Scoring anchors
  const scoringAnchors = language === "zh" 
    ? "1=非常不同意 … 5=非常同意（无反向题）"
    : "0=完全不同意 … 5=完全同意（含反向计分）";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00357a]/10 to-[#004a9e]/10">
      <Navigation />
      
      {/* Privacy & Ethics Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-black mb-6 text-center text-[#00357a]">
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
                  className="bg-[#00357a] text-white hover:bg-[#004a9e] px-8 py-3 text-lg font-bold rounded-full shadow-lg transition-all hover:scale-105"
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
            {language === "en" ? "ASI Assessment" : "矛盾性别偏见自测"}
          </span>
        </div>

        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-6xl font-black mb-4 whitespace-nowrap">
              {t("Ambivalent Sexism Inventory", "矛盾性别偏见自测")}
            </h1>
            <p className="text-xl text-gray-700">
              {t("Self-reflection on gender attitudes", "性别态度自我反思")}
            </p>
          </div>

          {/* Scale Reference - Now first */}
          <Card className="p-6 bg-gray-50 border-gray-200 mb-6">
            <div className="text-center">
              <h3 className="text-lg font-bold mb-3 text-gray-800">
                {t("Scale Reference", "量表来源")}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Glick, P., & Fiske, S. T. (1996). <span className="font-semibold">Ambivalent Sexism Inventory.</span>
              </p>
              <p className="text-xs text-gray-500">
                {language === "en" 
                  ? "Chinese 16-item version references domestic localization and simplification research practices (HS/BS 8 items each, unidirectional scoring)."
                  : "中文16题简版参考了国内本土化与简化研究实践（HS/BS各8项，同向计分）。"
                }
              </p>
            </div>
          </Card>

          {/* Version Description */}
          <Card className="p-6 bg-blue-50 border-blue-200 mb-8">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4 text-blue-800">
                {t("Version Description", "版本说明")}
              </h3>
              <div className="space-y-2 text-sm text-blue-700">
                <p>
                  {language === "en" 
                    ? "ASI English: Using original 22 questions (including reverse scoring)"
                    : "ASI英文：采用原版22题（含反向计分）"
                  }
                </p>
                <p>
                  {language === "en" 
                    ? "ASI Chinese: Using 16 questions validated by domestic researchers (unidirectional scoring)"
                    : "ASI中文：采用国内研究者验证过的16题同向版"
                  }
                </p>
                <p className="text-xs italic">
                  {language === "en" 
                    ? "The two versions cannot be directly compared item by item, but both can be used for self-reflection."
                    : "两版不可直接逐项对比，但都能用于自我反思。"
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
                  <div className="bg-[#00357a] h-2 rounded-full transition-all" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-8 text-center">{questions[currentQuestion].statement[language]}</h3>

              <div className="space-y-3">
                {language === "zh" ? (
                  // Chinese version: 5-point scale
                  [
                    { value: 1, label: "非常不同意" },
                    { value: 2, label: "不同意" },
                    { value: 3, label: "中立" },
                    { value: 4, label: "同意" },
                    { value: 5, label: "非常同意" }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className="w-full p-4 rounded-lg border-2 border-gray-300 hover:border-[#00357a] hover:bg-blue-50 transition-all text-center font-semibold"
                    >
                      {option.label}
                    </button>
                  ))
                ) : (
                  // English version: 6-point scale (0-5)
                  [
                    { value: 0, label: "Strongly Disagree" },
                    { value: 1, label: "Disagree" },
                    { value: 2, label: "Slightly Disagree" },
                    { value: 3, label: "Slightly Agree" },
                    { value: 4, label: "Agree" },
                    { value: 5, label: "Strongly Agree" }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className="w-full p-4 rounded-lg border-2 border-gray-300 hover:border-[#00357a] hover:bg-blue-50 transition-all text-center font-semibold"
                    >
                      {option.label}
                    </button>
                  ))
                )}
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
                <div className="text-8xl mb-4">{getResult().emoji}</div>
                <h2 className="text-4xl font-black mb-4">{t("Assessment Complete!", "评估完成！")}</h2>
                <div className={`inline-block px-8 py-4 rounded-lg ${getResult().bg} mb-6`}>
                  <p className={`text-3xl font-black ${getResult().color}`}>{getResult().level}</p>
                </div>
                <p className="text-lg text-gray-700 mb-8">{getResult().message[language]}</p>
              </div>

              {/* Pyramid Visualization */}
              <PyramidVisualization userLevel={getResult().pyramidLevel} />

              <div className={`p-6 rounded-lg ${getResult().bg} mb-8`}>
                <h3 className="text-xl font-bold mb-4">{t("Your Responses & Insights", "你的回答与见解")}</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {questions.map((q, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg">
                      <p className="font-semibold mb-2">{q.statement[language]}</p>
                      <p className="text-sm text-gray-600 mb-2">
                        {t("Your answer", "你的回答")}: {
                          language === "zh" 
                            ? ["", "非常不同意", "不同意", "中立", "同意", "非常同意"][answers[index]]
                            : ["Strongly Disagree", "Disagree", "Slightly Disagree", "Slightly Agree", "Agree", "Strongly Agree"][answers[index]]
                        }
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={restart} className="bg-[#00357a] hover:bg-[#004a9e] text-white px-8 py-6 text-lg font-bold">
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
