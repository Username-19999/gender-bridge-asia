"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Navigation } from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function BlogDetailPage() {
  const { t, language } = useLanguage();
  const params = useParams();
  const id = params.id as string;

  type Article = {
    date: string;
    category: string;
    title: string;
    content: {
      en: string;
      zh: string;
    };
  };

  const articles: Record<string, Article> = {
    "1": {
      date: "25 October, 2025",
      category: t("Research", "研究"),
      title: t("Bias Amplification in Visual Recognition: How Structured Models Perpetuate and Exacerbate Social Stereotypes", "视觉识别任务中的偏见放大：结构化模型如何固化并恶化社会刻板印象"),
      content: {
        en: `
          <p class="mb-6"><strong>Paper:</strong><br/>
          Title: Men Also Like Shopping: Reducing Gender Bias Amplification using Corpus-level Constraints<br/>
          Authors: Jieyu Zhao, Tianlu Wang, Mark Yatskar, Vicente Ordonez, Kai-Wei Chang</p>

          <h2 class="text-2xl font-bold mt-8 mb-4">How Structured Models Learn and Amplify Societal Biases in Web Data?</h2>
          <p class="mb-6">Visual recognition tasks that incorporate language, such as captioning and visual semantic role labeling (vSRL), have emerged as critical avenues for extracting rich semantics from images. These tasks rely on large quantities of labeled data, predominantly sourced from the web. To make coherent predictions even with weak visual support, methods often combine structured prediction and deep learning to model correlations between labels and images.</p>
          <p class="mb-6">However, the risk, as quantified by Zhao et al. (2017), is that these methods may "discover and exploit societal biases present in the underlying web corpora". Without proper calibration, the broad adoption of these models can have the inadvertent effect of magnifying stereotypes.</p>

          <h2 class="text-2xl font-bold mt-8 mb-4">Key Findings: How Existing Bias is Amplified by Models</h2>
          <p class="mb-6">Analyzing both visual semantic role labeling (vSRL, using the imSitu dataset) and multilabel object classification (MLC, using MS-COCO), researchers confirmed a two-part phenomenon:</p>
          <p class="mb-6"><strong>Significant Dataset Bias Exists:</strong> Datasets for both tasks contain significant gender bias. For example, in vSRL, over 45% of verbs and 37% of objects exhibit bias toward one gender greater than 2:1. The activity "cooking" is over 33% more likely to involve females than males in the imSitu training set.</p>
          <p class="mb-6"><strong>Bias Amplification After Training:</strong> After training state-of-the-art structured predictors, the models were shown to further amplify the existing bias.</p>
          <ul class="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Case Example:</strong> For the activity "cooking," a trained Conditional Random Field (CRF) model amplified the training set disparity (33% male agent presence) to 68% disparity at test time. The proportion of men in the agent role for "cooking" images dropped from 33% in the training set to 16% in the predicted set.</li>
            <li><strong>Quantification:</strong> Trained models amplified existing bias by 5.0% for vSRL, and 3.6% in MLC on average.</li>
          </ul>
          <p class="mb-6">The authors emphasize that deploying such uncalibrated systems could not only reinforce existing social bias but actually make them worse.</p>

          <h2 class="text-2xl font-bold mt-8 mb-4">Policy and Research Implications: Calibration via Constrained Inference</h2>
          <p class="mb-6">To mitigate the amplification of bias learned from biased corpora, the researchers proposed a novel constrained inference framework called RBA (Reducing Bias Amplification).</p>
          <p class="mb-6"><strong>Intervention Mechanism:</strong> RBA injects corpus-level constraints to ensure that model predictions follow the distribution observed in the training data. For instance, constraints ensure that the noun "man" occurs in the agent role of "cooking" as often as it did in the original training set.</p>
          <p class="mb-6"><strong>Results and Efficiency:</strong> Evaluation demonstrated RBA's effectiveness:</p>
          <ul class="list-disc pl-6 mb-6 space-y-2">
            <li>RBA substantially reduced the average magnitude of bias amplification by 47.5% for MLC and 40.5% for vSRL.</li>
            <li>Crucially, this calibration method resulted in almost no performance loss for the underlying recognition task.</li>
          </ul>
          <p class="mb-6"><strong>Research Outlook:</strong> This work is the first to demonstrate that structured prediction models amplify bias and to propose methods for reducing this effect. Future work includes applying these methods in other structured domains, such as pronoun reference resolution.</p>
        `,
        zh: `
          <p class="mb-6"><strong>论文：</strong><br/>
          Title: Men Also Like Shopping: Reducing Gender Bias Amplification using Corpus-level Constraints<br/>
          Authors: Jieyu Zhao, Tianlu Wang, Mark Yatskar, Vicente Ordonez, Kai-Wei Chang</p>

          <h2 class="text-2xl font-bold mt-8 mb-4">结构化模型如何"习得"并"放大"网络数据中的社会偏见？</h2>
          <p class="mb-6">视觉识别任务（例如图像标注和视觉语义角色标注，vSRL）越来越多地结合语言描述，旨在从图像中提取丰富的语义信息。这些任务依赖于主要从网络获取的大量带标签数据。为了在视觉支持较弱的情况下做出预测，模型经常结合结构化预测（Structured Prediction）和深度学习来模型化标签与图像之间的相关性。</p>
          <p class="mb-6">然而，赵洁玉等人进行的研究（2017）警告说，这种方法存在风险，即它可能会"发现并利用底层网络语料库中存在的社会偏见"。如果不加以校准，广泛采用这些模型可能会无意中加剧刻板印象。</p>

          <h2 class="text-2xl font-bold mt-8 mb-4">关键发现：数据中的偏见如何被模型放大</h2>
          <p class="mb-6">通过对视觉语义角色标注（vSRL，使用 imSitu 数据集）和多标签物体分类（MLC，使用 MS-COCO 数据集）的分析，研究人员确认了系统性偏见的存在与放大：</p>
          <p class="mb-6"><strong>数据集包含显著偏见：</strong> vSRL 和 MLC 的数据集都包含显著的性别偏见。例如，在 vSRL 任务中，超过 45% 的动词和 37% 的物体表现出大于 2:1 的性别偏见。在 imSitu 训练集中，"烹饪"（cooking）活动涉及女性的可能性比男性高出 33% 以上。</p>
          <p class="mb-6"><strong>训练后的偏见放大效应：</strong> 在这些有偏见的数据集上训练最先进的结构化预测器后，模型会进一步放大现有的偏见。</p>
          <ul class="list-disc pl-6 mb-6 space-y-2">
            <li><strong>案例：</strong> 针对"烹饪"活动，训练后的条件随机场（CRF）模型将训练集中 33% 的差异进一步放大到测试时的 68%。男性担任"代理人"角色的比例从训练集中的 33% 降至 16%。</li>
            <li><strong>量化：</strong> 训练后的模型在 vSRL 任务中平均将现有偏见放大 5.0%，在 MLC 任务中放大 3.6%。</li>
          </ul>
          <p class="mb-6">研究人员强调，如果不采取措施，部署未经校准的系统不仅会强化现有的社会偏见，还会使其恶化。</p>

          <h2 class="text-2xl font-bold mt-8 mb-4">政策与研究启示：通过约束推断实现校准</h2>
          <p class="mb-6">为了减轻偏见放大效应，研究提出了一种新颖的约束推断框架，称为 RBA（Reducing Bias Amplification，减少偏见放大）。</p>
          <p class="mb-6"><strong>干预机制：</strong> RBA 引入了语料库级别约束，以确保模型预测（例如，名词"man"在"烹饪"活动中作为代理人出现的频率）遵循训练数据中观察到的分布。</p>
          <p class="mb-6"><strong>结果与效率：</strong> 评估显示 RBA 方法取得了实质性进展：</p>
          <ul class="list-disc pl-6 mb-6 space-y-2">
            <li>RBA 显著减少了偏见放大，MLC 的平均偏见放大幅度减少了 47.5%，vSRL 减少了 40.5%。</li>
            <li>该校准方法几乎不影响底层识别任务的性能。</li>
          </ul>
          <p class="mb-6"><strong>研究展望：</strong> 这项工作首次证明了结构化预测模型会放大偏见，并提出了减少这种影响的方法。未来的研究应探索将偏见减少方法应用于其他结构化领域，例如代词指代消解。</p>
        `
      }
    },
    "2": {
      date: "30 October, 2025",
      category: t("Research", "研究"),
      title: t("Algorithmic Discrimination: A New Perspective on Cost-Driven Information Inequality", "算法歧视的新视角：成本效益驱动下的信息分配不均"),
      content: {
        en: `
          <p class="mb-6"><strong>Paper:</strong><br/>
          Title: Algorithmic Bias? An Empirical Study into Apparent Gender-Based Discrimination in the Display of STEM Career Ads<br/>
          Authors: Anja Lambrecht and Catherine Tucker<br/>
          Publication: Management Science (MNSC.2018.3093)</p>

          <h2 class="text-2xl font-bold mt-8 mb-4">Why Automated Algorithmic Decisions Produce Seemingly Discriminatory Outcomes?</h2>
          <p class="mb-6">The increasing adoption of algorithms in automating decision-making has generated deep concern that these automated choices may produce discriminatory results. Traditional explanations for algorithmic discrimination often cite intentional or unconscious bias by programmers or bias learned from behavioral data.</p>
          <p class="mb-6">However, the empirical study by Lambrecht and Tucker (2018) provides a nuanced explanation by examining the display of ads promoting STEM career opportunities. This ad campaign was explicitly intended to be gender-neutral in its delivery.</p>

          <h2 class="text-2xl font-bold mt-8 mb-4">Key Finding: Economic "Crowding Out" as the Core Driver of Disparity</h2>
          <p class="mb-6">The central finding was that despite the gender-neutral intent, the ad was shown to over 20% more men than women across 191 countries, particularly in the 25–54 age range. The research ruled out several alternative explanations:</p>
          <ul class="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Exclusion of Consumer Behavior:</strong> Women's click-through rates (0.167%) were actually higher than men's (0.131%), invalidating the hypothesis that the algorithm reduced exposure because women were less likely to engage.</li>
            <li><strong>Exclusion of Cultural Prejudice:</strong> The imbalance was not related to country-specific factors like female education levels, labor market participation, or general gender equality indices.</li>
          </ul>
          <p class="mb-6"><strong>Core Cause—Competitive Spillovers and Pricing Pressure:</strong> The unequal allocation reflected the economics of ad delivery in competitive online markets.</p>
          <ul class="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Women as a Prized Demographic:</strong> Evidence suggests that younger women are a "prized demographic" because they often control household purchases and have higher conversion rates (more likely to purchase after clicking) for other sectors like retail.</li>
            <li><strong>Cost-Driven Disparate Impact:</strong> Consequently, female "eyeballs" are more expensive to advertise to. An algorithm optimizing solely for cost-effectiveness will favor the cheaper audience (men) when displaying a gender-neutral ad, leading to an apparent discriminatory outcome due to crowding out.</li>
          </ul>
          <p class="mb-6">This suggests that economic forces can distort algorithmic decision-making, disadvantaging one group relative to another, even when human bias is removed.</p>

          <h2 class="text-2xl font-bold mt-8 mb-4">Policy Implications and Legal Tension</h2>
          <p class="mb-6">The findings highlight significant policy challenges in regulating algorithmic bias:</p>
          <ul class="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Limits of Algorithmic Transparency:</strong> Requiring mere "algorithmic transparency" may be insufficient. Public scrutiny of the code would likely only reveal an algorithm aiming for the reasonable goal of cost-minimization, failing to reveal how that minimization interacts with competitive economic environments to create bias.</li>
            <li><strong>Legal Conflict:</strong> U.S. employment discrimination law distinguishes between "disparate treatment" (intentional discrimination) and "disparate impact" (neutral practices leading to negative outcomes). The legal status of targeted advertising within this framework is unclear.</li>
            <li><strong>The Paradox of Correction:</strong> When advertisers attempt to correct the observed imbalance by running a targeted campaign aimed only at women to ensure equal reach, the ad is often not approved by the platform. This is because Federal law prohibits using targeting to exclude a group in employment advertising (disparate treatment). This restriction prevents firms from using digital techniques to rectify imbalances caused by the algorithm.</li>
          </ul>
          <p class="mb-6">Policymakers should consider new guidance, potentially requiring platforms to offer advertisers the option of automatically equalizing ad distribution across specified demographic groups for certain campaigns.</p>
        `,
        zh: `
          <p class="mb-6"><strong>论文：</strong><br/>
          Title: Algorithmic Bias? An Empirical Study into Apparent Gender-Based Discrimination in the Display of STEM Career Ads<br/>
          Authors: Anja Lambrecht and Catherine Tucker<br/>
          Publication: Management Science (MNSC.2018.3093)</p>

          <h2 class="text-2xl font-bold mt-8 mb-4">算法决策自动化为何会产生看似歧视的结果？</h2>
          <p class="mb-6">算法在自动化决策中的应用日益普遍，引发了人们对自动化选择可能产生歧视性结果的深切关注。传统上，人们倾向于将算法歧视归因于程序员的有意或无意识偏见，或者算法从行为数据中学习到的偏差。</p>
          <p class="mb-6">然而，Lambrecht 和 Tucker (2018) 通过一项针对 STEM（科学、技术、工程和数学）职业机会广告投放的实证研究，提供了一个新颖的解释。这项广告在投放设计上明确意图是性别中立的。</p>

          <h2 class="text-2xl font-bold mt-8 mb-4">核心发现：经济"挤出效应"（Crowding Out）导致分配不均</h2>
          <p class="mb-6">该研究的关键发现是：尽管广告意图性别中立，但在全球 191 个国家的实地测试中，该广告被展示给男性的次数比女性多 20% 以上，尤其是在 25-54 岁的年龄段。研究排除了几种流行的解释：</p>
          <ul class="list-disc pl-6 mb-6 space-y-2">
            <li><strong>排除用户行为偏见：</strong> 女性的点击率（0.167%）实际上高于男性（0.131%），排除了算法因女性不点击而减少曝光的可能性。</li>
            <li><strong>排除文化或国家偏见：</strong> 这种结果与所在国家的女性教育水平、劳动力参与度或一般的性别平等指数无关。</li>
          </ul>
          <p class="mb-6"><strong>核心原因——竞争性溢出与定价压力：</strong> 这种分配不均反映了数字广告投放的经济学原理。</p>
          <ul class="list-disc pl-6 mb-6 space-y-2">
            <li><strong>女性是高价值受众：</strong> 零售业等其他行业的经验表明，年轻女性被认为是"珍贵的"目标受众，因为她们通常掌控家庭采购，并且条件性地更可能在点击广告后进行购买（转化率更高）。</li>
            <li><strong>成本驱动的歧视影响：</strong> 因此，向女性投放广告的成本更高。一个仅仅优化成本效益的算法，在投放中立广告时，会倾向于选择成本更低的受众（男性），从而导致信息获取机会的分配不平衡。</li>
          </ul>
          <p class="mb-6">这种结果表明，经济力量可能扭曲算法决策，使某一群体处于不利地位，即使算法本身是中立的。</p>

          <h2 class="text-2xl font-bold mt-8 mb-4">政策启示与法律困境</h2>
          <p class="mb-6">该研究揭示了在监管算法歧视方面的政策挑战：</p>
          <ul class="list-disc pl-6 mb-6 space-y-2">
            <li><strong>算法透明度的局限性：</strong> 仅要求"算法透明度"可能无济于事。对算法代码的审查可能只显示其目标是"成本最小化"，而无法预见这种最小化将如何在竞争性经济环境中影响广告分配。</li>
            <li><strong>法律的紧张关系：</strong> 在美国，就业歧视法区分了"差别待遇"（故意歧视）和"歧视影响"（中立做法导致的负面影响）。但法律对于如何将定向广告纳入就业歧视框架尚未有定论。</li>
            <li><strong>纠正的悖论：</strong> 尽管算法导致了信息获取的不平衡，但广告商如果试图通过针对性投放来确保性别平衡（例如，只针对女性投放 STEM 广告），却可能因联邦法律禁止在招聘广告中将特定群体排除在外而不被批准。这种限制反而阻碍了企业使用数字技术来纠正算法造成的不平衡。</li>
          </ul>
          <p class="mb-6">政策制定者需要考虑新的指导方针，例如要求平台提供选项，允许广告商在特定活动中自动均衡跨人口群体的广告展示量。</p>
        `
      }
    }
  };

  const article = articles[id] || articles["1"];
  const content = article.content[t("en", "zh") as "en" | "zh"];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-sm text-gray-600 mb-8">
          <Link href="/" className="text-[#00a19a] font-semibold hover:underline">
            {language === "en" ? "Home" : "首页"}
          </Link>
          <span className="mx-2">&gt;&gt;</span>
          <Link href="/blog" className="text-[#00a19a] font-semibold hover:underline">
            {language === "en" ? "Blog" : "博客"}
          </Link>
          <span className="mx-2">&gt;&gt;</span>
          <span className="font-semibold text-black">
            {language === "en" ? "Article" : "文章"}
          </span>
        </div>

        <AnimatedSection>
          <article>
            <div className="mb-8">
              <span className="inline-block bg-[#00a19a] text-white px-4 py-2 font-bold mb-4">{article.category}</span>
              <p className="text-sm text-gray-500 mb-2">{article.date}</p>
            </div>

            <h1 className="text-4xl md:text-4xl font-black mb-8 leading-tight">{article.title}</h1>

            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />

            <div className="mt-12 pt-8 border-t-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4">{t("Share this article", "分享这篇文章")}</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-[#00a19a] hover:underline font-semibold">Twitter</a>
                <a href="#" className="text-[#00a19a] hover:underline font-semibold">LinkedIn</a>
                <a href="#" className="text-[#00a19a] hover:underline font-semibold">Facebook</a>
              </div>
            </div>
          </article>
        </AnimatedSection>
      </div>
    </div>
  );
}
