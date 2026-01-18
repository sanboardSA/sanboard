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
            <div class="artist-listeners">${artist.listeners.toLocaleString()} слушателей / мес</div>
          </div>
        `;

        // 🔥 Добавляем переход на страницу артиста, если указан
        if (artist.page) {
          card.style.cursor = "pointer";
          card.addEventListener("click", () => {
            window.location.href = artist.page;
          });
        }

        artistsList.appendChild(card);
      });
    }

    /* =========================
       СТРАНИЦА АРТИСТА
       ========================= */

    const artistPage = document.querySelector(".artist-page");

    if (artistPage) {
      const artistName = artistPage.dataset.artist.toLowerCase();

      // На странице артиста подгружаем слушателей и соц. ссылку
      const artistData = data.artists.find(a => a.name.toLowerCase() === artistName);
      if (artistData) {
        const listenersEl = document.getElementById("artist-listeners");
        if (listenersEl) {
          listenersEl.textContent = artistData.listeners.toLocaleString() + " слушателей / мес";
        }
        const socialEl = document.getElementById("artist-social");
        if (socialEl && artistData.social) {
          socialEl.href = artistData.social;
        }
        // Автоматически подставляем аватар
        const avatarEl = document.querySelector(".artist-photo img");
        if (avatarEl) {
          avatarEl.src = artistData.avatar;
        }
      }

      // ======= Табы Альбомы / Синглы =======
      document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const targetTab = btn.dataset.tab;

          // Скрываем все табы
          document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
          document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));

          // Показываем выбранный таб
          document.getElementById(targetTab).classList.add("active");
          btn.classList.add("active");
        });
      });

      // ======= Раскрытие проектов =======
      document.querySelectorAll(".project-header").forEach(header => {
        header.addEventListener("click", () => {
          const tracks = header.nextElementSibling;
          if (tracks) tracks.classList.toggle("active");
        });
      });

      // ======= Кнопки lyrics =======
      const modal = document.getElementById("lyrics-modal");
      const modalText = document.getElementById("lyrics-text");
      const modalClose = document.getElementById("lyrics-close");
      
      document.querySelectorAll(".lyrics-btn").forEach(btn => {
        btn.addEventListener("click", e => {
          e.stopPropagation();
      
          const text = btn.dataset.lyrics;
          if (!text) return;
      
          modalText.textContent = text;
          modal.classList.add("active");
        });
      });
      
      modalClose.addEventListener("click", () => {
        modal.classList.remove("active");
      });
      
      modal.addEventListener("click", e => {
        if (e.target === modal) {
          modal.classList.remove("active");
        }
      });


    }

  });



