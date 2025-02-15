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
const apiKey = "AIzaSyALBpkoZjzB0LUnd3KfJ4PpEKvL4TdnV8M";
const metaDataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${apiKey}`;

fetch(metaDataUrl)
  .then(response => response.json())
  .then(data => {
    console.log("📝 أسماء الأوراق المتاحة:");
    data.sheets.forEach(sheet => console.log(sheet.properties.title));
  })
  .catch(error => console.error("❌ خطأ في جلب البيانات:", error));


function loadDomains() {
    console.log("بدء تحميل البيانات من Google Sheets...");  // رسالة تصحيح
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('حدث خطأ أثناء جلب البيانات: ' + response.statusText);
            }
            console.log("الاستجابة من API: ", response);  // طباعة الاستجابة في الكونسول
            return response.json();
        })
        .then(data => {
            console.log("البيانات تم جلبها بنجاح:", data);  // طباعة البيانات المحملة
            const tableBody = document.getElementById("domains-table");
            tableBody.innerHTML = "";  // مسح البيانات القديمة

            const rows = data.values;
            if (!rows || rows.length <= 1) {
                console.log("❌ لا توجد بيانات لعرضها");
                return;
            }

            rows.slice(1).forEach(row => {
                let newRow = document.createElement("tr");
                newRow.innerHTML = `
                    <td>${row[0] || "غير متوفر"}</td>
                    <td>${row[1] || "غير متوفر"}</td>
                    <td>${row[6] || "غير متوفر"}</td>
                    <td>${row[3] || "غير متوفر"}</td>
                `;
                tableBody.appendChild(newRow);
            });
        })
        .catch(error => {
            console.error("❌ حدث خطأ أثناء جلب البيانات:", error);
        });
}
