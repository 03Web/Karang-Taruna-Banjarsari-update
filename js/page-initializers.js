/**
 * @file page-initializers.js
 * @description Inisialisasi spesifik untuk setiap halaman Karang Taruna (UI Amazia).
 */

// === KEGIATAN PAGE ===
App.initializers.kegiatan = async () => {
  const container = document.getElementById("kegiatan-list");
  if (!container) return;

  const sorter = document.getElementById("kegiatan-sorter");

  const createKegiatanTemplate = (item) => `
    <article class="kegiatan-item animate-on-scroll" data-tanggal="${
      item.tanggal
    }">
      <div class="kegiatan-foto">
        <img src="${item.gambar}" alt="${
    item.alt_gambar || "Gambar Kegiatan " + item.judul
  }" loading="lazy">
      </div>
      <div class="kegiatan-konten">
        <h2>${item.judul}</h2>
        <p class="kegiatan-meta"><i class="fas fa-calendar-alt"></i> ${new Date(
          item.tanggal
        ).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}</p>
        <p>${item.deskripsi}</p>
        <a href="${item.link}" class="kegiatan-tombol">Baca Selengkapnya</a>
      </div>
    </article>`;

  const originalData = await App.fetchData("kegiatan", "data/kegiatan.json");
  if (!originalData) {
    container.innerHTML = "<p>Gagal memuat daftar kegiatan.</p>";
    return;
  }

  const updateList = () => {
    const sortOrder = sorter.value;
    const sortedData = [...originalData].sort((a, b) =>
      sortOrder === "terbaru"
        ? new Date(b.tanggal) - new Date(a.tanggal)
        : new Date(a.tanggal) - new Date(b.tanggal)
    );
    App.renderItems(
      container,
      sortedData,
      createKegiatanTemplate,
      "<p>Tidak ada kegiatan untuk ditampilkan.</p>"
    );
  };

  sorter.addEventListener("change", updateList);
  updateList();
};

// === GALERI PAGE (USING LIGHTGALLERY) ===
App.initializers.galeri = async () => {
  const data = await App.fetchData("galeri", "data/galeri.json");
  if (!data) return;

  const albumContainer = document.getElementById("album-grid");
  if (albumContainer && data.albumFoto) {
    const createAlbumTemplate = (album) => `
    <div class="album-item">
        <div class="album-cover" id="album-cover-${album.id}">
            <img src="${album.cover}" alt="${
      album.alt_cover || "Cover album " + album.judul
    }" loading="lazy">
            <div class="album-info"><h4>${album.judul}</h4><p>${
      album.deskripsi
    }</p></div>
            <div class="click-hint-animated">
                <i class="fas fa-hand-pointer"></i>
                <span>Buka Galeri</span>
            </div>
        </div>
        <div id="lightgallery-${album.id}" style="display:none;">
            ${album.foto
              .map(
                (foto) =>
                  `<a href="${foto.src}" data-sub-html="<h4>${
                    foto.title || album.judul
                  }</h4>" data-alt="${foto.alt || foto.title}">
                      <img src="${foto.src}" alt="${foto.alt || foto.title}" />
                  </a>`
              )
              .join("")}
        </div>
    </div>`;

    albumContainer.innerHTML = `
      <div class="album-carousel-wrapper">
        <button class="carousel-nav prev" aria-label="Sebelumnya">&lt;</button>
        <div class="album-carousel">
          ${data.albumFoto.map(createAlbumTemplate).join("")}
        </div>
        <button class="carousel-nav next" aria-label="Selanjutnya">&gt;</button>
      </div>
    `;

    data.albumFoto.forEach((album) => {
      const cover = document.getElementById(`album-cover-${album.id}`);
      const gallery = document.getElementById(`lightgallery-${album.id}`);

      const lg = lightGallery(gallery, {
        plugins: [lgThumbnail],
        speed: 500,
        download: false,
        mobileSettings: {
          controls: true,
          showCloseIcon: true,
        },
      });

      cover.addEventListener("click", () => {
        lg.openGallery();
      });
    });

    const wrapper = albumContainer.querySelector(".album-carousel-wrapper");
    const carousel = wrapper.querySelector(".album-carousel");
    const prevBtn = wrapper.querySelector(".prev");
    const nextBtn = wrapper.querySelector(".next");
    let autoPlayInterval;

    const startAutoPlay = () => {
      autoPlayInterval = setInterval(() => {
        const firstItem = carousel.querySelector(".album-item");
        if (!firstItem) return;
        const scrollAmount = firstItem.offsetWidth + 25;
        const isAtEnd =
          carousel.scrollLeft + carousel.clientWidth >=
          carousel.scrollWidth - 1;
        if (isAtEnd) {
          carousel.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }, 3000);
    };
    const stopAutoPlay = () => clearInterval(autoPlayInterval);

    setTimeout(() => {
      const firstItem = carousel.querySelector(".album-item");
      if (!firstItem) return;
      const scrollAmount = firstItem.offsetWidth + 25;
      nextBtn.addEventListener("click", () =>
        carousel.scrollBy({ left: scrollAmount, behavior: "smooth" })
      );
      prevBtn.addEventListener("click", () =>
        carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      );
      wrapper.addEventListener("mouseenter", stopAutoPlay);
      wrapper.addEventListener("mouseleave", startAutoPlay);
      startAutoPlay();
    }, 100);
  }

  const videoContainer = document.getElementById("video-grid");
  if (videoContainer && data.dokumentasiVideo) {
    const createVideoTemplate = (video) => `
        <div class="gallery-item video-item animate-on-scroll" data-tanggal="${
          video.tanggal
        }">
            <iframe src="${video.src.replace("watch?v=", "embed/")}" title="${
      video.title
    }" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
        </div>`;
    const renderVideos = (items) =>
      App.renderItems(
        videoContainer,
        items,
        createVideoTemplate,
        "Gagal memuat video."
      );
    const sorter = document.getElementById("video-sorter");
    const updateVideos = () => {
      const sortedData = [...data.dokumentasiVideo].sort((a, b) =>
        sorter.value === "terbaru"
          ? new Date(b.tanggal) - new Date(a.tanggal)
          : new Date(a.tanggal) - new Date(b.tanggal)
      );
      renderVideos(sortedData);
    };
    sorter.addEventListener("change", updateVideos);
    updateVideos();
  }
};

// === ABOUT PAGE (STRUKTUR ORGANISASI) ===
App.initializers.about = async () => {
  const container = document.getElementById("pohon-organisasi-container");
  if (!container) return;
  const data = await App.fetchData("pengurus", "data/pengurus.json");
  if (!data) {
    container.innerHTML = "<p>Gagal memuat struktur organisasi.</p>";
    return;
  }
  const createNode = (jabatan, nama, fotoUrl, altText) => {
    const imageTag = fotoUrl
      ? `<img src="${fotoUrl}" alt="${
          altText || "Foto " + nama
        }" class="foto-node" loading="lazy">`
      : `<span class="foto-node foto-node-placeholder fas fa-user"></span>`;
    return `<div>${imageTag}<span class="jabatan">${jabatan}</span><span class="nama">${nama}</span></div>`;
  };
  const createBidangTitleNode = (namaBidang) =>
    `<div><span class="jabatan">${namaBidang}</span></div>`;

  container.innerHTML =
    '<ul class="pohon-organisasi" id="pohon-organisasi-chart"></ul>';
  const chart = document.getElementById("pohon-organisasi-chart");

  const { pengurusInti, bidang } = data;
  const ketua = pengurusInti.find((p) => p.jabatan === "Ketua");
  const sisaPengurusInti = pengurusInti.filter((p) => p.jabatan !== "Ketua");

  let chartContent = `<li>${createNode(
    ketua.jabatan,
    ketua.nama,
    ketua.foto,
    ketua.alt
  )}<ul>`;

  let pengurusIntiHtml = '<ul class="anggota-grid">';
  sisaPengurusInti.forEach((p) => {
    pengurusIntiHtml += `<li>${createNode(
      p.jabatan,
      p.nama,
      p.foto,
      p.alt
    )}</li>`;
  });
  pengurusIntiHtml += "</ul>";
  chartContent += `<li>${createBidangTitleNode(
    "Pengurus Inti"
  )}${pengurusIntiHtml}</li>`;

  bidang.forEach((b) => {
    let anggotaHtml = '<ul class="anggota-grid">';
    b.anggota.forEach((a) => {
      anggotaHtml += `<li>${createNode(a.jabatan, a.nama, a.foto, a.alt)}</li>`;
    });
    anggotaHtml += "</ul>";
    chartContent += `<li>${createBidangTitleNode(
      b.namaBidang
    )}${anggotaHtml}</li>`;
  });

  chartContent += `</ul></li>`;
  chart.innerHTML = chartContent;

  const zoomInBtn = document.getElementById("zoom-in-btn");
  const zoomOutBtn = document.getElementById("zoom-out-btn");
  const zoomLevelDisplay = document.getElementById("zoom-level");
  let currentZoom = 1;
  const applyZoom = () => {
    chart.style.transform = `scale(${currentZoom})`;
    zoomLevelDisplay.textContent = `${Math.round(currentZoom * 100)}%`;
  };
  zoomInBtn.addEventListener("click", () => {
    currentZoom = Math.min(2, currentZoom + 0.1);
    applyZoom();
  });
  zoomOutBtn.addEventListener("click", () => {
    currentZoom = Math.max(0.3, currentZoom - 0.1);
    applyZoom();
  });

  let isPanning = false,
    startX,
    scrollLeft;
  container.addEventListener("mousedown", (e) => {
    isPanning = true;
    container.style.cursor = "grabbing";
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });
  container.addEventListener("mouseleave", () => {
    isPanning = false;
    container.style.cursor = "grab";
  });
  container.addEventListener("mouseup", () => {
    isPanning = false;
    container.style.cursor = "grab";
  });
  container.addEventListener("mousemove", (e) => {
    if (!isPanning) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = x - startX;
    container.scrollLeft = scrollLeft - walk;
  });

  setTimeout(() => {
    const containerWidth = container.offsetWidth;
    const chartWidth = chart.scrollWidth;
    container.scrollLeft = (chartWidth - containerWidth) / 2;
  }, 100);
};

// === KONTAK PAGE ===
App.initializers.kontak = async () => {
  const container = document.getElementById("kontak-grid");
  if (!container) return;
  const data = await App.fetchData("kontak", "data/kontak.json");

  const createKontakTemplate = (kontak) => `
    <div class="kontak-card animate-on-scroll">
      <img src="${kontak.foto}" alt="${
    kontak.alt
  }" class="foto-pengurus" loading="lazy" />
      <h4>${kontak.nama}</h4>
      <p class="jabatan">${kontak.jabatan}</p>
      <p class="info-kontak">${kontak.deskripsi}</p>
      <a href="https://wa.me/${kontak.whatsapp}?text=${encodeURIComponent(
    kontak.pesan_wa
  )}" target="_blank" class="wa-button">
        <i class="fab fa-whatsapp"></i> Hubungi via WhatsApp
      </a>
    </div>`;
  App.renderItems(
    container,
    data,
    createKontakTemplate,
    "Gagal memuat daftar narahubung."
  );
};

// === ARTIKEL PAGE ===
App.initializers.artikel = async () => {
  const container = document.getElementById("artikel-dinamis-container");
  if (!container) return;

  const initSlideshow = () => {
    document.querySelectorAll(".slideshow-container").forEach((container) => {
      const slides = container.querySelectorAll(".slide-image");
      if (slides.length <= 1) {
        if (slides.length === 1) slides[0].classList.add("active-slide");
        return;
      }
      let currentIndex = 0;
      slides[currentIndex].classList.add("active-slide");
      if (container.dataset.intervalId)
        clearInterval(parseInt(container.dataset.intervalId));

      const intervalId = setInterval(() => {
        slides[currentIndex].classList.remove("active-slide");
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add("active-slide");
      }, 4000);
      container.dataset.intervalId = intervalId;
    });
  };

  try {
    const slug = new URLSearchParams(window.location.search).get("slug");
    if (!slug) throw new Error("Slug artikel tidak ditemukan di URL.");

    const artikelPath = `konten-kegiatan/${slug}.html`;
    const response = await fetch(artikelPath);
    if (!response.ok)
      throw new Error(`Gagal memuat konten artikel: ${response.statusText}`);
    const artikelHTML = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(artikelHTML, "text/html");

    const title = doc.querySelector("h2").textContent;
    const date = doc.querySelector(".kegiatan-meta").textContent;
    const contentContainer = doc.querySelector(".artikel-konten");
    const words = contentContainer.innerText.split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);

    document.title = `${title} - Karang Taruna Banjarsari`;
    container.innerHTML = `
            <div class="artikel-header">
                <h1>${title}</h1>
                <div class="artikel-meta-info">
                    <span><i class="fas fa-calendar-alt"></i> ${date}</span>
                    <span><i class="fas fa-clock"></i> Estimasi ${readingTime} menit baca</span>
                </div>
            </div>
            ${doc.querySelector(".slideshow-container")?.outerHTML || ""}
            <div class="artikel-konten">${contentContainer.innerHTML}</div>
            <a href="kegiatan.html" class="tombol-kembali"><i class="fas fa-arrow-left"></i> Kembali ke Daftar Kegiatan</a>
        `;
    initSlideshow();
  } catch (error) {
    console.error("Gagal memuat artikel:", error);
    container.innerHTML = `<div style="text-align: center;"><h2>Gagal Memuat Artikel</h2><p>Maaf, konten yang Anda cari tidak dapat ditemukan.</p><p><i>${error.message}</i></p><a href="kegiatan.html" class="kegiatan-tombol" style="margin-top: 20px;"><i class="fas fa-arrow-left"></i> Kembali ke Daftar Kegiatan</a></div>`;
  } finally {
    App.initScrollAnimations();
  }
};
// === ASPIRASI PAGE (VERSION 2 - WITH PUBLIC LIST) ===
App.initializers.aspirasi = async () => {
  // --- Bagian 1: Menampilkan Daftar Aspirasi Publik ---
  const aspirasiContainer = document.getElementById("aspirasi-list");
  if (aspirasiContainer) {
    // Template untuk setiap item aspirasi
    const createAspirasiTemplate = (item) => {
      // Tentukan nama pengirim, jika kosong tampilkan 'Saran Anonim'
      const namaPengirim = item.nama ? item.nama : "Saran Anonim";
      // Siapkan HTML untuk tanggapan jika ada
      const tanggapanHtml = item.tanggapan_pengurus
        ? `<div class="tanggapan-pengurus">
             <strong>Tanggapan Pengurus:</strong>
             <p>${item.tanggapan_pengurus}</p>
           </div>`
        : "";

      return `
        <div class="aspirasi-item">
          <div class="aspirasi-header">
            <h3>${item.subjek}</h3>
            <span class="status-tag status-${item.status
              .toLowerCase()
              .replace(/\s+/g, "-")}">${item.status}</span>
          </div>
          <div class="aspirasi-meta">
            <span>Oleh: <strong>${namaPengirim}</strong></span>
            <span>Masuk pada: ${new Date(item.tanggal_masuk).toLocaleDateString(
              "id-ID",
              { day: "numeric", month: "long", year: "numeric" }
            )}</span>
          </div>
          <div class="aspirasi-body">
            <p>${item.pesan}</p>
          </div>
          ${tanggapanHtml}
        </div>
      `;
    };

    // Ambil dan render data
    const aspirasiData = await App.fetchData("aspirasi", "data/aspirasi.json");
    App.renderItems(
      aspirasiContainer,
      aspirasiData,
      createAspirasiTemplate,
      "<p>Belum ada aspirasi publik yang ditampilkan.</p>"
    );
  }

  // --- Bagian 2: Logika Pengiriman Formulir (Tetap sama) ---
  const form = document.getElementById("aspirasi-form");
  const formStatus = document.getElementById("form-status");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);

    formStatus.textContent = "Mengirim...";
    formStatus.className = "form-status";
    submitButton.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        formStatus.textContent = "Terima kasih! Aspirasi Anda telah terkirim.Harap tunggu  kurang lebih 3 kali 24 ";
        formStatus.classList.add("status-sukses");
        form.reset();
      } else {
        throw new Error("Gagal mengirim. Silakan coba lagi nanti.");
      }
    } catch (error) {
      formStatus.textContent = error.message;
      formStatus.classList.add("status-gagal");
    } finally {
      submitButton.disabled = false;
      setTimeout(() => {
        formStatus.textContent = "";
        formStatus.className = "form-status";
      }, 6000);
    }
  });
};
