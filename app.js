/**
 * KindredMatch - Core Application Logic
 * Single unified script for Navigation, State, Image Presets, and Auth Modals.
 */

// ==========================================
// 1. DATA SOURCES & GLOBAL STATE
// ==========================================
const VOLUNTEER_IMAGE_OPTIONS = [
  {
    id: "edu-teaching",
    category: "Education",
    label: "Youth Tutoring & Mentorship",
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "eco-planting",
    category: "Environment",
    label: "Tree Planting & Restoration",
    url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "food-drive",
    category: "Community Support",
    label: "Food Bank & Community Kitchen",
    url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "tech-stem",
    category: "Technology",
    label: "Code Camp & Mentorship",
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "animal-care",
    category: "Animal Welfare",
    label: "Animal Shelter & Pet Rescue",
    url: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "elderly-care",
    category: "Healthcare & Seniors",
    label: "Senior Living Outreach",
    url: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=200&q=80",
  }
];

let opportunities = [
  {
    id: 1,
    title: "After-School Python Instructor",
    category: "Technology",
    matchScore: 96,
    breakdown: { skill: "40%", time: "30%" },
    location: "Austin, TX (Remote OK)",
    image: VOLUNTEER_IMAGE_OPTIONS[3]
  },
  {
    id: 2,
    title: "Urban Forestation & Planting Drive",
    category: "Environment",
    matchScore: 89,
    breakdown: { skill: "35%", time: "30%" },
    location: "Zilker Park, Austin",
    image: VOLUNTEER_IMAGE_OPTIONS[1]
  },
  {
    id: 3,
    title: "High School Math & Physics Tutor",
    category: "Education",
    matchScore: 92,
    breakdown: { skill: "40%", time: "30%" },
    location: "East Austin Community Hub",
    image: VOLUNTEER_IMAGE_OPTIONS[0]
  }
];

let applicants = [
  { id: 101, name: "Jordan Lee", role: "Python Instructor", score: 96, skills: ["Python"], status: "Submitted" },
  { id: 102, name: "Maya Patel", role: "Urban Forestation", score: 91, skills: ["Botany"], status: "Under Review" }
];

let activeView = "home";
let currentUser = null;
let selectedPresetImage = VOLUNTEER_IMAGE_OPTIONS[0];

// ==========================================
// 2. BOOTSTRAP / INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  renderOpportunities(opportunities);
  renderApplicants();
  initImagePicker();
  navigateTo("home");
  updateAuthUI();
  refreshIcons();
});

function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

// ==========================================
// 3. PAGE NAVIGATION
// ==========================================
function navigateTo(view) {
  activeView = view;

  const homeView = document.getElementById("public-home-view");
  const heroStrip = document.querySelector(".hero-strip");
  const volunteerTools = document.getElementById("volunteer-tools");
  const volunteerGrid = document.getElementById("volunteer-grid");
  const orgAuthView = document.getElementById("org-auth-view");
  const orgView = document.getElementById("organization-view");

  // Reset active indicator on navbar links
  document.querySelectorAll(".nav-link-btn").forEach((btn) => btn.classList.remove("active"));
  const currentNav = document.getElementById(`nav-${view}-btn`);
  if (currentNav) currentNav.classList.add("active");

  // Hide all containers
  const allSections = [homeView, heroStrip, volunteerTools, volunteerGrid, orgAuthView, orgView];
  allSections.forEach((el) => {
    if (el) el.classList.add("hidden");
  });

  // Display sections for current route
  if (view === "home") {
    if (homeView) homeView.classList.remove("hidden");
    if (volunteerGrid) volunteerGrid.classList.remove("hidden");
  } else if (view === "volunteer") {
    if (heroStrip) heroStrip.classList.remove("hidden");
    if (volunteerTools) volunteerTools.classList.remove("hidden");
    if (volunteerGrid) volunteerGrid.classList.remove("hidden");
  } else if (view === "org-portal") {
    if (currentUser && currentUser.type === "org") {
      if (orgView) orgView.classList.remove("hidden");
    } else {
      if (orgAuthView) orgAuthView.classList.remove("hidden");
    }
  }

  refreshIcons();
}

// ==========================================
// 4. AUTH MODAL (VOLUNTEER / STUDENT)
// ==========================================
function openAuthModal(role, mode) {
  const modal = document.getElementById("auth-modal");
  if (!modal) {
    console.warn("Modal '#auth-modal' not detected in HTML structure.");
    return;
  }
  modal.classList.remove("hidden");
  setAuthMode(mode || "login");
  refreshIcons();
}

function closeAuthModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) modal.classList.add("hidden");
}

function setAuthMode(mode) {
  const loginForm = document.getElementById("volunteer-login-form");
  const signupForm = document.getElementById("volunteer-signup-form");
  const tabLogin = document.getElementById("auth-tab-login");
  const tabSignup = document.getElementById("auth-tab-signup");

  if (!loginForm || !signupForm) return;

  if (mode === "login") {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    if (tabLogin) tabLogin.classList.add("active");
    if (tabSignup) tabSignup.classList.remove("active");
  } else {
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
    if (tabSignup) tabSignup.classList.add("active");
    if (tabLogin) tabLogin.classList.remove("active");
  }
}

function handleVolunteerAuth(event, mode) {
  if (event) event.preventDefault();
  currentUser = { type: "student", name: "Alex Morgan" };
  closeAuthModal();
  updateAuthUI();
  showToast(mode === "login" ? "Welcome back, Alex!" : "Account created successfully!");
  navigateTo("volunteer");
}

// ==========================================
// 5. ORGANIZATION PORTAL AUTHENTICATION
// ==========================================
function switchOrgTab(mode) {
  const loginForm = document.getElementById("org-login-form");
  const signupForm = document.getElementById("org-signup-form");
  const tabLogin = document.getElementById("org-tab-login");
  const tabSignup = document.getElementById("org-tab-signup");

  if (!loginForm || !signupForm) return;

  if (mode === "login") {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    if (tabLogin) tabLogin.classList.add("active");
    if (tabSignup) tabSignup.classList.remove("active");
  } else {
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
    if (tabSignup) tabSignup.classList.add("active");
    if (tabLogin) tabLogin.classList.remove("active");
  }
}

function handleOrgAuth(event, mode) {
  if (event) event.preventDefault();
  currentUser = { type: "org", name: "Community Partners" };
  updateAuthUI();
  showToast(mode === "login" ? "Signed into Organization Dashboard" : "Registration submitted!");
  navigateTo("org-portal");
}

function handleLogout() {
  currentUser = null;
  updateAuthUI();
  showToast("Logged out successfully");
  navigateTo("home");
}

function updateAuthUI() {
  const authContainer = document.getElementById("auth-buttons-container");
  const userProfile = document.getElementById("user-profile-badge");

  if (currentUser) {
    if (authContainer) authContainer.classList.add("hidden");
    if (userProfile) userProfile.classList.remove("hidden");
  } else {
    if (authContainer) authContainer.classList.remove("hidden");
    if (userProfile) userProfile.classList.add("hidden");
  }
}

// ==========================================
// 6. VOLUNTEER FEED & CARD RENDERING
// ==========================================
function renderOpportunities(items) {
  const container = document.getElementById("volunteer-grid");
  if (!container) return;

  container.innerHTML = items
    .map(
      (item) => `
    <article class="opp-card">
      <div class="card-banner">
        <img src="${item.image.url}" alt="${item.title}" loading="lazy" />
        <span class="match-badge">★ ${item.matchScore}% Match</span>
      </div>
      <div class="card-body">
        <span class="card-cat">${item.category}</span>
        <h3 class="card-title">${item.title}</h3>
        <div class="card-footer">
          <span class="card-meta">📍 ${item.location}</span>
          <button class="btn-apply" onclick="applyToOpp('${item.title}')">1-Click Apply</button>
        </div>
      </div>
    </article>
  `
    )
    .join("");

  refreshIcons();
}

function renderApplicants() {
  const tbody = document.getElementById("applicant-rows");
  if (!tbody) return;

  tbody.innerHTML = applicants
    .map(
      (app) => `
    <tr>
      <td><strong>${app.name}</strong></td>
      <td>${app.role}</td>
      <td><span class="score-badge">${app.score}%</span></td>
      <td><span class="pill highlight">${app.status}</span></td>
      <td><button class="action-cell-btn primary" onclick="verifyApplicant(${app.id})">Approve & Issue Cert</button></td>
    </tr>
  `
    )
    .join("");
}

function applyToOpp(title) {
  if (!currentUser) {
    openAuthModal("volunteer", "signup");
    showToast("Please register or log in before applying!");
    return;
  }
  showToast(`Application successfully sent for: "${title}"`);
}

function verifyApplicant(id) {
  const applicant = applicants.find((a) => a.id === id);
  if (applicant) {
    applicant.status = "Verified & Logged";
    renderApplicants();
    showToast(`Approved ${applicant.name}. Hours logged!`);
  }
}

// ==========================================
// 7. PRESET IMAGE SELECTOR DROPDOWN
// ==========================================
function initImagePicker() {
  const preview = document.getElementById("picker-preview");
  const label = document.getElementById("picker-label");
  const cat = document.getElementById("picker-cat");
  const menu = document.getElementById("image-dropdown-menu");

  if (!preview || !label || !cat || !menu) return;

  preview.src = selectedPresetImage.thumbnail;
  label.textContent = selectedPresetImage.label;
  cat.textContent = selectedPresetImage.category;

  menu.innerHTML = VOLUNTEER_IMAGE_OPTIONS.map(
    (opt) => `
    <div class="image-option-item" onclick="selectImagePreset('${opt.id}')">
      <img src="${opt.thumbnail}" alt="${opt.label}" />
      <div>
        <p style="font-size:0.75rem;font-weight:600;margin:0;">${opt.label}</p>
        <span style="font-size:0.65rem;color:var(--text-secondary);">${opt.category}</span>
      </div>
    </div>
  `
  ).join("");
}

function toggleImageDropdown() {
  const menu = document.getElementById("image-dropdown-menu");
  if (menu) menu.classList.toggle("hidden");
}

function selectImagePreset(id) {
  const selected = VOLUNTEER_IMAGE_OPTIONS.find((x) => x.id === id);
  if (selected) {
    selectedPresetImage = selected;
    initImagePicker();
    toggleImageDropdown();
  }
}

// ==========================================
// 8. OPPORTUNITY CREATION MODAL
// ==========================================
function openCreateModal() {
  const modal = document.getElementById("create-modal");
  if (modal) modal.classList.remove("hidden");
}

function closeCreateModal() {
  const modal = document.getElementById("create-modal");
  if (modal) modal.classList.add("hidden");
}

function handleCreateOpportunity(event) {
  if (event) event.preventDefault();

  const titleInput = document.getElementById("opp-title");
  const catInput = document.getElementById("opp-category");
  const locInput = document.getElementById("opp-location");

  const newOpp = {
    id: Date.now(),
    title: titleInput ? titleInput.value : "Volunteer Initiative",
    category: catInput ? catInput.value : "Community Support",
    matchScore: 95,
    breakdown: { skill: "40%", time: "30%" },
    location: locInput ? locInput.value : "Austin, TX",
    image: selectedPresetImage,
  };

  opportunities.unshift(newOpp);
  renderOpportunities(opportunities);
  closeCreateModal();
  showToast("Opportunity published successfully!");
  if (event.target) event.target.reset();
}

// ==========================================
// 9. THEME & TOAST UTILITIES
// ==========================================
function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.classList.contains("dark");
  root.classList.remove("light", "dark");
  root.classList.add(isDark ? "light" : "dark");
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 3200);
}

// Global modal close on backdrop click
document.addEventListener("DOMContentLoaded", () => {
  renderOpportunities(opportunities);
  renderApplicants();
  initImagePicker();
  switchMainPortal("individual"); // <-- Makes sure the page starts on Individual mode
  updateAuthUI();
  refreshIcons();
});
// ==========================================
// PORTAL SWITCHER (Individual vs. Organization)
// ==========================================
function switchMainPortal(targetPortal) {
  const individualBtn = document.getElementById("toggle-individual-btn");
  const orgBtn = document.getElementById("toggle-org-btn");

  const publicHome = document.getElementById("public-home-view");
  const heroStrip = document.querySelector(".hero-strip");
  const volunteerTools = document.getElementById("volunteer-tools");
  const volunteerGrid = document.getElementById("volunteer-grid");
  const orgAuthView = document.getElementById("org-auth-view");
  const dedicatedOrgPage = document.getElementById("dedicated-org-page");

  if (targetPortal === "individual") {
    // 1. Activate Top Tab Indicator
    if (individualBtn) individualBtn.classList.add("active");
    if (orgBtn) orgBtn.classList.remove("active");

    // 2. Hide ALL Organization Elements
    if (orgAuthView) orgAuthView.classList.add("hidden");
    if (dedicatedOrgPage) dedicatedOrgPage.classList.add("hidden");

    // 3. Show Individual / Volunteer Elements
    if (publicHome) publicHome.classList.remove("hidden");
    if (heroStrip) heroStrip.classList.remove("hidden");
    if (volunteerTools) volunteerTools.classList.remove("hidden");
    if (volunteerGrid) volunteerGrid.classList.remove("hidden");
  } else {
    // 1. Activate Top Tab Indicator
    if (orgBtn) orgBtn.classList.add("active");
    if (individualBtn) individualBtn.classList.remove("active");

    // 2. Hide ALL Individual Elements
    if (publicHome) publicHome.classList.add("hidden");
    if (heroStrip) heroStrip.classList.add("hidden");
    if (volunteerTools) volunteerTools.classList.add("hidden");
    if (volunteerGrid) volunteerGrid.classList.add("hidden");

    // 3. Show Organization View (Auth or Dashboard)
    if (currentUser && currentUser.type === "org") {
      if (orgAuthView) orgAuthView.classList.add("hidden");
      if (dedicatedOrgPage) dedicatedOrgPage.classList.remove("hidden");
    } else {
      if (orgAuthView) orgAuthView.classList.remove("hidden");
      if (dedicatedOrgPage) dedicatedOrgPage.classList.add("hidden");
    }
  }

  refreshIcons();
}

// ==========================================
// CATEGORY FILTER & SEARCH ENGINE
// ==========================================
function filterCategory(selectedCategory, buttonElement) {
  // Update active pill button state
  document.querySelectorAll(".chip").forEach((chip) => chip.classList.remove("active"));
  if (buttonElement) {
    buttonElement.classList.add("active");
  }

  // Filter items
  if (selectedCategory === "All") {
    renderOpportunities(opportunities);
  } else {
    const filtered = opportunities.filter((item) => {
      // Matches categories or abbreviated labels (e.g., Tech -> Technology)
      if (selectedCategory === "Tech") {
        return item.category.toLowerCase().includes("tech");
      }
      return item.category.toLowerCase() === selectedCategory.toLowerCase();
    });
    renderOpportunities(filtered);
  }
}

function filterCards() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  const query = searchInput.value.toLowerCase().trim();
  const matched = opportunities.filter((item) =>
    item.title.toLowerCase().includes(query) ||
    item.category.toLowerCase().includes(query) ||
    item.location.toLowerCase().includes(query)
  );

  renderOpportunities(matched);
}