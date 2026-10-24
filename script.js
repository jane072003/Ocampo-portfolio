// Jean Erika Ocampo — portfolio interactions
document.addEventListener("DOMContentLoaded", () => {
  // Activate Lucide icons when the library is available.
  if (window.lucide) window.lucide.createIcons();

  // Footer year
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      menuToggle.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
      if (window.lucide) window.lucide.createIcons();
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.innerHTML = '<i data-lucide="menu"></i>';
        if (window.lucide) window.lucide.createIcons();
      });
    });
  }

  // Rotating hero word
  const changingWord = document.getElementById("changingWord");
  const words = ["builder.", "thinker.", "learner.", "creator."];
  let wordIndex = 0;
  if (changingWord && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.setInterval(() => {
      changingWord.classList.add("word-out");
      window.setTimeout(() => {
        wordIndex = (wordIndex + 1) % words.length;
        changingWord.textContent = words[wordIndex];
        changingWord.classList.remove("word-out");
      }, 180);
    }, 2300);
  }

  // Scroll reveal animations
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add("is-visible"));
  }

  // Highlight navigation item based on the visible section
  const sections = document.querySelectorAll("main section[id]");
  const navItems = document.querySelectorAll(".nav-link");
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navItems.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // Back-to-top button
  const backToTop = document.getElementById("backToTop");
  const updateBackToTop = () => {
    if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 500);
  };
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
  if (backToTop) backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Accessible project details modal
  const dialog = document.getElementById("projectDialog");
  const dialogClose = document.getElementById("dialogClose");
  const dialogTitle = document.getElementById("dialogTitle");
  const dialogDescription = document.getElementById("dialogDescription");
  const dialogKicker = document.getElementById("dialogKicker");
  const dialogTags = document.getElementById("dialogTags");
  const dialogSymbol = document.getElementById("dialogSymbol");

  const projectDetails = {
    realm: {
      kicker: "SCHOOL PROJECT · GAME DEVELOPMENT",
      title: "RealmShift",
      description: "RealmShift is a dynamic world-shifting survival platformer game concept developed as a school project. It features exploration, survival challenges, and movement mechanics. The project gave the team an opportunity to apply creativity, share ideas, and collaborate on a game concept.",
      tags: ["Game development", "Exploration", "Survival mechanics", "Team collaboration"],
      icon: "gamepad-2",
      color: "green"
    },
    health: {
      kicker: "CAPSTONE PROJECT · IN PROGRESS",
      title: "IoT-Based Smart Health Monitoring",
      description: "This ongoing capstone focuses on a proposed system for elderly individuals. Its goals include monitoring vital signs, providing medication reminders, and sending emergency alerts. Current portfolio documentation describes participation in research, planning, and development tasks.",
      tags: ["Internet of Things", "Elderly care", "Medication reminders", "Emergency alerts"],
      icon: "heart-pulse",
      color: "blue"
    }
  };

  document.querySelectorAll(".project-detail").forEach(button => {
    button.addEventListener("click", () => {
      const detail = projectDetails[button.dataset.project];
      if (!detail || !dialog) return;
      dialogKicker.textContent = detail.kicker;
      dialogTitle.textContent = detail.title;
      dialogDescription.textContent = detail.description;
      dialogTags.innerHTML = detail.tags.map(tag => `<span>${tag}</span>`).join("");
      dialogSymbol.innerHTML = `<i data-lucide="${detail.icon}"></i>`;
      dialogSymbol.style.background = detail.color === "green" ? "var(--green)" : "var(--blue)";
      dialogSymbol.style.color = detail.color === "green" ? "var(--green-deep)" : "var(--blue-deep)";
      if (window.lucide) window.lucide.createIcons();
      dialog.showModal();
      document.body.classList.add("dialog-open");
    });
  });

  const closeDialog = () => {
    if (dialog && dialog.open) dialog.close();
    document.body.classList.remove("dialog-open");
  };
  if (dialogClose) dialogClose.addEventListener("click", closeDialog);
  if (dialog) {
    dialog.addEventListener("click", event => {
      if (event.target === dialog) closeDialog();
    });
    dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
  }
});
