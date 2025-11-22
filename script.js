const API_BASE = "http://localhost:3000"; // our Node.js backend

// Search topic
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
    // call backend: GET /api/links/:topic  (now from MySQL)
    const res = await fetch(`${API_BASE}/api/links/${encodeURIComponent(taskText)}`);
    const data = await res.json();

    if (data.found) {
      messageEl.textContent = "Buddy, I found it! Opening your resource... 🚀";
      messageEl.classList.add("success");

      // open the link in new tab
      window.open(data.url, "_blank");

      // also add to the list below as history
      const li = document.createElement("li");

li.innerHTML = `
  <span>${taskText.toUpperCase()} → ${data.url}</span>
  <button onclick="deleteLink('${taskText}', this.parentElement)">❌</button>
`;

taskList.appendChild(li);

    } else {
      messageEl.textContent = "Sorry Buddy, I don't know this topic. Try adding it below.";
      messageEl.classList.add("error");
    }
  } catch (err) {
    console.error(err);
    messageEl.textContent = "Error contacting server. Is Node.js running?";
    messageEl.classList.add("error");
  }

  input.value = "";
}
async function deleteLink(topic, element) {
  if (!confirm(`Are you sure you want to delete "${topic}"?`)) {
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/links/${encodeURIComponent(topic)}`, {
      method: "DELETE"
    });

    const data = await res.json();

    if (data.success) {
      element.remove();
      alert("Link deleted successfully!");
    } else {
      alert(data.message || "Failed to delete.");
    }
  } catch (err) {
    console.error(err);
    alert("Error deleting link.");
  }
}

// Save new link to database
async function saveLink() {
  const topicInput = document.getElementById("newTopic");
  const urlInput = document.getElementById("newUrl");
  const messageEl = document.getElementById("message");

  const topic = topicInput.value.trim().toLowerCase();
  const url = urlInput.value.trim();

  // clear previous message
  messageEl.textContent = "";
  messageEl.className = "message";

  if (!topic || !url) {
    messageEl.textContent = "Please enter both keyword and URL.";
    messageEl.classList.add("error");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/links`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, url })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to save link");
    }

    messageEl.textContent = "Your link is saved, Buddy! ✅ Now you can search it by keyword.";
    messageEl.classList.add("success");

    topicInput.value = "";
    urlInput.value = "";
  } catch (err) {
    console.error(err);
    messageEl.textContent = "Error saving link. Check server and DB.";
    messageEl.classList.add("error");
  }
}
