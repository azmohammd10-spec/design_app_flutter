'use client'; // تفعيل ميزات التفاعل للموبايل والويب في Next.js

import React, { useState } from 'react';
import ProductForm from '../components/ProductForm';
import PointsSystem from '../components/PointsSystem';
import { generateMarketingCaption } from '../services/openai'; // استيراد دالة الذكاء الاصطناعي لاحقاً

export default function Home() {
  const [userPoints, setUserPoints] = useState(150); // نقاط افتراضية للمستخدم
  const [generatedText, setGeneratedText] = useState(''); // حالة لحفظ النص المولّد بالذكاء الاصطناعي
  const [isProcessing, setIsProcessing] = useState(false); // حالة لمراقبة جاري التحميل

  const handleNewCampaign = async (productData) => {
    setIsProcessing(true);
    setGeneratedText('');

    // استدعاء دالة الذكاء الاصطناعي وإرسال بيانات التاجر لها
    const resultText = await generateMarketingCaption(productData.productName, productData.price);
    
    // عرض النص الناتجة في واجهة التطبيق
    setGeneratedText(resultText);
    setIsProcessing(false);

    // خصم نقاط من المحفظة مقابل استخدام ميزة الذكاء الاصطناعي التسويقية
    setUserPoints((prevPoints) => Math.max(0, prevPoints - 20)); 
    
    alert("✨ نجح الذكاء الاصطناعي في تحليل بياناتك وتوليد النص الإعلاني الذكي!");
  };

  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f3f4f6',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      {/* هيدر التطبيق العلوي */}
      <header style={{ marginBottom: '24px', textAlign: 'center', direction: 'rtl' }}>
        <h1 style={{ color: '#1e1b4b', fontSize: '24px', margin: '0', fontWeight: 'bold' }}>
          المسوق الآلي الذكي AI 🚀
        </h1>
        <p style={{ color: '#6b7280', fontSize: '13px', marginTop: '6px', lineHeight: '1.4' }}>
          ارفع فيديو منتجك.. ودع الذكاء الاصطناعي يتولى كتابة الإعلانات والتمويل الآلي
        </p>
      </header>

      {/* 1. استدعاء ميزة نظام ومحفظة النقاط الفيروسية */}
      <PointsSystem points={userPoints} />

      {/* 2. استدعاء ميزة نموذج رفع المنتجات والفيديو */}
      <ProductForm onLaunch={handleNewCampaign} />

      {/* 3. شاشة عرض النتيجة */}
      {(isProcessing || generatedText) && (
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
          marginTop: '20px',
          direction: 'rtl',
          boxSizing: 'border-box',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ color: '#1e1b4b', margin: '0 0 12px 0', fontSize: '16px', fontWeight: 'bold' }}>
            📝 النص التسويقي المقترح المقاوم للمنافسة:
          </h3>
          
          {isProcessing ? (
            <p style={{ color: '#4f46e5', fontSize: '14px', margin: '0' }}>
              ⏳ جاري قراءة بيانات منتجك وصياغة الكابشن الإعلاني باللهجة المحلية...
            </p>
          ) : (
            <>
              <div style={{
                backgroundColor: '#f8fafc',
                padding: '14px',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#334155',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap',
                border: '1px solid #f1f5f9'
              }}>
                {generatedText}
              </div>
              <p style={{ color: '#ef4444', fontSize: '11px', marginTop: '8px', margin: '8px 0 0 0' }}>
                * تم خصم 20 نقطة من رصيدك مقابل هذه العملية.
              </p>
            </>
          )}
        </div>
      )}
      
    </div>
  );
}
