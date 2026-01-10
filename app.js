// =====================================================
// SOLO BIKE WEEKEND — CINEMATIC ENGINE
// =====================================================

// ---------------- DOM ELEMENTS ----------------
const themeToggle = document.getElementById("themeToggle");
const menuBtn = document.getElementById("menuBtn");
const closeDrawer = document.getElementById("closeDrawer");
const drawer = document.getElementById("drawer");
const backdrop = document.getElementById("drawerBackdrop");
const backToTop = document.getElementById("backToTop");
const toast = document.getElementById("toast");

// ---------------- TOAST NOTIFICATION ----------------
function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
}

// ---------------- THEME TOGGLE ----------------
function initTheme() {
    if (localStorage.getItem("bikeTheme") === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
        themeToggle.setAttribute("aria-label", "Switch to light mode");
    } else {
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
    }
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("bikeTheme", isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    showToast(isDark ? "🌙 Night Mode" : "☀️ Day Mode");
});

// ---------------- MOBILE DRAWER ----------------
menuBtn.addEventListener("click", () => {
    drawer.classList.add("open");
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
});

function closeDrawerFn() {
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
}

closeDrawer.addEventListener("click", closeDrawerFn);
backdrop.addEventListener("click", closeDrawerFn);

// Close drawer when clicking a link
document.querySelectorAll(".drawer-link").forEach(link => {
    link.addEventListener("click", closeDrawerFn);
});

// ---------------- BACK TO TOP BUTTON ----------------
window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ---------------- LEAN ANGLE SIMULATOR ----------------
const leanSlider = document.getElementById("leanSlider");
const bikeContainer = document.getElementById("bikeContainer");
const angleValue = document.getElementById("angleValue");

if (leanSlider && bikeContainer && angleValue) {
    leanSlider.addEventListener("input", (e) => {
        const angle = parseInt(e.target.value);
        // Rotate the bike container based on slider value
        bikeContainer.style.transform = `translateX(-50%) rotate(${angle}deg)`;
        // Update the angle display
        angleValue.textContent = Math.abs(angle);
        
        // Add visual feedback based on lean angle
        if (Math.abs(angle) > 30) {
            angleValue.style.color = "#ff6b6b";
        } else if (Math.abs(angle) > 15) {
            angleValue.style.color = "#ffd93d";
        } else {
            angleValue.style.color = "white";
        }
    });
}

// ---------------- RIDER EXCUSES GENERATOR ----------------
const excuseText = document.getElementById("excuseText");
const generateExcuseBtn = document.getElementById("generateExcuse");

const excuses = [
    "I took the scenic route.",
    "Stopped for chai at every stall.",
    "The mountains distracted me with their beauty.",
    "Testing my fuel efficiency... extensively.",
    "The sunset was too unreal to rush past.",
    "My GPS took me on an adventure.",
    "Had to stop for photos every 5 minutes.",
    "The wind was singing to me.",
    "My bike needed to cool down... multiple times.",
    "Lost in the mist and loving it.",
    "The road conditions required caution.",
    "Wildlife crossing! Had to wait.",
    "Got philosophical at every viewpoint.",
    "The clouds were putting on a show."
];

if (generateExcuseBtn && excuseText) {
    generateExcuseBtn.addEventListener("click", () => {
        const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
        excuseText.textContent = `"${randomExcuse}"`;
        
        // Add animation effect
        excuseText.style.opacity = "0";
        excuseText.style.transform = "translateY(10px)";
        setTimeout(() => {
            excuseText.style.transition = "all 0.3s ease";
            excuseText.style.opacity = "1";
            excuseText.style.transform = "translateY(0)";
        }, 50);
        
        showToast("✨ New excuse generated!");
    });
}

// ---------------- GEAR CHECK CHALLENGE ----------------
const gearGrid = document.getElementById("gearGrid");
const timerValue = document.getElementById("timerValue");
const startGearBtn = document.getElementById("startGearChallenge");
const resetGearBtn = document.getElementById("resetGearChallenge");

const gearItems = [
    { icon: "🪖", name: "Helmet" },
    { icon: "🧥", name: "Jacket" },
    { icon: "🧤", name: "Gloves" },
    { icon: "👖", name: "Riding Pants" },
    { icon: "🥾", name: "Boots" },
    { icon: "🔑", name: "Keys" },
    { icon: "📱", name: "Phone" },
    { icon: "💳", name: "Wallet" }
];

let gearTimer = null;
let startTime = 0;
let gearChecked = 0;

function renderGear() {
    if (!gearGrid) return;
    
    gearGrid.innerHTML = "";
    gearItems.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "gear-item";
        div.innerHTML = `<span style="font-size: 2rem">${item.icon}</span><span style="font-size: 0.6rem; display: block; margin-top: 0.3rem">${item.name}</span>`;
        div.dataset.index = index;
        
        div.addEventListener("click", () => {
            if (!div.classList.contains("checked") && gearTimer) {
                div.classList.add("checked");
                gearChecked++;
                div.style.animation = "none";
                setTimeout(() => {
                    div.style.animation = "gearPop 0.3s ease";
                }, 10);
                
                if (gearChecked === gearItems.length) {
                    finishGear();
                }
            }
        });
        
        gearGrid.appendChild(div);
    });
}

function finishGear() {
    clearInterval(gearTimer);
    const finalTime = ((Date.now() - startTime) / 1000).toFixed(2);
    showToast(`🎉 Gear check: ${finalTime}s!`);
    
    // Add celebration effect
    document.querySelectorAll(".gear-item.checked").forEach(item => {
        item.style.background = "#6bcb77";
        item.style.borderColor = "#6bcb77";
    });
}

// Add gear pop animation
const style = document.createElement("style");
style.textContent = `
    @keyframes gearPop {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

if (startGearBtn) {
    startGearBtn.addEventListener("click", () => {
        gearChecked = 0;
        renderGear();
        startTime = Date.now();
        
        // Update button state
        startGearBtn.textContent = "Checking...";
        startGearBtn.disabled = true;
        
        gearTimer = setInterval(() => {
            if (timerValue) {
                timerValue.textContent = ((Date.now() - startTime) / 1000).toFixed(2);
            }
        }, 10);
        
        setTimeout(() => {
            startGearBtn.disabled = false;
            startGearBtn.textContent = "Start";
        }, 100);
        
        showToast("⏱️ Gear check started!");
    });
}

if (resetGearBtn) {
    resetGearBtn.addEventListener("click", () => {
        clearInterval(gearTimer);
        if (timerValue) timerValue.textContent = "0.00";
        gearChecked = 0;
        renderGear();
        showToast("🔄 Gear check reset");
    });
}

// Initialize gear grid
renderGear();

// ---------------- SPEEDOMETER ----------------
const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");
const speedNeedle = document.getElementById("speedNeedle");
const speedWarning = document.getElementById("speedWarning");
const closeWarningBtn = document.getElementById("closeSpeedWarning");

if (speedSlider && speedValue && speedNeedle) {
    speedSlider.addEventListener("input", (e) => {
        const speed = parseInt(e.target.value);
        speedValue.textContent = speed;
        
        // Calculate needle rotation (-90deg to 180deg for 0-200 km/h)
        const rotation = -90 + (speed / 200) * 270;
        speedNeedle.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
        
        // Change color based on speed
        if (speed > 150) {
            speedNeedle.style.background = "#ff4757";
        } else if (speed > 100) {
            speedNeedle.style.background = "#ffa502";
        } else if (speed > 50) {
            speedNeedle.style.background = "#2ed573";
        } else {
            speedNeedle.style.background = "#ff6b6b";
        }
        
        // Show warning modal at high speed
        if (speed > 120) {
            speedWarning.classList.add("open");
        }
    });
}

if (closeWarningBtn) {
    closeWarningBtn.addEventListener("click", () => {
        speedWarning.classList.remove("open");
        // Reduce speed when warning is acknowledged
        if (speedSlider) {
            speedSlider.value = Math.max(0, parseInt(speedSlider.value) - 20);
            speedSlider.dispatchEvent(new Event("input"));
        }
    });
}

// ---------------- SOUND VISUALIZER ----------------
const visualizer = document.getElementById("visualizer");
const currentSound = document.getElementById("currentSound");
const soundBtns = document.querySelectorAll(".sound-btn");

const sounds = {
    "Idle": { color: "#6bcb77", height: "30px" },
    "Rev": { color: "#ffd93d", height: "60px" },
    "Accelerate": { color: "#ff6b6b", height: "70px" },
    "Brake": { color: "#4d96ff", height: "25px" }
};

if (soundBtns.length > 0) {
    soundBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const sound = btn.dataset.sound;
            
            // Update active state
            soundBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            // Update current sound display
            if (currentSound) {
                currentSound.textContent = sound;
            }
            
            // Start visualizer animation
            if (visualizer) {
                visualizer.classList.add("playing");
                
                // Update bar colors and heights based on sound
                const soundConfig = sounds[sound] || sounds["Idle"];
                const bars = visualizer.querySelectorAll(".viz-bar");
                bars.forEach((bar, index) => {
                    const delay = index * 0.1;
                    const height = parseInt(soundConfig.height) + (index * 5);
                    bar.style.background = soundConfig.color;
                    bar.style.setProperty("--bar-height", `${height}px`);
                });
                
                // Stop animation after 1.5 seconds
                setTimeout(() => {
                    visualizer.classList.remove("playing");
                }, 1500);
            }
            
            showToast(`🔊 Playing: ${sound}`);
        });
    });
}

// ---------------- CORNER RATING WHEEL ----------------
const spinWheelBtn = document.getElementById("spinWheel");
const ratingWheel = document.getElementById("ratingWheel");
const resultRating = document.getElementById("resultRating");
const wheelPointer = document.querySelector(".wheel-pointer");

let isSpinning = false;

if (spinWheelBtn && ratingWheel && resultRating) {
    spinWheelBtn.addEventListener("click", () => {
        if (isSpinning) return;
        
        isSpinning = true;
        spinWheelBtn.disabled = true;
        spinWheelBtn.textContent = "Spinning...";
        
        // Generate random rating (1-10)
        const rating = Math.floor(Math.random() * 10) + 1;
        
        // Calculate rotation (multiple full spins + position for rating)
        // Each segment is 36 degrees (360 / 10)
        // We need to account for the pointer position
        const baseSpins = 360 * 5; // 5 full rotations
        const ratingPosition = (10 - rating) * 36; // Calculate position for rating
        const totalRotation = baseSpins + ratingPosition;
        
        // Apply rotation
        ratingWheel.style.transform = `rotate(${totalRotation}deg)`;
        
        // Show result after animation
        setTimeout(() => {
            resultRating.textContent = rating;
            
            // Add color based on rating
            if (rating >= 8) {
                resultRating.style.color = "#6bcb77";
                showToast("🌟 Amazing corner!");
            } else if (rating >= 5) {
                resultRating.style.color = "#ffd93d";
                showToast("👍 Good corner!");
            } else {
                resultRating.style.color = "#ff6b6b";
                showToast("😅 Better luck next time!");
            }
            
            isSpinning = false;
            spinWheelBtn.disabled = false;
            spinWheelBtn.textContent = "Spin";
        }, 3000);
    });
}

// ---------------- SMOOTH SCROLLING FOR NAV LINKS ----------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            const navHeight = document.querySelector("nav").offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        }
    });
});

// ---------------- VISITOR WELCOME MESSAGE ----------------
function initWelcome() {
    const visits = parseInt(localStorage.getItem("bikeVisits") || "0") + 1;
    localStorage.setItem("bikeVisits", visits);
    
    setTimeout(() => {
        if (visits === 1) {
            showToast("🏍️ Welcome, rider! Enjoy your journey.");
        } else {
            showToast(`👋 Welcome back! Visit #${visits}`);
        }
    }, 1000);
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initWelcome();
    
    // Add loaded class for any entrance animations
    document.body.classList.add("loaded");
});

// ---------------- KEYBOARD SHORTCUTS ----------------
document.addEventListener("keydown", (e) => {
    // ESC to close modals/drawer
    if (e.key === "Escape") {
        closeDrawerFn();
        speedWarning.classList.remove("open");
    }
    
    // T for theme toggle
    if (e.key === "t" || e.key === "T") {
        themeToggle.click();
    }
    
    // M for mobile menu
    if (e.key === "m" || e.key === "M") {
        if (!drawer.classList.contains("open")) {
            menuBtn.click();
        } else {
            closeDrawerFn();
        }
    }
});

// ---------------- CONSOLE GREETING ----------------
console.log("%c🏍️ Solo Bike Weekend", "font-size: 24px; font-weight: bold; color: #9F7AEA;");
console.log("%cRide slow. Breathe deep.", "font-size: 14px; font-style: italic; color: #718096;");
console.log("%cPress 'T' for theme toggle, 'M' for menu", "font-size: 12px; color: #a0aec0;");