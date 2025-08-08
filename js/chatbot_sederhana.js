// File: js/chatbot_sederhana.js

document.addEventListener("DOMContentLoaded", () => {
  // --- KOMPONEN 1: PENGATURAN DASAR ---
  const GOOGLE_AI_API_KEY = "AIzaSyApjIgQTu2rYY0h-tcDviFLerXb61WIR8s"; // <-- GANTI INI DENGAN KUNCI API ANDA!
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GOOGLE_AI_API_KEY}`;

  // --- KOMPONEN 2: "PENGETAHUAN" WEBSITE (VERSI LENGKAP) ---
  // Ini adalah 'contekan' untuk AI. Semua informasi dari website Anda ada di sini.
  const KNOWLEDGE_BASE = `
       TENTANG ORGANISASI:
        - Nama Organisasi: Karang Taruna Banjarsari, Temanggung.
        - Deskripsi: Organisasi kepemudaan sebagai wadah bagi generasi muda untuk berkembang, berkreasi, dan berkontribusi secara positif bagi masyarakat Desa Banjarsari.
        - Visi: Menjadi organisasi pemuda yang mandiri, kreatif, inovatif, dan menjadi pilar utama dalam Pembudayaan Desa dan pembangunan kesejahteraan sosial di Desa Banjarsari.
        - Misi: Mengembangkan potensi pemuda, menyelenggarakan kegiatan sosial, keagamaan, kesenian, dan olahraga, membangun kemitraan, serta menjaga kelestarian lingkungan dan kearifan lokal.
        - Alamat Sekretariat: Q5RQ+5R5, Unnamed Road, Banjarsari, Kec. Kandangan, Kabupaten Temanggung, Jawa Tengah 56281.
        - Email: karangtaruna.banjarsari@email.com.
        - Sosial Media: Instagram @kartarbanjarr, TikTok, dan YouTube.

        STRUKTUR ORGANISASI LENGKAP (data/pengurus.json):
        PENGURUS INTI:
        - Penasehat: Sunirman, S.Ag (No. Telepon: [kosong])
        - Penanggung Jawab: Suryono, S.Pd (No. Telepon: [kosong])
        - Ketua: Andri Apriyanto (No. Telepon: [kosong])
        - Wakil: Yunita Sari (No. Telepon: [kosong])
        - Sekretaris: Dimas Suryo L. (No. Telepon: [kosong])
        - Bendahara: Yudi Arum S. (No. Telepon: [kosong])
        
        BIDANG-BIDANG:
        1. Bidang Sosial:
           - Koordinator: Isrofi (No. Telepon: [kosong])
           - Anggota: Mulyono, Mas Udi, Nana Mustakimah, Sifa Amadea P.
        2. Bidang Perekonomian dan Kewirausahaan:
           - Koordinator: Dani Indri S. (No. Telepon: [kosong])
           - Anggota: Tri Arifin, Harniyati, Amalis Saliyati.
        3. Bidang Olahraga dan Seni Budaya:
           - Koordinator: M. Ardan Maulana (No. Telepon: [kosong])
           - Anggota: Satria Nindy W., Iswanto heru, Wisnu, Puput.
        4. Bidang Media:
           - Koordinator: Haidar Daffa (No. Telepon: [kosong])
           - Anggota: Azizah Melan, Indra Kurniawan.
        5. Bidang Lingkungan Hidup Dan Kebersihan:
           - Koordinator: Yogi Ivan (No. Telepon: [kosong])
           - Anggota: Ibnu, Adit, Rezel, Jojo.
        6. Bidang Agama Islam:
           - Koordinator: Iswanto (No. Telepon: [kosong])
           - Anggota: Aji, Aifa Nurul A.
        7. Bidang Agama Kristen:
           - Koordinator: Margaretha (No. Telepon: [kosong])
           - Anggota: Amazia, Agatha, Nessa.
        8. Bidang Keamanan:
           - Koordinator: Budi Santoso (No. Telepon: [kosong])
           - Anggota: Rendi Sikun, Satria Juang W., Beni Nurhidayat, Sendi, Imas, Enggar.
        9. Bidang Pendidikan:
           - Koordinator: Arlin fatoni (No. Telepon: [kosong])
           - Anggota: Doni ismail.
        10. Bidang Organisasi Dan Kaderisasi:
            - Koordinator: Ari (No. Telepon: [kosong])
            - Anggota: Titik, M. Nur Fauzi.

        NARAHUBUNG (data/kontak.json):
        - Andri Apri (Ketua Umum): Hubungi untuk informasi umum dan kerja sama. WA: 6285712414558.
        - Yunita (Wakil Ketua): Hubungi untuk informasi umum dan kegiatan. WA: 6288233496802.
        - Amaz (Admin Website): Hubungi untuk laporan bug/error website, atau saran. WA: 6285876983793.

        INFORMASI & PENGUMUMAN (data/informasi.json):
        - 7 Juli 2025: Ada jadwal rapat pleno persiapan HUT RI ke-80 pada Sabtu, 19 Juli 2025 pukul 19:30 WIB di Balai Desa Banjarsari.
        - 6 Juli 2025: Pendaftaran Lomba Cerdas Cermat dibuka hingga 25 Juli 2025.
        - 5 Juli 2025: Ada update desain kaos resmi Karang Taruna 2025.

        DAFTAR KEGIATAN & ARTIKEL (data/kegiatan.json):
        - 17 Agustus 2025: Akan ada "GEBYAR MERDEKA 2025" untuk merayakan HUT RI ke-80.
        - 17 Agustus 2024: Telah dilaksanakan "Semarak Kemerdekaan: Lomba 17 Agustus 2024" untuk memeriahkan HUT RI ke-79.
    `;

  // Ambil elemen-elemen dari HTML
  const sendBtn = document.getElementById("send-chat-btn");
  const chatInput = document.getElementById("chat-input");
  const chatWindow = document.getElementById("chat-window");
  const openBtn = document.getElementById("open-chatbot-btn");
  const closeBtn = document.getElementById("close-chatbot");
  const chatbotContainer = document.getElementById("chatbot-container");

  if (!sendBtn) return; // Hentikan jika elemen chatbot tidak ada

  // Fungsi buka/tutup chatbot
  openBtn.addEventListener("click", () => {
    chatbotContainer.style.display = "flex";
    openBtn.style.display = "none";
  });
  closeBtn.addEventListener("click", () => {
    chatbotContainer.style.display = "none";
    openBtn.style.display = "block";
  });

  // --- KOMPONEN 3: "JEMBATAN" PENGHUBUNG KE AI ---
  async function getAiResponse(userQuestion) {
    const prompt = `
            Anda adalah KartaBot, AI asisten dari Karang Taruna Banjarsari.
            Gunakan HANYA informasi dari 'KONTEKS' di bawah untuk menjawab pertanyaan.
            Jangan menjawab pertanyaan yang tidak ada dalam konteks. Jika informasi tidak ditemukan, jawab dengan sopan: "Maaf, saya hanya bisa menjawab pertanyaan seputar Karang Taruna Banjarsari."
            Jawablah dengan ramah, jelas, dan gunakan Bahasa Indonesia.

            KONTEKS:
            ${KNOWLEDGE_BASE}

            PERTANYAAN PENGGUNA:
            "${userQuestion}"
        `;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      });

      if (!response.ok) {
        return "Maaf, sepertinya ada sedikit gangguan. Coba lagi beberapa saat ya.";
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Gagal menghubungi AI:", error);
      return "Terjadi kesalahan koneksi. Pastikan internet Anda stabil.";
    }
  }

  const handleSendMessage = async () => {
    const question = chatInput.value.trim();
    if (!question) return;

    addMessageToWindow(question, "user-message");
    chatInput.value = "";

    addMessageToWindow("Sedang mengetik...", "bot-message", true); // Indikator loading

    const answer = await getAiResponse(question);

    document.getElementById("loading-indicator")?.remove(); // Hapus indikator loading
    addMessageToWindow(answer, "bot-message");
  };

  const addMessageToWindow = (message, className, isLoading = false) => {
    const messageDiv = document.createElement("div");
    messageDiv.className = className;
    messageDiv.textContent = message;
    if (isLoading) {
      messageDiv.id = "loading-indicator";
    }
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  };

  sendBtn.addEventListener("click", handleSendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  });
});
