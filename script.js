const API_BASE = "http://localhost:3000"; // our Node.js backend

async function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim().toLowerCase();
  const messageEl = document.getElementById("message");
  const taskList = document.getElementById("taskList");

  // clear previous message
  messageEl.textContent = "";
  messageEl.className = "message";

  if (taskText === "") {
    messageEl.textContent = "Please enter a topic.";
    messageEl.classList.add("error");
    return;
  }

  try {
    // call backend: GET /api/links/:topic
    const res = await fetch(`${API_BASE}/api/links/${encodeURIComponent(taskText)}`);
    const data = await res.json();

    if (data.found) {
      messageEl.textContent = "Buddy, I found it! Opening your resource... 🚀";
      messageEl.classList.add("success");

      // open the link in new tab
      window.open(data.url, "_blank");

      // also add to the list below as history
      const li = document.createElement("li");
      li.textContent = `${taskText.toUpperCase()} → ${data.url}`;
      taskList.appendChild(li);
    } else {
      messageEl.textContent = "Sorry Buddy, I don't know this topic. Try DSA, DBMS, OOPS.";
      messageEl.classList.add("error");
    }
  } catch (err) {
    console.error(err);
    messageEl.textContent = "Error contacting server. Is Node.js running?";
    messageEl.classList.add("error");
  }

  input.value = "";
}
