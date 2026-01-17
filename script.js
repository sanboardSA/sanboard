fetch("data.json")
  .then(res => res.json())
  .then(data => {

    /* =========================
       ЧАРТЫ (Hot 10 / Global 30)
       ========================= */

    const chart = document.getElementById("chart");

    if (chart) {
      const type = chart.dataset.type;
      let items = data[type];

      items.sort((a, b) => b.sales - a.sales);

      items.forEach((item, index) => {
        const pos = index + 1;

        const card = document.createElement("div");
        card.className = "chart-card";

        card.innerHTML = `
          <div class="chart-rank">${pos}</div>

          <div class="chart-cover">
            <img src="${item.cover}" alt="${item.title}">
          </div>

          <div class="chart-info">
            <div class="chart-title">${item.title}</div>
            <div class="chart-artist">${item.artist}</div>
          </div>

          <div class="chart-stats">
            <div><b>${item.weeks}</b><span>недель</span></div>
            <div><b>${item.peak}</b><span>пик</span></div>
            <div><b>${item.weeksAt1}</b><span>нед. #1</span></div>
          </div>
        `;

        chart.appendChild(card);
      });
    }

    /* =========================
       АРТИСТЫ
       ========================= */

    const artistsList = document.getElementById("artists");

    if (artistsList) {
      let artists = data.artists;

      artists.sort((a, b) => b.listeners - a.listeners);

      artists.forEach((artist, index) => {
        const place = index + 1;

        const card = document.createElement("div");
        card.className = "artist-card";

        card.innerHTML = `
          <div class="artist-avatar">
            <img src="${artist.avatar}" alt="${artist.name}">
          </div>

          <div class="artist-info">
            <div class="artist-name">${artist.name}</div>
            <div class="artist-rank">#${place} в топе артистов</div>
            <div class="artist-listeners">${artist.listeners} слушателей / мес</div>
          </div>
        `;

        artistsList.appendChild(card);
      });
    }

  });
