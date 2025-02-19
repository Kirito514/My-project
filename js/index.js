// Linklarni ko'rsatish

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
        document.querySelector(".container").style.display = "flex"; // Asosiy sahifa doim ochiladi
    }
}

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

//Notification

document.addEventListener("DOMContentLoaded", function () {
    const notification = document.getElementById("notification");
    const notifIcon = document.querySelector("#notification img");
    const notifMessage = document.querySelector("#notification p");

    function showNotification(message, isSuccess) {
        notifIcon.src = `images/icons/${isSuccess ? 'check.png' : 'error.png'}`;
        notifIcon.alt = isSuccess ? "Success" : "Error";
        notifMessage.textContent = message;

        // Bildirishnomani ekranga chiqarish
        notification.classList.add("show");

        // 3 soniyadan keyin bildirishnomani yashirish
        setTimeout(() => {
            notification.classList.remove("show");
        }, 3000);
    }

    // TEST UCHUN — "Yuborish" tugmasiga bosilganda bildirishnoma chiqadi
    document.getElementById("sendBtn").addEventListener("click", function () {
        console.log("Email jo'natildi!"); // Consolga xabar chiqadi
        showNotification("Email has been successfully verified", true);
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

document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector("#login-btn"); // "Back to home" tugmasi
    const signUpDiv = document.querySelector(".sign-up"); // Sign-up bo‘limi
    const loginDiv = document.querySelector(".log-in"); // Log-in bo‘limi
    const mainContainer = document.querySelector(".container"); // Asosiy container
    const endedMessage = document.querySelector("#endedMessage"); // Tugash xabari

    loginButton.addEventListener("click", function (event) {
        event.preventDefault(); // `<a>` bosilganda sahifa qayta yuklanmasligi uchun

        // Barcha bo‘limlarni yashiramiz
        mainContainer.style.display = "none";
        endedMessage.style.display = "none";
        signUpDiv.style.display = "none";

        // Faqatgina log-in bo‘limini ko‘rsatamiz
        loginDiv.style.display = "flex"; // Yoki kerakli `display` qo‘shing
    });
});
