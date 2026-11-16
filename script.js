const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

const setMenu = (open) => {
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  mobileNav.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("menu-open", open);
  document.body.classList.toggle("is-locked", open);
};

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenu(!isOpen);
});

document.querySelectorAll(".mobile-nav a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuToggle.focus();
  }
});

const desktopQuery = window.matchMedia("(min-width: 901px)");
desktopQuery.addEventListener("change", (event) => {
  if (event.matches) {
    setMenu(false);
  }
});

const syncHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const navLinks = Array.from(document.querySelectorAll(".desktop-nav a"));
const navSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const syncActiveNav = () => {
  const marker = window.scrollY + window.innerHeight * 0.32;
  let activeId = "";

  navSections.forEach((section) => {
    if (section.offsetTop <= marker) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

syncActiveNav();
window.addEventListener("scroll", syncActiveNav, { passive: true });
window.addEventListener("resize", syncActiveNav);

const projectData = {
  skintell: {
    title: "Skintell",
    category: "UI/UX Design · Mobile App",
    image: "assets/images/UIUX%20aplikasi%20skintell.jpeg",
    imageAlt: "Skintell mobile app interface preview",
    summary:
      "A mobile skincare companion that helps users understand their skin, discover suitable products, and build routines that stick.",
    role: "UI/UX Designer",
    year: "2026",
    challenge:
      "Skincare information is often overwhelming and fragmented. The challenge was to make personalised guidance feel clear, approachable, and trustworthy without adding more noise to the experience.",
    approach: [
      "Mapped the user journey and identified friction in product discovery",
      "Built a calm, editorial visual system centred around clarity",
      "Prototyped the core flow from skin analysis to a daily routine",
    ],
    tools: ["Figma", "FigJam", "Photoshop"],
  },
  oscar: {
    title: "Oscar",
    category: "Branding · UI/UX",
    image: "assets/images/UIUX%20aplikasi%20permen%20jadul%20oscar.jpeg",
    imageAlt: "Oscar nostalgic candy digital experience preview",
    summary:
      "A playful digital experience that gives a classic candy brand a fresh, contemporary identity without losing its nostalgic charm.",
    role: "UI/UX & Visual Designer",
    year: "2026",
    challenge:
      "The concept needed to feel familiar to people who grew up with the brand while still appealing to a younger audience discovering it for the first time.",
    approach: [
      "Defined a visual direction that balances nostalgia with a modern edge",
      "Created a bold colour and typography system for brand consistency",
      "Designed an engaging interface concept around product discovery",
    ],
    tools: ["Figma", "Illustrator", "Photoshop"],
  },
  ecanteen: {
    title: "E-Canteen",
    category: "Product Design · Mobile App",
    image: "assets/images/Aplikasi%20E-canteen.jpeg",
    imageAlt: "E-Canteen mobile app interface preview",
    summary:
      "A digital canteen experience that makes ordering, paying, and picking up food faster and more enjoyable for students.",
    role: "Product Designer",
    year: "2026",
    challenge:
      "Long queues and unclear menus can turn a simple meal break into a stressful experience. The goal was to reduce waiting time and make the entire ordering flow effortless.",
    approach: [
      "Researched the ordering habits and pain points of students",
      "Simplified the menu, cart, and checkout flow into fewer steps",
      "Designed a friendly interface with clear order status updates",
    ],
    tools: ["Figma", "FigJam", "Prototyping"],
  },
};

const modal = document.getElementById("project-modal");
const modalImage = document.getElementById("modal-image");
const modalCategory = document.getElementById("modal-category");
const modalTitle = document.getElementById("modal-title");
const modalSummary = document.getElementById("modal-summary");
const modalRole = document.getElementById("modal-role");
const modalYear = document.getElementById("modal-year");
const modalChallenge = document.getElementById("modal-challenge");
const modalApproach = document.getElementById("modal-approach");
const modalTools = document.getElementById("modal-tools");
const modalClose = document.querySelector(".modal-close");

const fillList = (element, items) => {
  element.replaceChildren(
    ...items.map((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      return listItem;
    })
  );
};

const openProject = (key) => {
  const project = projectData[key];

  if (!project) {
    return;
  }

  modalImage.src = project.image;
  modalImage.alt = project.imageAlt;
  modalCategory.textContent = project.category;
  modalTitle.textContent = project.title;
  modalSummary.textContent = project.summary;
  modalRole.textContent = project.role;
  modalYear.textContent = project.year;
  modalChallenge.textContent = project.challenge;
  fillList(modalApproach, project.approach);
  fillList(modalTools, project.tools);

  modal.showModal();
  document.body.classList.add("is-locked");
};

document.querySelectorAll("[data-project]").forEach((card) => {
  card.addEventListener("click", () => openProject(card.dataset.project));
});

modalClose.addEventListener("click", () => modal.close());

modal.addEventListener("close", () => {
  document.body.classList.remove("is-locked");
});

modal.addEventListener("click", (event) => {
  if (event.target !== modal) {
    return;
  }

  const rect = modal.getBoundingClientRect();
  const outside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (outside) {
    modal.close();
  }
});

document.querySelectorAll(".video-frame").forEach((frame) => {
  const video = frame.querySelector("video");
  const overlay = frame.querySelector(".video-overlay");
  const playButton = frame.querySelector(".video-play");

  if (!video || !overlay || !playButton) {
    return;
  }

  playButton.addEventListener("click", () => {
    overlay.classList.add("is-hidden");
    video.controls = true;

    const playback = video.play();

    if (playback && typeof playback.catch === "function") {
      playback.catch(() => {
        overlay.classList.remove("is-hidden");
        video.controls = false;
      });
    }
  });

  video.addEventListener("ended", () => {
    video.controls = false;
    video.currentTime = 0;
    overlay.classList.remove("is-hidden");
  });
});

const copyButton = document.querySelector("[data-copy-email]");
const copyLabel = copyButton.querySelector(".copy-label");
let copyTimer;

const copyToClipboard = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {}
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  const copied = document.execCommand("copy");
  textarea.remove();

  if (!copied) {
    throw new Error("Clipboard unavailable");
  }
};

copyButton.addEventListener("click", async () => {
  try {
    await copyToClipboard(copyButton.dataset.copyEmail);
    copyLabel.textContent = "Copied!";
    copyButton.classList.add("is-copied");
    window.clearTimeout(copyTimer);

    copyTimer = window.setTimeout(() => {
      copyLabel.textContent = "Copy email";
      copyButton.classList.remove("is-copied");
    }, 1800);
  } catch {
    window.location.href = `mailto:${copyButton.dataset.copyEmail}`;
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

setMenu(false);
