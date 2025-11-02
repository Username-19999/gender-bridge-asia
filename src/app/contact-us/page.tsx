"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Navigation } from "@/components/Navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export default function ContactUs() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Custom validation
    const errors = {
      name: "",
      email: "",
      subject: "",
      message: ""
    };
    
    if (!formData.name.trim()) {
      errors.name = language === "en" ? "Please fill out this field" : "请填写此字段";
    }
    if (!formData.email.trim()) {
      errors.email = language === "en" ? "Please fill out this field" : "请填写此字段";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = language === "en" ? "Please enter a valid email address" : "请输入有效的邮箱地址";
    }
    if (!formData.subject.trim()) {
      errors.subject = language === "en" ? "Please fill out this field" : "请填写此字段";
    }
    if (!formData.message.trim()) {
      errors.message = language === "en" ? "Please fill out this field" : "请填写此字段";
    }
    
    setValidationErrors(errors);
    
    if (errors.name || errors.email || errors.subject || errors.message) {
      return;
    }
    
    // Submit to Netlify Forms
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contact",
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }).toString()
      });
      
      if (response.ok) {
        alert(t("Thank you for your message! We will get back to you soon.", "感谢您的留言！我们会尽快回复您。"));
        setFormData({ name: "", email: "", subject: "", message: "" });
        setValidationErrors({ name: "", email: "", subject: "", message: "" });
      } else {
        alert(t("Sorry, there was an error submitting your message. Please try again.", "抱歉，提交留言时出错。请重试。"));
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert(t("Sorry, there was an error submitting your message. Please try again.", "抱歉，提交留言时出错。请重试。"));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumb currentPage="Contact Us" currentPageZh="联系我们" />

        <AnimatedSection immediate={true}>
          <div className="mb-12">
            <h1 className="text-4xl sm:text-6xl font-black mb-4">{t("Contact Us", "联系我们")}</h1>
            <p className="text-base sm:text-xl text-gray-600">
              {t("We'd love to hear from you", "欢迎联系我们，我们期待听到您的声音")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
            {/* Netlify form fields */}
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" />
            
            <div>
              <label htmlFor="name" className="block text-sm font-bold mb-2">
                {t("Name", "姓名")} *
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setValidationErrors({ ...validationErrors, name: "" });
                }}
                className={`w-full border-2 focus:border-[#00a19a] ${
                  validationErrors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={t("Your name", "您的姓名")}
              />
              {validationErrors.name && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <span className="mr-1">⚠️</span> {validationErrors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                {t("Email", "邮箱")} *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setValidationErrors({ ...validationErrors, email: "" });
                }}
                className={`w-full border-2 focus:border-[#00a19a] ${
                  validationErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
              />
              {validationErrors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <span className="mr-1">⚠️</span> {validationErrors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-bold mb-2">
                {t("Subject", "主题")} *
              </label>
              <Input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => {
                  setFormData({ ...formData, subject: e.target.value });
                  setValidationErrors({ ...validationErrors, subject: "" });
                }}
                className={`w-full border-2 focus:border-[#00a19a] ${
                  validationErrors.subject ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={t("What's this about?", "您想咨询的内容")}
              />
              {validationErrors.subject && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <span className="mr-1">⚠️</span> {validationErrors.subject}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-bold mb-2">
                {t("Message", "留言")} *
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  setValidationErrors({ ...validationErrors, message: "" });
                }}
                className={`w-full border-2 focus:border-[#00a19a] min-h-[200px] ${
                  validationErrors.message ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={t("Please describe your question or suggestion...", "请详细描述您的问题或建议...")}
              />
              {validationErrors.message && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <span className="mr-1">⚠️</span> {validationErrors.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800 py-6 text-lg font-bold"
            >
              {t("Send Message", "发送消息")} →
            </Button>
          </form>
        </AnimatedSection>
      </div>
    </div>
  );
}
