const users = [
    { email: "admin@sidox.ma", password: "123456" }
];

function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("login-error");

    if (!email || !password) {
        errorMsg.textContent = "❌ يرجى إدخال البريد الإلكتروني وكلمة المرور!";
        return;
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        
        document.getElementById("login-container").classList.add("hidden");
        document.getElementById("dashboard").classList.remove("hidden");
        errorMsg.textContent = "";
        loadDomains();
    } else {
        errorMsg.textContent = "❌ البريد الإلكتروني أو كلمة المرور غير صحيحة!";
    }
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("login-container").classList.remove("hidden");
}

window.onload = function() {
    if (localStorage.getItem("isLoggedIn") === "true") {
        document.getElementById("login-container").classList.add("hidden");
        document.getElementById("dashboard").classList.remove("hidden");
        loadDomains();
    }
};

const spreadsheetId = "1BdF0r81cYrgSjmPeWPoktTEp3PAhxqTO3Nth1JFx21w";
const sheetName = "script youcan";
const apiKey = "AIzaSyALBpkoZjzB0LUnd3KfJ4PpEKvL4TdnV8M";
const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A:G?key=${apiKey}`;

function loadDomains() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("domains-table");
            tableBody.innerHTML = "";

            const rows = data.values;
            if (!rows) return;

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
        .catch(error => console.error("❌ حدث خطأ أثناء جلب البيانات:", error));
}
