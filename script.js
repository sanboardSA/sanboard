fetch("data.json")
  .then(res => {
    if (!res.ok) throw new Error("Не удалось загрузить data.json");
    return res.json();
  })
  .then(data => {
    const list = document.getElementById("chart");
    const type = list.dataset.type;

    let items = data[type];
    items.sort((a, b) => b.sales - a.sales);

    items.forEach((item, index) => {
      const pos = index + 1;

      const cover = item.cover ? item.cover : "covers/default.jpg";

      const card = document.createElement("div");
      card.className = "chart-card";

      card.innerHTML = `
        <div class="chart-rank">${pos}</div>
        <div class="chart-cover">
          <img src="${cover}" alt="${item.title}">
        </div>
        <div class="chart-info">
          <div class="chart-title">${item.title}</div>
          <div class="chart-artist">${item.artist}</div>
        </div>
        <div class="chart-stats">
          <div><b>${item.weeks}</b><span>недель в чарте</span></div>
          <div><b>${item.peak}</b><span>пик</span></div>
          <div><b>${item.weeksAt1}</b><span>нед. #1</span></div>
        </div>
      `;

      list.appendChild(card);
    });
  })
  .catch(err => console.error(err));

