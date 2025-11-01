"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileText, Image as ImageIcon, MessageSquare, Video } from "lucide-react";

type SubmissionType = "article" | "image" | "story" | "video";
type SubmissionTarget = "editorial" | "community";

type Submission = {
  id: string;
  type: SubmissionType;
  target: SubmissionTarget;
  title: string;
  content: string;
  date: string;
  author?: string; // For editorial submissions
  isSample?: boolean;
};

export function CommunityVoices() {
  const { t, language } = useLanguage();
  
  const [editorialSubmissions, setEditorialSubmissions] = useState<Submission[]>([]);
  const [communitySubmissions, setCommunitySubmissions] = useState<Submission[]>([]);

  // Update sample submissions when language changes
  React.useEffect(() => {
    const editorialSamples: Submission[] = [
      {
        id: "editorial-1",
        type: "article",
        target: "editorial",
        title: language === "zh" ? "数字游民时代下的性别劳动分工再观察" : "Re-examining Gender Division of Labor in the Digital Nomad Era",
        content: language === "zh" 
          ? "在远程工作和数字游民兴起的背景下，我们观察到性别劳动分工呈现出新的特征和挑战。本文探讨这一现象对性别平等的影响。" 
          : "With the rise of remote work and digital nomadism, we observe new characteristics and challenges in gender division of labor. This article explores its impact on gender equality.",
        date: "2025-01-20",
        author: language === "zh" ? "李明远" : "Alex Chen",
        isSample: true
      },
      {
        id: "editorial-2",
        type: "image",
        target: "editorial",
        title: language === "zh" ? "亚洲乡镇女性工作状态摄影集" : "Photo Series: Women's Work in Asian Rural Towns",
        content: language === "zh"
          ? "一组关于亚洲乡镇女性工作状态的摄影作品，记录她们在家庭与社会角色之间的平衡与挣扎。"
          : "A photography series documenting women's work in Asian rural towns, capturing the balance and struggles between family and social roles.",
        date: "2025-01-18",
        author: language === "zh" ? "张晓艺" : "Sophie Zhang",
        isSample: true
      },
      {
        id: "editorial-3",
        type: "image",
        target: "editorial",
        title: language === "zh" ? "日本流行文化中的女性形象：反思与重构" : "Female Representation in Japanese Pop Culture: Reflection and Reconstruction",
        content: language === "zh"
          ? "通过镜头探索日本当代流行文化中女性形象的演变，从动漫、影视到街头文化，审视性别刻板印象的挑战与突破。"
          : "Exploring the evolution of female representation in contemporary Japanese pop culture through photography, from anime and film to street culture, examining challenges and breakthroughs in gender stereotypes.",
        date: "2025-01-15",
        author: language === "zh" ? "田中美咲" : "Misaki Tanaka",
        isSample: true
      }
    ];

    const communitySamples: Submission[] = [
      {
        id: "community-1",
        type: "story",
        target: "community",
        title: language === "zh" ? "在家庭中挑战「妈味」：我如何拒绝做「完美母亲」" : "Challenging 'Mom Flavor': How I Refused to Be the 'Perfect Mother'",
        content: language === "zh"
          ? "分享我在家庭中挑战传统母亲角色期待的经历，以及如何与家人沟通界限和自我价值。"
          : "Sharing my experience challenging traditional maternal role expectations and communicating boundaries and self-worth with family.",
        date: "2025-01-19",
        isSample: true
      },
      {
        id: "community-2",
        type: "video",
        target: "community",
        title: language === "zh" ? "30秒看懂日常微歧视" : "30 Seconds of Daily Microaggressions",
        content: language === "zh"
          ? "一个30秒的短视频，展示日常生活中我们可能忽视的性别微歧视瞬间。"
          : "A 30-second video showcasing moments of gender microaggressions we might overlook in daily life.",
        date: "2025-01-17",
        isSample: true
      },
      {
        id: "community-3",
        type: "image",
        target: "community",
        title: language === "zh" ? "我的身体我做主" : "My Body, My Choice",
        content: language === "zh"
          ? "通过影像表达对身体自主权的思考，反抗社会对女性身体的规训和凝视。"
          : "Expressing thoughts on bodily autonomy through imagery, resisting societal discipline and gaze on women's bodies.",
        date: "2025-01-15",
        isSample: true
      }
    ];

    setEditorialSubmissions(editorialSamples);
    setCommunitySubmissions(communitySamples);
  }, [language]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submissionStep, setSubmissionStep] = useState(1);
  const [selectedTarget, setSelectedTarget] = useState<SubmissionTarget | null>(null);
  
  const [newSubmission, setNewSubmission] = useState({
    type: "article" as SubmissionType,
    target: null as SubmissionTarget | null,
    title: "",
    content: "",
    author: "",
    email: "",
    attachment: null as File | null
  });

  const [validationErrors, setValidationErrors] = useState({
    title: "",
    content: "",
    author: "",
    email: "",
    attachment: ""
  });

  const handleStartSubmission = () => {
    // Show preview notice
    alert(language === "zh" 
      ? "此功能暂未开放，仅供预览。" 
      : "This feature is not yet available and is for preview only.");
    
    setShowSubmitModal(true);
    setSubmissionStep(1);
    setSelectedTarget(null);
    setNewSubmission({
      type: "article",
      target: null,
      title: "",
      content: "",
      author: "",
      email: "",
      attachment: null
    });
    setValidationErrors({ title: "", content: "", author: "", email: "", attachment: "" });
  };

  const handleTargetSelect = (target: SubmissionTarget) => {
    setSelectedTarget(target);
    setNewSubmission({...newSubmission, target});
    setSubmissionStep(2);
  };

  const handleTypeSelect = (type: SubmissionType) => {
    setNewSubmission({...newSubmission, type});
    setSubmissionStep(3);
  };

  const handleCloseModal = () => {
    setShowSubmitModal(false);
    setSubmissionStep(1);
    setSelectedTarget(null);
    setNewSubmission({
      type: "article",
      target: null,
      title: "",
      content: "",
      author: "",
      email: "",
      attachment: null
    });
    setValidationErrors({ title: "", content: "", author: "", email: "", attachment: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Custom validation
    const errors = {
      title: "",
      content: "",
      author: "",
      email: "",
      attachment: ""
    };
    
    if (!newSubmission.title.trim()) {
      errors.title = t("Please fill out this field", "请填写此字段");
    }
    if (!newSubmission.content.trim()) {
      errors.content = t("Please fill out this field", "请填写此字段");
    }
    if (selectedTarget === "editorial" && !newSubmission.author.trim()) {
      errors.author = t("Please fill out this field", "请填写此字段");
    }
    if (!newSubmission.email.trim()) {
      errors.email = t("Please fill out this field", "请填写此字段");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newSubmission.email)) {
      errors.email = t("Please enter a valid email address", "请输入有效的邮箱地址");
    }
    if (!newSubmission.attachment) {
      errors.attachment = t("Please upload a file", "请上传文件");
    }
    
    setValidationErrors(errors);
    
    if (errors.title || errors.content || errors.author || errors.email || errors.attachment) {
      return;
    }
    
    // Show disabled message
    alert(language === "zh" ? "该功能暂时未开放，目前无法处理您的投稿。" : "This feature is temporarily unavailable. Your submission cannot be processed at this time.");
    handleCloseModal();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewSubmission({...newSubmission, attachment: file});
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return "🎥";
      case "image": return "📸";
      case "article": return "📝";
      case "story": return "💭";
      default: return "📄";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video": return "bg-red-100 text-red-800";
      case "image": return "bg-blue-100 text-blue-800";
      case "article": return "bg-green-100 text-green-800";
      case "story": return "bg-[#dd6f2b]/10 text-[#dd6f2b]";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeBorderColor = (type: string) => {
    switch (type) {
      case "video": return "border-red-500";
      case "image": return "border-cyan-500";
      case "article": return "border-yellow-500";
      case "story": return "border-purple-500";
      default: return "border-gray-300";
    }
  };

  const getTypeLabel = (type: SubmissionType) => {
    const labels = {
      article: t("Article", "文章"),
      image: t("Image", "图片"),
      video: t("Video", "视频"),
      story: t("Story", "故事")
    };
    return labels[type];
  };

  const renderSubmissionCard = (submission: Submission) => {
    // Apply consistent hover lift effect for all cards
    return (
      <Card key={submission.id} className="p-6 transition-all duration-300 bg-white border-0 shadow-sm hover:-translate-y-2 hover:shadow-xl">
        {submission.isSample && (
          <div className="flex justify-end mb-2">
            <span className="text-xs text-gray-500 italic">{t("Sample", "示例")}</span>
          </div>
        )}
        
        <div className="flex items-center space-x-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(submission.type)}`}>
            {getTypeLabel(submission.type)}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-3 line-clamp-2">{submission.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{submission.content}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>{submission.date}</span>
          {submission.author ? (
            <span className="font-semibold text-gray-700">{language === "zh" ? `作者：${submission.author}` : `By ${submission.author}`}</span>
          ) : (
            <span className="italic">{t("Anonymous", "匿名")}</span>
          )}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <button className="text-[#00a19a] hover:text-[#008c85] font-semibold text-sm flex items-center transition-colors">
            {t("View Item", "查看详情")} →
          </button>
        </div>
      </Card>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Main Title */}
      <div className="mb-12">
        <h2 className="text-4xl font-black mb-4">{t("Community Voices", "社群之声")}</h2>
        <p className="text-xl text-gray-600 mb-8">
          {t("Diverse perspectives from our community members", "来自社群成员的多元视角")}
        </p>

        {/* Submission Entry */}
        <Card className="p-8 bg-gradient-to-r from-[#00a19a]/10 to-[#008c85]/10 border-0 shadow-md">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold mb-3">{t("Contribute Your Voice", "贡献你的声音")}</h3>
            <p className="text-gray-600 text-lg">
              {t("Share your stories, insights, images, or articles about gender awareness and equality.", "分享你关于性别平等和意识的故事、洞见、图片或文章。")}
            </p>
          </div>

          <div className="text-center">
            <Button 
              onClick={handleStartSubmission}
              className="bg-[#00a19a] hover:bg-[#008c85] text-white px-10 py-4 text-lg font-bold"
            >
              {t("Start Submission", "开始投稿")} →
            </Button>
          </div>
        </Card>
      </div>

      {/* Editorial Section (署名) */}
      <div className="mb-16">
        <div className="mb-8">
          <h3 className="text-3xl font-bold mb-2">
            {t("The Bridge Editorials", "桥梁专栏")}
          </h3>
          <p className="text-gray-600">
            {t("Dive into evidence-based commentary and thoughtful articles by our community authors.", "深入阅读社群作者基于证据的评论与深度文章。")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {editorialSubmissions.map(renderSubmissionCard)}
        </div>
      </div>

      {/* Community Section (匿名) */}
      <div className="mb-16">
        <div className="mb-8">
          <h3 className="text-3xl font-bold mb-2">
            {t("Whispers from the Community", "社群心声")}
          </h3>
          <p className="text-gray-600">
            {t("A safe space for sharing personal experiences, visual stories, and anonymous reflections.", "一个分享个人经验、视觉故事和匿名反思的安全空间。")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communitySubmissions.map(renderSubmissionCard)}
        </div>
      </div>

      {/* Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b-2 border-gray-200 p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold">
                {t("Submit Your Contribution", "提交您的投稿")}
              </h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              {/* Progress indicator */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${submissionStep >= 1 ? 'bg-[#00a19a] text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                  <div className="w-12 h-1 bg-gray-200"></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${submissionStep >= 2 ? 'bg-[#00a19a] text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                  <div className="w-12 h-1 bg-gray-200"></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${submissionStep >= 3 ? 'bg-[#00a19a] text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
                </div>
              </div>

              {/* Step 1: Choose Target */}
              {submissionStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold mb-2">
                      {t("Choose Your Submission Target", "选择投稿目标")}
                    </h4>
                    <p className="text-gray-600">
                      {t("Select where you'd like to submit your contribution", "选择您想要投稿的栏目")}
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <button
                      onClick={() => handleTargetSelect("editorial")}
                      className="p-6 border-2 border-[#00357a] rounded-lg hover:bg-[#00357a]/5 transition-all text-left"
                    >
                      <div className="flex items-start space-x-4">
                        <FileText className="w-8 h-8 text-[#00357a] flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h5 className="text-lg font-bold mb-2 text-[#00357a]">
                            {t("The Bridge Editorials", "桥梁专栏")}
                          </h5>
                          <p className="text-sm text-gray-600 mb-2">
                            {t("In-depth articles, commentary, and original artworks", "深度文章、评论和原创艺术作品")}
                          </p>
                          <p className="text-xs text-[#00357a] font-semibold">
                            {t("⚠️ Requires author name (real or pen name) - will be publicly displayed", "⚠️ 需填写署名（真实姓名或化名）- 将公开展示")}
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleTargetSelect("community")}
                      className="p-6 border-2 border-[#d62e39] rounded-lg hover:bg-[#d62e39]/5 transition-all text-left"
                    >
                      <div className="flex items-start space-x-4">
                        <MessageSquare className="w-8 h-8 text-[#d62e39] flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h5 className="text-lg font-bold mb-2 text-[#d62e39]">
                            {t("Whispers from the Community", "社群心声")}
                          </h5>
                          <p className="text-sm text-gray-600 mb-2">
                            {t("Personal stories, experience sharing, private reflections", "个人故事、经验分享、私密感受")}
                          </p>
                          <p className="text-xs text-[#d62e39] font-semibold">
                            {t("✓ Anonymous submission - your identity will be protected", "✓ 可匿名投稿 - 平台将保护您的隐私")}
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Choose Type */}
              {submissionStep === 2 && selectedTarget && (
                <div className="space-y-6">
                  <button 
                    onClick={() => setSubmissionStep(1)}
                    className="text-sm text-gray-600 hover:text-gray-800 mb-4"
                  >
                    ← {t("Back", "返回")}
                  </button>

                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold mb-2">
                      {t("Choose Content Type", "选择内容类型")}
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {selectedTarget === "editorial" ? (
                      <>
                        <button
                          onClick={() => handleTypeSelect("article")}
                          className="p-6 border-2 border-gray-300 rounded-lg hover:border-[#00a19a] hover:bg-[#00a19a]/5 transition-all flex flex-col items-center"
                        >
                          <FileText className="w-12 h-12 mb-2 text-[#00a19a]" />
                          <p className="font-bold">{t("Article", "文章")}</p>
                        </button>
                        <button
                          onClick={() => handleTypeSelect("image")}
                          className="p-6 border-2 border-gray-300 rounded-lg hover:border-[#00a19a] hover:bg-[#00a19a]/5 transition-all flex flex-col items-center"
                        >
                          <ImageIcon className="w-12 h-12 mb-2 text-[#00a19a]" />
                          <p className="font-bold">{t("Image", "图片")}</p>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleTypeSelect("story")}
                          className="p-6 border-2 border-gray-300 rounded-lg hover:border-[#00a19a] hover:bg-[#00a19a]/5 transition-all flex flex-col items-center"
                        >
                          <MessageSquare className="w-12 h-12 mb-2 text-[#00a19a]" />
                          <p className="font-bold">{t("Story", "故事")}</p>
                        </button>
                        <button
                          onClick={() => handleTypeSelect("image")}
                          className="p-6 border-2 border-gray-300 rounded-lg hover:border-[#00a19a] hover:bg-[#00a19a]/5 transition-all flex flex-col items-center"
                        >
                          <ImageIcon className="w-12 h-12 mb-2 text-[#00a19a]" />
                          <p className="font-bold">{t("Image", "图片")}</p>
                        </button>
                        <button
                          onClick={() => handleTypeSelect("video")}
                          className="p-6 border-2 border-gray-300 rounded-lg hover:border-[#00a19a] hover:bg-[#00a19a]/5 transition-all col-span-2 flex flex-col items-center"
                        >
                          <Video className="w-12 h-12 mb-2 text-[#00a19a]" />
                          <p className="font-bold">{t("Video", "视频")}</p>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Fill Details */}
              {submissionStep === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <button 
                    type="button"
                    onClick={() => setSubmissionStep(2)}
                    className="text-sm text-gray-600 hover:text-gray-800 mb-4"
                  >
                    ← {t("Back", "返回")}
                  </button>

                  {/* Author Name (only for editorial) */}
                  {selectedTarget === "editorial" && (
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        {t("Author Name / Pen Name", "作者姓名 / 化名")} *
                      </label>
                      <input
                        type="text"
                        value={newSubmission.author}
                        onChange={(e) => {
                          setNewSubmission({...newSubmission, author: e.target.value});
                          setValidationErrors({...validationErrors, author: ""});
                        }}
                        placeholder={t("Enter your name or pen name...", "输入您的姓名或化名...")}
                        className={`w-full p-3 border-2 rounded-lg focus:outline-none ${
                          validationErrors.author ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#00a19a]'
                        }`}
                      />
                      {validationErrors.author && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <span className="mr-1">⚠️</span> {validationErrors.author}
                        </p>
                      )}
                      <p className="text-xs text-[#d62e39] mt-1 font-semibold">
                        {t("⚠️ Your name will be publicly displayed on the website.", "⚠️ 您填写的姓名将在网站上公开展示。")}
                      </p>
                    </div>
                  )}

                  {/* Anonymous notice for community */}
                  {selectedTarget === "community" && (
                    <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                      <p className="text-sm text-gray-700">
                        <span className="font-bold text-[#d62e39]">{t("Anonymous Submission", "匿名投稿")}</span>
                        <br />
                        {t("Your submission will be displayed as 'Anonymous' to protect your privacy.", "您的投稿将显示为「匿名」以保护您的隐私。")}
                      </p>
                    </div>
                  )}

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      {t("Title", "标题")} *
                    </label>
                    <input
                      type="text"
                      value={newSubmission.title}
                      onChange={(e) => {
                        setNewSubmission({...newSubmission, title: e.target.value});
                        setValidationErrors({...validationErrors, title: ""});
                      }}
                      placeholder={t("Enter a descriptive title...", "输入描述性标题...")}
                      className={`w-full p-3 border-2 rounded-lg focus:outline-none ${
                        validationErrors.title ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#00a19a]'
                      }`}
                    />
                    {validationErrors.title && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <span className="mr-1">⚠️</span> {validationErrors.title}
                      </p>
                    )}
                  </div>

                  {/* Content Description */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      {t("Content Introduction", "内容简介")} * 
                      <span className="text-gray-500 ml-1">({t("500 words max", "最多500字")})</span>
                    </label>
                    <Textarea
                      value={newSubmission.content}
                      onChange={(e) => {
                        setNewSubmission({...newSubmission, content: e.target.value});
                        setValidationErrors({...validationErrors, content: ""});
                      }}
                      placeholder={t("Briefly introduce your submission...", "简要介绍您的投稿...")}
                      className={`w-full p-3 border-2 rounded-lg focus:outline-none min-h-[120px] ${
                        validationErrors.content ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#00a19a]'
                      }`}
                      maxLength={500}
                    />
                    {validationErrors.content && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <span className="mr-1">⚠️</span> {validationErrors.content}
                      </p>
                    )}
                    <div className="text-right text-sm text-gray-500 mt-1">
                      {newSubmission.content.length}/500
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      {t("Email Address", "邮箱地址")} *
                    </label>
                    <input
                      type="email"
                      value={newSubmission.email}
                      onChange={(e) => {
                        setNewSubmission({...newSubmission, email: e.target.value});
                        setValidationErrors({...validationErrors, email: ""});
                      }}
                      placeholder={t("Enter your email address...", "输入您的邮箱地址...")}
                      className={`w-full p-3 border-2 rounded-lg focus:outline-none ${
                        validationErrors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#00a19a]'
                      }`}
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <span className="mr-1">⚠️</span> {validationErrors.email}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                      {t("You will receive an email notification after approval", "审核通过后您会收到邮件通知")}
                    </p>
                  </div>

                  {/* Attachment */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      {t("Full Content Attachment", "内容完整附件")} *
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="file"
                        id="file-upload-modal"
                        onChange={(e) => {
                          handleFileChange(e);
                          setValidationErrors({...validationErrors, attachment: ""});
                        }}
                        accept="image/*,video/*,.pdf,.doc,.docx"
                        className="hidden"
                      />
                      <label
                        htmlFor="file-upload-modal"
                        className={`cursor-pointer px-4 py-2 border-2 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm ${
                          validationErrors.attachment ? 'border-red-500' : 'border-gray-300 hover:border-[#00a19a]'
                        }`}
                      >
                        {t("Choose File", "选择文件")}
                      </label>
                      <span className="text-sm text-gray-600">
                        {newSubmission.attachment 
                          ? newSubmission.attachment.name 
                          : t("No file chosen", "未选择任何文件")}
                      </span>
                    </div>
                    {validationErrors.attachment && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <span className="mr-1">⚠️</span> {validationErrors.attachment}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                      {t("Supported formats: images, videos, PDF, Word documents", "支持格式：图片、视频、PDF、Word文档")}
                    </p>
                  </div>

                  {/* Review Notice */}
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-bold">{t("Review Process", "审核声明")}:</span>
                      <br />
                      {language === "zh" 
                        ? "所有投稿将在发布前进行审核，以确保内容符合社区指南，不含仇恨言论、歧视或攻击性内容。" 
                        : "All submissions will be reviewed before publication to ensure compliance with our Community Guidelines (e.g., no hate speech, discrimination, or abusive content)."}
                    </p>
                    <p className="text-xs text-gray-600 mt-2">
                      {t("Community Guidelines (PDF) - Coming soon", "社区指南 (PDF) - 即将推出")}
                    </p>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <Button 
                      type="submit"
                      className="flex-1 bg-[#00a19a] hover:bg-[#008c85] text-white px-8 py-3 font-bold"
                    >
                      {t("Submit", "提交")}
                    </Button>
                    <Button 
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 font-bold"
                    >
                      {t("Cancel", "取消")}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

