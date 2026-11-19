# 🍲 Buffet Calculator — ระบบคำนวณค่าบริการร้านอาหารบุฟเฟต์

*เว็บแอปพลิเคชันสำหรับคำนวณราคาอาหารบุฟเฟต์ต่อหัว แพ็กเกจเสริม เครื่องดื่ม ภาษีมูลค่าเพิ่ม (VAT) และค่าบริการ (Service Charge) แบบเรียลไทม์ พัฒนาด้วย React และ Vite*

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ ฟีเจอร์หลัก (Key Features)

| ฟีเจอร์ (Feature) | รายละเอียดการทำงาน |
| :--- | :--- |
| 👥 **คำนวณตามจำนวนลูกค้า** | แยกราคาผู้ใหญ่ เด็ก หรือโปรโมชันมา 4 จ่าย 3 ได้อย่างแม่นยำ |
| 🥩 **เลือกแพ็กเกจและเมนูเสริม** | รองรับการเลือกเรตราคาบุฟเฟต์ เครื่องดื่มรีฟิล และรายการสั่งเพิ่ม (A La Carte) |
| 🧾 **คำนวณ VAT & Service Charge** | คำนวณค่าบริการ 10% และภาษีมูลค่าเพิ่ม 7% พร้อมสรุปยอดสุทธิและยอดหารต่อคน |
| ⚡ **ประมวลผลทันที (Instant Calculation)** | อัปเดตตัวเลขและยอดรวมแบบ Real-time ทันทีที่ปรับเปลี่ยนรายการ |

## 📂 โครงสร้างไฟล์ในโปรเจกต์ (Project Structure)

```text
├── src/                 # ซอร์สโค้ดหลักของแอปพลิเคชัน (Components, Logic การคำนวณ, CSS)
├── .gitignore           # รายการไฟล์และโฟลเดอร์ที่ยกเว้นการอัปโหลดขึ้น Git
├── index.html           # ไฟล์ HTML หลักสำหรับแสดงผล
├── package.json         # ข้อมูลโปรเจกต์และ Dependencies ที่ใช้งาน
├── package-lock.json    # ล็อกเวอร์ชันของแพ็กเกจทั้งหมด
└── vite.config.js       # ไฟล์ตั้งค่าการทำงานของ Vite Bundler


# 1. โคลน Repository
git clone [https://github.com/Aom-It/buffetcalcu.git](https://github.com/Aom-It/buffetcalcu.git)

# 2. เข้าไปในโฟลเดอร์โปรเจกต์
cd buffetcalcu

# 3. ติดตั้ง Dependencies
npm install

# 4. เริ่มรันเซิร์ฟเวอร์พัฒนา (Development Server)
npm run dev
