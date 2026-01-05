// ================= MENU TOGGLE =================
document.addEventListener("DOMContentLoaded", () => {
  const openMenu = document.getElementById("open-menu");
  const closeMenu = document.getElementById("close-menu");
  const sidebar = document.querySelector(".sidebar");

  if (openMenu) {
    openMenu.addEventListener("click", () => {
      sidebar.classList.add("active");
      openMenu.style.display = "none";
      closeMenu.style.display = "block";
    });
  }

  if (closeMenu) {
    closeMenu.addEventListener("click", () => {
      sidebar.classList.remove("active");
      closeMenu.style.display = "none";
      openMenu.style.display = "block";
    });
  }
});

// ================= API BASE URL =================
// Local → http://localhost:5000
// Render → https://your-backend-name.onrender.com
const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://YOUR-BACKEND-NAME.onrender.com";

// ================= CONTACT FORM =================
document.getElementById("contactForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    email: form.email.value,
    phone: form.phone.value,
    message: form.message.value
  };

  try {
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);
    form.reset();
  } catch (err) {
    console.error(err);
    alert("Error sending message. Backend not reachable!");
  }
});

// ================= SUBSCRIBE FORM =================
document.getElementById("subscribeForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = { email: form.email.value };

  try {
    const res = await fetch(`${API_BASE_URL}/api/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);
    form.reset();
  } catch (err) {
    console.error(err);
    alert("Error subscribing. Backend not reachable!");
  }
});

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  document.getElementById("hour").innerText = String(hours).padStart(2, "0");
  document.getElementById("minute").innerText = String(minutes).padStart(2, "0");
  document.getElementById("second").innerText = String(seconds).padStart(2, "0");
  document.getElementById("ampm").innerText = ampm;

  const weekday = now.toLocaleString("en-US", { weekday: "long" });
  const month = now.toLocaleString("en-US", { month: "long" });
  const day = now.getDate();
  const year = now.getFullYear();

  document.getElementById("full-date").innerText =
    `${weekday}, ${day} ${month} ${year}`;
}

setInterval(updateClock, 1000);
updateClock();
