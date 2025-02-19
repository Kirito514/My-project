const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const FILE_PATH = path.join(__dirname, "js", "emails.json");

// 📌 Emailni saqlash uchun endpoint
app.post("/save-email", (req, res) => {
   const { email } = req.body;
   if (!email) {
      return res.status(400).json({ error: "Email kiritilmadi!" });
   }

   fs.readFile(FILE_PATH, "utf8", (err, data) => {
      let emails = [];

      if (!err) {
         try {
            emails = JSON.parse(data);
            if (!Array.isArray(emails)) emails = [];
         } catch (parseError) {
            console.error("❌ JSONni parse qilishda xatolik:", parseError);
            emails = [];
         }
      }

      // 📌 Yangi email uchun ID va sana yaratamiz
      const newEmail = {
         id: emails.length + 1,
         email: email,
         date: new Date().toLocaleString()
      };

      emails.push(newEmail); // 📌 Emailni arrayga qo‘shamiz

      fs.writeFile(FILE_PATH, JSON.stringify(emails, null, 2), (writeErr) => {
         if (writeErr) {
            console.error("❌ Faylni yozishda xatolik:", writeErr);
            return res.status(500).json({ error: "Faylga yozib bo‘lmadi" });
         }
         console.log("✅ Email saqlandi:", newEmail);
         res.json({ message: "Email saqlandi!" });
      });
   });
});

// 🔥 Serverni ishga tushirish
const PORT = 5000;
app.listen(PORT, () => {
   console.log(`🚀 Server ishlayapti: http://localhost:${PORT}`);
});
