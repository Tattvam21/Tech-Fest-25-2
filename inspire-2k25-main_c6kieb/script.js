document.addEventListener("DOMContentLoaded", function () {
  /*** 🌟 STAR ANIMATION FOR EVENTS SECTION WITH TRAILS 🌟 ***/
  const STAR_COLOR = "#fff";
  let STAR_SIZE = 3;
  const STAR_MIN_SCALE = 0.2;
  const OVERFLOW_THRESHOLD = 50;
  let STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;

  const canvas = document.querySelector("#events canvas");
  const context = canvas.getContext("2d");

  let scale = window.devicePixelRatio || 1;
  let width, height;

  let stars = [];

  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;

  let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };
  let touchInput = false;

  // Function to adjust star size based on screen density
  function adjustStarSize() {
    if (window.innerWidth <= 768) {
      // Adjust STAR_SIZE and STAR_COUNT for smaller screens
      STAR_SIZE = 2; // Smaller star size for mobile
      STAR_COUNT = (window.innerWidth + window.innerHeight) / 7; // Reduce star count
    } else {
      STAR_SIZE = 3; // Default star size for larger screens
      STAR_COUNT = (window.innerWidth + window.innerHeight) / 8; // Default star count
    }
  }

  generate();
  resize();
  step();

  window.addEventListener("resize", () => {
    adjustStarSize();
    resize();
  });
  window.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("touchmove", onTouchMove);
  canvas.addEventListener("touchend", onMouseLeave);
  document.addEventListener("mouseleave", onMouseLeave);

  function generate() {
    stars = []; // Clear existing stars
    adjustStarSize(); // Adjust star size and count
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
      });
    }
  }

  function placeStar(star) {
    star.x = Math.random() * width;
    star.y = Math.random() * height;
  }

  function recycleStar(star) {
    let direction = "z";
    let vx = Math.abs(velocity.x);
    let vy = Math.abs(velocity.y);

    if (vx > 1 || vy > 1) {
      let axis = vx > vy ? (Math.random() < vx / (vx + vy) ? "h" : "v") : (Math.random() < vy / (vx + vy) ? "v" : "h");

      if (axis === "h") {
        direction = velocity.x > 0 ? "l" : "r";
      } else {
        direction = velocity.y > 0 ? "t" : "b";
      }
    }

    star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

    if (direction === "z") {
      star.z = 0.1;
      star.x = Math.random() * width;
      star.y = Math.random() * height;
    } else if (direction === "l") {
      star.x = -OVERFLOW_THRESHOLD;
      star.y = height * Math.random();
    } else if (direction === "r") {
      star.x = width + OVERFLOW_THRESHOLD;
      star.y = height * Math.random();
    } else if (direction === "t") {
      star.x = width * Math.random();
      star.y = -OVERFLOW_THRESHOLD;
    } else if (direction === "b") {
      star.x = width * Math.random();
      star.y = height + OVERFLOW_THRESHOLD;
    }
  }

  function resize() {
    scale = window.devicePixelRatio || 1;
    width = window.innerWidth * scale;
    height = window.innerHeight * scale;

    canvas.width = width;
    canvas.height = height;

    stars.forEach(placeStar);
  }

  function step() {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(0, 0, 0, 0.2)";
    context.fillRect(0, 0, width, height);
    update();
    render();
    requestAnimationFrame(step);
  }

  function update() {
    velocity.tx *= 0.96;
    velocity.ty *= 0.96;
    velocity.x += (velocity.tx - velocity.x) * 0.3;
    velocity.y += (velocity.ty - velocity.y) * 0.3;

    stars.forEach((star) => {
      star.x += velocity.x * star.z * 1.5;
      star.y += velocity.y * star.z * 1.5;
      star.x += (star.x - width / 2) * velocity.z * star.z;
      star.y += (star.y - height / 2) * velocity.z * star.z;
      star.z += velocity.z;
      if (star.x < -OVERFLOW_THRESHOLD || star.x > width + OVERFLOW_THRESHOLD || star.y < -OVERFLOW_THRESHOLD || star.y > height + OVERFLOW_THRESHOLD) {
        recycleStar(star);
      }
    });
  }

  function render() {
    stars.forEach((star) => {
      context.beginPath();
      context.lineCap = "round";
      context.lineWidth = STAR_SIZE * star.z * scale;
      context.globalAlpha = 0.5 + 0.5 * Math.random();
      context.strokeStyle = STAR_COLOR;
      context.moveTo(star.x, star.y);
      context.lineTo(star.x - velocity.x * 2, star.y - velocity.y * 2);
      context.stroke();
    });
  }

  function movePointer(x, y) {
    if (typeof pointerX === "number" && typeof pointerY === "number") {
      let ox = x - pointerX,
        oy = y - pointerY;

      velocity.tx += (ox / 5) * (touchInput ? 1 : -1);
      velocity.ty += (oy / 5) * (touchInput ? 1 : -1);
    }
    pointerX = x;
    pointerY = y;
  }

  function onMouseMove(event) {
    touchInput = false;
    movePointer(event.clientX, event.clientY);
  }

  function onTouchMove(event) {
    touchInput = true;
    movePointer(event.touches[0].clientX, event.touches[0].clientY);
    event.preventDefault();
  }

  function onMouseLeave() {
    pointerX = null;
    pointerY = null;
  }

  console.log("Particle animation with trails loaded successfully!");
});



/*** 🎬 HERO SECTION ANIMATIONS ***/
const firstVideo = document.getElementById("first-video");
const heroTitle = document.querySelector(".hero-title");
const heroSlogan = document.querySelector(".hero-slogan");
const registerBtn = document.querySelector(".btn");

document.addEventListener("DOMContentLoaded", () => {
  if (heroTitle) {
    heroTitle.style.opacity = "1";
    heroTitle.classList.add("fadeInUp");
  }

  if (heroSlogan) {
    heroSlogan.style.opacity = "1";
    heroSlogan.classList.add("fadeInUp");
  }

  if (registerBtn) {
    registerBtn.style.opacity = "1";
    registerBtn.classList.add("fadeInUp");
  }
});

/*** 🔀 EVENT NAVIGATION HANDLING ***/
function toggleEvents() {
  const techEvents = document.getElementById("tech-events");
  const nonTechEvents = document.getElementById("non-tech-events");
  const btn = document.getElementById("toggle-btn");

  if (techEvents.style.display !== "none") {
    techEvents.style.display = "none";
    nonTechEvents.style.display = "grid";
    btn.textContent = "Show Tech Events";
  } else {
    techEvents.style.display = "grid";
    nonTechEvents.style.display = "none";
    btn.textContent = "Show Non-Tech Events";
  }
}

function showTechNonTech(department) {
  hideAllEventGrids();
  document.getElementById("department-boxes").style.display = "none";
  document.getElementById("tech-non-tech-events").style.display = "grid";

  // Hide all department-specific event cards initially
  const eventCards = document.querySelectorAll("#tech-non-tech-events .event-card");
  eventCards.forEach((card) => {
    card.style.display = "none";
  });

  // Show only selected department events
  const selectedDepartmentCards = document.querySelectorAll(`#tech-non-tech-events .event-card[data-department="${department}"]`);
  selectedDepartmentCards.forEach((card) => {
    card.style.display = "block";
  });

  showBackButton("tech-non-tech-events");
}

function showEvents(department, type) {
  hideAllEventGrids();

  let eventGridId = "";
  if (department === "computer" && type === "tech") {
    eventGridId = "computer-tech-events";
  } else if (department === "electrical" && type === "tech") {
    eventGridId = "electrical-tech-events";
  } else if (department === "humanity" && type === "non-tech") {
    eventGridId = "humanity-non-tech-events";
  } else if (department === "civil" && type === "tech") {
    eventGridId = "civil-tech-events";
  } else if (department === "civil" && type === "non-tech") {
    eventGridId = "civil-non-tech-events";
  } else if (department === "mechanical" && type === "tech") {
    eventGridId = "mechanical-tech-events";
  } else if (department === "mechanical" && type === "non-tech") {
    eventGridId = "mechanical-non-tech-events";
  } else if (department === "pharmacy" && type === "non-tech") {
    eventGridId = "pharmacy-non-tech-events";
  } else {
    console.error("No matching event grid found for:", department, type);
    return;
  }

  const eventGrid = document.getElementById(eventGridId);
  if (eventGrid) {
    eventGrid.style.display = "grid";
    showBackButton(eventGridId);
  } else {
    console.error("Event grid with ID", eventGridId, "not found.");
  }
}

function showDepartmentBoxes() {
  hideAllEventGrids();
  document.getElementById("tech-non-tech-events").style.display = "none";
  document.getElementById("department-boxes").style.display = "grid";
  hideBackButton();
}

function showBackButton(sectionId) {
  const backButton = document.querySelector(`#${sectionId} .back-button`);
  if (backButton) {
    backButton.style.display = "inline-block";
  }
}

function hideBackButton() {
  const backButtons = document.querySelectorAll(".back-button");
  backButtons.forEach((button) => {
    button.style.display = "none";
  });
}

function hideAllEventGrids() {
  document.getElementById("tech-non-tech-events").style.display = "none";
  document.getElementById("computer-tech-events").style.display = "none";
  document.getElementById("electrical-tech-events").style.display = "none";
  document.getElementById("humanity-non-tech-events").style.display = "none";
  document.getElementById("civil-tech-events").style.display = "none";
  document.getElementById("civil-non-tech-events").style.display = "none";
  document.getElementById("mechanical-tech-events").style.display = "none";
  document.getElementById("mechanical-non-tech-events").style.display = "none";
  document.getElementById("pharmacy-non-tech-events").style.display = "none";
  document.getElementById("department-boxes").style.display = "none";
}

/*** ✅ FINAL TOUCH: ENSURE SCRIPT IS LOADED ***/
console.log("JavaScript Loaded Successfully!");
