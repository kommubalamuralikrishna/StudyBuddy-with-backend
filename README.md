📚 StudyBuddy – Full-Stack Student Resource Finder

StudyBuddy is a full-stack web application that helps students quickly search, save, and manage their study resources.
It provides a fast, interactive experience with a clean dark-themed UI and real-time responses powered by Node.js, MySQL, HTML, CSS, and JavaScript.

🚀 Features
🔍 Search Topic

Enter any keyword (e.g., dsa, dbms, oops)

If the topic exists in MySQL, StudyBuddy opens the resource instantly

Dynamic responses:

“Buddy, I found it!” 🎉

“Sorry Buddy, I don’t know this topic.” ❌

➕ Save New Links

Add your own study resources with:

Keyword

Website URL

Stored permanently in MySQL Database

❌ Delete Saved Topics

Each searched topic appears in history with a delete button

Removes data from UI and MySQL

🎨 Beautiful UI

Clean dark theme

Gradient buttons

Smooth animations

Mobile-responsive design

🛠️ Tech Stack
Frontend

HTML

CSS

JavaScript (Fetch API)

Backend

Node.js

Express.js

Database

MySQL (with mysql2 driver)

📁 Project Structure
studybuddy/
│── index.html
│── style.css
│── script.js
│── server.js
│── README.md

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/yourusername/studybuddy.git
cd studybuddy

2️⃣ Install Dependencies
npm install

3️⃣ Create MySQL Database

Run these SQL commands in MySQL Workbench:

CREATE DATABASE studybuddy;
USE studybuddy;

CREATE TABLE links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  topic VARCHAR(100) NOT NULL UNIQUE,
  url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

4️⃣ Start the Node.js Backend

Update password inside server.js:

password: "YOUR_MYSQL_PASSWORD",


Then run:

node server.js

5️⃣ Open the App

Visit:

http://localhost:3000/index.html

📌 API Endpoints
🔹 Search Topic
GET /api/links/:topic

🔹 Add Topic
POST /api/links

🔹 Delete Topic
DELETE /api/links/:topic

🖼️ Screenshots
<img width="1895" height="990" alt="image" src="https://github.com/user-attachments/assets/3689ff6b-0a0d-4fa9-89bc-10906c549b22" />


🤝 Contributing

Feel free to fork this repo and submit PRs to improve UI, features, or performance.

🧑‍💻 Author

Kommu Balamurali Krishna
Full-Stack Developer | ServiceNow | SQL | Node.js | DSA
