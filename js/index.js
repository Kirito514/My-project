// Sahifa ochilganda linklarni tekshirish
showPageFromURL();


// Sahifa yuklanganda to‘g‘ri sahifani ko‘rsatish
function showPageFromURL() {
    const page = window.location.hash.replace("#", "");

    document.querySelector(".container").style.display = "none";
    document.querySelector(".sign-up").style.display = "none";
    document.querySelector(".log-in").style.display = "none";
    document.querySelector("#endedMessage").style.display = "none";

    if (page === "sign-up") {
        document.querySelector(".sign-up").style.display = "flex";
    } else if (page === "login") {
        document.querySelector(".log-in").style.display = "flex";
    } else if (page === "ended") {
        document.querySelector("#endedMessage").style.display = "block";
    } else {
        document.querySelector(".container").style.display = "flex";
    }
}

// Hash o‘zgarsa, sahifa o‘zgarishi
window.addEventListener("hashchange", showPageFromURL);


// Sahifa yangilansa bosh sahifa chiqishi uchun
window.addEventListener("DOMContentLoaded", showPageFromURL);
window.addEventListener("hashchange", showPageFromURL);


// Tugmalar bosilganda URL o‘zgartirish
document.querySelector("#login-btn").addEventListener("click", function (event) {
    event.preventDefault();
    updateURL("login");
    showPageFromURL();
});

document.querySelector(".register-btn").addEventListener("click", function (event) {
    event.preventDefault();
    updateURL("sign-up");
    showPageFromURL();
});

document.querySelector("#endedMessage button").addEventListener("click", function (event) {
    event.preventDefault();
    updateURL("ended");
    showPageFromURL();
});

// **Agar sahifa yangilansa, doim bosh sahifa ko‘rinsin**
function updateURL(hash) {
    window.location.hash = "";
}


// "Back" va "Forward" tugmalarini qo‘llab-quvvatlash
window.addEventListener("hashchange", showPageFromURL);


// Countdown Timer Script with Leading Zeros

function startCountdown() {
    const initialDays = parseInt(document.getElementById('days').textContent);
    const initialHours = parseInt(document.getElementById('hours').textContent);
    const initialMinutes = parseInt(document.getElementById('minutes').textContent);
    const initialSeconds = parseInt(document.getElementById('seconds').textContent);

    const countdownTime = ((initialDays * 24 * 60 * 60) + (initialHours * 60 * 60) + (initialMinutes * 60) + initialSeconds) * 1000;
    const countdownDate = new Date().getTime() + countdownTime;

    function updateCountdown() {
        const currentTime = new Date().getTime();
        const distance = countdownDate - currentTime;

        if (distance < 0) {
            clearInterval(interval);

            // ⬇️ Container'ni butunlay yashirish
            document.querySelector('.container').style.display = 'none';

            // ⬇️ "Countdown Ended!" xabarini chiqarish
            document.getElementById('endedMessage').style.display = 'block';
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();
}

window.onload = startCountdown;

// Emailni emails.json ga jo'natish

document.getElementById("sendBtn").addEventListener("click", async function () {
    let emailInput = document.getElementById("emailInput").value.trim();

    if (emailInput === "") {
        console.log("❌ Email kiritilmadi!");
        return;
    }

    try {
        let response = await fetch("http://localhost:5000/save-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: emailInput }),
        });

        if (!response.ok) throw new Error("Serverdan xatolik!");

        let data = await response.json();
        console.log("✅ Email saqlandi:", data.message);

        document.getElementById("emailInput").value = ""; // 🔥 Inputni tozalash
    } catch (error) {
        console.error("❌ Xatolik:", error);
    }
});

// Sign-upga o'tish uchun

document.addEventListener("DOMContentLoaded", function () {
    const signUpButton = document.querySelector("#endedMessage button"); // Sign Up tugmasi
    const signUpDiv = document.querySelector(".sign-up"); // Sign Up bo‘limi
    const mainContainer = document.querySelector(".container");
    const endedMessage = document.querySelector("#endedMessage");

    signUpButton.addEventListener("click", function (event) {
        event.preventDefault(); // Havola qayta yuklanishini oldini oladi

        // Barcha bo‘limlarni yashiramiz
        mainContainer.style.display = "none";
        endedMessage.style.display = "none";

        // Sign-up bo‘limini ko‘rsatamiz
        signUpDiv.style.removeProperty("display"); // CSS-dagi `display: none;` ni olib tashlaymiz
        signUpDiv.style.display = "flex"; // `display: flex;` ni qo‘shamiz
    });
});

// Log inga o'tish uchun
// Sign-upga qaytish uchun
document.addEventListener("DOMContentLoaded", function () {
    const signUpBtn = document.querySelector(".sign-up-btn"); // Sign Up tugmasi
    const backToHomeBtn = document.querySelector(".login-btn"); // "Back to home" tugmasi
    const signUpDiv = document.querySelector(".sign-up"); // Sign-up bo‘limi
    const loginDiv = document.querySelector(".log-in"); // Log-in bo‘limi
    const mainContainer = document.querySelector(".container"); // Asosiy container

    signUpBtn.addEventListener("click", function (event) {
        event.preventDefault();

        // Hamma bo'limlarni yashiramiz
        mainContainer.style.display = "none";
        loginDiv.style.display = "none";

        // Sign-up bo‘limini ko‘rsatamiz
        signUpDiv.style.display = "flex";
    });

    backToHomeBtn.addEventListener("click", function (event) {
        event.preventDefault();

        // Hamma bo'limlarni yashiramiz
        signUpDiv.style.display = "none";
        mainContainer.style.display = "none";

        // Log-in bo‘limini ko‘rsatamiz
        loginDiv.style.display = "flex";
    });
});


// Notification elementlari
const notification = document.getElementById("notification");
const notifMessage = notification.querySelector("p");

function showNotification(message, isSuccess) {
    // Xabarni yangilash
    notifMessage.textContent = message;

    // Oldingi klasslarni olib tashlash
    notification.classList.remove("success", "error");

    // Ikonkalarning ko‘rinishini to‘g‘rilash
    const successIcon = notification.querySelector(".success-icon");
    const errorIcon = notification.querySelector(".error-icon");

    successIcon.style.display = "none";
    errorIcon.style.display = "none";

    // Yangi klass qo'shish va kerakli ikonkani chiqarish
    if (isSuccess) {
        notification.classList.add("success");
        successIcon.style.display = "inline-block";
    } else {
        notification.classList.add("error");
        errorIcon.style.display = "inline-block";
    }

    // Notificationni ko‘rsatish
    notification.classList.add("show");

    // 3 sekunddan keyin yashirish
    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}

// Foydalanish misollari:
// showNotification("Bu email allaqachon ro‘yxatdan o‘tgan!", false);
// showNotification("Ro‘yxatdan muvaffaqiyatli o‘tildi!", true);

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

sendBtn.addEventListener("click", async function () {
    let email = emailInput.value.trim();

    if (email === "") {
        showNotification("Email kiriting!", false);
        return;
    }

    if (!validateEmail(email)) {
        showNotification("Email formati noto‘g‘ri!", false);
        return;
    }

    try {
        let response = await fetch("http://localhost:5000/save-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        let data = await response.json();

        if (!data.success) {
            showNotification(data.message, false);
            return;
        }

        showNotification("Email muvaffaqiyatli saqlandi!", true);
        emailInput.value = ""; // Email maydonini tozalash
    } catch (error) {
        showNotification("Server bilan bog‘lanishda xatolik!", false);
    }
});


//ro'yhatdan o'tish

document.addEventListener("DOMContentLoaded", () => {
    const registerBtn = document.querySelector(".register-btn");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const termsCheckbox = document.getElementById("terms-checkbox");

    registerBtn.addEventListener("click", (event) => {
        event.preventDefault();

        // 📌 Inputlarni tekshirish
        if (!nameInput.value || !emailInput.value || !passwordInput.value) {
            showNotification("Barcha maydonlarni to‘ldiring!", false);
            return;
        }

        if (!termsCheckbox.checked) {
            showNotification("Ro‘yxatdan o‘tish uchun shartlarga rozilik bildiring!", false);
            return;
        }

        if (passwordInput.value.length < 6) {
            showNotification("Parol kamida 6 ta belgidan iborat bo‘lishi kerak!", false);
            return;
        }

        // 📌 Foydalanuvchi ma'lumotlari
        const userData = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            termsAccepted: termsCheckbox.checked
        };

        // 📌 Backendga so‘rov yuborish
        fetch("http://localhost:5000/sign-up", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data => {
                showNotification(data.message, data.success);

                if (data.success) {
                    nameInput.value = "";
                    emailInput.value = "";
                    passwordInput.value = "";
                    termsCheckbox.checked = false;
                }
            })
            .catch(error => {
                showNotification("Server bilan bog‘lanishda xatolik!", false);
                console.error(error);
            });
    });
});

// 📌 Notification funksiyasi
function showNotification(message, isSuccess) {
    const notification = document.getElementById("notification");
    const notifMessage = notification.querySelector("p");
    const successIcon = notification.querySelector(".success-icon");
    const errorIcon = notification.querySelector(".error-icon");

    // Xabarni yangilash
    notifMessage.textContent = message;

    // Oldingi klasslarni olib tashlash
    notification.classList.remove("success", "error");

    // Ikonkalarning ko‘rinishini to‘g‘rilash
    successIcon.style.display = "none";
    errorIcon.style.display = "none";

    // Yangi klass qo'shish va ikonka ko‘rsatish
    if (isSuccess) {
        notification.classList.add("success");
        successIcon.style.display = "inline-block";
    } else {
        notification.classList.add("error");
        errorIcon.style.display = "inline-block";
    }

    // Notificationni ko‘rsatish
    notification.classList.add("show");

    // 3 sekunddan keyin yashirish
    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}

// 👁 Parolni ko‘rsatish/yashirish
document.getElementById("togglePassword").addEventListener("click", function () {
    let passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        this.textContent = "🙈";
    } else {
        passwordInput.type = "password";
        this.textContent = "🐵";
    }
});

// // 📌 Parol kuchliligini tekshirish
// document.getElementById("password").addEventListener("input", function () {
//     let password = this.value;
//     let strengthMessage = document.getElementById("strengthMessage");

//     if (password.length < 8) {
//         strengthMessage.innerHTML = "⚠️ Juda zaif (kamida 8 ta belgi kerak)";
//         strengthMessage.style.color = "red";
//     } else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
//         strengthMessage.innerHTML = "⚠️ O‘rtacha (raqam va maxsus belgi qo‘shing)";
//         strengthMessage.style.color = "orange";
//     } else {
//         strengthMessage.innerHTML = "✅ Kuchli parol!";
//         strengthMessage.style.color = "green";
//     }
// });

// 🔄 Tasodifiy kuchli parol yaratish
document.getElementById("generatePassword").addEventListener("click", function () {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    document.getElementById("password").value = password;

    // 📢 Notification o‘rniga console log chiqarish
    console.log("✅ Kuchli parol yaratildi!");
});

// Login qilish 
document.getElementById("back-to-home").addEventListener("click", async function (event) {
    event.preventDefault();

    let emailInput = document.getElementById("login-email").value.trim();
    let passwordInput = document.getElementById("login-password").value.trim();

    if (!emailInput || !passwordInput) {
        showNotification("Email va parolni kiriting!", false);
        return;
    }

    try {
        let response = await fetch("js/users.json");
        let users = await response.json();

        let user = users.find(user => user.email === emailInput && user.password === passwordInput);

        if (!user) {
            showNotification("Email yoki parol noto‘g‘ri!", false);
            return;
        }

        showNotification("Muvaffaqiyatli login qilindi!", true);

        // Foydalanuvchi ma’lumotlarini saqlash (shunda sahifa yangilansa ham login holati saqlanadi)
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        // Login muvaffaqiyatli bo‘lsa, sahifani almashtirish
        checkLoginStatus();

    } catch (error) {
        showNotification("Server bilan bog‘lanishda xatolik!", false);
        console.error(error);
    }
});


// Log out qilish

document.getElementById("logout-btn").addEventListener("click", function () {
    // Dashboardni yashirish, login sahifasini ko‘rsatish
    document.querySelector(".dashboard").style.display = "none";
    document.querySelector(".log-in").style.display = "flex";

    // LocalStorage va SessionStorage tozalanadi
    localStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("loggedInUser");

    // Sahifadagi barcha inputlarni tozalaymiz
    document.querySelectorAll("input").forEach(input => input.value = "");

    // Notification chiqaramiz
    showNotification("Muvaffaqiyatli chiqdingiz!", true);
});


// Login holatini tekshirish
function checkLoginStatus() {
    const user = localStorage.getItem("loggedInUser");

    if (user) {
        // Faqat dashboard ko'rsatiladi
        document.querySelector(".dashboard").style.display = "block";

        // Barcha boshqa sahifalarni yashiramiz
        document.querySelector(".log-in").style.display = "none";
        document.querySelector(".sign-up").style.display = "none";
        document.querySelector(".container").style.display = "none";
        document.querySelector("#endedMessage").style.display = "none";

    } else {
        // Foydalanuvchi login qilmagan bo‘lsa, login sahifasi ochiladi
        document.querySelector(".dashboard").style.display = "none";
        document.querySelector(".log-in").style.display = "flex";
        document.querySelector(".sign-up").style.display = "none";
        document.querySelector(".container").style.display = "none";
        document.querySelector("#endedMessage").style.display = "none";
    }
}

// Sahifa yangilanganda login holatini tekshiramiz
document.addEventListener("DOMContentLoaded", checkLoginStatus);
