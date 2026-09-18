/**
 * KindredMatch - Main Application Engine
 * Unified Script: Categories, Dedicated Sector Hubs, Bangalore NGOs,
 * Custom Org Photos, Anti-Gibberish Validation, and Volunteer Dashboard.
 */

// ==========================================
// 1. DATA SOURCES & PRESETS
// ==========================================
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

const CATEGORY_HUBS = [
  {
    id: "teaching-centers",
    title: "Teaching Centers",
    category: "EDUCATION",
    // Classroom / Tutoring
    image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800",
    ngos: [
      {
        name: "Samarthanam Trust for the Disabled",
        focus: "Inclusive Education & Audio Books",
        contact: "+91 80 2572 1444 | info@samarthanam.org",
        openRoles: "Assistive Audio & Math Tutor"
      },
      {
        name: "Diya Foundation",
        focus: "Special Needs Vocational Training",
        contact: "+91 80 2844 4725 | contact@diyafoundation-india.org",
        openRoles: "Special Needs Vocational Instructor"
      }
    ]
  },
  {
    id: "medical-centers",
    title: "Medical Centers",
    category: "HEALTHCARE",
    // Stethoscope / Healthcare
    image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800",
    ngos: [
      {
        name: "Karunashraya Bangalore Hospice Trust",
        focus: "Palliative Care & Patient Support",
        contact: "+91 80 4268 5666 | info@karunashraya.org",
        openRoles: "Patient Companion & Activity Facilitator"
      }
    ]
  },
  {
    id: "environmental-centers",
    title: "Environmental Centers",
    category: "ENVIRONMENT",
    // Tree Planting / Nature
    image: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800",
    ngos: [
      {
        name: "SayTrees Environmental Trust",
        focus: "Miyawaki Forests & Lake Rejuvenation",
        contact: "+91 99 7255 1251 | info@saytrees.org",
        openRoles: "Urban Forestation Coordinator"
      },
      {
        name: "Hasiru Dala",
        focus: "Circular Economy & Waste Management",
        contact: "+91 80 4114 2650 | contact@hasirudala.in",
        openRoles: "Dry Waste Collection Organizer"
      }
    ]
  },
  {
    id: "community-welfare",
    title: "Community Welfare Centres",
    category: "COMMUNITY",
    // Food Drive / Community Box
    image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800",
    ngos: [
      {
        name: "Robin Hood Army Bengaluru",
        focus: "Hunger Relief & Surplus Food Drive",
        contact: "+91 89 7192 2333 | robinhoodarmyblr@gmail.com",
        openRoles: "Evening Food Distribution Captain"
      }
    ]
  },
  {
    id: "animal-welfare",
    title: "Animal Welfare Centres",
    category: "ANIMAL WELFARE",
    // Dog Shelter
    image: "https://images.pexels.com/photos/1904105/pexels-photo-1904105.jpeg?auto=compress&cs=tinysrgb&w=800",
    ngos: [
      {
        name: "CUPA (Compassion Unlimited Plus Action)",
        focus: "Rescue, Animal Shelter & Rehabilitation",
        contact: "+91 80 2294 7307 | cupablr@gmail.com",
        openRoles: "Shelter Dog Socialization Assistant"
      }
    ]
  },
  {
    id: "disaster-relief",
    title: "Disaster Relief",
    category: "DISASTER RELIEF",
    // Emergency Supplies / First Aid
    image: "https://images.pexels.com/photos/6994982/pexels-photo-6994982.jpeg?auto=compress&cs=tinysrgb&w=800",
    ngos: [
      {
        name: "Goonj Bengaluru Disaster Cell",
        focus: "Material Aid & Disaster Rehabilitation",
        contact: "+91 80 2572 1444 | mail@goonj.org",
        openRoles: "Supply Chain & Kit Assembly Lead"
      }
    ]
  },
  {
    id: "elderly-care",
    title: "Elderly Care Centres",
    category: "HEALTHCARE",
    // Senior Care / Hands
    image: "https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg?auto=compress&cs=tinysrgb&w=800",
    ngos: [
      {
        name: "Vidyaranya",
        focus: "Senior Citizen Shelter & Healthcare",
        contact: "+91 98 4402 1276 | info@vidyaranya.org",
        openRoles: "Elderly Activity & Support Volunteer"
      }
    ]
  },
  {
    id: "women-child",
    title: "Women and Child Centres",
    category: "COMMUNITY",
    // Mother & Child / Women Workshop
    image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=800",
    ngos: [
      {
        name: "Oasis India Bengaluru",
        focus: "Women Empowerment & Child Protection",
        contact: "+91 80 4124 5588 | info@oasisindia.org",
        openRoles: "Life Skills & Literacy Tutor"
      }
    ]
  },
  {
    id: "rural-development",
    title: "Rural Development Centres",
    category: "COMMUNITY",
    // Agriculture / Village Outreach
    image: "https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg?auto=compress&cs=tinysrgb&w=800",
    ngos: [
      {
        name: "Bangalore Rural Educational Development Society",
        focus: "Youth Employment & Village Outreach",
        contact: "+91 80 2846 5500 | breds@vsnl.com",
        openRoles: "Rural Field Coordinator"
      }
    ]
  },
  {
    id: "disability-support",
    title: "Disability Support Centres",
    category: "HEALTHCARE",
    // Accessibility / Wheelchair Support
    image: "https://images.pexels.com/photos/4064835/pexels-photo-4064835.jpeg?auto=compress&cs=tinysrgb&w=800",
    ngos: [
      {
        name: "Spastics Society of Karnataka",
        focus: "Neuro-Muscular & Developmental Rehabilitation",
        contact: "+91 80 4074 5900 | ssk@spasticssocietykarnataka.org",
        openRoles: "Classroom Assistant for Special Needs"
      }
    ]
  },
  {
    id: "fundraisers",
    title: "Fundraisers Centres",
    category: "COMMUNITY",
    // Charity Donation / Coin Box
    image: "https://images.pexels.com/photos/6995244/pexels-photo-6995244.jpeg?auto=compress&cs=tinysrgb&w=800",
    ngos: [
      {
        name: "Dream a Dream Initiatives",
        focus: "Youth Life Skills & Fund Campaigns",
        contact: "+91 80 4095 1385 | info@dreamadream.org",
        openRoles: "Digital Campaign Volunteer"
      }
    ]
  }
];

let opportunities = [...CATEGORY_HUBS];

let applicants = [
  { id: 101, name: "Jordan Lee", role: "Teaching Assistant", score: 96, status: "Submitted", hours: 6 },
  { id: 102, name: "Maya Patel", role: "Plantation Coordinator", score: 92, status: "Under Review", hours: 4 }
];

let currentUser = null;
let selectedPresetImage = VOLUNTEER_IMAGE_OPTIONS[0];
let imageMode = "preset";
let customUploadedDataUrl = "";

// ==========================================
// 2. LIFECYCLE & ICON REFRESH
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  renderOpportunities(opportunities);
  renderApplicants();
  initImagePicker();
  switchMainPortal("individual");
  updateAuthUI();
  refreshIcons();

  document.addEventListener("click", (e) => {
    const dropdown = document.getElementById("profile-dropdown-menu");
    const container = document.getElementById("user-profile-badge");
    if (dropdown && container && !container.contains(e.target)) {
      dropdown.classList.add("hidden");
    }
  });
});

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

function handleVolunteerAuth(e, mode) {
  if (e) e.preventDefault();

  if (mode === "signup") {
    const nameInput = document.getElementById("signup-name");
    const collegeInput = document.getElementById("signup-college");
    const emailInput = document.getElementById("signup-email");

    const nameVal = nameInput ? nameInput.value : "";
    const check = validateRealName(nameVal);

    if (!check.valid) {
      alert(check.message);
      if (nameInput) nameInput.focus();
      return;
    }

    currentUser = {
      type: "student",
      name: nameVal.trim(),
      college: collegeInput ? collegeInput.value.trim() : "College",
      email: emailInput ? emailInput.value.trim() : "user@domain.edu",
      phone: "",
      emailVerified: false,
      phoneVerified: false,
      completedWorks: []
    };
  } else {
    const loginEmail = document.getElementById("login-email");
    currentUser = {
      type: "student",
      name: "Harshith Fernandes",
      college: "Bengaluru Engineering College",
      email: loginEmail && loginEmail.value ? loginEmail.value : "harshith@domain.edu",
      phone: "9876543210",
      emailVerified: true,
      phoneVerified: false,
      completedWorks: []
    };
  }

  closeAuthModal();
  updateAuthUI();
  showToast(mode === "signup" ? "Account created successfully!" : `Welcome back, ${currentUser.name}!`);
  switchMainPortal("individual");
}

function handleOrgAuth(e, mode) {
  if (e) e.preventDefault();
  currentUser = { type: "org", name: "Partner Organization" };
  updateAuthUI();
  showToast(mode === "login" ? "Signed into Organization Dashboard" : "Registration received!");
  switchMainPortal("organization");
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
  
  const heroHours = document.getElementById("hero-impact-hours");
  const heroMatch = document.getElementById("hero-avg-match");
  const guestHours = document.getElementById("stat-guest-hours");
  const guestNgos = document.getElementById("stat-guest-ngos");
  const guestMatch = document.getElementById("stat-guest-match");

  if (currentUser) {
    if (authContainer) authContainer.classList.add("hidden");
    if (userProfile) userProfile.classList.remove("hidden");
    if (menuName) menuName.textContent = currentUser.name;

    // Calculate actual logged hours from user data
    const works = currentUser.completedWorks || [];
    const totalEarnedHours = works.reduce((sum, item) => sum + (item.hours || 0), 0);
    
    if (heroHours) heroHours.textContent = `${totalEarnedHours} hrs`;
    if (heroMatch) heroMatch.textContent = works.length > 0 ? "95%" : "0%";
    if (guestHours) guestHours.textContent = `${totalEarnedHours}`;
    if (guestNgos) guestNgos.textContent = `${works.length}`;
    if (guestMatch) guestMatch.textContent = works.length > 0 ? "95%" : "0%";
  } else {
    if (authContainer) authContainer.classList.remove("hidden");
    if (userProfile) userProfile.classList.add("hidden");

    // Fresh 0 values for guests / unauthenticated state
    if (heroHours) heroHours.textContent = "0 hrs";
    if (heroMatch) heroMatch.textContent = "0%";
    if (guestHours) guestHours.textContent = "0";
    if (guestNgos) guestNgos.textContent = "0";
    if (guestMatch) guestMatch.textContent = "0%";
  }
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
function renderOpportunities(items) {
  const container = document.getElementById("volunteer-grid");
  if (!container) return;

  const dataList = items && items.length > 0 ? items : CATEGORY_HUBS;

  container.innerHTML = dataList.map((item) => `
    <article class="opp-card">
      <div class="card-banner" onclick="openSectorPage('${item.id}')" style="cursor:pointer;">
        <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.onerror=null;this.src='https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800';" />
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
  // Gate details behind authentication
  if (!currentUser) {
    openAuthModal("volunteer", "login");
    showToast("Please log in or sign up to view organization details!");
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
  if (sectorDesc) sectorDesc.textContent = `Verified non-profit organizations operating in Bengaluru.`;

  if (ngoContainer) {
    ngoContainer.innerHTML = sector.ngos.map((ngo) => `
      <div class="ngo-detail-card">
        <span class="ngo-focus">${ngo.focus}</span>
        <h3>${ngo.name}</h3>
        <div class="ngo-contact-block" style="margin-top: 0.5rem;">
          <span>📞</span>
          <span>${ngo.contact}</span>
        </div>
        <div style="margin-top:auto; padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:0.8rem; font-weight:700; color:var(--primary);">Role: ${ngo.openRoles}</span>
          <button class="primary-btn btn-sm" onclick="alert('Contact:\\n\\n${ngo.name}\\n${ngo.contact}')">Reach Out</button>
        </div>
      </div>
    `).join("");
  }

  if (sectorView) sectorView.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
  refreshIcons();
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

  tbody.innerHTML = applicants.map((app) => `
    <tr>
      <td><strong>${app.name}</strong></td>
      <td>${app.role}</td>
      <td><span class="score-badge">${app.score}%</span></td>
      <td><span class="pill highlight">${app.status}</span></td>
      <td>
        <button class="action-cell-btn primary" onclick="verifyApplicant(${app.id})">
          ${app.status.includes("Certified") ? "Re-Verify" : "Approve & Log Hours"}
        </button>
      </td>
    </tr>
  `).join("");
}

function verifyApplicant(id) {
  const applicant = applicants.find((a) => a.id === id);
  if (!applicant) return;

  applicant.status = "Completed & Certified";
  renderApplicants();

  if (currentUser && currentUser.type === "student") {
    currentUser.completedWorks = currentUser.completedWorks || [];
    currentUser.completedWorks.push({
      id: Date.now(),
      role: applicant.role,
      orgName: "Partner Organization",
      hours: applicant.hours || 4,
      date: "Just Now"
    });
  }

  showToast(`Hours logged for ${applicant.name}. Dashboard updated!`);
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
  const catInput = document.getElementById("opp-category");

  let bannerImageUrl = selectedPresetImage.url;
  if (imageMode === "custom" && customUploadedDataUrl) {
    bannerImageUrl = customUploadedDataUrl;
  }

  const newHub = {
    id: `custom-${Date.now()}`,
    title: titleInput ? titleInput.value : "Volunteer Initiative",
    category: catInput ? catInput.value.toUpperCase() : "COMMUNITY",
    image: bannerImageUrl,
    ngos: [
      {
        name: currentUser && currentUser.name ? currentUser.name : "Registered NGO",
        focus: "Community Outreach Initiative",
        contact: "partner@initiative.org",
        openRoles: "Volunteer Assistant"
      }
    ]
  };

  CATEGORY_HUBS.unshift(newHub);
  renderOpportunities(CATEGORY_HUBS);
  closeCreateModal();
  showToast("Opportunity published with promotional photo!");

  customUploadedDataUrl = "";
  const previewBox = document.getElementById("custom-preview-box");
  if (previewBox) previewBox.classList.add("hidden");
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
}