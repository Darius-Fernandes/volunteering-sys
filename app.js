/**
 * KindredMatch - Main Application Engine
 * Unified Script: Categories, Dedicated Sector Hubs, Bangalore NGOs,
 * Custom Org Photos, Anti-Gibberish Validation, and Volunteer Dashboard.
 */

// ==========================================
// 1. DATA SOURCES & PRESETS
// ==========================================
const API_BASE_URL = "http://localhost:5000/api";

// ----------------------------------------------------
// ANTI-ACCIDENTAL REFRESH & NAVIGATION WARNING
// ----------------------------------------------------
// Only warn if an actual edit/create form has unsaved user inputs, not during general site browsing
// ==========================================
// PHYSICAL RELOAD DETECTION ONLY
// ==========================================
let isPhysicalReloadIntent = false;

// 1. Detect physical keyboard shortcuts (Ctrl+R, Cmd+R, F5)
window.addEventListener("keydown", (e) => {
  if (
    e.key === "F5" || 
    ((e.ctrlKey || e.metaKey) && (e.key === "r" || e.key === "R"))
  ) {
    isPhysicalReloadIntent = true;
  }
});
// Ensure standard categories are mapped
const CATEGORY_MAP = {
  "EDUCATION": "teaching-centers",
  "HEALTHCARE": "medical-centers",
  "ENVIRONMENT": "environmental-centers",
  "COMMUNITY": "community-welfare",
  "ANIMAL WELFARE": "animal-welfare",
  "DISASTER RELIEF": "disaster-relief",
  "TECHNOLOGY": "community-welfare" // or your dedicated tech hub ID
};

// 2. Detect cursor moving up to the browser toolbar/reload button
document.addEventListener("mouseleave", (e) => {
  // If the cursor leaves the top edge of the window (towards browser reload icon)
  if (e.clientY <= 0) {
    isPhysicalReloadIntent = true;
  }
});

document.addEventListener("mouseenter", () => {
  // If mouse re-enters without reloading, reset the intent after 2 seconds
  setTimeout(() => {
    isPhysicalReloadIntent = false;
  }, 2000);
});

// 3. Only show warning if triggered by physical human action
window.addEventListener("beforeunload", (event) => {
  if (isPhysicalReloadIntent) {
    // Reset flag in case user clicks "Cancel"
    isPhysicalReloadIntent = false;
    event.preventDefault();
    event.returnValue = "";
    return "";
  }
  // Otherwise, allow silent refresh (e.g. Live Server auto-reload)
});
const VOLUNTEER_IMAGE_OPTIONS = [
  {
    id: "edu-teaching",
    category: "Education",
    label: "Youth Tutoring & Mentorship",
    url: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800",
    thumbnail: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    id: "eco-planting",
    category: "Environment",
    label: "Tree Planting & Nature Restoration",
    url: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800",
    thumbnail: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    id: "food-drive",
    category: "Community Support",
    label: "Food Bank & Community Kitchen",
    url: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800",
    thumbnail: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    id: "animal-care",
    category: "Animal Welfare",
    label: "Animal Shelter & Pet Rescue",
    url: "https://images.pexels.com/photos/1904105/pexels-photo-1904105.jpeg?auto=compress&cs=tinysrgb&w=800",
    thumbnail: "https://images.pexels.com/photos/1904105/pexels-photo-1904105.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    id: "elderly-care",
    category: "Healthcare & Seniors",
    label: "Senior Living Outreach",
    url: "https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg?auto=compress&cs=tinysrgb&w=800",
    thumbnail: "https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg?auto=compress&cs=tinysrgb&w=200"
  }
];

// Pure category definitions with empty NGO arrays
const CATEGORY_HUBS = [
  { id: "teaching-centers", title: "Teaching Centers", category: "EDUCATION", image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800", ngos: [] },
  { id: "medical-centers", title: "Medical Centers", category: "HEALTHCARE", image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800", ngos: [] },
  { id: "environmental-centers", title: "Environmental Centers", category: "ENVIRONMENT", image: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800", ngos: [] },
  { id: "community-welfare", title: "Community Welfare Centres", category: "COMMUNITY", image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800", ngos: [] },
  { id: "animal-welfare", title: "Animal Welfare Centres", category: "ANIMAL WELFARE", image: "https://images.pexels.com/photos/1904105/pexels-photo-1904105.jpeg?auto=compress&cs=tinysrgb&w=800", ngos: [] },
  { id: "disaster-relief", title: "Disaster Relief", category: "DISASTER RELIEF", image: "https://images.pexels.com/photos/6994982/pexels-photo-6994982.jpeg?auto=compress&cs=tinysrgb&w=800", ngos: [] },
  { id: "elderly-care", title: "Elderly Care Centres", category: "HEALTHCARE", image: "https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg?auto=compress&cs=tinysrgb&w=800", ngos: [] },
  { id: "women-child", title: "Women and Child Centres", category: "COMMUNITY", image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=800", ngos: [] },
  { id: "rural-development", title: "Rural Development Centres", category: "COMMUNITY", image: "https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg?auto=compress&cs=tinysrgb&w=800", ngos: [] },
  { id: "disability-support", title: "Disability Support Centres", category: "HEALTHCARE", image: "https://images.pexels.com/photos/4064835/pexels-photo-4064835.jpeg?auto=compress&cs=tinysrgb&w=800", ngos: [] },
  { id: "fundraisers", title: "Fundraisers Centres", category: "COMMUNITY", image: "https://images.pexels.com/photos/6995244/pexels-photo-6995244.jpeg?auto=compress&cs=tinysrgb&w=800", ngos: [] }
];

// Persistent dynamic listings only
let orgCreatedOpportunities = JSON.parse(localStorage.getItem("kindred_org_opportunities") || "[]");
let applicants = JSON.parse(localStorage.getItem("kindred_applicants") || "[]");

function saveOrgData() {
  localStorage.setItem("kindred_org_opportunities", JSON.stringify(orgCreatedOpportunities));
  localStorage.setItem("kindred_applicants", JSON.stringify(applicants));
}

let opportunities = [...CATEGORY_HUBS];



let currentUser = null;
let selectedPresetImage = VOLUNTEER_IMAGE_OPTIONS[0];
let imageMode = "preset";
let customUploadedDataUrl = "";

// ==========================================
// 2. LIFECYCLE & ICON REFRESH
// ==========================================
document.addEventListener("DOMContentLoaded", async () => {
  // 1. Recover Session from localStorage (No disappearing after refresh)
  const savedSession = localStorage.getItem("kindred_session");
  const savedToken = localStorage.getItem("kindred_token");

  if (savedSession && savedToken) {
    try {
      currentUser = JSON.parse(savedSession);
    } catch (e) {
      localStorage.removeItem("kindred_session");
      localStorage.removeItem("kindred_token");
    }
  }

  // 2. Fetch all persisted opportunities from SQLite backend
  await fetchPersistedOpportunities();

  renderApplicants();
  initImagePicker();
  
  if (currentUser && currentUser.type === "org") {
    switchMainPortal("organization");
  } else {
    switchMainPortal("individual");
  }

  updateAuthUI();
  refreshIcons();
});

// Load real data from server
async function fetchPersistedOpportunities() {
  try {
    const res = await fetch(`${API_BASE_URL}/opportunities`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        // Map backend rows into frontend structure
        opportunities = data.map(row => ({
          id: row.id,
          title: row.title,
          category: row.category,
          image: row.image_url,
          location: row.location,
          address: row.address,
          ngos: [
            {
              name: row.title,
              focus: `${row.category} Outreach`,
              contact: `${row.contact_phone} | ${row.contact_email}`,
              openRoles: "Volunteer Assistant"
            }
          ]
        }));
        renderOpportunities(opportunities);
      }
    }
  } catch (e) {
    console.warn("Backend server offline, falling back to local dataset.");
    renderOpportunities(CATEGORY_HUBS);
  }
}

function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

// ==========================================
// 3. BALANCED REAL NAME VALIDATION
// ==========================================
function validateRealName(name) {
  if (!name || typeof name !== "string") {
    return { valid: false, message: "Please enter your full name." };
  }

  const clean = name.trim();

  if (clean.length < 2 || clean.length > 60) {
    return { valid: false, message: "Name must be between 2 and 60 characters." };
  }

  if (!/^[a-zA-Z\s'-]+$/.test(clean)) {
    return { valid: false, message: "Name cannot contain numbers or special symbols." };
  }

  if (!/[aeiouyAEIOUY]/.test(clean)) {
    return { valid: false, message: "Please enter a valid pronounceable name." };
  }

  if (/(.)\1{2,}/i.test(clean)) {
    return { valid: false, message: "Name cannot contain repetitive characters (e.g. 'aaa')." };
  }

  const keyboardSpam = ["asdf", "qwer", "zxcv", "test", "fake", "admin", "null", "qwerty"];
  if (keyboardSpam.some((s) => clean.toLowerCase().includes(s))) {
    return { valid: false, message: "Please enter your genuine legal name." };
  }

  return { valid: true };
}

// ==========================================
// 4. MAIN PORTAL SWITCHER (INDIVIDUAL vs ORG)
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
  const sectorView = document.getElementById("sector-detail-view");

  if (targetPortal === "individual") {
    if (individualBtn) individualBtn.classList.add("active");
    if (orgBtn) orgBtn.classList.remove("active");

    if (orgAuthView) orgAuthView.classList.add("hidden");
    if (dedicatedOrgPage) dedicatedOrgPage.classList.add("hidden");

    if (publicHome) publicHome.classList.remove("hidden");
    if (heroStrip) heroStrip.classList.remove("hidden");
    if (volunteerTools) volunteerTools.classList.remove("hidden");
    if (volunteerGrid) volunteerGrid.classList.remove("hidden");
    if (sectorView) sectorView.classList.add("hidden");
  } else {
    // Target is organization
    if (orgBtn) orgBtn.classList.add("active");
    if (individualBtn) individualBtn.classList.remove("active");

    if (publicHome) publicHome.classList.add("hidden");
    if (heroStrip) heroStrip.classList.add("hidden");
    if (volunteerTools) volunteerTools.classList.add("hidden");
    if (volunteerGrid) volunteerGrid.classList.add("hidden");
    if (sectorView) sectorView.classList.add("hidden");

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
// 5. AUTHENTICATION & PROFILE DROPDOWN
// ==========================================
function openAuthModal(role, mode) {
  const modal = document.getElementById("auth-modal");
  if (modal) modal.classList.remove("hidden");
  setAuthMode(mode || "login");
  refreshIcons();
}

function closeAuthModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) {
    modal.classList.add("hidden");
  }

  // Clear inputs and reset forms so previous entries don't stay visible
  const signupForm = document.getElementById("volunteer-signup-form");
  const loginForm = document.getElementById("volunteer-login-form");
  if (signupForm) signupForm.reset();
  if (loginForm) loginForm.reset();
}

function setAuthMode(mode) {
  const loginForm = document.getElementById("volunteer-login-form");
  const signupForm = document.getElementById("volunteer-signup-form");
  const tabLogin = document.getElementById("auth-tab-login");
  const tabSignup = document.getElementById("auth-tab-signup");

  if (!loginForm || !signupForm) return;

  // Clear inputs whenever switching between Sign In and Create Account
  loginForm.reset();
  signupForm.reset();

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
  // Prevent page refresh on submit
  if (event) event.preventDefault();

  try {
    if (mode === "signup") {
      const nameInput = document.getElementById("signup-name");
      const collegeInput = document.getElementById("signup-college");
      const emailInput = document.getElementById("signup-email");

      const nameVal = nameInput ? nameInput.value.trim() : "";
      const validation = validateRealName(nameVal);

      if (!validation.valid) {
        alert(validation.message);
        if (nameInput) nameInput.focus();
        return;
      }

      currentUser = {
        type: "student",
        name: nameVal,
        college: collegeInput && collegeInput.value ? collegeInput.value.trim() : "College",
        email: emailInput && emailInput.value ? emailInput.value.trim() : "user@domain.edu",
        phone: "",
        emailVerified: false,
        phoneVerified: false,
        completedWorks: []
      };
    } else {
      // Login Mode
      const loginEmail = document.getElementById("login-email");
      const emailVal = loginEmail && loginEmail.value.trim() ? loginEmail.value.trim() : "volunteer@domain.edu";
      
      // Generate clean display name from email (e.g., anu@gmail.com -> Anu)
      const namePart = emailVal.split("@")[0] || "Volunteer";
      const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

      currentUser = {
        type: "student",
        name: formattedName,
        college: "Bengaluru Educational Institution",
        email: emailVal,
        phone: "9876543210",
        emailVerified: true,
        phoneVerified: false,
        completedWorks: []
      };
    }

    // Save session so you don't get logged out on reload
    localStorage.setItem("kindred_session", JSON.stringify(currentUser));

    // Close modal and update navbar UI
    closeAuthModal();
    updateAuthUI();
    showToast(mode === "signup" ? "Account created successfully!" : `Welcome back, ${currentUser.name}!`);
    switchMainPortal("individual");

  } catch (err) {
    console.error("Authentication error:", err);
    alert("An error occurred during login. Check the browser console (F12) for details.");
  }
}

async function handleOrgAuth(e, mode) {
  if (e) e.preventDefault();

  const email = mode === "signup" ? document.getElementById("org-signup-email").value : document.getElementById("org-login-email").value;
  const password = mode === "signup" ? document.getElementById("org-signup-password").value : document.getElementById("org-login-password").value;
  const name = mode === "signup" ? document.getElementById("org-signup-name").value : "";
  const regId = mode === "signup" ? document.getElementById("org-signup-id").value : "";

  try {
    const endpoint = mode === "signup" ? "/org/signup" : "/org/login";
    const payload = mode === "signup" ? { name, regId, email, password } : { email, password };

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Organization authentication failed");
      return;
    }

    localStorage.setItem("kindred_token", data.token);
    localStorage.setItem("kindred_session", JSON.stringify(data.org));
    currentUser = data.org;

    updateAuthUI();
    showToast(`Logged into Organization Portal: ${currentUser.name}`);
    switchMainPortal("organization");
  } catch (err) {
    alert("Cannot connect to backend server. Make sure node server.js is running.");
  }
}

// ==========================================
// ORGANIZATION AUTHENTICATION & TAB SWITCHING
// ==========================================
function switchOrgTab(mode) {
  const loginForm = document.getElementById("org-login-form");
  const signupForm = document.getElementById("org-signup-form");
  const tabLogin = document.getElementById("org-tab-login");
  const tabSignup = document.getElementById("org-tab-signup");

  if (!loginForm || !signupForm || !tabLogin || !tabSignup) {
    console.error("Organization auth elements missing from DOM.");
    return;
  }

  // Clear fields when switching tabs
  loginForm.reset();
  signupForm.reset();

  if (mode === "login") {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    tabLogin.classList.add("active");
    tabSignup.classList.remove("active");
  } else {
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
    tabSignup.classList.add("active");
    tabLogin.classList.remove("active");
  }

  refreshIcons();
}

// ==========================================
// ORGANIZATION AUTHENTICATION & TAB SWITCHING
// ==========================================
function switchOrgTab(mode) {
  const loginForm = document.getElementById("org-login-form");
  const signupForm = document.getElementById("org-signup-form");
  const tabLogin = document.getElementById("org-tab-login");
  const tabSignup = document.getElementById("org-tab-signup");

  if (!loginForm || !signupForm || !tabLogin || !tabSignup) {
    console.error("Organization auth elements missing from DOM.");
    return;
  }

  // Clear fields when switching tabs
  loginForm.reset();
  signupForm.reset();

  if (mode === "login") {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    tabLogin.classList.add("active");
    tabSignup.classList.remove("active");
  } else {
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
    tabSignup.classList.add("active");
    tabLogin.classList.remove("active");
  }

  refreshIcons();
}



function toggleProfileDropdown(e) {
  e.stopPropagation();
  const dropdown = document.getElementById("profile-dropdown-menu");
  if (dropdown) dropdown.classList.toggle("hidden");
  refreshIcons();
}

function confirmLogout() {
  if (confirm("Are you sure you want to log out?")) {
    currentUser = null;
    const dropdown = document.getElementById("profile-dropdown-menu");
    if (dropdown) dropdown.classList.add("hidden");
    updateAuthUI();
    showToast("Logged out successfully");
    switchMainPortal("individual");
  }
}

function updateAuthUI() {
  const authContainer = document.getElementById("auth-buttons-container");
  const userProfile = document.getElementById("user-profile-badge");
  const menuName = document.getElementById("menu-user-name");

  if (currentUser) {
    if (authContainer) authContainer.classList.add("hidden");
    if (userProfile) userProfile.classList.remove("hidden");
    if (menuName) menuName.textContent = currentUser.name;
  } else {
    if (authContainer) authContainer.classList.remove("hidden");
    if (userProfile) userProfile.classList.add("hidden");
  }

  // Render correct calculated metrics
  updateUserMetricsDisplay(false);
}

// ==========================================
// 6. USER DASHBOARD & VERIFICATION
// ==========================================
function openStudentDashboard() {
  if (!currentUser) {
    openAuthModal("volunteer", "login");
    return;
  }
  const modal = document.getElementById("student-dashboard-modal");
  const dropdown = document.getElementById("profile-dropdown-menu");
  if (dropdown) dropdown.classList.add("hidden");

  document.getElementById("dash-name").value = currentUser.name || "";
  document.getElementById("dash-college").value = currentUser.college || "";
  document.getElementById("dash-email").value = currentUser.email || "";
  document.getElementById("dash-phone").value = currentUser.phone || "";

  renderVerificationBadges();
  renderCompletedWorks();

  if (modal) modal.classList.remove("hidden");
  refreshIcons();
}

function closeStudentDashboard() {
  const modal = document.getElementById("student-dashboard-modal");
  if (modal) modal.classList.add("hidden");
}

function renderVerificationBadges() {
  const emailBadge = document.getElementById("email-badge");
  const phoneBadge = document.getElementById("phone-badge");
  const verifyEmailBtn = document.getElementById("verify-email-btn");
  const verifyPhoneBtn = document.getElementById("verify-phone-btn");

  if (!emailBadge || !phoneBadge) return;

  if (currentUser.emailVerified) {
    emailBadge.textContent = "Verified ✓";
    emailBadge.className = "badge-status verified";
    if (verifyEmailBtn) verifyEmailBtn.classList.add("hidden");
  } else {
    emailBadge.textContent = "Unverified";
    emailBadge.className = "badge-status unverified";
    if (verifyEmailBtn) verifyEmailBtn.classList.remove("hidden");
  }

  if (currentUser.phoneVerified) {
    phoneBadge.textContent = "Verified ✓";
    phoneBadge.className = "badge-status verified";
    if (verifyPhoneBtn) verifyPhoneBtn.classList.add("hidden");
  } else {
    phoneBadge.textContent = "Unverified";
    phoneBadge.className = "badge-status unverified";
    if (verifyPhoneBtn) verifyPhoneBtn.classList.remove("hidden");
  }
}

function verifyCredential(type) {
  const code = prompt(`Enter the 6-digit safety code sent to your ${type}:`, "123456");
  if (code && code.length === 6) {
    if (type === "email") currentUser.emailVerified = true;
    if (type === "phone") currentUser.phoneVerified = true;
    renderVerificationBadges();
    showToast(`${type.toUpperCase()} verified successfully!`);
  } else if (code) {
    alert("Invalid format. Please enter a 6-digit OTP.");
  }
}

function saveProfileChanges(e) {
  if (e) e.preventDefault();
  const nameVal = document.getElementById("dash-name").value;
  const validation = validateRealName(nameVal);

  if (!validation.valid) {
    alert(validation.message);
    return;
  }

  currentUser.name = nameVal.trim();
  currentUser.college = document.getElementById("dash-college").value.trim();
  currentUser.email = document.getElementById("dash-email").value.trim();
  currentUser.phone = document.getElementById("dash-phone").value.trim();

  updateAuthUI();
  showToast("Profile details updated securely!");
}

function renderCompletedWorks() {
  const container = document.getElementById("completed-works-container");
  const totalHoursEl = document.getElementById("dash-total-hours");
  const totalCertsEl = document.getElementById("dash-total-certs");

  const works = currentUser.completedWorks || [];
  const sumHours = works.reduce((total, item) => total + (item.hours || 0), 0);

  if (totalHoursEl) totalHoursEl.textContent = `${sumHours} hrs`;
  if (totalCertsEl) totalCertsEl.textContent = works.length;

  if (!container) return;

  if (works.length === 0) {
    container.innerHTML = `<p class="text-secondary text-sm">No completed works yet. Verified entries will appear here.</p>`;
    return;
  }

  container.innerHTML = works.map((w) => `
    <div class="completed-item">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h4>${w.role}</h4>
        <span class="badge-status verified">Verified</span>
      </div>
      <p>NGO: <strong>${w.orgName}</strong> • Hours Credited: <strong>${w.hours} hrs</strong></p>
      <span class="text-xs text-secondary">${w.date || "Approved"}</span>
    </div>
  `).join("");
}

// ==========================================
// 7. CARD RENDERING & SECONDARY WEBPAGE
// ==========================================
function renderOpportunities() {
  const container = document.getElementById("volunteer-grid");
  if (!container) return;

  // Always display the structured category tiles on homepage
  container.innerHTML = CATEGORY_HUBS.map(item => `
    <article class="opp-card">
      <div class="card-banner" onclick="openSectorPage('${item.id}')" style="cursor:pointer;">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
      </div>
      <div class="card-body">
        <span class="card-cat">${item.category}</span>
        <h3 class="card-title" style="cursor:pointer; margin-top:4px;" onclick="openSectorPage('${item.id}')">${item.title}</h3>
        <div class="card-footer">
          <button type="button" class="btn-apply" onclick="openSectorPage('${item.id}')">View Details</button>
        </div>
      </div>
    </article>
  `).join("");

  refreshIcons();
}

function openSectorPage(categoryId) {
  if (!currentUser) {
    openAuthModal("volunteer", "login");
    showToast("Please log in or sign up to view and apply for opportunities!");
    return;
  }

  const sector = CATEGORY_HUBS.find((c) => c.id === categoryId);
  if (!sector) return;

  const volunteerTools = document.getElementById("volunteer-tools");
  const volunteerGrid = document.getElementById("volunteer-grid");
  const publicHome = document.getElementById("public-home-view");
  const heroStrip = document.querySelector(".hero-strip");
  const sectorView = document.getElementById("sector-detail-view");

  if (volunteerTools) volunteerTools.classList.add("hidden");
  if (volunteerGrid) volunteerGrid.classList.add("hidden");
  if (publicHome) publicHome.classList.add("hidden");
  if (heroStrip) heroStrip.classList.add("hidden");

  const sectorBadge = document.getElementById("sector-badge");
  const sectorTitle = document.getElementById("sector-title");
  const sectorDesc = document.getElementById("sector-desc");
  const ngoContainer = document.getElementById("sector-ngos-grid");

  if (sectorBadge) sectorBadge.textContent = `${sector.category} HUB`;
  if (sectorTitle) sectorTitle.textContent = sector.title;
  if (sectorDesc) sectorDesc.textContent = `Open initiatives and verified organizations in this category.`;

  // Fetch only active opportunities created for this hub
  const activeOpenings = orgCreatedOpportunities.filter(
    (opp) => opp.hubId === categoryId || opp.category?.toUpperCase() === sector.category?.toUpperCase()
  );

  if (ngoContainer) {
    if (activeOpenings.length === 0) {
      ngoContainer.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; background: var(--bg-surface); border: 1px dashed var(--border-color); border-radius: 12px;">
          <p class="text-secondary" style="font-weight: 600; margin-bottom: 0.5rem;">No active opportunities posted under this category yet.</p>
          <span class="text-xs text-secondary">New openings posted by registered organizations will appear here immediately.</span>
        </div>
      `;
    } else {
      ngoContainer.innerHTML = activeOpenings.map(opp => `
        <div class="ngo-detail-card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span class="ngo-focus" style="text-transform: uppercase;">${opp.category}</span>
            <h3 style="margin-top: 0.35rem;">${opp.orgName}</h3>
            
            <div style="margin: 0.85rem 0; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
              <div>📍 <strong>Location:</strong> ${opp.location}</div>
              <div>📞 <strong>Phone:</strong> ${opp.phone}</div>
              <div>✉️ <strong>Email:</strong> ${opp.email}</div>
              <div>⏳ <strong>Deadline:</strong> ${opp.deadline}</div>
            </div>
          </div>

          <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.82rem; font-weight: 700; color: var(--primary);">Role: ${opp.title}</span>
            <button class="primary-btn btn-sm" onclick="applyForOpportunity('${opp.id}')">Apply Now</button>
          </div>
        </div>
      `).join("");
    }
  }

  if (sectorView) sectorView.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
  refreshIcons();
}

// Universal apply handler for all opportunities
function applyForOpportunity(oppId) {
  if (!currentUser) {
    openAuthModal("volunteer", "login");
    showToast("Please sign in or register to apply for this work.");
    return;
  }

  const opp = orgCreatedOpportunities.find((o) => o.id === oppId);
  const targetRoleTitle = opp ? opp.title : "Volunteer Opening";
  const targetOrgName = opp ? opp.orgName : "Partner Non-Profit";

  // Prevent duplicate registration
  const alreadyApplied = (applicants || []).some(
    (a) => a.oppId === oppId && a.email === currentUser.email
  );

  if (alreadyApplied) {
    alert("You have already registered for this position!");
    return;
  }

  // Create new registration record
  const newRegistration = {
    id: Date.now(),
    oppId: oppId,
    name: currentUser.name,
    email: currentUser.email,
    role: targetRoleTitle,
    orgName: targetOrgName,
    score: 95,
    status: "Registered",
    hours: 4 // Registered volunteer commitment credit
  };

  applicants.unshift(newRegistration);
  saveOrgData();

  // Trigger dynamic counter animation on home and hero panels
  updateUserMetricsDisplay(true);

  if (typeof renderApplicants === "function") renderApplicants();
  if (typeof updateOrgMetrics === "function") updateOrgMetrics();

  showToast(`Registered successfully for ${targetRoleTitle}!`);
}

function backToCategories() {
  const sectorView = document.getElementById("sector-detail-view");
  const volunteerTools = document.getElementById("volunteer-tools");
  const volunteerGrid = document.getElementById("volunteer-grid");
  const publicHome = document.getElementById("public-home-view");
  const heroStrip = document.querySelector(".hero-strip");

  if (sectorView) sectorView.classList.add("hidden");
  if (volunteerTools) volunteerTools.classList.remove("hidden");
  if (volunteerGrid) volunteerGrid.classList.remove("hidden");
  if (publicHome) publicHome.classList.remove("hidden");
  if (heroStrip) heroStrip.classList.remove("hidden");

  refreshIcons();
}

function filterCards() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;
  const q = searchInput.value.toLowerCase().trim();
  const matched = CATEGORY_HUBS.filter((item) =>
    item.title.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q)
  );
  renderOpportunities(matched);
}

// ==========================================
// 8. ORGANIZATION APPLICANT PIPELINE
// ==========================================
function renderApplicants() {
  const tbody = document.getElementById("applicant-rows");
  if (!tbody) return;

  const todayStr = new Date().toISOString().split("T")[0];

  // Filter out:
  // 1. Applications whose associated opportunity was removed
  // 2. Applications whose opportunity deadline has passed
  // 3. Applications that have already been certified/completed
  const activeApplications = (applicants || []).filter(app => {
    // Check if the work has already been completed & logged
    if (app.status === "Completed & Certified") {
      return false;
    }

    // Match back to the parent opportunity if an oppId exists
    if (app.oppId) {
      const parentOpp = orgCreatedOpportunities.find(o => o.id === app.oppId);
      // If the parent opportunity was removed, vanish this application
      if (!parentOpp) return false;
      // If the opportunity deadline has passed, vanish this application
      if (parentOpp.deadline && parentOpp.deadline < todayStr) return false;
    }

    return true;
  });

  if (activeApplications.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: var(--text-secondary); padding: 1.5rem;">
          No active volunteer applications pending.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = activeApplications.map(app => `
    <tr>
      <td><strong>${app.name}</strong></td>
      <td>${app.role}</td>
      <td><span class="score-badge">${app.score || 95}%</span></td>
      <td><span class="pill highlight">${app.status || "Submitted"}</span></td>
      <td>
        <button class="action-cell-btn primary" onclick="verifyApplicant(${app.id})">
          Approve & Log Hours
        </button>
      </td>
    </tr>
  `).join("");
}

function verifyApplicant(id) {
  const applicantIndex = applicants.findIndex(a => a.id === id);
  if (applicantIndex === -1) return;

  const applicant = applicants[applicantIndex];

  // 1. Mark as completed
  applicant.status = "Completed & Certified";

  // 2. Credit the verified hours to the student volunteer record
  if (currentUser && currentUser.type === "student") {
    currentUser.completedWorks = currentUser.completedWorks || [];
    currentUser.completedWorks.push({
      id: Date.now(),
      role: applicant.role,
      orgName: applicant.orgName || "Partner Non-Profit",
      hours: applicant.hours || 4,
      date: new Date().toLocaleDateString()
    });
    localStorage.setItem("kindred_session", JSON.stringify(currentUser));
  }

  // 3. Persist changes
  saveOrgData();

  // 4. Immediately remove from active table view and refresh metrics
  renderApplicants();
  updateOrgMetrics();
  updateUserMetricsDisplay(true);

  showToast(`Hours logged for ${applicant.name}! Application archived from active queue.`);
}

// ==========================================
// 9. CUSTOM PHOTO UPLOADER (FOR ORGANIZATIONS)
// ==========================================
function switchImageInputMode(mode) {
  imageMode = mode;
  const tabPreset = document.getElementById("img-tab-preset");
  const tabCustom = document.getElementById("img-tab-custom");
  const presetSection = document.getElementById("preset-picker-section");
  const customSection = document.getElementById("custom-picker-section");

  if (!tabPreset || !tabCustom) return;

  if (mode === "preset") {
    tabPreset.classList.add("active");
    tabCustom.classList.remove("active");
    if (presetSection) presetSection.classList.remove("hidden");
    if (customSection) customSection.classList.add("hidden");
  } else {
    tabCustom.classList.add("active");
    tabPreset.classList.remove("active");
    if (customSection) customSection.classList.remove("hidden");
    if (presetSection) presetSection.classList.add("hidden");
  }
}

function handleCustomFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      customUploadedDataUrl = e.target.result;
      showCustomImagePreview(customUploadedDataUrl);
    };
    reader.readAsDataURL(file);
  }
}

function handleCustomUrlInput(event) {
  const url = event.target.value.trim();
  if (url) {
    customUploadedDataUrl = url;
    showCustomImagePreview(url);
  }
}

function showCustomImagePreview(src) {
  const box = document.getElementById("custom-preview-box");
  const img = document.getElementById("custom-preview-img");
  if (box && img) {
    img.src = src;
    box.classList.remove("hidden");
  }
}

function handleCreateOpportunity(event) {
  if (event) event.preventDefault();

  const titleInput = document.getElementById("opp-title");
  const catSelect = document.getElementById("opp-category");
  const emailInput = document.getElementById("opp-contact-email");
  const phoneInput = document.getElementById("opp-contact-phone");
  const locInput = document.getElementById("opp-location");
  const deadlineInput = document.getElementById("opp-deadline");

  const titleVal = titleInput ? titleInput.value.trim() : "";
  const emailVal = emailInput ? emailInput.value.trim() : "";
  const phoneVal = phoneInput ? phoneInput.value.trim() : "";
  const locVal = locInput ? locInput.value.trim() : "";
  const deadlineVal = deadlineInput ? deadlineInput.value : "";

  // 1. Title verification
  if (titleVal.length < 3 || titleVal.length > 80) {
    alert("Opportunity title must be between 3 and 80 characters.");
    if (titleInput) titleInput.focus();
    return;
  }

  // 2. Email verification
  const emailCheck = validateEmailAddress(emailVal);
  if (!emailCheck.valid) {
    alert(emailCheck.message);
    if (emailInput) emailInput.focus();
    return;
  }

  // 3. Phone number length & format verification
  const phoneCheck = validatePhoneNumber(phoneVal);
  if (!phoneCheck.valid) {
    alert(phoneCheck.message);
    if (phoneInput) phoneInput.focus();
    return;
  }

  // 4. Location verification
  if (locVal.length < 3) {
    alert("Please enter a valid workplace/center location (e.g., Koramangala, Bengaluru).");
    if (locInput) locInput.focus();
    return;
  }

  // 5. Future date deadline verification
  const dateCheck = validateDeadlineDate(deadlineVal);
  if (!dateCheck.valid) {
    alert(dateCheck.message);
    if (deadlineInput) deadlineInput.focus();
    return;
  }

  const selectedHubId = catSelect ? catSelect.value : "teaching-centers";
  const selectedHubObj = CATEGORY_HUBS.find(h => h.id === selectedHubId);
  const categoryName = selectedHubObj ? selectedHubObj.category : "COMMUNITY";
  const hubTitle = selectedHubObj ? selectedHubObj.title : "Community Hub";

  const newOpp = {
    id: `opp-${Date.now()}`,
    hubId: selectedHubId,
    title: titleVal,
    category: categoryName,
    hubTitle: hubTitle,
    email: emailCheck.sanitized,
    phone: `+91 ${phoneCheck.sanitized}`,
    location: locVal,
    deadline: deadlineVal,
    orgName: currentUser && currentUser.name ? currentUser.name : "Partner Organization",
    createdAt: new Date().toISOString()
  };

  orgCreatedOpportunities.unshift(newOpp);
  saveOrgData();

  renderOrgOpportunities();
  updateOrgMetrics();
  closeCreateModal();
  showToast(`Opportunity posted under ${hubTitle}!`);

  if (event.target) event.target.reset();
}

// ==========================================
// 10. PRESET PICKER & MODAL UTILITIES
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

  menu.innerHTML = VOLUNTEER_IMAGE_OPTIONS.map((opt) => `
    <div class="image-option-item" onclick="selectImagePreset('${opt.id}')">
      <img src="${opt.thumbnail}" alt="${opt.label}" />
      <div>
        <p style="font-size:0.75rem;font-weight:600;margin:0;">${opt.label}</p>
        <span style="font-size:0.65rem;color:var(--text-secondary);">${opt.category}</span>
      </div>
    </div>
  `).join("");
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

function openCreateModal() {
  const modal = document.getElementById("create-modal");
  if (modal) modal.classList.remove("hidden");
}

function closeCreateModal() {
  const modal = document.getElementById("create-modal");
  if (modal) modal.classList.add("hidden");
}

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
// Smoothly scrolls the page down to the category tiles
function scrollToCategories() {
  // Ensure the volunteer grid and tools are visible
  const volunteerGrid = document.getElementById("volunteer-grid");
  const volunteerTools = document.getElementById("volunteer-tools");

  if (volunteerTools) volunteerTools.classList.remove("hidden");
  if (volunteerGrid) volunteerGrid.classList.remove("hidden");

  // Smooth scroll down to the category cards
  const target = volunteerTools || volunteerGrid;
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
// Switches directly to the Organization portal and scrolls up cleanly
 
}
function goToOrgPortal() {
  switchMainPortal("organization");
  window.scrollTo({ top: 0, behavior: "smooth" });
} 
async function handleCreateOpportunity(event) {
  if (event) event.preventDefault();

  const token = localStorage.getItem("kindred_token");
  if (!token) {
    alert("Session expired. Please log in again.");
    return;
  }

  const titleInput = document.getElementById("opp-title");
  const catInput = document.getElementById("opp-category");
  const locInput = document.getElementById("opp-location");

  let bannerImageUrl = selectedPresetImage.url;
  if (imageMode === "custom" && customUploadedDataUrl) {
    bannerImageUrl = customUploadedDataUrl;
  }

  const payload = {
    title: titleInput ? titleInput.value : "Community Initiative",
    category: catInput ? catInput.value : "COMMUNITY",
    location: locInput && locInput.value ? locInput.value : "Bengaluru, Karnataka",
    address: locInput && locInput.value ? locInput.value : "Bengaluru",
    image_url: bannerImageUrl
  };

  try {
    const res = await fetch(`${API_BASE_URL}/opportunities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed to publish opportunity");
      return;
    }

    // Refresh live list from database so it persists across reloads
    await fetchPersistedOpportunities();
    closeCreateModal();
    showToast("Opportunity published and saved permanently!");

    customUploadedDataUrl = "";
    const previewBox = document.getElementById("custom-preview-box");
    if (previewBox) previewBox.classList.add("hidden");
    if (event.target) event.target.reset();
  } catch (err) {
    alert("Error communicating with database.");
  }
}
// ==========================================
// 1. DYNAMIC DATA STORAGE (NO PREDEFINED DUMMY DATA)
// ==========================================
// Load saved opportunities and applicants from localStorage, or start empty

function saveOrgData() {
  localStorage.setItem("kindred_org_opportunities", JSON.stringify(orgCreatedOpportunities));
  localStorage.setItem("kindred_applicants", JSON.stringify(applicants));
}

// ==========================================
// 2. OPPORTUNITY CREATION WITH DEADLINE
// ==========================================
function handleCreateOpportunity(event) {
  if (event) event.preventDefault();

  const titleInput = document.getElementById("opp-title");
  const catSelect = document.getElementById("opp-category");
  const emailInput = document.getElementById("opp-contact-email");
  const phoneInput = document.getElementById("opp-contact-phone");
  const locInput = document.getElementById("opp-location");
  const deadlineInput = document.getElementById("opp-deadline");

  const selectedHubId = catSelect ? catSelect.value : "teaching-centers";
  const selectedHubObj = CATEGORY_HUBS.find(h => h.id === selectedHubId);
  const categoryName = selectedHubObj ? selectedHubObj.category : "COMMUNITY";
  const hubTitle = selectedHubObj ? selectedHubObj.title : "Community Hub";

  const newOpp = {
    id: `opp-${Date.now()}`,
    hubId: selectedHubId,
    title: titleInput ? titleInput.value.trim() : "Volunteer Role",
    category: categoryName,
    hubTitle: hubTitle,
    email: emailInput ? emailInput.value.trim() : "contact@ngo.org",
    phone: phoneInput ? phoneInput.value.trim() : "+91 80 0000 0000",
    location: locInput ? locInput.value.trim() : "Bengaluru",
    deadline: deadlineInput && deadlineInput.value ? deadlineInput.value : "Ongoing",
    orgName: currentUser && currentUser.name ? currentUser.name : "Partner Organization",
    createdAt: new Date().toISOString()
  };

  orgCreatedOpportunities.unshift(newOpp);
  saveOrgData();

  renderOrgOpportunities();
  updateOrgMetrics();
  closeCreateModal();
  showToast(`Opportunity posted under ${hubTitle}!`);

  if (event.target) event.target.reset();
}

// ==========================================
// 3. REMOVE / DELETE OPPORTUNITY BY DEADLINE
// ==========================================
function removeOpportunity(oppId) {
  if (!confirm("Are you sure you want to permanently remove this opportunity?")) return;

  // 1. Remove from organization tracking list
  const targetItem = orgCreatedOpportunities.find(o => o.id === oppId);
  orgCreatedOpportunities = orgCreatedOpportunities.filter(o => o.id !== oppId);

  // 2. Remove from inner category hub
  if (targetItem && targetItem.categoryHubId) {
    const hub = CATEGORY_HUBS.find(c => c.id === targetItem.categoryHubId);
    if (hub && hub.ngos) {
      hub.ngos = hub.ngos.filter(n => n.id !== oppId);
    }
  } else {
    // Fallback: search all hubs
    CATEGORY_HUBS.forEach(hub => {
      if (hub.ngos) {
        hub.ngos = hub.ngos.filter(n => n.id !== oppId);
      }
    });
  }

  saveOrgData();
  renderOrgOpportunities();
  updateOrgMetrics();
  showToast("Opportunity permanently removed.");
}

// ==========================================
// 4. RENDER ORGANIZATION DASHBOARD & METRICS
// ==========================================
function renderOrgOpportunities() {
  const tbody = document.getElementById("org-opportunities-rows");
  if (!tbody) return;

  if (orgCreatedOpportunities.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: var(--text-secondary); padding: 1.5rem;">
          No active opportunities created yet. Click "New Opening" above to create one.
        </td>
      </tr>
    `;
    return;
  }

  const todayStr = new Date().toISOString().split("T")[0];

  tbody.innerHTML = orgCreatedOpportunities.map(opp => {
    const isExpired = opp.deadline && opp.deadline < todayStr;
    const statusClass = isExpired ? "status-pill expired" : "status-pill active";
    const statusText = isExpired ? "Deadline Passed" : "Active";

    return `
      <tr>
        <td><strong>${opp.title}</strong></td>
        <td>${opp.category}</td>
        <td>${opp.deadline || "No deadline"}</td>
        <td><span class="${statusClass}">${statusText}</span></td>
        <td>
          <button class="action-cell-btn danger" onclick="removeOpportunity('${opp.id}')">
            Remove Opening
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function renderApplicants() {
  const tbody = document.getElementById("applicant-rows");
  if (!tbody) return;

  const todayStr = new Date().toISOString().split("T")[0];

  // Exclude all completed/certified items and expired/deleted opportunities
  const activeApplications = (applicants || []).filter(app => {
    // 1. Completely remove completed entries
    if (app.status === "Completed & Certified") return false;

    // 2. Check if parent opportunity was deleted or expired
    if (app.oppId) {
      const parentOpp = orgCreatedOpportunities.find(o => o.id === app.oppId);
      if (!parentOpp) return false;
      if (parentOpp.deadline && parentOpp.deadline < todayStr) return false;
    }

    return true;
  });

  if (activeApplications.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: var(--text-secondary); padding: 1.5rem;">
          No active volunteer applications pending.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = activeApplications.map(app => `
    <tr>
      <td><strong>${app.name}</strong></td>
      <td>${app.role}</td>
      <td><span class="score-badge">${app.score || 95}%</span></td>
      <td><span class="pill highlight">${app.status || "Submitted"}</span></td>
      <td>
        <button class="action-cell-btn primary" onclick="verifyApplicant(${app.id})">
          Approve & Log Hours
        </button>
      </td>
    </tr>
  `).join("");
}

function verifyApplicant(id) {
  const applicant = applicants.find(a => a.id === id);
  if (!applicant) return;

  // 1. Credit the hours to current volunteer's profile if logged in
  if (currentUser && currentUser.type === "student") {
    currentUser.completedWorks = currentUser.completedWorks || [];
    currentUser.completedWorks.push({
      id: Date.now(),
      role: applicant.role,
      orgName: applicant.orgName || "Partner Non-Profit",
      hours: applicant.hours || 4,
      date: new Date().toLocaleDateString()
    });
    localStorage.setItem("kindred_session", JSON.stringify(currentUser));
  }

  // 2. Permanently remove this application from the list so it vanishes forever
  applicants = applicants.filter(a => a.id !== id);
  saveOrgData();

  // 3. Re-render UI and update metrics
  renderApplicants();
  updateOrgMetrics();
  updateUserMetricsDisplay(true);

  showToast(`Hours logged! Application archived.`);
}

function updateOrgMetrics() {
  const openingsEl = document.getElementById("org-metric-openings");
  const applicantsEl = document.getElementById("org-metric-applicants");
  const hoursEl = document.getElementById("org-metric-hours");

  const activeCount = orgCreatedOpportunities.length;
  const applicantCount = applicants.length;
  const verifiedHours = applicants
    .filter(a => a.status && a.status.includes("Certified"))
    .reduce((sum, a) => sum + (a.hours || 4), 0);

  if (openingsEl) openingsEl.textContent = activeCount;
  if (applicantsEl) applicantsEl.textContent = applicantCount;
  if (hoursEl) hoursEl.textContent = `${verifiedHours} hrs`;
}

// ==========================================
// 5. INITIALIZE ON LOAD
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  renderOrgOpportunities();
  renderApplicants();
  updateOrgMetrics();
  initImagePicker();
  switchMainPortal("individual");
  updateAuthUI();
  refreshIcons();
});
/**
 * Smoothly animates a numeric element from its current value to targetValue
 */
function animateValue(elementId, startVal, endVal, duration = 800, suffix = "") {
  const el = document.getElementById(elementId);
  if (!el) return;

  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease-out curve for natural deceleration
    const easeOutProgress = 1 - Math.pow(1 - progress, 3);
    const currentVal = Math.floor(startVal + (endVal - startVal) * easeOutProgress);

    el.textContent = `${currentVal}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = `${endVal}${suffix}`;
    }
  }

  requestAnimationFrame(update);
}
function updateUserMetricsDisplay(animate = false) {
  const guestHoursEl = document.getElementById("stat-guest-hours");
  const guestNgosEl = document.getElementById("stat-guest-ngos");
  const guestMatchEl = document.getElementById("stat-guest-match");
  const heroHoursEl = document.getElementById("hero-impact-hours");
  const heroMatchEl = document.getElementById("hero-avg-match");

  // If no user is logged in, keep everything at zero
  if (!currentUser) {
    if (guestHoursEl) guestHoursEl.textContent = "0";
    if (guestNgosEl) guestNgosEl.textContent = "0";
    if (guestMatchEl) guestMatchEl.textContent = "0%";
    if (heroHoursEl) heroHoursEl.textContent = "0 hrs";
    if (heroMatchEl) heroMatchEl.textContent = "0%";
    return;
  }

  // 1. Gather all applications registered by the logged-in user
  const userApplications = (applicants || []).filter(
    (app) => app.email === currentUser.email
  );

  // 2. Derive dynamic totals
  // Calculate distinct partner organizations worked with / applied to
  const uniqueOrgs = new Set(userApplications.map((a) => a.orgName || a.ngoName)).size;

  // Calculate registered hours (default to 4 hrs per active registered role)
  const totalRegisteredHours = userApplications.reduce(
    (sum, app) => sum + (Number(app.hours) || 4),
    0
  );

  // Calculate dynamic average match score
  const avgMatchScore = userApplications.length > 0
    ? Math.round(userApplications.reduce((sum, a) => sum + (Number(a.score) || 94), 0) / userApplications.length)
    : 0;

  if (animate) {
    // Read previous values to animate from
    const prevHours = parseInt(guestHoursEl ? guestHoursEl.textContent : "0") || 0;
    const prevNgos = parseInt(guestNgosEl ? guestNgosEl.textContent : "0") || 0;
    const prevMatch = parseInt(guestMatchEl ? guestMatchEl.textContent : "0") || 0;

    animateValue("stat-guest-hours", prevHours, totalRegisteredHours, 700, "");
    animateValue("stat-guest-ngos", prevNgos, uniqueOrgs, 700, "");
    animateValue("stat-guest-match", prevMatch, avgMatchScore, 700, "%");
    animateValue("hero-impact-hours", prevHours, totalRegisteredHours, 700, " hrs");
    animateValue("hero-avg-match", prevMatch, avgMatchScore, 700, "%");
  } else {
    // Static initial paint without layout jumps
    if (guestHoursEl) guestHoursEl.textContent = `${totalRegisteredHours}`;
    if (guestNgosEl) guestNgosEl.textContent = `${uniqueOrgs}`;
    if (guestMatchEl) guestMatchEl.textContent = `${avgMatchScore}%`;
    if (heroHoursEl) heroHoursEl.textContent = `${totalRegisteredHours} hrs`;
    if (heroMatchEl) heroMatchEl.textContent = `${avgMatchScore}%`;
  }
}
function removeOpportunity(oppId) {
  if (!confirm("Remove this opening? All pending applications for it will also be archived.")) return;

  // Remove the opportunity
  orgCreatedOpportunities = orgCreatedOpportunities.filter(o => o.id !== oppId);

  // Remove associated applications so they vanish as well
  applicants = applicants.filter(a => a.oppId !== oppId);

  saveOrgData();
  renderOrgOpportunities();
  renderApplicants();
  updateOrgMetrics();
  showToast("Opportunity and related applications removed.");
}
// ==========================================
// STRICT INPUT VALIDATION SUITE
// ==========================================

// 1. Phone Number Validator (10-digit mobile or standard Bangalore landline)
function validatePhoneNumber(phone) {
  if (!phone || typeof phone !== "string") {
    return { valid: false, message: "Phone number is required." };
  }

  // Strip spaces, dashes, parentheses, and leading +91 / 91 / 0
  const clean = phone.trim().replace(/[\s\-()]/g, "");
  const normalized = clean.replace(/^(\+91|91)/, "").replace(/^0/, "");

  // Check Indian mobile standard: 10 digits starting with 6, 7, 8, or 9
  const isMobile = /^[6-9]\d{9}$/.test(normalized);

  // Check Bangalore landline: 8 digits (excluding STD 80)
  const isLandline = /^80\d{8}$/.test(clean) || /^\d{8}$/.test(normalized);

  if (!isMobile && !isLandline) {
    return {
      valid: false,
      message: "Please enter a valid 10-digit mobile number (starting with 6-9) or a valid landline."
    };
  }

  return { valid: true, sanitized: normalized };
}

// 2. Strict Email Validator
function validateEmailAddress(email) {
  if (!email || typeof email !== "string") {
    return { valid: false, message: "Email address is required." };
  }

  const clean = email.trim().toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(clean)) {
    return { valid: false, message: "Please enter a valid email address (e.g., user@domain.com)." };
  }

  return { valid: true, sanitized: clean };
}

// 3. Deadline Verification (Must be today or in the future)
function validateDeadlineDate(deadlineStr) {
  if (!deadlineStr) {
    return { valid: false, message: "Application deadline is required." };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(deadlineStr);
  selectedDate.setHours(0, 0, 0, 0);

  if (isNaN(selectedDate.getTime())) {
    return { valid: false, message: "Please choose a valid deadline date." };
  }

  if (selectedDate < today) {
    return { valid: false, message: "The application deadline cannot be a past date." };
  }

  return { valid: true };
}
// Automatically set the minimum date for the deadline input to today
const deadlineInput = document.getElementById("opp-deadline");
if (deadlineInput) {
  deadlineInput.min = new Date().toISOString().split("T")[0];
}