"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Navigation } from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutUs() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumb currentPage="About Us" currentPageZh="关于我们" />

        <AnimatedSection immediate={true}>
          <div className="mb-16">
            <h1 className="text-6xl font-black mb-8">{t("Our Mission", "我们的使命")}</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-gray-700">
                {language === "en" 
                  ? "Our mission is to serve as a bridge connecting global academic gender research, local East Asian community voices, and civic action. We believe that truly meaningful social change is achieved only when theoretical insights are transformed into actionable tools and advocacy."
                  : "我们的使命是成为连接全球性别学术研究、东亚在地社群声音和公民实践行动的桥梁。我们相信，只有将理论洞察转化为可操作的工具和倡导，才能实现真正有意义的社会变革。"
                }
              </p>
            </div>
          </div>
        </AnimatedSection>

        <div className="border-t-4 border-gray-300 my-12"></div>

        <AnimatedSection delay={100}>
          <div className="mb-16">
            <h1 className="text-6xl font-black mb-8">{t("Our Goals", "我们的目标")}</h1>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  {language === "en" ? "Knowledge Empowerment" : "知识赋能"}
                </h2>
                <p className="text-lg leading-relaxed text-gray-700">
                  {language === "en"
                    ? "To gather and disseminate cutting-edge gender research findings, with a special focus on emerging issues such as Intersectionality, Queer Theory, and digital space governance—for example, the representation, censorship, and discipline of gender and sexual minorities by AI systems in the East Asian digital ecosystem. We are committed to breaking down the ivory tower of academia and making knowledge accessible to all."
                    : "汇集并传播最前沿的性别研究成果，特别关注交叉性（Intersectionality）、酷儿理论，以及数字空间治理等新兴议题，例如人工智能系统在东亚数字生态中对性少数群体的再现、审查与规训。我们致力于打破学术象牙塔，让知识普惠大众。"
                  }
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  {language === "en" ? "Fostering Community Dialogue" : "促进社群对话"}
                </h2>
                  <p className="text-lg leading-relaxed text-gray-700">
                  {language === "en"
                    ? "To create a safe and inclusive interactive space that encourages individuals across East Asia to share authentic gender experiences, challenge stereotypes, and foster mutual understanding and emotional support. We also design interactive games (such as self-assessment scales and knowledge quizzes) to innovatively stimulate the public's critical reflection and deeper understanding of gender concepts."
                    : "打造一个安全、包容的互动空间，鼓励东亚不同地区的个体分享真实的性别经验、挑战刻板印象，实现互相理解和情感支持。我们同时设计了互动游戏（如量表自测、知识挑战），以创新方式激发公众对性别概念的批判性反思与认知深化。"
                  }
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  {language === "en" ? "Driving Evidence-Based Action" : "驱动循证行动"}
                </h2>
                  <p className="text-lg leading-relaxed text-gray-700">
                  {language === "en"
                    ? "To translate academic discoveries into practical advocacy efforts, and to build a cooperation platform (Research Calls) for scholars and the public, thereby promoting effective, evidence-based social intervention."
                    : "将学术发现转化为实际的倡导行动（Advocacy），并为学者与公众搭建合作平台（Research Calls），促进有效的、基于证据的社会干预。"
                  }
                  </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="border-t-4 border-gray-300 my-12"></div>

        <AnimatedSection delay={200}>
          <div>
            <h1 className="text-6xl font-black mb-8">{t("Our Team", "我们的团队")}</h1>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-[#00a19a]">Yara, LI</h2>
              <p className="text-xl font-semibold mb-4 text-gray-800">{t("Founder & Project Director", "创始人 & 项目总监")}</p>
              <p className="text-lg leading-relaxed text-gray-700 mb-4">
                {language === "en"
                  ? "Yara, LI holds an M.A. in Sociology from the University of Manchester. Her research interests are highly focused on gender issues in the digital age, encompassing the intersection of AI & Gender, Digital Humanities, Platform Governance, and algorithmic bias."
                  : "Yara, LI 拥有曼彻斯特大学社会学硕士 (M.A.) 学位。她的研究兴趣高度聚焦于数字时代下的性别议题，包括人工智能与性别、数字人文、平台治理与算法偏见的交叉领域。"
                }
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                {language === "en"
                  ? "She has previously worked for technology companies such as JD, Kuaishou, and NetEase, accumulating rich experience in data and operations. This unique cross-disciplinary background ensures the depth of the website's content and the efficacy of its dissemination strategy, aiming to achieve the project's non-profit goals in a professional and pragmatic manner."
                  : "她曾任职于京东、快手、网易等科技公司，积累了丰富的数据与运营经验。这一独特的学术-业界跨界背景确保了网站内容的深度和传播策略的有效性，致力于以专业、务实的方式实现项目的公益目标。"
                }
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
