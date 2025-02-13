   const users = [
        { email: "admin@sidox.ma", password: "123456" },
    ];

    function login() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const errorMsg = document.getElementById("login-error");

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // حفظ حالة تسجيل الدخول في localStorage
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userEmail", email);

            document.getElementById("login-container").classList.add("hidden");
            document.getElementById("dashboard").classList.remove("hidden");
            errorMsg.textContent = "";  // مسح رسالة الخطأ السابقة
        } else {
            errorMsg.textContent = "❌ البريد الإلكتروني أو كلمة المرور غير صحيحة!";
        }
    }

    function logout() {
        // مسح حالة تسجيل الدخول من localStorage وإعادة تعيين واجهة المستخدم
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");

        document.getElementById("dashboard").classList.add("hidden");
        document.getElementById("login-container").classList.remove("hidden");
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
    }

    // التحقق من حالة تسجيل الدخول عند تحميل الصفحة
    window.onload = function() {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn === "true") {
            document.getElementById("login-container").classList.add("hidden");
            document.getElementById("dashboard").classList.remove("hidden");
        } else {
            document.getElementById("login-container").classList.remove("hidden");
            document.getElementById("dashboard").classList.add("hidden");
        }
    };
  
    const spreadsheetId = "1BdF0r81cYrgSjmPeWPoktTEp3PAhxqTO3Nth1JFx21w";
    const sheetName = "script youcan";  // تأكد من استخدام اسم الورقة الصحيح
    const apiKey = "AIzaSyALBpkoZjzB0LUnd3KfJ4PpEKvL4TdnV8M";  // استبدله بمفتاح API الخاص بك

    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A:G?key=${apiKey}`;

    // جلب البيانات من Google Sheets API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("domains-table");
            tableBody.innerHTML = ""; // مسح البيانات القديمة

            const rows = data.values;
            if (!rows) return;

            rows.slice(1).forEach(row => { // تجاهل الصف الأول (عناوين الأعمدة)
                let newRow = document.createElement("tr");

                // صاحب النطاق (العمود A)
                let ownerCell = document.createElement("td");
                ownerCell.textContent = row[0] || "غير متوفر";
                newRow.appendChild(ownerCell);

                // النطاق (العمود B)
                let domainCell = document.createElement("td");
                domainCell.textContent = row[1] || "غير متوفر";
                newRow.appendChild(domainCell);

                // تاريخ التفعيل (العمود G)
                let dateCell = document.createElement("td");
                dateCell.textContent = row[6] || "غير متوفر";
                newRow.appendChild(dateCell);

                tableBody.appendChild(newRow);
            });
        })
        .catch(error => console.error("❌ حدث خطأ أثناء جلب البيانات:", error));
