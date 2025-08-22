/**
 * @file app-core.js
 * @description Script inti untuk fungsionalitas website. Mengelola state, komponen, dan inisialisasi dasar.
 * @version 8.2.1 (Sync with Karang Taruna branding & Formspree integration)
 */

function applyCacheBuster() {
  const timestamp = new Date().getTime();
  // Menargetkan semua tag <link> yang memuat file CSS
  document.querySelectorAll('link[href*=".css"]').forEach((link) => {
    const url = new URL(link.href);
    if (!url.searchParams.has("v")) {
      // Hanya tambahkan jika belum ada versi
      url.searchParams.append("v", timestamp);
      link.href = url.href;
    }
  });
  // Menargetkan semua tag <script> yang memuat file JS
  document.querySelectorAll('script[src*=".js"]').forEach((script) => {
    const url = new URL(script.src);
    if (!url.searchParams.has("v")) {
      // Hanya tambahkan jika belum ada versi
      url.searchParams.append("v", timestamp);
      script.src = url.href;
    }
  });
}
applyCacheBuster();
// ===================================================================================
// === FUNGSI FINAL (VERSI 4): INTERSTITIAL "BUKA DI BROWSER" ===
// ===================================================================================
// Fungsi ini akan menampilkan halaman perantara yang meminta izin pengguna
// untuk membuka link di browser eksternal (Chrome atau Brave).

function setupBrowserInterceptor() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isInApp = /Instagram|FBAN|FBAV|WebView|GSA/i.test(userAgent);

  if (isInApp) {
    // Buat dan tampilkan overlay
    const overlayHTML = `
      <div id="browser-interceptor-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.9); z-index: 99999; display: flex; align-items: center; justify-content: center; font-family: 'Poppins', sans-serif; color: white; text-align: center; padding: 20px;">
        <div style="max-width: 320px;">
          <img src="foto/ChatGPTlogokarangtaruna.png" alt="Logo Karang Taruna" style="width: 100px; height: 100px; margin-bottom: 20px;">
          <h3 style="font-size: 22px; margin-bottom: 10px;">Pengalaman Terbaik di Browser</h3>
          <p style="font-size: 16px; color: #ccc; margin-bottom: 30px;">Situs ini bekerja lebih baik di browser terpisah. Silakan pilih salah satu untuk melanjutkan.</p>
          <div id="browser-buttons-container" style="display: flex; flex-direction: column; gap: 15px;">
            </div>
        </div>
      </div>
    `;
    document.body.innerHTML += overlayHTML;

    // Tentukan tombol berdasarkan sistem operasi
    generateBrowserButtons();
  }
}

function generateBrowserButtons() {
  const container = document.getElementById("browser-buttons-container");
  const currentUrl = window.location.href;
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  // --- Tombol Google Chrome (Mode Samaran untuk Android) ---
  const chromeBtn = document.createElement("a");
  if (isIOS) {
    // Mode samaran TIDAK didukung di iOS. Buka mode normal.
    chromeBtn.innerText = "Buka di Google Chrome";
    chromeBtn.href = `googlechrome://${currentUrl.replace(/https?:\/\//i, "")}`;
  } else {
    // Intent Android dengan flag untuk mode Incognito
    chromeBtn.innerText = "Buka di Chrome (Samaran)";
    chromeBtn.href = `intent://${currentUrl.replace(
      /https?:\/\//i,
      ""
    )}#Intent;scheme=https;package=com.android.chrome;S.browser_application_id=com.android.chrome;B.com.android.browser.incognito=true;end`;
  }
  styleBrowserButton(chromeBtn, "#4285F4");
  container.appendChild(chromeBtn);

  // --- Tombol Brave Browser (Mode Samaran untuk Android) ---
  const braveBtn = document.createElement("a");
  if (isIOS) {
    // Mode samaran TIDAK didukung di iOS. Buka mode normal.
    braveBtn.innerText = "Buka di Brave";
    braveBtn.href = `brave://open-url?url=${encodeURIComponent(currentUrl)}`;
  } else {
    // Intent Android dengan flag untuk mode Incognito
    braveBtn.innerText = "Buka di Brave (Samaran)";
    braveBtn.href = `intent://${currentUrl.replace(
      /https?:\/\//i,
      ""
    )}#Intent;scheme=https;package=com.brave.browser;S.browser_application_id=com.brave.browser;B.com.android.browser.incognito=true;end`;
  }
  styleBrowserButton(braveBtn, "#FB542B");
  container.appendChild(braveBtn);
}

function styleBrowserButton(button, bgColor) {
  button.style.cssText = `
        display: block;
        padding: 15px;
        background-color: ${bgColor};
        color: white;
        text-decoration: none;
        border-radius: 8px;
        font-weight: bold;
        font-size: 16px;
        transition: transform 0.2s;
    `;
  button.onmouseover = () => {
    button.style.transform = "scale(1.05)";
  };
  button.onmouseout = () => {
    button.style.transform = "scale(1)";
  };
}

// Panggil fungsi utama saat dokumen selesai dimuat
document.addEventListener("DOMContentLoaded", setupBrowserInterceptor);
// ===================================================================================
// === AKHIR DARI FUNGSI FINAL (VERSI 4) ===
// ===================================================================================

const App = (() => {
  // === STATE & CACHE ===
  const cache = new Map();
  const state = {
    kegiatan: [],
    galeri: {},
    informasi: [],
    pengurus: [],
    kontak: [],
    lastScrollTop: 0, // State untuk scroll position
  };

  // === PENGATURAN SESI & INAKTIVITAS ===
  const TIMEOUT_DURATION = 20 * 60 * 1000; // 20 menit
  let inactivityTimer;

  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logoutUser, TIMEOUT_DURATION);
    sessionStorage.setItem("lastActivityTimestamp", Date.now());
  }

  function startInactivityTracker() {
    const events = [
      "mousemove",
      "mousedown",
      "keypress",
      "scroll",
      "touchstart",
    ];
    events.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer, { passive: true });
    });
    resetInactivityTimer();
  }

  function logoutUser() {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("lastActivityTimestamp");
    window.location.href = "index.html";
  }

  function initWelcomeScreen() {
    const overlay = document.getElementById("welcome-overlay");
    if (!overlay) return;

    const uname = document.querySelector("#uname");
    const isBanjarsari = document.querySelector("#is_banjarsari");
    const btnContainer = document.querySelector(".btn-container");
    const btn = document.querySelector("#login-btn");
    const form = document.querySelector("#welcome-form");
    const msg = document.querySelector(".msg");

    if (!uname || !isBanjarsari || !btn || !form || !msg) return;

    btn.disabled = true;

    function shiftButton() {
      if (btn.disabled) {
        const positions = [
          "shift-left",
          "shift-top",
          "shift-right",
          "shift-bottom",
        ];
        const currentPosition = positions.find((dir) =>
          btn.classList.contains(dir)
        );
        const nextPosition =
          positions[
            (positions.indexOf(currentPosition) + 1) % positions.length
          ];
        btn.classList.remove(currentPosition || "no-shift");
        btn.classList.add(nextPosition);
      }
    }

    function showMsg() {
      const isEmpty = uname.value === "" || isBanjarsari.value === "";
      btn.classList.toggle("no-shift", !isEmpty);

      if (isEmpty) {
        btn.disabled = true;
        msg.style.color = "rgb(218 49 49)";
        msg.innerText =
          "Untuk Masuk Web Pastikan Semua Form Terisi⚠!! Terserah Mau di Isi Apa Saja Bebas.";
      } else {
        msg.innerText =
          "TERIMAKASIH🙏, Sekarang Anda Bisa Masuk Web Karang Taruna Banjarsari.";
        msg.style.color = "#92ff92";
        btn.disabled = false;
        btn.classList.add("no-shift");
      }
    }

    const isIndexPage =
      window.location.pathname.endsWith("/") ||
      window.location.pathname.includes("index.html");

    if (sessionStorage.getItem("isLoggedIn")) {
      overlay.classList.add("hidden");
      startInactivityTracker();
    } else if (isIndexPage) {
      overlay.classList.remove("hidden");
    } else {
      logoutUser();
    }

    btnContainer.addEventListener("mouseover", shiftButton);
    form.addEventListener("input", showMsg);

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      if (btn.disabled) return;

      msg.innerText = "Processing...";
      msg.style.color = "#92ff92";
      btn.value = "Mengirim...";
      btn.disabled = true;

      const formData = new FormData(form);
      const FORMSPREE_URL = "https://formspree.io/f/myzpjnqg";

      try {
        const response = await fetch(FORMSPREE_URL, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          msg.innerText =
            "Anda di ijinkan masuk oleh admin! Anda akan dialihkan...";
          setTimeout(() => {
            sessionStorage.setItem("isLoggedIn", "true");
            overlay.classList.add("hidden");
            startInactivityTracker();
          }, 1500);
        } else {
          throw new Error("Gagal mengirim data.");
        }
      } catch (error) {
        console.error("Formspree error:", error);
        msg.innerText = "Gagal mengirim data. Silakan coba lagi.";
        msg.style.color = "rgb(218 49 49)";
        btn.value = "Login";
        btn.disabled = false;
      }
    });
  }

  // === FUNGSI HEADER BARU UNTUK MOBILE ===
  function handleMobileHeaderScroll() {
    const topHeader = document.querySelector(".mobile-top-header");
    if (!topHeader) return;

    let currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > state.lastScrollTop && currentScroll > 50) {
      // Scroll Down
      topHeader.classList.add("hidden");
    } else {
      // Scroll Up
      topHeader.classList.remove("hidden");
    }
    state.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
  }

  // === UTILITIES & HELPERS (SHARED) ===
  const loadComponent = async (url, elementId, callback) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    try {
      if (cache.has(url)) {
        element.innerHTML = cache.get(url);
      } else {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`Gagal memuat ${url}: Status ${response.status}`);
        const content = await response.text();
        cache.set(url, content);
        element.innerHTML = content;
      }
      if (callback) callback();
    } catch (error) {
      console.error(error);
      element.innerHTML = `<p style="color: red; text-align: center;">Gagal memuat komponen.</p>`;
    }
  };

  const fetchData = async (key, url) => {
    if (
      state[key] &&
      (state[key].length > 0 || Object.keys(state[key]).length > 0)
    ) {
      return state[key];
    }
    try {
      if (cache.has(url)) {
        state[key] = cache.get(url);
        return state[key];
      }
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      cache.set(url, data);
      state[key] = data;
      return data;
    } catch (error) {
      console.error(`Gagal memuat data dari ${url}:`, error);
      return null;
    }
  };

  const renderItems = (container, items, templateFn, errorMessage) => {
    if (!container) return;
    if (!items || items.length === 0) {
      container.innerHTML = `<p>${errorMessage}</p>`;
      return;
    }
    const fragment = document.createDocumentFragment();
    items.forEach((item) => {
      const element = document.createElement("div");
      element.innerHTML = templateFn(item);
      while (element.firstChild) {
        fragment.appendChild(element.firstChild);
      }
    });
    container.innerHTML = "";
    container.appendChild(fragment);
    initScrollAnimations();
  };

  const initScrollAnimations = () => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document
      .querySelectorAll(".animate-on-scroll:not(.visible)")
      .forEach((el) => observer.observe(el));
  };

  function setActiveNavLink() {
    const currentLocation =
      window.location.pathname.split("/").pop() || "index.html";
    const navContainer = document.querySelector("nav ul");
    if (!navContainer) return;
    let activeLinkElement = null;
    navContainer.querySelectorAll("a").forEach((link) => {
      const parentLi = link.parentElement;
      const linkPath = link.getAttribute("href");
      parentLi.classList.remove("active");
      const isCurrentPage = linkPath === currentLocation;
      const isArtikelPageAndKegiatanLink =
        currentLocation === "artikel.html" && linkPath === "kegiatan.html";
      if (isCurrentPage || isArtikelPageAndKegiatanLink) {
        parentLi.classList.add("active");
        activeLinkElement = parentLi;
      }
    });
    if (activeLinkElement && window.innerWidth <= 768) {
      const scrollLeftPosition =
        activeLinkElement.offsetLeft -
        navContainer.offsetWidth / 2 +
        activeLinkElement.offsetWidth / 2;
      navContainer.scrollTo({ left: scrollLeftPosition, behavior: "smooth" });
    }
  }

  function initParticles() {
    if (typeof tsParticles === "undefined") {
      console.warn(
        "tsParticles library not loaded. Skipping particle initialization."
      );
      return;
    }

    tsParticles.load("particles-js", {
      background: {
        color: "#000000",
      },
      particles: {
        number: {
          value: 50, // Jumlah bintang minimalis
        },
        color: {
          value: "#ffffff",
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: { min: 0.1, max: 0.4 },
        },
        size: {
          value: { min: 1, max: 2 },
        },
        move: {
          enable: false,
        },
        // Efek kelip yang sederhana
        twinkle: {
          particles: {
            enable: true,
            frequency: 0.05,
            opacity: 1,
          },
        },
      },
      interactivity: {
        enable: false,
      },
      retina_detect: true,
    });
  }

  // === MAIN INITIALIZER ===
  const initPage = () => {
    const isIndexPage =
      window.location.pathname.endsWith("/") ||
      window.location.pathname.includes("index.html");
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");

    if (!isLoggedIn && !isIndexPage) {
      logoutUser();
      return;
    }

    // Buat dan tambahkan header atas mobile secara dinamis
    if (!document.querySelector(".mobile-top-header")) {
      const mobileHeader = document.createElement("header");
      mobileHeader.className = "mobile-top-header";
      mobileHeader.innerHTML = `
            <div class="mobile-header-container">
                <div class="logo">
                    <a href="index.html">
                        <img src="foto/ChatGPTlogokarangtaruna.png" alt="Logo Karang Taruna Banjarsari" />
                        <div class="logo-text">
                            <h1>Karang Taruna Banjarsari</h1>
                        </div>
                    </a>
                </div>
            </div>
        `;
      document.body.prepend(mobileHeader);
    }

    loadComponent("layout/header.html", "main-header", () => {
      // Pindahkan navigasi dari header desktop ke dalam elemen nav di body untuk mobile
      const mainHeaderNav = document.querySelector("#main-header nav");
      if (mainHeaderNav && window.innerWidth <= 768) {
        document.querySelector("#main-header").append(mainHeaderNav);
      }
      setActiveNavLink();
    });

    loadComponent("layout/footer.html", "main-footer");

    if (document.getElementById("welcome-overlay")) {
      initWelcomeScreen();
    } else if (isLoggedIn) {
      startInactivityTracker();
    }

    // Tambahkan event listener untuk scroll HANYA di mobile
    if (window.innerWidth <= 768) {
      window.addEventListener("scroll", handleMobileHeaderScroll, {
        passive: true,
      });
    }

    initScrollAnimations();
    if (document.getElementById("particles-js")) {
      setTimeout(initParticles, 500);
    }

    // Jalankan inisialisasi spesifik halaman
    const pageId = document.body.dataset.pageId;
    if (pageId && typeof App.initializers[pageId] === "function") {
      App.initializers[pageId]();
    }
  };

  // expose functions to be used by other files
  return {
    init: initPage,
    fetchData,
    renderItems,
    initScrollAnimations,
    cache,
    initializers: {}, // Namespace for page-specific initializers
  };
})();

// Event listener standar browser
document.addEventListener("DOMContentLoaded", App.init);
