import React, { useState } from 'react';

export default function ProductForm({ onLaunch }) {
  const [video, setVideo] = useState(null);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [budget, setBudget] = useState('');

  const handleVideoUpload = (e) => {
    const file = e.target.files[0]; // تم تعديلها لتأخذ ملف واحد بدقة
    if (file) {
      setVideo(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!video || !productName || !price || !budget) {
      alert("الرجاء إكمال جميع البيانات ورفع الفيديو أولاً!");
      return;
    }
    // إرسال البيانات إلى الملف الرئيسي لاحقاً
    onLaunch({ video, productName, price, budget });
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '24px',
      width: '100%',
      maxWidth: '400px',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
      direction: 'rtl'
    }}>
      {/* صندوق رفع الفيديو */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>فيديو المنتج:</label>
        <div style={{
          border: '2px dashed #cbd5e1',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: '#f8fafc',
          position: 'relative'
        }}>
          {!video ? (
            <>
              <span style={{ fontSize: '32px' }}>📹</span>
              <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#64748b' }}>اضغط لرفع فيديو المنتج من الاستوديو</p>
            </>
          ) : (
            <video src={video} controls style={{ width: '100%', borderRadius: '8px', maxHeight: '180px' }} />
          )}
          <input 
            type="file" 
            accept="video/*" 
            onChange={handleVideoUpload} 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} 
          />
        </div>
      </div>

      {/* اسم المنتج */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontWeight: '500', marginBottom: '6px', color: '#374151' }}>اسم المنتج:</label>
        <input 
          type="text" 
          placeholder="مثال: عباية فاخرة سوداء" 
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', outline: 'none' }}
        />
      </div>

      {/* السعر */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontWeight: '500', marginBottom: '6px', color: '#374151' }}>سعر المنتج:</label>
        <input 
          type="number" 
          placeholder="السعر بالعملة المحلية" 
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', outline: 'none' }}
        />
      </div>

      {/* الميزانية الإعلانية */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontWeight: '500', marginBottom: '6px', color: '#374151' }}>الميزانية الإعلانية اليومية ($):</label>
        <input 
          type="number" 
          placeholder="الميزانية بالدولار" 
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', outline: 'none' }}
        />
      </div>

      {/* زر التشغيل */}
      <button 
        onClick={handleSubmit}
        style={{
          width: '100%', padding: '14px', backgroundColor: '#4f46e5', color: '#ffffff',
          border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer'
        }}
      >
        🚀 توليد الإعلان وإطلاق الحملة
      </button>
    </div>
  );
}
