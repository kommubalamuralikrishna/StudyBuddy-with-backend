CREATE DATABASE studybuddy;
USE studybuddy;

CREATE TABLE links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  topic VARCHAR(100) NOT NULL UNIQUE,
  url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO links (topic, url) VALUES
('dsa', 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/'),
('dbms', 'https://www.geeksforgeeks.org/dbms/dbms/'),
('oops', 'https://www.w3schools.com/cpp/cpp_oop.asp');
