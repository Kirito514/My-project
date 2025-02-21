const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const FILE_PATH = path.join(__dirname, "js", "emails.json");
const usersFile = path.join(__dirname, "js", "users.json");

// 📌 Emailni saqlash uchun endpoint
app.post("/save-email", (req, res) => {
   const { email } = req.body;
   if (!email) {
      return res.status(400).json({ success: false, message: "Email kiritilmadi!" });
   }

   // 📌 Email formatini tekshiramiz
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailPattern.test(email)) {
      return res.status(400).json({ success: false, message: "Noto‘g‘ri email formati!" });
   }

   fs.readFile(FILE_PATH, "utf8", (err, data) => {
      let emails = [];

      if (!err && data) {
         try {
            emails = JSON.parse(data);
            if (!Array.isArray(emails)) emails = [];
         } catch (parseError) {
            console.error("❌ JSON parse xatosi:", parseError);
            return res.status(500).json({ success: false, message: "Server xatosi! Ma'lumotni o'qib bo‘lmadi." });
         }
      }

      // 📌 Takroriy emailni tekshiramiz
      if (emails.some(e => e.email === email)) {
         return res.status(400).json({ success: false, message: "Bu email allaqachon saqlangan!" });
      }

      // 📌 ID generatsiya qilish (max ID + 1)
      const newId = emails.length > 0 ? Math.max(...emails.map(e => e.id)) + 1 : 1;

      const newEmail = { id: newId, email, date: new Date().toLocaleString() };
      emails.push(newEmail);

      fs.writeFile(FILE_PATH, JSON.stringify(emails, null, 2), (writeErr) => {
         if (writeErr) {
            console.error("❌ Fayl yozishda xatolik:", writeErr);
            return res.status(500).json({ success: false, message: "Ma'lumotni saqlab bo‘lmadi!" });
         }
         console.log("✅ Email saqlandi:", newEmail);
         res.json({ success: true, message: "Email saqlandi!" });
      });
   });
});

// 📌 Ro‘yxatdan o‘tish uchun endpoint
app.post("/sign-up", (req, res) => {
   const { name, email, password, termsAccepted } = req.body;

   if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "❌ Barcha maydonlarni to‘ldiring!" });
   }

   if (!termsAccepted) {
      return res.status(400).json({ success: false, message: "⚠️ Ro‘yxatdan o‘tish uchun shartlarga rozilik bildiring!" });
   }

   if (password.length < 6) {
      return res.status(400).json({ success: false, message: "🔑 Parol kamida 6 ta belgidan iborat bo‘lishi kerak!" });
   }

   fs.readFile(usersFile, "utf8", (err, data) => {
      let users = [];

      if (!err && data) {
         try {
            users = JSON.parse(data);
            if (!Array.isArray(users)) users = [];
         } catch (parseError) {
            console.error("❌ JSON parse xatosi:", parseError);
            return res.status(500).json({ success: false, message: "❌ Server xatosi! Ma'lumotni o‘qib bo‘lmadi." });
         }
      }

      if (users.some(user => user.email === email)) {
         return res.status(400).json({ success: false, message: "⚠️ Bu email allaqachon ro‘yxatdan o‘tgan!" });
      }

      const newUser = { id: users.length + 1, name, email, password, date: new Date().toISOString() };
      users.push(newUser);

      fs.writeFile(usersFile, JSON.stringify(users, null, 2), (writeErr) => {
         if (writeErr) {
            console.error("❌ Fayl yozishda xatolik:", writeErr);
            return res.status(500).json({ success: false, message: "❌ Ma'lumotni saqlab bo‘lmadi!" });
         }
         console.log("✅ Foydalanuvchi saqlandi:", newUser);
         res.json({ success: true, message: "✅ Ro‘yxatdan muvaffaqiyatli o‘tildi!" });
      });
   });
});

// 📌 Barcha foydalanuvchilarni olish uchun endpoint
app.get("/users", (req, res) => {
   fs.readFile(usersFile, "utf8", (err, data) => {
      if (err) {
         console.error("❌ Faylni o‘qishda xatolik:", err);
         return res.status(500).json({ success: false, message: "❌ Ma'lumotlarni o'qib bo‘lmadi!" });
      }
      try {
         const users = JSON.parse(data);
         res.json({ success: true, users });
      } catch (parseError) {
         console.error("❌ JSON parse xatosi:", parseError);
         res.status(500).json({ success: false, message: "❌ Server xatosi! Ma'lumotni o'qib bo‘lmadi." });
      }
   });
});

// 📌 Serverni ishga tushiramiz
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`🚀 Server ishga tushdi: http://localhost:${PORT}`);
});
