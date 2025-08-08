// // File: js/chatbot_sederhana.js (Versi Perbaikan untuk Turbo)

// document.addEventListener("turbo:load", () => {
//   // --- KOMPONEN 1: PENGATURAN DASAR ---
//   // --- ini adalah api google gemini---
//   const GOOGLE_AI_API_KEY = "AIzaSyApjIgQTu2rYY0h-tcDviFLerXb61WIR8s";
//   const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GOOGLE_AI_API_KEY}`;

//   const KNOWLEDGE_BASE = `
//        INFORMASI UMUM ORGANISASI:
//         - Nama Organisasi: Karang Taruna Banjarsari, Temanggung.
//         - Deskripsi: Organisasi kepemudaan sebagai wadah bagi generasi muda untuk berkembang, berkreasi, dan berkontribusi secara positif bagi masyarakat Desa Banjarsari.
//         - Visi: Menjadi organisasi pemuda yang mandiri, kreatif, inovatif, dan menjadi pilar utama dalam Pembudayaan Desa dan pembangunan kesejahteraan sosial di Desa Banjarsari.
//         - Misi: Mengembangkan potensi pemuda, menyelenggarakan kegiatan sosial, keagamaan, kesenian, dan olahraga, membangun kemitraan, serta menjaga kelestarian lingkungan dan kearifan lokal.
//         - Alamat Sekretariat: Q5RQ+5R5, Unnamed Road, Banjarsari, Kec. Kandangan, Kabupaten Temanggung, Jawa Tengah 56281.
//         - Email: karangtaruna.banjarsari@email.com.
//         - Sosial Media: Instagram @kartarbanjarr.

//         ---

//         DETAIL LENGKAP ACARA "GEBYAR MERDEKA 17 AGUSTUS 2025":

//         1. Informasi Umum Acara:
//            - Nama Resmi Acara: "GEBYAR MERDEKA 17 AGUSTUS 2025", juga disebut "RUNDOWN ACARA KEMERDEKAAN" atau "PERLOMBAAN 17 AGUSTUS 2025".
//            - Penyelenggara: Karang Taruna Dusun Banjarsari.
//            - Tanggal Pelaksanaan: 13, 14, dan 15 Agustus 2025.
//            - Lokasi: Lapangan Bola Voly Banjarsari dan Aula Balai Desa Banjarsari.
//            - Tema: Perayaan Dirgahayu ke-80 Republik Indonesia.

//         2. Daftar Lengkap Perlombaan:
//            - Kategori Anak-anak: Balap Karung, Estafet Air, Estafet Kelereng, Futsal (tim 5 orang, SMP ke bawah), Kuk Jeru (atau Mpok Jeru), Makan kerupuk, Tiup Gelas Plastik, Ular Tangga Suit.
//            - Kategori Dewasa: Bola Voli (PA/PI), Bulu Tangkis Blabak (Singel Khusus Putri, Ganda Putra, Ganda Campuran), Catur, Estafet Air, Gapyak, Gobak Sodor (atau Cobak Sodor), Karaoke Duet (Lagu Bebas), Makan Kerupuk, Tenis Meja.

//         3. Jadwal Rinci Harian:
//            - Rabu, 13 Agustus 2025:
//              - Sesi Siang (14:00 - Selesai): Lomba Makan Kerupuk, Estafet Air, Estafet Kelereng, Futsal Anak(smp ke bawah).
//              - Sesi Malam (19:00 - Selesai): Catur (PI), Tenis Meja (PI).
//               lokasi lokasi lapangan voly banjarsari dan aula desa banjarsari
//            - Kamis, 14 Agustus 2025:
//              - Sesi Siang (14:00 - Selesai): Ular Tangga Suit, Mpok Jeru, Balap Karung, Tiup Gelas Plastik, Gapyak (PA/PI), Cobak Sodor (PA/PI).
//              lokasi lapangan bola voly banjarsari
//            - Jumat, 15 Agustus 2025:
//              - Sesi Siang (14:00 - Selesai): Bola Voly (PA/PI), Balap Karung.
//              - Sesi Malam (19:00 - Selesai): Bulu Tangkis Blabak (Singel Khusus Putri, Ganda Putra, Ganda Campuran).
//              lokasi lokasi lapangan voly banjarsari dan aula desa banjarsari

//         4. Informasi Hadiah:
//            - Hadiah akan diberikan untuk Juara 1, 2, dan 3 pada kategori Lomba Anak-Anak.
//            - Akan ada penentuan Juara Umum untuk Lomba Antar RT.

//         5. Catatan Penting (Perbedaan Informasi):
//            - Jadwal Balap Karung tercatat di dua hari berbeda (Kamis 14 Agustus dan Jumat 15 Agustus). Mohon konfirmasi lebih lanjut.
//            - Kategori Catur & Tenis Meja memiliki info berbeda (ada yang menyebut khusus Putri, ada yang umum).
//            - Jadwal Karaoke Duet belum tercantum secara spesifik di rundown harian.
//            - Terdapat variasi ejaan nama lomba seperti Kuk Jeru/Mpok Jeru dan Gobak Sodor/Cobak Sodor.

//         ---

//         STRUKTUR ORGANISASI LENGKAP:
//         PENGURUS INTI:
//         - Penasehat: Sunirman, S.Ag (No. Telepon: [kosong])
//         - Penanggung Jawab: Suryono, S.Pd (No. Telepon: [kosong])
//         - Ketua: Andri Apriyanto (No. Telepon: [kosong])
//         - Wakil: Yunita Sari (No. Telepon: [kosong])
//         - Sekretaris: Dimas Suryo L. (No. Telepon: [kosong])
//         - Bendahara: Yudi Arum S. (No. Telepon: [kosong])

//         BIDANG-BIDANG:
//         1. Bidang Sosial: Koordinator: Isrofi (No. Telepon: [kosong]), Anggota: Mulyono, Mas Udi, Nana Mustakimah, Sifa Amadea P.
//         2. Bidang Perekonomian: Koordinator: Dani Indri S. (No. Telepon: [kosong]), Anggota: Tri Arifin, Harniyati, Amalis Saliyati.
//         3. Bidang Olahraga & Seni Budaya: Koordinator: M. Ardan Maulana (No. Telepon: [kosong]), Anggota: Satria Nindy W., Iswanto heru, Wisnu, Puput.
//         4. Bidang Media: Koordinator: Haidar Daffa (No. Telepon: [kosong]), Anggota: Azizah Melan, Indra Kurniawan.
//         5. Bidang Lingkungan & Kebersihan: Koordinator: Yogi Ivan (No. Telepon: [kosong]), Anggota: Ibnu, Adit, Rezel, Jojo.
//         6. Bidang Agama Islam: Koordinator: Iswanto (No. Telepon: [kosong]), Anggota: Aji, Aifa Nurul A.
//         7. Bidang Agama Kristen: Koordinator: Margaretha (No. Telepon: [kosong]), Anggota: Amazia, Agatha, Nessa.
//         8. Bidang Keamanan: Koordinator: Budi Santoso (No. Telepon: [kosong]), Anggota: Rendi Sikun, Satria Juang W., Beni Nurhidayat, Sendi, Imas, Enggar.
//         9. Bidang Pendidikan: Koordinator: Arlin fatoni (No. Telepon: [kosong]), Anggota: Doni ismail.
//         10. Bidang Organisasi & Kaderisasi: Koordinator: Ari (No. Telepon: [kosong]), Anggota: Titik, M. Nur Fauzi.

//         ---

//         NARAHUBUNG UTAMA:
//         - Andri Apri (Ketua Umum): Info umum & kerja sama. WA: 6285712414558.
//         - Yunita (Wakil Ketua): Info umum & kegiatan. WA: 6288233496802.
//         - Amaz (Admin Website): Laporan bug/saran website. WA: 6285876983793.
//     `;

//   // Ambil elemen-elemen dari HTML
//   const sendBtn = document.getElementById("send-chat-btn");
//   const chatInput = document.getElementById("chat-input");
//   const chatWindow = document.getElementById("chat-window");
//   const openBtn = document.getElementById("open-chatbot-btn");
//   const closeBtn = document.getElementById("close-chatbot");
//   const chatbotContainer = document.getElementById("chatbot-container");

//   if (!sendBtn) return; // Hentikan jika elemen chatbot tidak ada

//   // Fungsi buka/tutup chatbot
//   openBtn.addEventListener("click", () => {
//     chatbotContainer.style.display = "flex";
//     openBtn.style.display = "none";
//   });
//   closeBtn.addEventListener("click", () => {
//     chatbotContainer.style.display = "none";
//     openBtn.style.display = "block";
//   });

//   // --- KOMPONEN 3: "JEMBATAN" PENGHUBUNG KE AI ---
//   async function getAiResponse(userQuestion) {
//     const prompt = `
// Anda adalah KartaBot, sebuah AI partner yang analitis, proaktif, dan super cerdas untuk Karang Taruna Banjarsari. Misi Anda bukan hanya menjawab, tapi memberikan pemahaman yang utuh dan menyeluruh (holistik) kepada pengguna.

// ================================
// PRINSIP KECERDASAN UTAMA (WAJIB DIIKUTI)
// ================================

// 1.  **BERPIKIR, JANGAN HANYA MENCARI (Prinsip Inferensi & Penalaran):**
//     * Tugas Anda adalah menghubungkan beberapa informasi terpisah dari 'KONTEKS' untuk menjawab pertanyaan yang jawabannya tidak tertulis secara langsung.
//     * **Skenario Wajib:** Jika 'KONTEKS' berisi: [Fakta A: "Acara 17an diadakan hari Sabtu."] dan [Fakta B: "Pendaftaran semua acara ditutup H-1."], maka saat pengguna bertanya "Kapan terakhir daftar acara 17an?", Anda HARUS mampu menyimpulkan jawabannya adalah **hari Jumat**. Jangan bilang "tidak ada info pendaftaran", tapi hubungkan kedua fakta tersebut.

// 2.  **SINTESIS INFORMASI, BERIKAN GAMBARAN BESAR (Prinsip Sintesis):**
//     * Jika pengguna bertanya pertanyaan yang bersifat umum (contoh: "Apa saja program kerja Karang Taruna?"), jangan hanya membuang semua data mentah.
//     * Anda HARUS **mengelompokkan dan merangkum** informasi tersebut ke dalam kategori yang logis (misal: "Program Bidang Olahraga", "Program Bidang Sosial", "Program Kewirausahaan"). Sajikan sebagai ringkasan yang mudah dipahami.

// 3.  **JADILAH PROAKTIF, ANTISIPASI KEBUTUHAN (Prinsip Proaktif):**
//     * Setelah berhasil menjawab pertanyaan pengguna, pikirkan: "Informasi apa lagi yang kemungkinan besar akan dia butuhkan setelah ini?"
//     * Tawarkan bantuan lebih lanjut secara spesifik.
//     * **Contoh:** Setelah menjelaskan detail sebuah acara, tutup jawaban Anda dengan, "Informasi acaranya sudah jelas, ya. Mau aku jelaskan juga cara pendaftarannya atau siapa narahubungnya?"

// 4.  **TANGANI KETIDAKPASTIAN DENGAN CERDAS:**
//     * Jika pertanyaan kurang jelas, gunakan **Prinsip #1** untuk mencari jawaban yang paling relevan. Awali dengan "Mungkin yang kamu maksud adalah...".
//     * Jika informasi benar-benar tidak ada dan tidak bisa disimpulkan, barulah gunakan jawaban fallback: "Wah, maaf banget, untuk informasi spesifik itu sepertinya belum ada di database KartaBot. Aku sudah coba cari dan hubungkan info yang ada, tapi belum ketemu. Ada lagi yang bisa aku bantu cek dari program Karang Taruna Banjarsari?"

// ================================
// FORMAT & GAYA PENYAJIAN
// ================================

// * **Gaya Bahasa:** Tetap santai, positif, dan cerdas. Tunjukkan bahwa Anda adalah partner berpikir, bukan sekadar mesin.
// * **Format Jawaban (PENTING):** Selalu gunakan format terstruktur (bullet points, numbering, bold) untuk menyajikan data, kesimpulan, atau ringkasan agar sangat mudah dibaca.
// * **Panduan Penggunaan Emoji (Lengkap & Strategis):** Gunakan emoji secara cerdas untuk memperkuat nada dan pesan Anda. Ini palet Anda:
//     * **Sapaan & Umum:** 👋, 😊, Halo!, Hai!
//     * **Saat Berpikir & Menganalisis:** 🤔, 🧐, 🧠, 💡 (saat menemukan ide)
//     * **Menjelaskan & Menekankan Poin:** 👉, ✅, 📌, 📋, 🎯, ✨
//     * **Semangat & Motivasi:** 🔥, 🚀, 💪, 🇮🇩
//     * **Kerja Sama & Komunitas:** 🤝, 🙌
//     * **Keberhasilan & Perayaan:** 🎉, 🥳, 👍, Keren!
//     * **Saat Tidak Menemukan Jawaban:** 😅, 🙏, 🙇‍♂️, 🤷‍♀️

// Tujuan akhir Anda adalah menjadi partner digital yang tidak ternilai, yang membuat setiap interaksi terasa mencerahkan dan efisien.

//             ${KNOWLEDGE_BASE}

//             "${userQuestion}"
//         `;

//     try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
//       });

//       if (!response.ok) {
//         return "Maaf, sepertinya ada sedikit gangguan. Coba lagi beberapa saat ya.";
//       }

//       const data = await response.json();
//       return data.candidates[0].content.parts[0].text;
//     } catch (error) {
//       console.error("Gagal menghubungi AI:", error);
//       return "Terjadi kesalahan koneksi. Pastikan internet Anda stabil.";
//     }
//   }

//   const handleSendMessage = async () => {
//     const question = chatInput.value.trim();
//     if (!question) return;

//     addMessageToWindow(question, "user-message");
//     chatInput.value = "";

//     addMessageToWindow("Sedang mengetik...", "bot-message", true); // Indikator loading

//     const answer = await getAiResponse(question);

//     document.getElementById("loading-indicator")?.remove(); // Hapus indikator loading
//     addMessageToWindow(answer, "bot-message");
//   };

//   const addMessageToWindow = (message, className, isLoading = false) => {
//     const messageDiv = document.createElement("div");
//     messageDiv.className = className;
//     messageDiv.textContent = message;
//     if (isLoading) {
//       messageDiv.id = "loading-indicator";
//     }
//     chatWindow.appendChild(messageDiv);
//     chatWindow.scrollTop = chatWindow.scrollHeight;
//   };

//   sendBtn.addEventListener("click", handleSendMessage);
//   chatInput.addEventListener("keypress", (e) => {
//     if (e.key === "Enter") {
//       handleSendMessage();
//     }
//   });
// });

//__________________________________________________________________________________________________________________________________________________________
// File: js/chatbot_sederhana.js (Versi dengan DeepSeek API)

// --- KOMPONEN 1: PENGATURAN DASAR (DIUBAH UNTUK DEEPSEEK) ---
document.addEventListener("turbo:load", () => {
  const DEEPSEEK_API_KEY = "sk-fcf076aa559c4100a1fa478d3b0855dd";
  const API_URL = "https://api.deepseek.com/v1/chat/completions";

  // --- KOMPONEN 2: "PENGETAHUAN" WEBSITE (TETAP SAMA) ---
  const KNOWLEDGE_BASE = `
        - Nama Organisasi: Karang Taruna Banjarsari, Temanggung.
        - Deskripsi: Organisasi kepemudaan sebagai wadah bagi generasi muda untuk berkembang, berkreasi, dan berkontribusi secara positif bagi masyarakat Desa Banjarsari.
        - Visi: Menjadi organisasi pemuda yang mandiri, kreatif, inovatif, dan menjadi pilar utama dalam Pembudayaan Desa dan pembangunan kesejahteraan sosial di Desa Banjarsari.
        - Misi: Mengembangkan potensi pemuda, menyelenggarakan kegiatan sosial, keagamaan, kesenian, dan olahraga, membangun kemitraan, serta menjaga kelestarian lingkungan dan kearifan lokal.
        - Alamat Sekretariat: Q5RQ+5R5, Unnamed Road, Banjarsari, Kec. Kandangan, Kabupaten Temanggung, Jawa Tengah 56281.
        - Email: karangtaruna.banjarsari@email.com.
        - Sosial Media: Instagram @kartarbanjarr.

        ---

        DETAIL LENGKAP ACARA "GEBYAR MERDEKA 17 AGUSTUS 2025":

        1. Informasi Umum Acara:
           - Nama Resmi Acara: "GEBYAR MERDEKA 17 AGUSTUS 2025", juga disebut "RUNDOWN ACARA KEMERDEKAAN" atau "PERLOMBAAN 17 AGUSTUS 2025".
           - Penyelenggara: Karang Taruna Dusun Banjarsari.
           - Tanggal Pelaksanaan: 13, 14, dan 15 Agustus 2025.
           - Lokasi: Lapangan Bola Voly Banjarsari dan Aula Balai Desa Banjarsari.
           - Tema: Perayaan Dirgahayu ke-80 Republik Indonesia.

        2. Daftar Lengkap Perlombaan:
           - Kategori Anak-anak: Balap Karung, Estafet Air, Estafet Kelereng, Futsal (tim 5 orang, SMP ke bawah), Kuk Jeru (atau Mpok Jeru), Makan kerupuk, Tiup Gelas Plastik, Ular Tangga Suit.
           - Kategori Dewasa: Bola Voli (PA/PI), Bulu Tangkis Blabak (Singel Khusus Putri, Ganda Putra, Ganda Campuran), Catur, Estafet Air, Gapyak, Gobak Sodor (atau Cobak Sodor), Karaoke Duet (Lagu Bebas), Makan Kerupuk, Tenis Meja.

        3. Jadwal Rinci Harian:
           - Rabu, 13 Agustus 2025:
             - Sesi Siang (14:00 - Selesai): Lomba Makan Kerupuk, Estafet Air, Estafet Kelereng, Futsal Anak.
             - Sesi Malam (19:00 - Selesai): Catur (PI), Tenis Meja (PI).
           - Kamis, 14 Agustus 2025:
             - Sesi Siang (14:00 - Selesai): Ular Tangga Suit, Mpok Jeru, Balap Karung, Tiup Gelas Plastik, Gapyak (PA/PI), Cobak Sodor (PA/PI).
           - Jumat, 15 Agustus 2025:
             - Sesi Siang (14:00 - Selesai): Bola Voly (PA/PI), Balap Karung.
             - Sesi Malam (19:00 - Selesai): Bulu Tangkis Blabak (Singel Khusus Putri, Ganda Putra, Ganda Campuran).

        4. Informasi Hadiah:
           - Hadiah akan diberikan untuk Juara 1, 2, dan 3 pada kategori Lomba Anak-Anak.
           - Akan ada penentuan Juara Umum untuk Lomba Antar RT.

        5. Catatan Penting (Perbedaan Informasi):
           - Jadwal Balap Karung tercatat di dua hari berbeda (Kamis 14 Agustus dan Jumat 15 Agustus). Mohon konfirmasi lebih lanjut.
           - Kategori Catur & Tenis Meja memiliki info berbeda (ada yang menyebut khusus Putri, ada yang umum).
           - Jadwal Karaoke Duet belum tercantum secara spesifik di rundown harian.
           - Terdapat variasi ejaan nama lomba seperti Kuk Jeru/Mpok Jeru dan Gobak Sodor/Cobak Sodor.

        ---

        STRUKTUR ORGANISASI LENGKAP:
        PENGURUS INTI:
        - Penasehat: Sunirman, S.Ag (No. Telepon: [kosong])
        - Penanggung Jawab: Suryono, S.Pd (No. Telepon: [kosong])
        - Ketua: Andri Apriyanto (No. Telepon: [kosong])
        - Wakil: Yunita Sari (No. Telepon: [kosong])
        - Sekretaris: Dimas Suryo L. (No. Telepon: [])
        - Bendahara: Yudi Arum S. (No. Telepon: [kosong])

        BIDANG-BIDANG:
        1. Bidang Sosial: Koordinator: Isrofi (No. Telepon: [kosong]), Anggota: Mulyono, Mas Udi, Nana Mustakimah, Sifa Amadea P.
        2. Bidang Perekonomian: Koordinator: Dani Indri S. (No. Telepon: [kosong]), Anggota: Tri Arifin, Harniyati, Amalis Saliyati.
        3. Bidang Olahraga & Seni Budaya: Koordinator: M. Ardan Maulana (No. Telepon: [kosong]), Anggota: Satria Nindy W., Iswanto heru, Wisnu, Puput.
        4. Bidang Media: Koordinator: Haidar Daffa (No. Telepon: [kosong]), Anggota: Azizah Melan, Indra Kurniawan.
        5. Bidang Lingkungan & Kebersihan: Koordinator: Yogi Ivan (No. Telepon: [kosong]), Anggota: Ibnu, Adit, Rezel, Jojo.
        6. Bidang Agama Islam: Koordinator: Iswanto (No. Telepon: [kosong]), Anggota: Aji, Aifa Nurul A.
        7. Bidang Agama Kristen: Koordinator: Margaretha (No. Telepon: [kosong]), Anggota: Amazia, Agatha, Nessa.
        8. Bidang Keamanan: Koordinator: Budi Santoso (No. Telepon: [kosong]), Anggota: Rendi Sikun, Satria Juang W., Beni Nurhidayat, Sendi, Imas, Enggar.
        9. Bidang Pendidikan: Koordinator: Arlin fatoni (No. Telepon: [kosong]), Anggota: Doni ismail.
        10. Bidang Organisasi & Kaderisasi: Koordinator: Ari (No. Telepon: [kosong]), Anggota: Titik, M. Nur Fauzi.

        ---

        NARAHUBUNG UTAMA:
        - Andri Apri (Ketua Umum): Info umum & kerja sama. WA: 6285712414558.
        - Yunita (Wakil Ketua): Info umum & kegiatan. WA: 6288233496802.
        - Amaz (Admin Website): Laporan bug/saran website. WA: 6285876983793.
    `;

  // Ambil elemen-elemen dari HTML
  const sendBtn = document.getElementById("send-chat-btn");
  const chatInput = document.getElementById("chat-input");
  const chatWindow = document.getElementById("chat-window");
  const openBtn = document.getElementById("open-chatbot-btn");
  const closeBtn = document.getElementById("close-chatbot");
  const chatbotContainer = document.getElementById("chatbot-container");

  if (!sendBtn) return;

  openBtn.addEventListener("click", () => {
    chatbotContainer.style.display = "flex";
    openBtn.style.display = "none";
  });
  closeBtn.addEventListener("click", () => {
    chatbotContainer.style.display = "none";
    openBtn.style.display = "block";
  });

  // --- KOMPONEN 3: "JEMBATAN" PENGHUBUNG KE AI (DIUBAH UNTUK DEEPSEEK) ---
  async function getAiResponse(userQuestion) {
    // Instruksi sistem untuk AI
    const system_prompt = `
Anda adalah KartaBot, sebuah AI partner yang analitis, proaktif, dan super cerdas untuk Karang Taruna Banjarsari. Misi Anda bukan hanya menjawab, tapi memberikan pemahaman yang utuh dan menyeluruh (holistik) kepada pengguna.

================================
PRINSIP KECERDASAN UTAMA (WAJIB DIIKUTI)
================================

1.  **BERPIKIR, JANGAN HANYA MENCARI (Prinsip Inferensi & Penalaran):**
    * Tugas Anda adalah menghubungkan beberapa informasi terpisah dari 'KONTEKS' untuk menjawab pertanyaan yang jawabannya tidak tertulis secara langsung.
    * **Skenario Wajib:** Jika 'KONTEKS' berisi: [Fakta A: "Acara 17an diadakan hari Sabtu."] dan [Fakta B: "Pendaftaran semua acara ditutup H-1."], maka saat pengguna bertanya "Kapan terakhir daftar acara 17an?", Anda HARUS mampu menyimpulkan jawabannya adalah **hari Jumat**. Jangan bilang "tidak ada info pendaftaran", tapi hubungkan kedua fakta tersebut.

2.  **SINTESIS INFORMASI, BERIKAN GAMBARAN BESAR (Prinsip Sintesis):**
    * Jika pengguna bertanya pertanyaan yang bersifat umum (contoh: "Apa saja program kerja Karang Taruna?"), jangan hanya membuang semua data mentah.
    * Anda HARUS **mengelompokkan dan merangkum** informasi tersebut ke dalam kategori yang logis (misal: "Program Bidang Olahraga", "Program Bidang Sosial", "Program Kewirausahaan"). Sajikan sebagai ringkasan yang mudah dipahami.

3.  **JADILAH PROAKTIF, ANTISIPASI KEBUTUHAN (Prinsip Proaktif):**
    * Setelah berhasil menjawab pertanyaan pengguna, pikirkan: "Informasi apa lagi yang kemungkinan besar akan dia butuhkan setelah ini?"
    * Tawarkan bantuan lebih lanjut secara spesifik.
    * **Contoh:** Setelah menjelaskan detail sebuah acara, tutup jawaban Anda dengan, "Informasi acaranya sudah jelas, ya. Mau aku jelaskan juga cara pendaftarannya atau siapa narahubungnya?"

4.  **TANGANI KETIDAKPASTIAN DENGAN CERDAS:**
    * Jika pertanyaan kurang jelas, gunakan **Prinsip #1** untuk mencari jawaban yang paling relevan. Awali dengan "Mungkin yang kamu maksud adalah...".
    * Jika informasi benar-benar tidak ada dan tidak bisa disimpulkan, barulah gunakan jawaban fallback: "Wah, maaf banget, untuk informasi spesifik itu sepertinya belum ada di database KartaBot. Aku sudah coba cari dan hubungkan info yang ada, tapi belum ketemu. Ada lagi yang bisa aku bantu cek dari program Karang Taruna Banjarsari?"

================================
FORMAT & GAYA PENYAJIAN
================================

* **Gaya Bahasa:** Tetap santai, positif, dan cerdas. Tunjukkan bahwa Anda adalah partner berpikir, bukan sekadar mesin.
* **Format Jawaban (PENTING):** Selalu gunakan format terstruktur (bullet points, numbering, bold) untuk menyajikan data, kesimpulan, atau ringkasan agar sangat mudah dibaca.
* **Panduan Penggunaan Emoji (Lengkap & Strategis):** Gunakan emoji secara cerdas untuk memperkuat nada dan pesan Anda. Ini palet Anda:
    * **Sapaan & Umum:** 👋, 😊, Halo!, Hai!
    * **Saat Berpikir & Menganalisis:** 🤔, 🧐, 🧠, 💡 (saat menemukan ide)
    * **Menjelaskan & Menekankan Poin:** 👉, ✅, 📌, 📋, 🎯, ✨
    * **Semangat & Motivasi:** 🔥, 🚀, 💪, 🇮🇩
    * **Kerja Sama & Komunitas:** 🤝, 🙌
    * **Keberhasilan & Perayaan:** 🎉, 🥳, 👍, Keren!
    * **Saat Tidak Menemukan Jawaban:** 😅, 🙏, 🙇‍♂️, 🤷‍♀️

Tujuan akhir Anda adalah menjadi partner digital yang tidak ternilai, yang membuat setiap interaksi terasa mencerahkan dan efisien.
`;

    // Pertanyaan pengguna digabung dengan konteks
    const user_prompt = `
            KONTEKS:
            ${KNOWLEDGE_BASE}

            PERTANYAAN SAYA:
            "${userQuestion}"
        `;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`, // Format otorisasi diubah
        },
        body: JSON.stringify({
          model: "deepseek-chat", // Model yang digunakan
          messages: [
            { role: "system", content: system_prompt },
            { role: "user", content: user_prompt },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        return `Maaf, terjadi kesalahan dari API: ${errorData.error.message}`;
      }

      const data = await response.json();
      // Cara mengambil jawaban dari DeepSeek API
      return data.choices[0].message.content;
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
    addMessageToWindow("Sedang mengetik...", "bot-message", true);

    const answer = await getAiResponse(question);

    document.getElementById("loading-indicator")?.remove();
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
