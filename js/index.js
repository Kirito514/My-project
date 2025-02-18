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
function toggleButton() {
    const emailInput = document.getElementById('emailInput');
    const sendBtn = document.getElementById('sendBtn');
    if (emailInput.value.trim() !== '') {
        sendBtn.disabled = false;
        sendBtn.classList.remove('disabled');
    } else {
        sendBtn.disabled = true;
        sendBtn.classList.add('disabled');
    }
}

function showNotification() {
    const emailInput = document.getElementById('emailInput');
    const notification = document.getElementById('notification');
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
    emailInput.value = ''; // Input maydonini tozalash
    toggleButton(); // Tugmani yangilash
}


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
