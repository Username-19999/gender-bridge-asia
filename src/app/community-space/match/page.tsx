"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Trophy, Star, ThumbsUp } from "lucide-react";

type TermPair = {
  term: { en: string; zh: string };
  definition: { en: string; zh: string };
};

export default function MatchGame() {
  const { t, updateGameProgress, language } = useLanguage();
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [selectedDef, setSelectedDef] = useState<number | null>(null);
  const [matches, setMatches] = useState<Set<number>>(new Set());
  const [attempts, setAttempts] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [shuffledDefs, setShuffledDefs] = useState<number[]>([]);

  const allTerms: TermPair[] = [
    {
      term: { en: "Toxic Masculinity", zh: "有毒男性气质" },
      definition: { en: "A pattern of masculinity that suppresses emotions and emphasizes dominance and toughness", zh: "压抑情绪、强调支配和强硬的男性气质模式" }
    },
    {
      term: { en: "Gender Mainstreaming", zh: "性别主流化" },
      definition: { en: "Systematically integrating gender perspectives into policy-making", zh: "在政策制定中系统性纳入性别视角" }
    },
    {
      term: { en: "Intersectionality", zh: "交叉性" },
      definition: { en: "The interconnected nature of social categorizations creating overlapping systems of discrimination", zh: "社会分类的相互交织性，创造重叠的歧视或优势系统" }
    },
    {
      term: { en: "Glass Ceiling", zh: "玻璃天花板" },
      definition: { en: "Invisible barrier preventing women and minorities from advancing to top positions", zh: "阻止女性和少数族裔/边缘群体晋升至高层的无形障碍" }
    },
    {
      term: { en: "Patriarchy", zh: "父权制" },
      definition: { en: "A social system where men hold primary power and dominate leadership roles", zh: "男性掌握主要权力并主导领导地位的社会系统" }
    },
    {
      term: { en: "Gender Binary", zh: "性别二元论" },
      definition: { en: "The classification of gender into two distinct, opposite forms: male and female", zh: "将性别分类为两种截然不同、对立的形式：男性和女性" }
    },
    {
      term: { en: "Reproductive Rights", zh: "生育权" },
      definition: { en: "Rights relating to reproduction and reproductive health", zh: "与生育和生殖健康相关的权利" }
    },
    {
      term: { en: "Gender Pay Gap", zh: "性别薪酬差距" },
      definition: { en: "The difference in average earnings between men and women", zh: "男性和女性平均收入之间的差异" }
    },
    {
      term: { en: "Misogyny", zh: "厌女症" },
      definition: { en: "Hatred of, aversion to, or prejudice against women", zh: "对女性的厌恶、蔑视或偏见" }
    },
    {
      term: { en: "Gender Expression", zh: "性别表达" },
      definition: { en: "External manifestations of gender through clothing, behavior, and personal appearance", zh: "通过服装、行为和个人外表表现性别的外部方式" }
    },
    {
      term: { en: "Patrilineal Descent", zh: "父系继嗣" },
      definition: { en: "A kinship system where inheritance and family identity pass through the father's line", zh: "以父系血缘为核心来确立个体亲属身份与继承权的亲属制度" }
    },
    {
      term: { en: "Patrilocal Residence", zh: "从夫居" },
      definition: { en: "A marital arrangement where the couple lives with or near the husband's family", zh: "婚后夫妻居住在男方家庭或其父系社区内的居住模式" }
    },
    {
      term: { en: "Population Statistics Yearbook", zh: "人口统计年鉴" },
      definition: { en: "Official annual publication compiling population and related socioeconomic statistics", zh: "官方年度出版物，系统汇编人口与相关社会经济统计指标的数据集" }
    },
    {
      term: { en: "Population Sample Survey", zh: "人口抽样调查" },
      definition: { en: "A survey method using probability sampling to gather population characteristics", zh: "以概率抽样方式获取总体人口特征与行为信息的调查方法" }
    },
    {
      term: { en: "Prenatal Sex Determination", zh: "产前性别鉴定" },
      definition: { en: "Medical testing to identify the biological sex of a fetus before birth", zh: "通过医学检测在胎儿出生前识别其生物学性别的做法" }
    },
    {
      term: { en: "Prenatal Sex Selection", zh: "产前性别选择" },
      definition: { en: "Intervention based on fetal gender information to influence birth sex composition", zh: "基于胎儿性别信息而采取干预以影响出生性别构成的行为与技术" }
    },
    {
      term: { en: "Real Name Registration", zh: "出生人口实名登记" },
      definition: { en: "Administrative system requiring official registration with legal identity information", zh: "对新生儿以法定身份信息进行登记备案的行政制度" }
    },
    {
      term: { en: "Sex Distribution", zh: "性别分布" },
      definition: { en: "Statistical description of the proportion of different genders in a population", zh: "群体中不同性别个体所占比例的统计描述" }
    },
    {
      term: { en: "Sex Ratio at Birth (SRB)", zh: "出生性别比(SRB)" },
      definition: { en: "The numerical ratio of male to female births, typically expressed as males per 100 females", zh: "活产婴儿中男性对女性的数值比，常以每百名女性对应的男性数表示" }
    },
    {
      term: { en: "Sex Ratio by Birth Order", zh: "分孩次出生性别比" },
      definition: { en: "Sex ratio calculated by grouping according to the same mother's child birth order", zh: "按同一母亲的孩子出生序位分组计算的出生性别比指标" }
    },
    {
      term: { en: "Sex Ratio Imbalance", zh: "性别比失衡" },
      definition: { en: "A state where sex ratio deviates from biological normal range and may cause social consequences", zh: "性别比偏离生物学常态范围并可能产生社会后果的状态" }
    },
    {
      term: { en: "Sex Ratio in General Population", zh: "总人口性别比" },
      definition: { en: "The ratio of male to female numbers in the entire population at a given time", zh: "在某一时点整个人口中男性与女性人数的比值" }
    },
    {
      term: { en: "Sex Ratio of Children Under Five", zh: "5岁以下儿童性别比" },
      definition: { en: "The ratio of male to female numbers among children under five years old", zh: "五岁以下人口中男女性人数之比，用于监测早期存活差异" }
    },
    {
      term: { en: "Sex Selection", zh: "性别选择" },
      definition: { en: "Practice of choosing offspring sex through technical or behavioral means", zh: "在受孕、胚胎或胎儿阶段以技术或行为手段偏向某一性别的做法" }
    },
    {
      term: { en: "Sex Structure", zh: "性别结构" },
      definition: { en: "The composition of different genders in terms of quantity and age distribution within a population", zh: "一个人口群体内部不同性别在数量与年分布上的构成形态" }
    },
    {
      term: { en: "Sex-Selective Induced Abortion", zh: "性别选择性人工流产" },
      definition: { en: "Selective termination of pregnancy based on fetal gender", zh: "因胎儿性别而实施的选择性终止妊娠" }
    },
    {
      term: { en: "Son Preference", zh: "重男轻女/男孩偏好" },
      definition: { en: "Systematic preference for male children in values and resource allocation", zh: "在价值取向与资源分配上对男性子女的系统性偏好" }
    },
    {
      term: { en: "Total Fertility Rate (TFR)", zh: "总和生育率" },
      definition: { en: "Average number of children a woman would have during her reproductive years", zh: "一名女性在其育龄期按当期年龄别生育率预期生育的平均子女数" }
    },
    {
      term: { en: "Unemployment Insurance", zh: "失业保险" },
      definition: { en: "Social security system providing income and employment services to eligible unemployed", zh: "对符合条件的失业者提供收入与就业服务支持的社会保障制度" }
    },
    {
      term: { en: "Village Regulations and Local Rules", zh: "村规民约" },
      definition: { en: "Collection of autonomous norms and behavioral standards at village or community level", zh: "村落或社区层面的自治性规范与行为准则集合" }
    },
    {
      term: { en: "Age-Sex Structure", zh: "年龄性别结构" },
      definition: { en: "Population composition presented by age and gender intersection for demographic dynamics assessment", zh: "按年龄与性别交叉呈现的人口构成，用以评估人口学动态" }
    },
    {
      term: { en: "Aging", zh: "老龄化" },
      definition: { en: "Structural change process where the proportion of elderly people in population continues to rise", zh: "人口中老年人比例持续上升的结构性变化过程" }
    },
    {
      term: { en: "Arranged and Forced Marriage", zh: "包办和强迫婚姻" },
      definition: { en: "Marriage arranged by third parties without full voluntary consent, often involving coercion", zh: "未经充分自愿同意，由第三方安排并以强制或胁迫达成的婚姻" }
    },
    {
      term: { en: "Basic Medical Insurance", zh: "基本医疗保险" },
      definition: { en: "Social insurance system providing basic medical expense reimbursement and risk sharing for residents", zh: "为居民提供基本医疗费用报销与风险分担的社会保险制度" }
    },
    {
      term: { en: "B-Ultrasound Check", zh: "B超检查" },
      definition: { en: "Routine medical examination using ultrasound imaging to assess fetal or organ conditions", zh: "利用超声成像评估胎儿或器官状况的常规医学检查" }
    },
    {
      term: { en: "Census", zh: "人口普查" },
      definition: { en: "Comprehensive statistical registration of all population in a country or region at the same time", zh: "对一个国家或地区全体人口在同一时点进行的全面统计登记" }
    },
    {
      term: { en: "Child Mortality by Sex", zh: "分性别的儿童死亡率" },
      definition: { en: "Death risk indicator for children in specific age groups, separated by gender", zh: "按性别区分的儿童在特定年龄段的死亡风险指标" }
    },
    {
      term: { en: "Common-Law Marriage", zh: "习惯法婚姻" },
      definition: { en: "Marriage relationship recognized in some jurisdictions based on long-term cohabitation and public acknowledgment", zh: "在某些法域中以长期同居与公众承认替代正式登记的婚姻关系" }
    },
    {
      term: { en: "Demography", zh: "人口学" },
      definition: { en: "Scientific study of population size, structure, distribution, changes and their social consequences", zh: "研究人口规模、结构、分布与变动及其社会后果的科学" }
    },
    {
      term: { en: "Distribution of Resources", zh: "资源分配" },
      definition: { en: "Institutionalized allocation process of material and opportunity resources within groups", zh: "在群体内部对物质与机会等资源的制度化配置过程" }
    },
    {
      term: { en: "Female Infanticide", zh: "溺弃女婴" },
      definition: { en: "Extreme gender discrimination practice of killing or abandoning newborn female infants", zh: "因性别而对新生女婴实施致死或遗弃的极端性别歧视行为" }
    },
    {
      term: { en: "Fertility", zh: "生育率/生育力" },
      definition: { en: "Measure of reproductive level or individual reproductive capacity within a certain period", zh: "一定时期内人口生育水平或个体生殖能力的度量" }
    },
    {
      term: { en: "Feticide", zh: "堕杀胎儿" },
      definition: { en: "Causing fetal death through medical or illegal means before fetus becomes viable", zh: "在胎儿可存活前通过医疗或非法手段导致其死亡的行为" }
    },
    {
      term: { en: "Gender Asymmetry", zh: "男女不均衡" },
      definition: { en: "Systematic differences in power, status and resources based on gender", zh: "在权力、地位与资源等方面因性别产生的系统性不均衡" }
    },
    {
      term: { en: "Patriarchy", zh: "父权制" },
      definition: { en: "Social structure and ideology where men dominate in family, political and economic fields", zh: "男性在家庭、政治与经济等领域占据主导地位的社会结构与意识形态" }
    },
    {
      term: { en: "Hegemonic Masculinity", zh: "支配性男性气质" },
      definition: { en: "Dominant masculinity pattern naturalized and legitimizing male advantage in specific social-historical contexts", zh: "在特定社会历史情境中被自然化并使男性优势合法化的主导男性气质模式" }
    },
    {
      term: { en: "Masculinity", zh: "男性气质" },
      definition: { en: "Cultural expectations, behavioral norms and self-identity frameworks associated with male identity", zh: "与男性身份关联的一组文化期望、行为规范与自我认同框架" }
    },
    {
      term: { en: "Homophobia", zh: "恐同" },
      definition: { en: "Prejudice, fear or hostility attitudes toward homosexual groups or same-sex orientation", zh: "对同性恋群体或同性指向的偏见、恐惧与敌意态度" }
    },
    {
      term: { en: "Homosexuality", zh: "同性恋" },
      definition: { en: "Sexual orientation characterized by persistent emotional and/or sexual attraction to the same gender", zh: "对同一性别产生持续情感与/或性吸引的性取向" }
    },
    {
      term: { en: "Paternity Leave", zh: "男性育儿假" },
      definition: { en: "Paid or unpaid leave time for fathers during child birth or initial care period", zh: "父亲在子女出生或初期照护阶段依法享有的带薪或不带薪假期" }
    }
  ];

  // Select 10 random terms for the game
  const [gameTerms, setGameTerms] = useState<TermPair[]>([]);

  useEffect(() => {
    // Shuffle and select 10 terms from the pool of 50
    const shuffled = [...allTerms].sort(() => Math.random() - 0.5).slice(0, 10);
    setGameTerms(shuffled);
    // Shuffle definitions
    const defIndices = shuffled.map((_, i) => i).sort(() => Math.random() - 0.5);
    setShuffledDefs(defIndices);
  }, []);

  const lang = language;

  const getRealLifeExample = (term: string) => {
    const examples: Record<string, string> = {
      "Toxic Masculinity": "A man who refuses to cry at his father's funeral because 'men don't cry'",
      "有毒男性气质": "一个男人在父亲葬礼上拒绝哭泣，因为'男人不哭'",
      "Gender Mainstreaming": "A city planning department considering women's safety when designing public spaces",
      "性别主流化": "城市规划部门在设计公共空间时考虑女性安全",
      "Intersectionality": "A black woman facing discrimination that's different from both white women and black men",
      "交叉性": "黑人女性面临的歧视既不同于白人女性，也不同于黑人男性",
      "Glass Ceiling": "A qualified woman being passed over for CEO position despite excellent performance",
      "玻璃天花板": "尽管表现优秀，资深女性仍被排除在CEO职位之外",
      "Patriarchy": "A family where only the father makes major financial decisions",
      "父权制": "只有父亲做重大财务决策的家庭",
      "Gender Binary": "A school bathroom policy that only allows 'male' or 'female' options",
      "性别二元论": "学校卫生间政策只允许'男性'或'女性'选项",
      "Reproductive Rights": "A woman's right to choose when and if to have children",
      "生育权": "女性选择何时以及是否生育的权利",
      "Gender Pay Gap": "A female engineer earning 20% less than her male colleague with same qualifications",
      "性别薪酬差距": "同等资历的女性工程师比男性同事少赚20%",
      "Misogyny": "Online comments calling women 'emotional' or 'irrational' in professional settings",
      "厌女症": "在专业领域称女性'情绪化'或'不理性'的网络评论",
      "Gender Expression": "A person wearing makeup and dresses regardless of their biological sex",
      "性别表达": "无论生物学性别如何，都化妆穿裙子的人",
      "Patrilineal Descent": "A family where only sons can inherit the family business",
      "父系继嗣": "只有儿子能继承家族企业的家庭",
      "Patrilocal Residence": "A newlywed couple moving in with the husband's parents",
      "从夫居": "新婚夫妇搬去与丈夫的父母同住",
      "Sex Ratio at Birth": "In some regions, 120 boys born for every 100 girls",
      "出生性别比": "在某些地区，每100个女孩出生就有120个男孩",
      "Son Preference": "Parents celebrating more when a boy is born than a girl",
      "重男轻女": "父母在男孩出生时比女孩出生时更高兴",
      "Sex-Selective Abortion": "Terminating pregnancy after learning the fetus is female",
      "性别选择性流产": "得知胎儿是女性后终止妊娠",
      "Total Fertility Rate": "In Japan, women have an average of 1.3 children in their lifetime",
      "总和生育率": "在日本，女性一生平均生育1.3个孩子",
      "Demography": "Studying how aging population affects economic growth",
      "人口学": "研究人口老龄化如何影响经济增长",
      "Census": "Every 10 years, government counts all residents in the country",
      "人口普查": "每10年，政府统计全国所有居民",
      "Fertility": "The birth rate in urban areas is lower than rural areas",
      "生育率": "城市地区的出生率低于农村地区",
      "Aging": "Japan's population has more elderly people than young people",
      "老龄化": "日本人口中老年人比年轻人多",
      "Age-Sex Structure": "A population pyramid showing more elderly women than men",
      "年龄性别结构": "显示老年女性多于男性的人口金字塔",
      "Child Mortality by Sex": "In some countries, girls die more often than boys before age 5",
      "分性别的儿童死亡率": "在某些国家，女孩在5岁前死亡比男孩更频繁",
      "Sex Distribution": "A classroom with 15 boys and 20 girls",
      "性别分布": "有15个男孩和20个女孩的教室",
      "Sex Ratio Imbalance": "A village with 125 men for every 100 women due to selective abortion",
      "性别比失衡": "由于选择性流产，村庄中每100个女性对应125个男性",
      "Sex Structure": "A company's workforce is 70% male and 30% female",
      "性别结构": "公司员工70%是男性，30%是女性",
      "Sex Selection": "Using IVF to choose the gender of your baby",
      "性别选择": "使用试管婴儿技术选择婴儿性别",
      "Prenatal Sex Determination": "Ultrasound scan showing the baby is a girl",
      "产前性别鉴定": "超声波扫描显示婴儿是女孩",
      "Prenatal Sex Selection": "Choosing to have only boys through medical procedures",
      "产前性别选择": "通过医疗程序选择只生男孩",
      "Real Name Registration": "Registering a newborn with official government ID",
      "出生人口实名登记": "用官方政府身份证登记新生儿",
      "Sex Ratio by Birth Order": "First-born children are 50% boys, second-born are 60% boys",
      "分孩次出生性别比": "第一胎50%是男孩，第二胎60%是男孩",
      "Sex Ratio of Children Under Five": "Among toddlers, there are 110 boys for every 100 girls",
      "5岁以下儿童性别比": "在幼儿中，每100个女孩对应110个男孩",
      "Sex Ratio in General Population": "The entire country has 105 men for every 100 women",
      "总人口性别比": "整个国家每100个女性对应105个男性",
      "Population Sample Survey": "Interviewing 1000 families to understand birth patterns",
      "人口抽样调查": "采访1000个家庭了解生育模式",
      "Population Statistics Yearbook": "Annual government report on birth and death rates",
      "人口统计年鉴": "政府关于出生率和死亡率的年度报告",
      "B-Ultrasound Check": "Doctor checking if the baby is healthy using sound waves",
      "B超检查": "医生使用声波检查婴儿是否健康",
      "Unemployment Insurance": "Government pays money to people who lose their jobs",
      "失业保险": "政府向失业人员支付金钱",
      "Basic Medical Insurance": "Government helps pay for hospital visits and medicine",
      "基本医疗保险": "政府帮助支付医院就诊和药品费用",
      "Village Regulations": "Local rules saying women can't inherit land",
      "村规民约": "当地规定女性不能继承土地",
      "Arranged Marriage": "Parents choosing a spouse for their child without asking them",
      "包办婚姻": "父母在不询问孩子的情况下为孩子选择配偶",
      "Common-Law Marriage": "Living together for 10 years without official marriage certificate",
      "习惯法婚姻": "同居10年但没有正式结婚证",
      "Distribution of Resources": "Boys get better food and education than girls in a family",
      "资源分配": "家庭中男孩比女孩获得更好的食物和教育",
      "Female Infanticide": "Killing newborn baby girls because families prefer boys",
      "溺弃女婴": "因为家庭偏爱男孩而杀害新生女婴",
      "Feticide": "Ending a pregnancy before the baby can survive outside the womb",
      "堕杀胎儿": "在婴儿能在子宫外存活之前终止妊娠",
      "Gender Asymmetry": "Men hold all leadership positions in a company",
      "男女不均衡": "男性在公司中担任所有领导职位",
      "Hegemonic Masculinity": "Society expects men to be tough and never show weakness",
      "支配性男性气质": "社会期望男性坚强，从不表现软弱",
      "Masculinity": "Cultural ideas about what makes a 'real man'",
      "男性气质": "关于什么构成'真正的男人'的文化观念",
      "Homophobia": "Refusing to hire someone because they're gay",
      "恐同": "因为某人是同性恋而拒绝雇佣",
      "Homosexuality": "A man who falls in love with another man",
      "同性恋": "对同一性别的个体产生持续的爱慕或性吸引",
      "Paternity Leave": "Father taking time off work to care for newborn baby",
      "男性育儿假": "父亲请假照顾新生儿"
    };
    
    return examples[term] || t("No example available", "暂无举例");
  };

  const handleTermClick = (index: number) => {
    if (matches.has(index)) return;
    setSelectedTerm(index);
    if (selectedDef !== null) {
      checkMatch(index, selectedDef);
    }
  };

  const handleDefClick = (index: number) => {
    if (matches.has(index)) return;
    setSelectedDef(index);
    if (selectedTerm !== null) {
      checkMatch(selectedTerm, index);
    }
  };

  const checkMatch = (termIndex: number, defIndex: number) => {
    setAttempts(attempts + 1);

    if (termIndex === defIndex) {
      // Correct match
      const newMatches = new Set(matches);
      newMatches.add(termIndex);
      setMatches(newMatches);
      setSelectedTerm(null);
      setSelectedDef(null);

      if (newMatches.size === gameTerms.length) {
        setGameCompleted(true);
        updateGameProgress('match', true);
        const score = Math.max(0, 100 - (attempts + 1 - gameTerms.length) * 5);
        updateGameProgress('matchScore', score);
      }
    } else {
      // Incorrect match
      setTimeout(() => {
        setSelectedTerm(null);
        setSelectedDef(null);
      }, 1000);
    }
  };

  const restart = () => {
    const shuffled = [...allTerms].sort(() => Math.random() - 0.5).slice(0, 10);
    setGameTerms(shuffled);
    const defIndices = shuffled.map((_, i) => i).sort(() => Math.random() - 0.5);
    setShuffledDefs(defIndices);
    setMatches(new Set());
    setSelectedTerm(null);
    setSelectedDef(null);
    setAttempts(0);
    setGameCompleted(false);
  };

  const getScore = () => {
    const accuracy = (gameTerms.length / attempts) * 100;
    if (accuracy >= 90) return { title: t("Perfect Match!", "完美匹配！"), icon: Trophy, color: "text-[#d62e39]", bg: "bg-[#d62e39]/10" };
    if (accuracy >= 70) return { title: t("Great Job!", "干得好！"), icon: Star, color: "text-[#00a19a]", bg: "bg-[#00a19a]/10" };
    return { title: t("Good Effort!", "努力不错！"), icon: ThumbsUp, color: "text-gray-600", bg: "bg-gray-100" };
  };

  if (gameTerms.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">{t("Loading...", "加载中...")}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6c839]/10 to-[#f0d95c]/10">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
            {language === "en" ? "Match Game" : "连连看"}
          </span>
        </div>

        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-6xl font-black mb-4">{t("Gender Terms Match", "性别术语连连看")}</h1>
            <p className="text-base sm:text-xl text-gray-700">{t("Match each term with its correct definition.", "将每个性别术语与正确的定义连线。")}</p>
            <p className="text-sm text-gray-600 mt-2">
              {t("Attempts", "尝试次数")}: {attempts} | {t("Matched", "已匹配")}: {matches.size}/{gameTerms.length}
            </p>
          </div>

          {!gameCompleted ? (
            <div className="relative grid md:grid-cols-2 gap-8">
              {/* Terms Column */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold mb-4 text-center">{t("Terms", "术语")}</h3>
                {gameTerms.map((pair, index) => (
                  <button
                    key={`term-${index}`}
                    onClick={() => handleTermClick(index)}
                    disabled={matches.has(index)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left font-semibold ${
                      matches.has(index)
                        ? "bg-green-50 border-green-500 opacity-50 cursor-not-allowed"
                        : selectedTerm === index
                        ? "bg-[#f97316] text-white border-[#f97316]"
                        : "bg-white border-gray-300 hover:border-[#f97316] hover:bg-orange-50"
                    }`}
                  >
                    {pair.term[lang]}
                    {matches.has(index) && " ✓"}
                  </button>
                ))}
              </div>

              {/* Definitions Column */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold mb-4 text-center">{t("Definitions", "定义")}</h3>
                {shuffledDefs.map((originalIndex) => (
                  <div key={`def-${originalIndex}`} className="relative group">
                    <button
                      onClick={() => handleDefClick(originalIndex)}
                      disabled={matches.has(originalIndex)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        matches.has(originalIndex)
                          ? "bg-green-50 border-green-500 opacity-50"
                          : selectedDef === originalIndex
                          ? "bg-[#f97316] text-white border-[#f97316]"
                          : "bg-white border-gray-300 hover:border-[#f97316] hover:bg-orange-50"
                      }`}
                    >
                      {gameTerms[originalIndex].definition[lang]}
                      {matches.has(originalIndex) && " ✓"}
                    </button>
                    
                    {/* Hover tooltip with real-life example */}
                    <div className="absolute bottom-full left-0 mb-2 w-80 bg-black text-white p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                      <div className="text-sm font-semibold mb-1">{t("Real-life Example", "实际生活举例")}:</div>
                      <div className="text-xs">
                        {getRealLifeExample(gameTerms[originalIndex].term[lang])}
                      </div>
                      <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Card className="p-12 bg-white shadow-xl text-center">
              <h2 className="text-2xl sm:text-4xl font-black mb-6">{t("Congratulations!", "恭喜完成！")}</h2>
              <p className="text-4xl sm:text-6xl font-black mb-8">{attempts} {t("attempts", "次尝试")}</p>

              <div className={`inline-block px-8 py-4 rounded-lg ${getScore().bg} mb-8`}>
                <div className="flex justify-center mb-2">
                  {(() => {
                    const ScoreIcon = getScore().icon;
                    return <ScoreIcon className={`w-20 h-20 ${getScore().color}`} strokeWidth={1.5} />;
                  })()}
                </div>
                <p className={`text-3xl font-black ${getScore().color}`}>{getScore().title}</p>
              </div>

              <p className="text-lg text-gray-700 mb-8">
                {t("You've successfully matched all terms with their definitions!", "你已成功将所有术语与其定义匹配！")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={restart} className="bg-[#f97316] hover:bg-[#fb923c] text-white px-8 py-6 text-lg font-bold w-full sm:w-auto">
                  {t("Play Again", "再玩一次")}
                </Button>
                <Link href="/community-space" className="w-full sm:w-auto">
                  <Button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-6 text-lg font-bold w-full">
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
