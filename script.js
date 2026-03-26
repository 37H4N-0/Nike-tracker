// MASTER RELEASE ARCHIVE 2026
// Add new shoes here; the app handles the "Daily Update" logic automatically.
const shoeDatabase = [
  {
    id: "kobe-5-lower-merion",
    name: "Kobe 5 Protro 'Lower Merion'",
    releaseDate: "March 23, 2026 10:00:00",
    price: "$200",
    img: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e4e04410-d9d1-4475-bed0-6e4a2c918e6c/kobe-5-protro-basketball-shoe-9J0v9T.png",
    tech: "Zoom Air Turbo / Flywire / Carbon Fiber",
    desc: "A tribute to the Mamba's high school roots. Features a metallic silver and team red palette."
  },
  {
    id: "kd-6-pbj",
    name: "KD 6 'Peanut Butter & Jelly'",
    releaseDate: "March 20, 2026 10:00:00",
    price: "$145",
    img: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/60f47c3f-c1f3-4d22-b258-30e7c6b98616/kd17-ep-basketball-shoes-v4V9L6.png",
    tech: "Visible Max Air / Nike Zoom",
    desc: "A fan-favorite colorway returns. Laser orange and raspberry red detailing throughout."
  },
  {
    id: "aj3-jade",
    name: "Air Jordan 3 'Jade Aura'",
    releaseDate: "March 28, 2026 10:00:00",
    price: "$215",
    img: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/799403a5-1153-433e-b148-360e2ce1c22f/air-jordan-14-retro-shoes-8lZ06H.png",
    tech: "Air-Sole / Premium Tumbled Leather",
    desc: "A fresh spring look for the AJ3, featuring Sail and Jade Aura accents."
  },
  {
    id: "lebron-21-fresh",
    name: "LeBron 21 'Freshwater'",
    releaseDate: "March 15, 2026 10:00:00", // Past Date
    price: "$210",
    img: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/6e088732-2615-4604-807d-531063df4d8a/lebron-xxi-freshwater-basketball-shoes-1V9G5L.png",
    tech: "Zoom Air / Cushlon 2.0",
    desc: "Inspired by the oyster shell's protection, built for explosive court power."
  }
];

function updateGallery() {
  const futureGrid = document.getElementById('future-grid');
  const recentGrid = document.getElementById('recent-grid');
  
  // Clear grids before re-rendering
  futureGrid.innerHTML = '';
  recentGrid.innerHTML = '';

  const currentTime = new Date().getTime();

  shoeDatabase.forEach((shoe) => {
    const releaseTime = new Date(shoe.releaseDate).getTime();
    const isFuture = releaseTime > currentTime;

    const card = document.createElement('div');
    card.className = 'shoe-card';
    card.onclick = () => openShoeModal(shoe);

    // Dynamic Tag Logic: Shows Countdown if Future, "Released" if Past
    const labelHtml = isFuture 
      ? `<div id="clock-${shoe.id}" class="timer-box">CALCULATING...</div>` 
      : `<div class="status-label">RELEASED // IN STOCK</div>`;

    card.innerHTML = `
      <div class="img-box"><img src="${shoe.img}"></div>
      ${labelHtml}
      <div class="shoe-name">${shoe.name}</div>
      <div class="shoe-price">${shoe.price}</div>
    `;

    if (isFuture) {
      futureGrid.appendChild(card);
      runLiveClock(shoe.releaseDate, `clock-${shoe.id}`);
    } else {
      recentGrid.appendChild(card);
    }
  });
}

function runLiveClock(targetDate, elementId) {
  const target = new Date(targetDate).getTime();
  
  const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = target - now;

    if (distance < 0) {
      clearInterval(timerInterval);
      updateGallery(); // Refresh the page layout once a shoe drops
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    const el = document.getElementById(elementId);
    if (el) el.innerText = `${d}D:${h}H:${m}M:${s}S`;
  }, 1000);
}

// Initial Run
updateGallery();
