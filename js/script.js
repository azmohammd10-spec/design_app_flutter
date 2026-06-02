// هذا الجزء يتم إضافته داخل دالة "تأكيد الدخول" (verifyBtn)
document.getElementById('verifyBtn').onclick = async () => {
    const code = document.getElementById('verificationCode').value;
    const user = await verifyCode(confirmationResult, code);
    
    // هنا يحدث السحر:
    document.getElementById('login-section').style.display = 'none'; // إخفاء صفحة الدخول
    document.getElementById('chat-section').style.display = 'block';   // إظهار صفحة الدردشة
    
    alert("تم تسجيل الدخول بنجاح!");
};
