
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
window.location.hash = "";

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

// Notification

document.addEventListener("DOMContentLoaded", function () {
    const notification = document.getElementById("notification");
    const notifIcon = notification.querySelector("img");
    const notifMessage = notification.querySelector("p");

    function showNotification(message, isSuccess) {
        notifMessage.textContent = message;
        notifIcon.src = isSuccess ? "check.png" : "error.png";
        notifIcon.style.display = "inline";
        notification.classList.toggle("success", isSuccess);
        notification.classList.add("show");

        setTimeout(() => {
            notification.classList.remove("show");
        }, 3000);
    }

    document.getElementById("sendBtn").addEventListener("click", async function () {
        let emailInput = document.getElementById("emailInput");
        let email = emailInput.value.trim();

        if (email === "") {
            showNotification("Please enter an email.", false);
            return;
        }

        try {
            let response = await fetch("http://localhost:5000/save-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            let data = await response.json();
            if (!data.success) throw new Error(data.message);

            showNotification("Email has been successfully verified", true);
            emailInput.value = "";
        } catch (error) {
            showNotification("An error occurred. Please try again.", false);
        }
    });
});

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
const emailInput = document.getElementById("emailInput");
const sendBtn = document.getElementById("sendBtn");

function showNotification(message, isSuccess) {
    const notification = document.getElementById("notification");
    const notifMessage = notification.querySelector("p");

    // Xabarni yangilash
    notifMessage.textContent = message;

    // Oldingi klasslarni olib tashlash
    notification.classList.remove("success", "error");

    // Yangi klass qo'shish (yashil yoki qizil)
    if (isSuccess) {
        notification.classList.add("success");
    } else {
        notification.classList.add("error");
    }

    // Notificationni ko‘rsatish
    notification.classList.add("show");

    // 3 sekunddan keyin yashirish
    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}

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

