"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function AcademicHub() {
  const { t } = useLanguage();
  const researchFrontiers = [
    {
      title: t("Intersectionality, Multi-Axis Oppression, and Structural Inequality", "交叉性、多重压迫与结构性不平等"),
      description: t("Explores how gender intersects with other social categories like race, class, and disability to shape power distribution and multiple forms of inequality at the institutional level.", "探讨性别如何与种族、阶级、残疾等其他社会类别共同作用，在制度层面塑造权力分配和多重不平等。"),
      color: "border-l-4 border-[#00a19a]"
    },
    {
      title: t("Algorithmic Bias and Digital Governance", "算法偏见与数字空间治理"),
      description: t("Investigates how AI and big data encode and reinforce gender bias, and the mechanisms of technological disciplining and censorship imposed by platforms on gender and sexual minorities.", "研究人工智能和大数据如何编码并强化性别偏见，以及平台对性别和性少数群体的技术规训与审查机制。"),
      color: "border-l-4 border-[#d62e39]"
    },
    {
      title: t("Economic Participation, Labor Markets, and the Care Economy", "经济参与、劳动力市场与照护经济"),
      description: t("Analyzes gender gaps in wages and senior leadership, and assesses the value and exploitation of unpaid care labor and affective labor.", "分析工资差距、高级领导职位中的性别差异，并评估无偿照护劳动和情感劳动的价值与剥削。"),
      color: "border-l-4 border-[#f97316]"
    },
    {
      title: t("Political Empowerment, Women's Leadership, and Representation", "政治赋权、女性领导力与代表性"),
      description: t("Focuses on barriers to women's participation in government and decision-making bodies worldwide, and evaluates policy tools like quotas to increase female political representation.", "关注女性在全球各级政府和决策机构中的参与障碍，并评估配额制度等增加女性政治代表性的政策工具。"),
      color: "border-l-4 border-[#eab308]"
    },
    {
      title: t("Queer Theory, Trans Politics, and Anti-Normativity", "酷儿理论、跨性别政治与反规范性"),
      description: t("Challenges traditional binary gender and heteronormativity, examining the social construction, rights advocacy, and legal change for non-binary and transgender identities.", "挑战传统二元性别、异性恋规范，探讨非二元和跨性别身份的社会建构、权利争取与法律变革。"),
      color: "border-l-4 border-[#2c5282]"
    },
    {
      title: t("Gender-Based Violence, a Survivor-Centered Approach, and Judicial Justice", "基于性别的暴力、幸存者中心视角与司法正义"),
      description: t("Focuses on reshaping justice and support systems from the survivor's perspective, critiquing secondary victimization by traditional legal systems and biases in medical services.", "侧重于从幸存者的需求出发，重塑司法和支持系统，批判传统司法制度造成的二次伤害与医疗服务偏见。"),
      color: "border-l-4 border-[#523611]"
    },
    {
      title: t("Environmental Justice, the Climate Crisis, and Ecofeminism", "环境正义、气候危机与生态女性主义"),
      description: t("Examines the differential impact of climate change and environmental crises on women and marginalized groups, integrating environmental issues into a critique of gender and power distribution.", "研究气候变化和环境危机对女性和边缘群体的差异化影响，将环境问题纳入性别和权力分配的批判框架。"),
      color: "border-l-4 border-[#059669]"
    },
    {
      title: t("Toxic Masculinity, Affective Labor, and Alternative Constructions", "毒性男性气质、情感劳动与替代性建构"),
      description: t("Critiques the social impact of harmful masculinities under patriarchy, and explores and supports caring, non-dominant alternative constructions of masculinity.", "批判父权制下有害的男性气质的社会影响，并探索和支持关怀性的、非支配性的替代性男性气质建构。"),
      color: "border-l-4 border-[#49326b]"
    },
    {
      title: t("The Gender Impact of Global Crises and Intersectional Response", "全球危机对性别的影响与交叉性响应"),
      description: t("Investigates the disproportionate impact of global crises like COVID-19 on women's economy, health, and exposure to violence, calling for gender-sensitive crisis response frameworks.", "研究如 COVID-19 等全球性危机对女性的经济、健康和暴力不成比例的影响，呼吁建立性别敏感的危机应对框架。"),
      color: "border-l-4 border-[#b44981]"
    },
    {
      title: t("Digital Feminism, Online Activism, and Neoliberal Critique", "数字女权主义、线上行动主义与新自由主义批判"),
      description: t("Analyzes the potential and limitations of digital platforms as new venues for feminist mobilization and debate, and critiques the marketization of women's empowerment under neoliberal ideology.", "分析数字平台作为女权动员和论战的新场所的潜力与局限，并批判新自由主义意识形态对女性赋权概念的市场化。"),
      color: "border-l-4 border-[#3b76c4]"
    }
  ];

  const asiaResearch = [
    {
      title: t("The Chinese Mainland", "中国大陆"),
      subtitle: t("Online Feminist Discourse, State Governance, and Women's Status in the Digital Economy", "线上女权话语、国家治理与数字经济下的女性地位"),
      description: t("Focuses on feminist activism and discourse on social media, policy evaluation mechanisms like gender budgeting, and the impact of digital economy development on women's labor status.", "聚焦社交媒体上的女权行动、法律政策评估机制（如社会性别预算），以及数字经济发展对女性劳动力地位的影响。"),
      color: "bg-gradient-to-br from-red-50 to-white"
    },
    {
      title: t("Taiwan", "台湾"),
      subtitle: t("Queer Citizenship, Legal Innovation, and Deepening Gender Equality Education", "酷儿公民身份、法律制度创新与性别平等教育深化"),
      description: t("Centers on the restructuring of family law after marriage equality, legal identity recognition for transgender individuals, and the deepening of relationship education following the Gender Equality Education Act.", "围绕同性婚姻合法化后的家庭法重构、跨性别者的法律身份认定，以及《性别平等教育法》实施后对关系教育的深化。"),
      color: "bg-gradient-to-br from-yellow-50 to-white"
    },
    {
      title: t("Hong Kong", "香港"),
      subtitle: t("Transnational Labor, Post-Colonial Intersectionality, and Urban Gender Politics", "跨界劳工、后殖民交叉性与城市性别政治"),
      description: t("Focuses on the multi-axis oppression (race-class-gender) of transnational domestic workers in the post-colonial context, and women's participation in urban politics and media.", "重点关注外籍家庭佣工（跨界劳工）在后殖民语境下的种族-阶级-性别多重压迫，以及女性在城市政治和媒体中的参与。"),
      color: "bg-gradient-to-br from-green-50 to-white"
    },
    {
      title: t("South Korea", "韩国"),
      subtitle: t("The Low Fertility Crisis, Radical Feminism, and Masculinity Anxiety", "极低生育危机、激进化女权与男性气质焦虑"),
      description: t("Examines social policies under South Korea's ultra-low fertility, radical feminist responses like the 4B Movement, and the crisis of masculinity under patriarchy.", "探讨韩国极低生育率下的社会政策，以及如 4B 运动等激进女性主义对策，并分析父权制下的男性身份危机。"),
      color: "bg-gradient-to-br from-purple-50 to-white"
    },
    {
      title: t("Japan", "日本"),
      subtitle: t("Aging Society, Persistent Workplace Inequality, and the Critique of Patriarchy/Capitalism", "老龄化社会、职场持续不平等与父权制/资本主义批判"),
      description: t("Focuses on the limitations of \"Women's Active Promotion\" laws, the impact of aging on care labor, and systematic theoretical critique of the dual oppression of patriarchy and capitalism.", "关注「女性活跃推进法」的局限性、老龄化对照护劳动的影响，以及对父权制和资本制双重压迫的系统性理论分析。"),
      color: "bg-gradient-to-br from-blue-50 to-white"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumb currentPage="Academic Hub" currentPageZh="学术中心" />

        <AnimatedSection immediate={true}>
          <div className="mb-16">
            <h1 className="text-4xl sm:text-6xl font-black mb-4">{t("Academic Hub", "学术中心")}</h1>
            <p className="text-base sm:text-xl text-gray-600 mb-12">{t("Advancing gender studies through rigorous research and regional insights.", "通过严谨的学术研究和区域洞察推进性别研究")}</p>

            <h2 className="text-3xl sm:text-4xl font-black mb-8">{t("Research Frontiers in Gender Studies", "性别研究的前沿领域")}</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {researchFrontiers.map((item, index) => (
                <Card key={index} className={`p-6 hover:shadow-lg transition-shadow ${item.color}`}>
                  <h3 className="text-lg sm:text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{item.description}</p>
                </Card>
              ))}
            </div>

            <h2 className="text-3xl sm:text-4xl font-black mb-8">{t("East Asian Gender Studies Core Topics", "东亚性别研究核心课题")}</h2>
            <div className="grid grid-cols-1 gap-6 mb-16">
              {asiaResearch.map((item, index) => (
                <Card key={index} className={`p-8 ${item.color} border-2 border-gray-200 hover:shadow-xl transition-shadow`}>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2">{item.title}</h3>
                  <h4 className="text-base sm:text-xl font-semibold text-gray-800 mb-4">{item.subtitle}</h4>
                  <p className="text-gray-700 text-sm sm:text-lg leading-relaxed">{item.description}</p>
                </Card>
              ))}
            </div>

            <div className="border-t-4 border-gray-300 my-12"></div>

            <h2 className="text-3xl sm:text-4xl font-black mb-8">{t("Research Blog", "研究博客")}</h2>
            <p className="text-base sm:text-xl text-gray-600 mb-8">
              {t("Stay updated with our latest research findings, policy analysis, and academic insights", "了解我们的最新研究成果、政策分析和学术见解")}
            </p>
            <Link href="/blog">
              <div className="bg-gradient-to-r from-[#00a19a] to-[#008c85] text-white p-8 rounded-lg hover:shadow-xl transition-all cursor-pointer">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">{t("Explore Our Research Articles", "探索我们的研究文章")}</h3>
                <p className="text-sm sm:text-lg opacity-90 mb-4">
                  {t("Read in-depth analysis, case studies, and thought leadership from our researchers", "阅读我们研究人员的深入分析、案例研究和思想领导力")}
                </p>
                <span className="inline-flex items-center text-base sm:text-xl font-bold">
                  {t("View All Articles", "查看所有文章")} →
                </span>
              </div>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
