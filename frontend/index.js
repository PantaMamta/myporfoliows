document.addEventListener("DOMContentLoaded", () => {
    const openMenu = document.getElementById("open-menu");
    const closeMenu = document.getElementById("close-menu");
    const sidebar = document.querySelector(".sidebar");

    // Open Sidebar
    if (openMenu) {
        openMenu.addEventListener("click", () => {
            sidebar.classList.add("active");
            openMenu.style.display = "none";
            closeMenu.style.display = "block";
        });
    }

    // Close Sidebar
    if (closeMenu) {
        closeMenu.addEventListener("click", () => {
            sidebar.classList.remove("active");
            closeMenu.style.display = "none";
            openMenu.style.display = "block";
        });
    }
});

// ---------------- Contact Form ----------------
document.getElementById("contactForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    email: form.email.value,
    phone: form.phone.value,
    message: form.message.value
  };

  try {
    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message); // Show success message
    form.reset(); // Clear the form
  } catch (err) {
    console.error(err);
    alert("Error sending message. Check backend!");
  }
});

// ---------------- Subscribe Form ----------------
document.getElementById("subscribeForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = { email: form.email.value };

  try {
    const res = await fetch("http://localhost:5000/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message); // Show success message
    form.reset(); // Clear the form
  } catch (err) {
    console.error(err);
    alert("Error subscribing. Check backend!");
  }
});
