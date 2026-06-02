document.getElementById('verifyBtn').onclick = async () => {
    const code = document.getElementById('verificationCode').value;

    confirmationResult.confirm(code)
    .then((result) => {

        // المستخدم نجح في الدخول
        const user = result.user;

        document.getElementById('login-section').style.display = 'none';
        document.getElementById('chat-section').style.display = 'block';

        alert("تم تسجيل الدخول بنجاح!");
    })
    .catch((error) => {
        alert("كود غير صحيح ❌");
        console.log(error);
    });
};
