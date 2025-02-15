const users = [
    { email: "admin@sidox.ma", password: "123456" }
];

function login() {
    console.log("تم النقر على زر تسجيل الدخول");

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("login-error");

    if (!email || !password) {
        errorMsg.textContent = "❌ الرجاء إدخال البريد الإلكتروني وكلمة المرور!";
        return;
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);

        document.getElementById("login-container").style.display = "none";
        document.getElementById("dashboard").style.display = "block";


        errorMsg.textContent = "";
        console.log("✅ تسجيل الدخول ناجح!");
    } else {
        errorMsg.textContent = "❌ البريد الإلكتروني أو كلمة المرور غير صحيحة!";
        console.log("❌ تسجيل الدخول فشل!");
    }
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("login-container").style.display = "block";
}

window.onload = function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
        console.log("✅ المستخدم لا يزال مسجل دخول، عرض لوحة التحكم...");
        document.getElementById("login-container").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
    } else {
        console.log("❌ لم يتم تسجيل الدخول، عرض نموذج تسجيل الدخول...");
        document.getElementById("login-container").style.display = "block";
        document.getElementById("dashboard").style.display = "none";
    }
};

const spreadsheetId = "1BdF0r81cYrgSjmPeWPoktTEp3PAhxqTO3Nth1JFx21w";
const sheetName = "sidox order"; // تأكد من تطابق الاسم
const apiKey = "AIzaSyALBpkoZjzB0LUnd3KfJ4PpEKvL4TdnV8M";
const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A7:H?key=${apiKey}`;

let domainsData = []; // لتخزين البيانات المسترجعة

function loadDomains() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("📄 البيانات المسترجعة:", data); // فحص البيانات في الكونسول

            if (data.error) {
                console.error("❌ خطأ في جلب البيانات:", data.error.message);
                return; // لا نقوم بتحديث الجدول إذا كانت هناك مشكلة في جلب البيانات
            }

            const rows = data.values; // استخراج البيانات
            if (!rows || rows.length === 0) {
                console.log("⚠️ لا توجد بيانات متاحة");
                return; // لا نقوم بتحديث الجدول إذا لم توجد بيانات
            }

            // تخزين البيانات في المتغير domainsData
            domainsData = rows;

            // الآن يمكنك استخدام البيانات لاحقًا كما تشاء دون الحاجة لعرضها مباشرة
            console.log("تم تخزين البيانات:", domainsData);
        })
        .catch(error => {
            console.error("❌ حدث خطأ أثناء جلب البيانات:", error);
        });
}

// تحميل البيانات عند فتح الصفحة
window.onload = loadDomains;
