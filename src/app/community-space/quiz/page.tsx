"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Sprout, MessageCircle, GraduationCap } from "lucide-react";

export default function QuizGame() {
  const { t, updateGameProgress, language } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [gameQuestions, setGameQuestions] = useState<any[]>([]);

  // Initialize game with 10 random questions from the pool and shuffle answers
  useEffect(() => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
    
    // Shuffle answers for each question
    const questionsWithShuffledAnswers = shuffled.map(q => {
      const optionsEn = q.options.en;
      const optionsZh = q.options.zh;
      const correctAnswer = q.correct;
      
      // Create array of indices
      const indices = optionsEn.map((_, i) => i);
      
      // Shuffle indices
      const shuffledIndices = [...indices].sort(() => Math.random() - 0.5);
      
      // Rearrange options based on shuffled indices
      const shuffledOptionsEn = shuffledIndices.map(i => optionsEn[i]);
      const shuffledOptionsZh = shuffledIndices.map(i => optionsZh[i]);
      
      // Find new position of correct answer
      const newCorrectIndex = shuffledIndices.indexOf(correctAnswer);
      
      return {
        ...q,
        options: {
          en: shuffledOptionsEn,
          zh: shuffledOptionsZh
        },
        correct: newCorrectIndex
      };
    });
    
    setGameQuestions(questionsWithShuffledAnswers);
  }, []);

  const allQuestions = [
    {
      question: {
        en: "Are gender and sex synonymous?",
        zh: "性别（gender）与生理性别（sex）是同义词吗？"
      },
      options: {
        en: ["Yes, they are exactly the same", "No, they are different concepts", "Sometimes the same, sometimes different", "Only the same in certain cultures"],
        zh: ["是，它们完全相同", "否，它们是不同的概念", "有时相同，有时不同", "只在某些文化中相同"]
      },
      correct: 1,
      explanation: {
        en: "Gender refers to socially and culturally constructed roles and expectations, while sex refers to biological characteristics.",
        zh: "性别（gender）指社会和文化建构的角色和期望，而生理性别（sex）指生物学特征。"
      }
    },
    {
      question: {
        en: "Does feminism mean female supremacy?",
        zh: "女权主义（feminism）是否意味着女性至上？"
      },
      options: {
        en: ["Yes, feminism seeks female superiority", "No, feminism seeks gender equality", "Depends on different schools", "Only in radical feminism"],
        zh: ["是，女权主义追求女性优于男性", "否，女权主义追求性别平等", "取决于不同流派", "仅在激进女权主义中如此"]
      },
      correct: 1,
      explanation: {
        en: "The core goal of feminism is to achieve equality for all genders, not superiority of any gender.",
        zh: "女权主义的核心目标是实现所有性别的平等，而非任何性别的优越。"
      }
    },
    {
      question: {
        en: "Can men also be advocates for gender equality?",
        zh: "男性也能成为性别平等的倡导者吗？"
      },
      options: {
        en: ["No, this is only a women's issue", "Yes, gender equality needs everyone's participation", "Only as supporters, not leaders", "Only feminine men can"],
        zh: ["不能，这只是女性的议题", "可以，性别平等需要所有人参与", "只能作为支持者，不能领导", "只有女性化的男性可以"]
      },
      correct: 1,
      explanation: {
        en: "Gender equality is a societal issue, and male participation and advocacy are crucial to achieving equality.",
        zh: "性别平等是全社会的议题，男性的参与和倡导对实现平等至关重要。"
      }
    },
    {
      question: {
        en: "Which of the following is NOT a gender stereotype?",
        zh: "以下哪项不属于性别刻板印象？"
      },
      options: {
        en: ["Women are better suited for childcare", "Men should not express emotions", "Women are naturally weaker in math", "Individual abilities vary from person to person"],
        zh: ["女性更适合照顾孩子", "男性不应该表达情感", "女性在数学方面天生较弱", "个体能力因人而异"]
      },
      correct: 3,
      explanation: {
        en: "Individual abilities varying from person to person is a fact-based recognition, not a gender-based stereotype.",
        zh: "个体能力因人而异是基于事实的认知，而非基于性别的刻板印象。"
      }
    },
    {
      question: {
        en: "What does the '+' in LGBTQ+ represent?",
        zh: "LGBTQ+中的'+'代表什么？"
      },
      options: {
        en: ["More sexual minorities", "Supporters", "Additional rights", "Mathematical symbol"],
        zh: ["更多性少数群体", "支持者", "额外的权利", "数学符号"]
      },
      correct: 0,
      explanation: {
        en: "The '+' in LGBTQ+ includes all other sexual and gender minorities, such as asexual, pansexual, intersex, etc.",
        zh: "LGBTQ+中的'+'包括所有其他性少数和性别少数群体，如无性恋、泛性恋、间性人等。"
      }
    },
    {
      question: {
        en: "What is the principle of equal pay for equal work?",
        zh: "同工同酬原则是指？"
      },
      options: {
        en: ["Everyone has the same salary", "People doing the same work receive the same pay", "Women's salaries should be higher than men's", "Wages distributed by gender"],
        zh: ["所有人工资相同", "相同工作的人获得相同报酬", "女性工资应高于男性", "按性别分配工资"]
      },
      correct: 1,
      explanation: {
        en: "The principle of equal pay for equal work requires that people doing work of equal value should receive equal compensation, regardless of gender.",
        zh: "同工同酬原则要求从事相同价值工作的人，不论性别，都应获得平等的薪酬。"
      }
    },
    {
      question: {
        en: "What is the 'glass ceiling'?",
        zh: "什么是'玻璃天花板'？"
      },
      options: {
        en: ["A type of architectural design", "Invisible barriers preventing women from reaching top positions", "Transparent career development path", "Women-only career channel"],
        zh: ["建筑设计的一种", "女性难以晋升到高层的隐性障碍", "透明的职业发展路径", "女性专属的职业通道"]
      },
      correct: 1,
      explanation: {
        en: "The glass ceiling refers to invisible but real barriers that women and minorities encounter in career advancement.",
        zh: "玻璃天花板指女性和少数群体在职业发展中遭遇的看不见但真实存在的晋升障碍。"
      }
    },
    {
      question: {
        en: "What is a transgender person?",
        zh: "跨性别者（transgender）是指？"
      },
      options: {
        en: ["Someone with different sexual orientation", "Someone whose gender identity differs from assigned sex at birth", "Someone who wears opposite gender clothing", "Someone after sex reassignment surgery"],
        zh: ["性取向与众不同的人", "性别认同与出生时指派性别不一致的人", "穿异性服装的人", "变性手术后的人"]
      },
      correct: 1,
      explanation: {
        en: "A transgender person's gender identity is inconsistent with the sex assigned at birth based on physical characteristics, which is unrelated to sexual orientation.",
        zh: "跨性别者的性别认同与出生时基于生理特征指派的性别不一致，这与性取向无关。"
      }
    },
    {
      question: {
        en: "What is intersectionality?",
        zh: "什么是交叉性（intersectionality）？"
      },
      options: {
        en: ["Road intersection", "The intersecting effects of different social identities", "Interdisciplinary research", "Intersection of gender and sex"],
        zh: ["道路交叉口", "不同社会身份的交织影响", "跨学科研究", "性别和性的交叉"]
      },
      correct: 1,
      explanation: {
        en: "Intersectionality theory argues that gender, race, class, and other identities interweave to shape individual experiences and forms of oppression.",
        zh: "交叉性理论认为性别、种族、阶级等身份相互交织，共同塑造个体的经验和压迫形式。"
      }
    },
    {
      question: {
        en: "Which of the following is an effective way to promote gender equality?",
        zh: "以下哪项是促进性别平等的有效途径？"
      },
      options: {
        en: ["Focus only on women's issues", "Education and awareness raising", "Ignore gender differences", "Maintain traditional gender roles"],
        zh: ["只关注女性议题", "教育和意识提升", "忽视性别差异", "维持传统性别角色"]
      },
      correct: 1,
      explanation: {
        en: "Education and awareness raising help people understand the importance of gender equality and are fundamental to driving social change.",
        zh: "教育和意识提升能帮助人们理解性别平等的重要性，是推动社会变革的基础。"
      }
    },
    {
      question: {
        en: "What is the primary purpose of gender mainstreaming?",
        zh: "性别主流化的主要目的是什么？"
      },
      options: {
        en: ["To separate gender issues from other policies", "To integrate gender perspectives into all policy areas", "To focus only on women's issues", "To eliminate gender differences"],
        zh: ["将性别问题与其他政策分离", "将性别视角纳入所有政策领域", "只关注女性议题", "消除性别差异"]
      },
      correct: 1,
      explanation: {
        en: "Gender mainstreaming aims to systematically integrate gender perspectives into all areas of policy-making and implementation.",
        zh: "性别主流化旨在将性别视角系统地纳入政策制定和实施的各个领域。"
      }
    },
    {
      question: {
        en: "What does 'patriarchy' refer to in gender studies?",
        zh: "在性别研究中，'父权制'指的是什么？"
      },
      options: {
        en: ["A type of government system", "A social system where men hold primary power", "A family structure", "A religious practice"],
        zh: ["一种政府制度", "男性掌握主要权力的社会制度", "一种家庭结构", "一种宗教实践"]
      },
      correct: 1,
      explanation: {
        en: "Patriarchy is a social system where men hold primary power and dominate in roles of political leadership, moral authority, and social privilege.",
        zh: "父权制是一种社会制度，男性在其中掌握主要权力，在政治领导、道德权威和社会特权方面占主导地位。"
      }
    },
    {
      question: {
        en: "What is 'reproductive rights'?",
        zh: "什么是'生育权'？"
      },
      options: {
        en: ["Only women's rights", "Rights relating to reproduction and reproductive health", "Rights to have children", "Medical treatment rights"],
        zh: ["仅指女性权利", "与生育和生殖健康相关的权利", "生育孩子的权利", "医疗治疗权利"]
      },
      correct: 1,
      explanation: {
        en: "Reproductive rights encompass the basic rights of individuals and couples to decide freely and responsibly the number, spacing and timing of their children.",
        zh: "生育权包括个人和夫妇自由负责任地决定生育子女的数量、间隔和时机的基本权利。"
      }
    },
    {
      question: {
        en: "What is 'gender expression'?",
        zh: "什么是'性别表达'？"
      },
      options: {
        en: ["Internal gender identity", "External manifestations of gender through appearance and behavior", "Sexual orientation", "Biological sex characteristics"],
        zh: ["内在的性别认同", "通过外表和行为表现性别的外部方式", "性取向", "生物学性别特征"]
      },
      correct: 1,
      explanation: {
        en: "Gender expression refers to how individuals present their gender to others through clothing, behavior, and personal appearance.",
        zh: "性别表达指个人通过服装、行为和个人外表向他人展现其性别的方式。"
      }
    },
    {
      question: {
        en: "What is 'misogyny'?",
        zh: "什么是'厌女症'？"
      },
      options: {
        en: ["Fear of women", "Hatred of, aversion to, or prejudice against women", "Love for women", "Understanding of women"],
        zh: ["对女性的恐惧", "对女性的仇恨、厌恶或偏见", "对女性的爱", "对女性的理解"]
      },
      correct: 1,
      explanation: {
        en: "Misogyny is the hatred of, contempt for, or prejudice against women or girls, manifested in various forms.",
        zh: "厌女症是对女性或女孩的仇恨、蔑视或偏见，以各种形式表现出来。"
      }
    },
    {
      question: {
        en: "What does 'gender binary' mean?",
        zh: "'性别二元论'是什么意思？"
      },
      options: {
        en: ["Two types of gender", "The classification of gender into male and female only", "Gender equality", "Gender diversity"],
        zh: ["两种性别类型", "将性别仅分类为男性和女性", "性别平等", "性别多样性"]
      },
      correct: 1,
      explanation: {
        en: "Gender binary is the classification of gender into two distinct, opposite forms: masculine and feminine.",
        zh: "性别二元论是将性别分类为两种截然不同、对立的形式：男性和女性。"
      }
    },
    {
      question: {
        en: "What is 'hegemonic masculinity'?",
        zh: "什么是'支配性男性气质'？"
      },
      options: {
        en: ["All types of masculinity", "The dominant form of masculinity in society", "Weak masculinity", "Feminine masculinity"],
        zh: ["所有类型的男性气质", "社会中占主导地位的男性气质形式", "软弱的男性气质", "女性化的男性气质"]
      },
      correct: 1,
      explanation: {
        en: "Hegemonic masculinity refers to the dominant form of masculinity that is culturally exalted and legitimizes male dominance.",
        zh: "支配性男性气质指在文化上被推崇并合法化男性支配地位的主导男性气质形式。"
      }
    },
    {
      question: {
        en: "What is 'homophobia'?",
        zh: "什么是'恐同'？"
      },
      options: {
        en: ["Fear of homosexuals", "Prejudice, fear, or hatred of homosexuality", "Love for homosexuals", "Understanding of homosexuality"],
        zh: ["对同性恋者的恐惧", "对同性恋的偏见、恐惧或仇恨", "对同性恋者的爱", "对同性恋的理解"]
      },
      correct: 1,
      explanation: {
        en: "Homophobia encompasses a range of negative attitudes and feelings toward homosexuality or people who are identified as homosexual.",
        zh: "恐同包括对同性恋或被认定为同性恋者的一系列负面态度和感受。"
      }
    },
    {
      question: {
        en: "What is 'paternity leave'?",
        zh: "什么是'男性育儿假'？"
      },
      options: {
        en: ["Leave for mothers only", "Leave for fathers to care for newborns", "Sick leave", "Vacation leave"],
        zh: ["仅给母亲的假期", "父亲照顾新生儿的假期", "病假", "休假"]
      },
      correct: 1,
      explanation: {
        en: "Paternity leave is a period of time when a father takes time off from work to care for his newborn child.",
        zh: "男性育儿假是父亲请假照顾新生子女的一段时间。"
      }
    },
    {
      question: {
        en: "What does 'patrilineal descent' mean?",
        zh: "'父系继嗣'是什么意思？"
      },
      options: {
        en: ["Inheritance through mother's line", "Inheritance through father's line", "Equal inheritance", "No inheritance"],
        zh: ["通过母系继承", "通过父系继承", "平等继承", "无继承"]
      },
      correct: 1,
      explanation: {
        en: "Patrilineal descent is a system of tracing kinship through the father's line, where inheritance and family identity pass through male lineage.",
        zh: "父系继嗣是通过父系追溯亲属关系的制度，继承权和家庭身份通过男性血统传递。"
      }
    },
    {
      question: {
        en: "What is 'patrilocal residence'?",
        zh: "什么是'从夫居'？"
      },
      options: {
        en: ["Living with wife's family", "Living with husband's family", "Living separately", "Living with both families"],
        zh: ["与妻子家庭同住", "与丈夫家庭同住", "分开居住", "与双方家庭同住"]
      },
      correct: 1,
      explanation: {
        en: "Patrilocal residence is a marital arrangement where the couple lives with or near the husband's family.",
        zh: "从夫居是一种婚姻安排，夫妻与丈夫的家庭同住或住在附近。"
      }
    },
    {
      question: {
        en: "What is 'sex ratio at birth'?",
        zh: "什么是'出生性别比'？"
      },
      options: {
        en: ["Ratio of adults", "Ratio of male to female births", "Ratio of children", "Ratio of elderly"],
        zh: ["成人比例", "男性与女性出生比例", "儿童比例", "老年人比例"]
      },
      correct: 1,
      explanation: {
        en: "Sex ratio at birth is the ratio of male to female births, typically expressed as the number of males per 100 females.",
        zh: "出生性别比是男性与女性出生的比例，通常表示为每100名女性对应的男性数量。"
      }
    },
    {
      question: {
        en: "What is 'son preference'?",
        zh: "什么是'重男轻女'？"
      },
      options: {
        en: ["Preferring daughters", "Systematic preference for male children", "Equal preference", "No preference"],
        zh: ["偏爱女儿", "对男性子女的系统性偏好", "平等偏好", "无偏好"]
      },
      correct: 1,
      explanation: {
        en: "Son preference is a systematic bias in favor of male children over female children in various aspects of life.",
        zh: "重男轻女是在生活的各个方面对男性子女而非女性子女的系统性偏见。"
      }
    },
    {
      question: {
        en: "What is 'sex-selective abortion'?",
        zh: "什么是'性别选择性流产'？"
      },
      options: {
        en: ["Abortion for health reasons", "Abortion based on fetal gender", "Abortion for economic reasons", "Abortion for social reasons"],
        zh: ["出于健康原因的流产", "基于胎儿性别的流产", "出于经济原因的流产", "出于社会原因的流产"]
      },
      correct: 1,
      explanation: {
        en: "Sex-selective abortion is the practice of terminating a pregnancy based on the predicted sex of the fetus.",
        zh: "性别选择性流产是基于预测胎儿性别而终止妊娠的做法。"
      }
    },
    {
      question: {
        en: "What is 'total fertility rate'?",
        zh: "什么是'总和生育率'？"
      },
      options: {
        en: ["Number of children per family", "Average number of children a woman will have", "Number of births per year", "Population growth rate"],
        zh: ["每个家庭的孩子数量", "女性平均生育的孩子数量", "每年出生数量", "人口增长率"]
      },
      correct: 1,
      explanation: {
        en: "Total fertility rate is the average number of children a woman would have if she lived through her reproductive years.",
        zh: "总和生育率是女性如果度过整个生育期平均生育的孩子数量。"
      }
    },
    {
      question: {
        en: "What is 'demography'?",
        zh: "什么是'人口学'？"
      },
      options: {
        en: ["Study of democracy", "Study of population statistics", "Study of gender", "Study of society"],
        zh: ["民主研究", "人口统计研究", "性别研究", "社会研究"]
      },
      correct: 1,
      explanation: {
        en: "Demography is the statistical study of populations, including their size, structure, and distribution.",
        zh: "人口学是对人口的统计研究，包括其规模、结构和分布。"
      }
    },
    {
      question: {
        en: "What is 'census'?",
        zh: "什么是'人口普查'？"
      },
      options: {
        en: ["Sample survey", "Complete count of population", "Opinion poll", "Market research"],
        zh: ["抽样调查", "人口的完整统计", "民意调查", "市场研究"]
      },
      correct: 1,
      explanation: {
        en: "A census is an official count or survey of a population, typically recording various details of individuals.",
        zh: "人口普查是对人口的官方统计或调查，通常记录个人的各种详细信息。"
      }
    },
    {
      question: {
        en: "What is 'fertility'?",
        zh: "什么是'生育率'？"
      },
      options: {
        en: ["Ability to reproduce", "Number of children born", "Population size", "Age structure"],
        zh: ["生育能力", "出生孩子数量", "人口规模", "年龄结构"]
      },
      correct: 1,
      explanation: {
        en: "Fertility refers to the actual reproductive performance of individuals or populations, measured by birth rates.",
        zh: "生育率指个人或人口的实际生育表现，通过出生率来衡量。"
      }
    },
    {
      question: {
        en: "What is 'aging' in demographic terms?",
        zh: "人口学术语中的'老龄化'是什么？"
      },
      options: {
        en: ["Getting older", "Increase in proportion of elderly", "Decrease in population", "Migration patterns"],
        zh: ["变老", "老年人比例增加", "人口减少", "迁移模式"]
      },
      correct: 1,
      explanation: {
        en: "Aging refers to the increase in the proportion of elderly people in a population over time.",
        zh: "老龄化指人口中老年人比例随时间的增加。"
      }
    },
    {
      question: {
        en: "What is 'age-sex structure'?",
        zh: "什么是'年龄性别结构'？"
      },
      options: {
        en: ["Population by age only", "Population by age and gender", "Population by gender only", "Population by location"],
        zh: ["仅按年龄的人口", "按年龄和性别的人口", "仅按性别的人口", "按地点的人口"]
      },
      correct: 1,
      explanation: {
        en: "Age-sex structure shows the distribution of a population by age groups and gender simultaneously.",
        zh: "年龄性别结构同时显示人口按年龄组和性别的分布。"
      }
    },
    {
      question: {
        en: "What is 'child mortality by sex'?",
        zh: "什么是'分性别的儿童死亡率'？"
      },
      options: {
        en: ["Death rate of children", "Death rate by gender", "Death rate by age", "Death rate by location"],
        zh: ["儿童死亡率", "按性别的死亡率", "按年龄的死亡率", "按地点的死亡率"]
      },
      correct: 1,
      explanation: {
        en: "Child mortality by sex measures death rates among children separately for males and females.",
        zh: "分性别的儿童死亡率分别测量男性和女性儿童的死亡率。"
      }
    },
    {
      question: {
        en: "What is 'sex distribution'?",
        zh: "什么是'性别分布'？"
      },
      options: {
        en: ["Geographic distribution", "Distribution by age", "Proportion of males and females", "Distribution by income"],
        zh: ["地理分布", "按年龄分布", "男性和女性的比例", "按收入分布"]
      },
      correct: 2,
      explanation: {
        en: "Sex distribution refers to the proportion of males and females in a population.",
        zh: "性别分布指人口中男性和女性的比例。"
      }
    },
    {
      question: {
        en: "What is 'sex ratio imbalance'?",
        zh: "什么是'性别比失衡'？"
      },
      options: {
        en: ["Equal sex ratio", "Deviation from normal sex ratio", "High birth rate", "Low birth rate"],
        zh: ["性别比相等", "偏离正常性别比", "高出生率", "低出生率"]
      },
      correct: 1,
      explanation: {
        en: "Sex ratio imbalance occurs when the sex ratio deviates significantly from the biological norm.",
        zh: "性别比失衡指性别比显著偏离生物学常态的情况。"
      }
    },
    {
      question: {
        en: "What is 'sex structure'?",
        zh: "什么是'性别结构'？"
      },
      options: {
        en: ["Physical structure", "Population composition by gender", "Social structure", "Economic structure"],
        zh: ["物理结构", "按性别的人口构成", "社会结构", "经济结构"]
      },
      correct: 1,
      explanation: {
        en: "Sex structure refers to the composition of a population in terms of gender distribution.",
        zh: "性别结构指人口在性别分布方面的构成。"
      }
    },
    {
      question: {
        en: "What is 'sex selection'?",
        zh: "什么是'性别选择'？"
      },
      options: {
        en: ["Choosing partners", "Choosing child's gender", "Choosing career", "Choosing lifestyle"],
        zh: ["选择伴侣", "选择孩子的性别", "选择职业", "选择生活方式"]
      },
      correct: 1,
      explanation: {
        en: "Sex selection refers to the practice of choosing the sex of offspring through various methods.",
        zh: "性别选择指通过各种方法选择后代性别的做法。"
      }
    },
    {
      question: {
        en: "What is 'prenatal sex determination'?",
        zh: "什么是'产前性别鉴定'？"
      },
      options: {
        en: ["Determining sex after birth", "Determining sex before birth", "Determining health", "Determining development"],
        zh: ["出生后确定性别", "出生前确定性别", "确定健康", "确定发育"]
      },
      correct: 1,
      explanation: {
        en: "Prenatal sex determination is the process of identifying the biological sex of a fetus before birth.",
        zh: "产前性别鉴定是在出生前识别胎儿生物学性别的过程。"
      }
    },
    {
      question: {
        en: "What is 'prenatal sex selection'?",
        zh: "什么是'产前性别选择'？"
      },
      options: {
        en: ["Choosing after birth", "Choosing before birth", "Medical treatment", "Health check"],
        zh: ["出生后选择", "出生前选择", "医疗治疗", "健康检查"]
      },
      correct: 1,
      explanation: {
        en: "Prenatal sex selection involves choosing the sex of offspring before birth through various techniques.",
        zh: "产前性别选择涉及通过各种技术在出生前选择后代的性别。"
      }
    },
    {
      question: {
        en: "What is 'real name registration'?",
        zh: "什么是'出生人口实名登记'？"
      },
      options: {
        en: ["Anonymous registration", "Official registration with legal identity", "Temporary registration", "Optional registration"],
        zh: ["匿名登记", "使用法定身份信息的官方登记", "临时登记", "可选登记"]
      },
      correct: 1,
      explanation: {
        en: "Real name registration requires official registration using legal identity information.",
        zh: "实名登记要求使用法定身份信息进行官方登记。"
      }
    },
    {
      question: {
        en: "What is 'sex ratio by birth order'?",
        zh: "什么是'分孩次出生性别比'？"
      },
      options: {
        en: ["Overall sex ratio", "Sex ratio by child's birth order", "Age-specific ratio", "Regional ratio"],
        zh: ["总体性别比", "按孩子出生顺序的性别比", "年龄别比率", "地区比率"]
      },
      correct: 1,
      explanation: {
        en: "Sex ratio by birth order examines the sex ratio for each birth order (first child, second child, etc.).",
        zh: "分孩次出生性别比检查每个出生顺序（第一胎、第二胎等）的性别比。"
      }
    },
    {
      question: {
        en: "What is 'sex ratio of children under five'?",
        zh: "什么是'5岁以下儿童性别比'？"
      },
      options: {
        en: ["All age groups", "Children under 5 years", "Adults only", "Elderly only"],
        zh: ["所有年龄组", "5岁以下儿童", "仅成人", "仅老年人"]
      },
      correct: 1,
      explanation: {
        en: "Sex ratio of children under five measures the male-to-female ratio among children under five years old.",
        zh: "5岁以下儿童性别比测量5岁以下儿童中男性与女性的比例。"
      }
    },
    {
      question: {
        en: "What is 'sex ratio in the general population'?",
        zh: "什么是'总人口性别比'？"
      },
      options: {
        en: ["Specific groups only", "Entire population", "Urban only", "Rural only"],
        zh: ["仅特定群体", "整个人口", "仅城市", "仅农村"]
      },
      correct: 1,
      explanation: {
        en: "Sex ratio in the general population measures the male-to-female ratio in the entire population.",
        zh: "总人口性别比测量整个人口中男性与女性的比例。"
      }
    },
    {
      question: {
        en: "What is 'population sample survey'?",
        zh: "什么是'人口抽样调查'？"
      },
      options: {
        en: ["Complete census", "Sample-based survey", "Opinion poll", "Market research"],
        zh: ["完整普查", "基于抽样的调查", "民意调查", "市场研究"]
      },
      correct: 1,
      explanation: {
        en: "Population sample survey uses probability sampling to gather information about population characteristics.",
        zh: "人口抽样调查使用概率抽样来收集人口特征信息。"
      }
    },
    {
      question: {
        en: "What is 'Population Statistics Yearbook'?",
        zh: "什么是'人口统计年鉴'？"
      },
      options: {
        en: ["Monthly report", "Annual compilation of population data", "Weekly update", "Daily statistics"],
        zh: ["月度报告", "人口数据的年度汇编", "周度更新", "日度统计"]
      },
      correct: 1,
      explanation: {
        en: "Population Statistics Yearbook is an annual publication compiling population and related socioeconomic statistics.",
        zh: "人口统计年鉴是汇编人口和相关社会经济统计数据的年度出版物。"
      }
    },
    {
      question: {
        en: "What is 'B-ultrasound check'?",
        zh: "什么是'B超检查'？"
      },
      options: {
        en: ["Blood test", "Ultrasound examination", "X-ray", "MRI scan"],
        zh: ["血液检查", "超声检查", "X光", "核磁共振扫描"]
      },
      correct: 1,
      explanation: {
        en: "B-ultrasound check uses ultrasound imaging to assess fetal or organ conditions.",
        zh: "B超检查使用超声成像来评估胎儿或器官状况。"
      }
    },
    {
      question: {
        en: "What is 'unemployment insurance'?",
        zh: "什么是'失业保险'？"
      },
      options: {
        en: ["Health insurance", "Social security for unemployed", "Life insurance", "Property insurance"],
        zh: ["健康保险", "失业者的社会保障", "人寿保险", "财产保险"]
      },
      correct: 1,
      explanation: {
        en: "Unemployment insurance provides income and employment services to eligible unemployed individuals.",
        zh: "失业保险为符合条件的失业者提供收入和就业服务。"
      }
    },
    {
      question: {
        en: "What is 'basic medical insurance'?",
        zh: "什么是'基本医疗保险'？"
      },
      options: {
        en: ["Life insurance", "Health coverage for residents", "Property insurance", "Travel insurance"],
        zh: ["人寿保险", "居民的健康保障", "财产保险", "旅行保险"]
      },
      correct: 1,
      explanation: {
        en: "Basic medical insurance provides medical expense reimbursement and risk sharing for residents.",
        zh: "基本医疗保险为居民提供医疗费用报销和风险分担。"
      }
    },
    {
      question: {
        en: "What is 'village regulations and local rules'?",
        zh: "什么是'村规民约'？"
      },
      options: {
        en: ["National laws", "Village-level autonomous norms", "International rules", "Corporate policies"],
        zh: ["国家法律", "村级自治规范", "国际规则", "企业政策"]
      },
      correct: 1,
      explanation: {
        en: "Village regulations and local rules are autonomous norms and behavioral standards at the village or community level.",
        zh: "村规民约是村落或社区层面的自治性规范和行为准则。"
      }
    },
    {
      question: {
        en: "What is 'arranged and forced marriage'?",
        zh: "什么是'包办和强迫婚姻'？"
      },
      options: {
        en: ["Voluntary marriage", "Marriage without full consent", "Love marriage", "Divorce"],
        zh: ["自愿婚姻", "未经充分同意的婚姻", "爱情婚姻", "离婚"]
      },
      correct: 1,
      explanation: {
        en: "Arranged and forced marriage occurs without full voluntary consent, often arranged by third parties.",
        zh: "包办和强迫婚姻是在没有充分自愿同意的情况下发生的，通常由第三方安排。"
      }
    },
    {
      question: {
        en: "What is 'common-law marriage'?",
        zh: "什么是'习惯法婚姻'？"
      },
      options: {
        en: ["Formal marriage", "Informal marriage recognized by law", "Religious marriage", "Temporary marriage"],
        zh: ["正式婚姻", "法律承认的非正式婚姻", "宗教婚姻", "临时婚姻"]
      },
      correct: 1,
      explanation: {
        en: "Common-law marriage is recognized in some jurisdictions based on long-term cohabitation and public acknowledgment.",
        zh: "习惯法婚姻在某些法域中基于长期同居和公众承认而被承认。"
      }
    },
    {
      question: {
        en: "What is 'distribution of resources'?",
        zh: "什么是'资源分配'？"
      },
      options: {
        en: ["Resource creation", "Systematic allocation of resources", "Resource destruction", "Resource storage"],
        zh: ["资源创造", "资源的系统性配置", "资源破坏", "资源储存"]
      },
      correct: 1,
      explanation: {
        en: "Distribution of resources refers to the systematic allocation of material and opportunity resources within groups.",
        zh: "资源分配指在群体内部对物质和机会等资源的系统性配置。"
      }
    },
    {
      question: {
        en: "What is 'female infanticide'?",
        zh: "什么是'溺弃女婴'？"
      },
      options: {
        en: ["Caring for girls", "Killing or abandoning female infants", "Educating girls", "Protecting girls"],
        zh: ["照顾女孩", "杀害或遗弃女婴", "教育女孩", "保护女孩"]
      },
      correct: 1,
      explanation: {
        en: "Female infanticide is the extreme gender discrimination practice of killing or abandoning newborn female infants.",
        zh: "溺弃女婴是因性别而对新生女婴实施致死或遗弃的极端性别歧视行为。"
      }
    },
    {
      question: {
        en: "What is 'feticide'?",
        zh: "什么是'堕杀胎儿'？"
      },
      options: {
        en: ["Birth", "Causing fetal death", "Prenatal care", "Delivery"],
        zh: ["出生", "导致胎儿死亡", "产前护理", "分娩"]
      },
      correct: 1,
      explanation: {
        en: "Feticide refers to causing the death of a fetus before it becomes viable, through medical or illegal means.",
        zh: "堕杀胎儿指在胎儿可存活前通过医疗或非法手段导致其死亡的行为。"
      }
    },
    {
      question: {
        en: "What is 'gender asymmetry'?",
        zh: "什么是'男女不均衡'？"
      },
      options: {
        en: ["Gender equality", "Systematic gender differences", "Gender similarity", "Gender neutrality"],
        zh: ["性别平等", "系统性性别差异", "性别相似性", "性别中性"]
      },
      correct: 1,
      explanation: {
        en: "Gender asymmetry refers to systematic differences in power, status, and resources based on gender.",
        zh: "男女不均衡指在权力、地位和资源等方面因性别产生的系统性差异。"
      }
    },
    {
      question: {
        en: "What is 'masculinity'?",
        zh: "什么是'男性气质'？"
      },
      options: {
        en: ["Physical strength", "Cultural expectations for men", "Biological traits", "Economic status"],
        zh: ["体力", "对男性的文化期望", "生物学特征", "经济地位"]
      },
      correct: 1,
      explanation: {
        en: "Masculinity refers to the set of cultural expectations, behavioral norms, and self-identity frameworks associated with male identity.",
        zh: "男性气质指与男性身份关联的一组文化期望、行为规范和自我认同框架。"
      }
    },
    {
      question: {
        en: "What is 'homosexuality'?",
        zh: "什么是'同性恋'？"
      },
      options: {
        en: ["Attraction to opposite sex", "Attraction to same sex", "No attraction", "Attraction to all"],
        zh: ["对异性的吸引", "对同性的吸引", "无吸引", "对所有性别的吸引"]
      },
      correct: 1,
      explanation: {
        en: "Homosexuality is the sexual orientation characterized by persistent emotional and/or sexual attraction to the same gender.",
        zh: "同性恋是对同一性别产生持续情感和/或性吸引的性取向。"
      }
    }
  ];

  const lang = t("en", "zh") as "en" | "zh";

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    if (answerIndex === gameQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < gameQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizCompleted(true);
      updateGameProgress('quiz', true);
      updateGameProgress('quizScore', score);
    }
  };

  const restartQuiz = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
    setGameQuestions(shuffled);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setQuizCompleted(false);
  };

  const getBadge = () => {
    const percentage = (score / gameQuestions.length) * 100;
    if (percentage < 40) return {
      title: t("Gender Beginner", "性别初学者"),
      icon: Sprout,
      color: "text-gray-600",
      bg: "bg-gray-100"
    };
    if (percentage <= 70) return {
      title: t("Gender Thinker", "性别思考者"),
      icon: MessageCircle,
      color: "text-[#00a19a]",
      bg: "bg-[#00a19a]/10"
    };
    return {
      title: t("Gender Scholar", "性别学者"),
      icon: GraduationCap,
      color: "text-[#d62e39]",
      bg: "bg-[#d62e39]/10"
    };
  };

  if (gameQuestions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">{t("Loading...", "加载中...")}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00a19a]/10 to-[#008c85]/10">
      <Navigation />
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
            {language === "en" ? "Quiz" : "测验"}
          </span>
        </div>

        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-6xl font-black mb-4">{t("Gender Knowledge Quiz", "性别知识测验")}</h1>
            <p className="text-xl text-gray-700 mb-2">{t("How much do you know about gender?", "你对性别了解多少？")}</p>
            <p className="text-lg text-gray-600 font-semibold">{t("(Single Choice Questions)", "（单选题）")}</p>
          </div>

          {!quizCompleted ? (
            <Card className="p-8 bg-white shadow-xl">
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">
                  {t("Question", "问题")} {currentQuestion + 1} / {gameQuestions.length}
                </p>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div className="bg-[#00a19a] h-2 rounded-full transition-all" style={{ width: `${((currentQuestion + 1) / gameQuestions.length) * 100}%` }}></div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-6">{gameQuestions[currentQuestion].question[lang]}</h3>

              <div className="space-y-3 mb-6">
                {gameQuestions[currentQuestion].options[lang].map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showFeedback && handleAnswer(index)}
                    disabled={showFeedback}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      showFeedback
                        ? index === gameQuestions[currentQuestion].correct
                          ? "border-green-500 bg-green-50"
                          : index === selectedAnswer
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 bg-gray-50"
                        : "border-gray-300 hover:border-[#00a19a] hover:bg-gray-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {showFeedback && (
                <div className={`p-4 rounded-lg mb-6 ${selectedAnswer === gameQuestions[currentQuestion].correct ? "bg-green-50 border-2 border-green-500" : "bg-red-50 border-2 border-red-500"}`}>
                  <p className="font-bold mb-2">
                    {selectedAnswer === gameQuestions[currentQuestion].correct ? "✅ " + t("Correct!", "正确！") : "❌ " + t("Incorrect", "答错了")}
                  </p>
                  <p className="text-gray-700">{gameQuestions[currentQuestion].explanation[lang]}</p>
                </div>
              )}

              {showFeedback && (
                <div className="space-y-3">
                  <Button onClick={nextQuestion} className="w-full bg-[#00a19a] hover:bg-[#008c85] text-white py-6 text-lg font-bold">
                    {currentQuestion < gameQuestions.length - 1 ? t("Next Question", "下一题") + " →" : t("View Results", "查看结果") + " →"}
                  </Button>
                  {currentQuestion > 0 && (
                    <Button
                      onClick={() => {
                        setCurrentQuestion(currentQuestion - 1);
                        setSelectedAnswer(null);
                        setShowFeedback(false);
                      }}
                      className="w-full bg-gray-500 hover:bg-gray-600 text-white py-6 text-lg font-bold"
                    >
                      ← {t("Previous Question", "上一题")}
                    </Button>
                  )}
                </div>
              )}

              <p className="text-center mt-4 text-gray-600">{t("Current Score", "当前得分")}: {score}</p>
            </Card>
          ) : (
            <Card className="p-12 bg-white shadow-xl text-center">
              <h2 className="text-4xl font-black mb-6">{t("Quiz Complete!", "测验完成！")}</h2>
              <p className="text-6xl font-black mb-8">{score} / {gameQuestions.length}</p>

              <div className={`inline-block px-8 py-4 rounded-lg ${getBadge().bg} mb-8`}>
                <div className="flex justify-center mb-2">
                  {(() => {
                    const BadgeIcon = getBadge().icon;
                    return <BadgeIcon className={`w-20 h-20 ${getBadge().color}`} strokeWidth={1.5} />;
                  })()}
                </div>
                <p className={`text-3xl font-black ${getBadge().color}`}>{getBadge().title}</p>
              </div>

              <p className="text-lg text-gray-700 mb-8">
                {score < 4 && t("Keep learning to understand more about gender equality!", "继续学习，了解更多性别平等知识！")}
                {score >= 4 && score <= 7 && t("Great! You have a good understanding of gender issues.", "很好！你对性别议题有不错的理解。")}
                {score > 7 && t("Excellent! You have deep knowledge of gender equality!", "优秀！你对性别平等有深入的认识！")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={restartQuiz} className="bg-[#00a19a] hover:bg-[#008c85] text-white px-8 py-6 text-lg font-bold">
                  {t("Retake Quiz", "重新测验")}
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
