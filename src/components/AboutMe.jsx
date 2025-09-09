import React from "react";
import { FaCheckCircle, FaLeaf, FaTruck, FaHandsHelping, FaWhatsapp, FaStar, FaMapMarkerAlt, FaPhoneAlt, FaRegClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import dummy from "../assets/Kambing1.jpg";
import GoatMilkImage from "../assets/GoatMilk.jpg";

/**
 * Halaman "Tentang Kami" untuk bisnis Aqiqah & Susu Segar Mas Ali
 *
 * Catatan integrasi:
 * - Hindari import file gambar lokal agar aman saat build (Vercel/Linux case-sensitive). Gunakan URL eksternal atau kirim via props.
 * - Ubah konten sesuai kebutuhan melalui props atau langsung edit teks di bawah.
 */

export default function AboutUs({
    ownerName = "Mas Ali",
    brand = "Aqiqah & Susu Segar Mas Ali",
    phone = "+62 852-4118-0699",
    whatsappLink = "https://wa.me/6285241180699?text=Assalamu'alaikum%2C%20saya%20ingin%20tanya%20tentang%20aqiqah%20%2F%20susu.",
    locationText = "Mangasa, Gowa, Sulawesi Selatan, Indonesia",    
}) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-100 via-white to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="inline-block text-xs tracking-widest uppercase font-semibold text-green-700/80 bg-green-50 border border-green-200 rounded-full px-3 py-1 mb-4">Tentang Kami</p>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-slate-900">
                {brand}
              </h1>
              <p className="mt-5 text-lg md:text-xl text-slate-600 max-w-2xl">
                Melayani ibadah aqiqah yang sesuai sunnah serta menyediakan susu kambing murni, segar, higienis, dan 100% halal. Dikelola langsung oleh <span className="font-semibold text-slate-900">{ownerName}</span> untuk keluarga Anda.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/kambing" className="px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow">
                  Lihat Kambing
                </Link>
                <Link to="/susu" className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold shadow border border-slate-200">
                  Pesan Susu Segar
                </Link>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="px-5 py-3 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 font-semibold shadow border border-green-200 inline-flex items-center gap-2">
                  <FaWhatsapp /> Chat {ownerName}
                </a>
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                <div className="inline-flex items-center gap-2"><FaPhoneAlt className="opacity-70"/> {phone}</div>
                <div className="hidden sm:inline-flex items-center gap-2"><FaMapMarkerAlt className="opacity-70"/> {locationText}</div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg ring-1 ring-slate-200">
                {/* Gambar utama */}
                <img src={dummy} alt="Peternakan kambing" className="w-full h-full object-cover" />
              </div>
              <div className="hidden md:block absolute -bottom-6 -right-6 w-48 rounded-xl overflow-hidden shadow-lg ring-1 ring-slate-200">
                <img src={GoatMilkImage} alt="Susu kambing segar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nilai & Keunggulan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <FaCheckCircle className="text-green-600"/>,
              title: "Sesuai Syariat",
              desc: "Proses penyembelihan aqiqah mengikuti kaidah fiqih, insyaAllah sah & berkah.",
            },
            {
              icon: <FaLeaf className="text-green-600"/>,
              title: "Sehat & Higienis",
              desc: "Pakan terkontrol, kandang bersih, dan pemeriksaan rutin untuk menjaga kualitas.",
            },
            {
              icon: <FaTruck className="text-green-600"/>,
              title: "Antar Tepat Waktu",
              desc: "Pengantaran fleksibel untuk wilayah sekitar peternakan—bisa diatur sesuai jadwal.",
            },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center mb-3">{f.icon}</div>
              <h3 className="font-semibold text-lg text-slate-900">{f.title}</h3>
              <p className="mt-1 text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cerita Singkat */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Cerita Kami</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Berawal dari kecintaan {ownerName} pada ternak kambing dan niat membantu keluarga muslim melaksanakan ibadah aqiqah dengan mudah, kami membangun usaha yang mengedepankan kualitas, kejujuran, dan pelayanan. Kini, kami juga menyediakan susu kambing murni sebagai asupan harian yang menyehatkan.
          </p>
        </div>
      </section>

      {/* Statistik sederhana */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {label: "Tahun Berjalan", value: "3+"},
            {label: "Hewan Sehat", value: "150+"},
            {label: "Pesanan Aqiqah", value: "500+"},
            {label: "Pelanggan Puas", value: "4.9/5"},
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm ring-1 ring-slate-200">
              <div className="text-3xl font-extrabold text-slate-900">{s.value}</div>
              <div className="mt-1 text-slate-600 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimoni ringkas */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Apa Kata Mereka</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[1,2,3].map((i) => (
              <figure key={i} className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex items-center gap-1 text-yellow-500 mb-2">
                  {[...Array(5)].map((_, idx) => <FaStar key={idx} />)}
                </div>
                <blockquote className="text-slate-700">Semuanya rapi dan tepat waktu. Daging bersih, bumbu mantap, dan susunya segar sekali. Terima kasih {ownerName}!</blockquote>
                <figcaption className="mt-3 text-sm text-slate-500">— Pelanggan Aqiqah</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Pertanyaan yang Sering Diajukan</h2>
        <div className="mt-6 space-y-3">
          <details className="group bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200" open>
            <summary className="cursor-pointer font-semibold text-slate-900 flex items-center justify-between">
              Apakah penyembelihan sesuai syariat?
              <span className="ml-4 text-sm text-slate-500 group-open:hidden">(lihat)</span>
            </summary>
            <p className="mt-3 text-slate-600">InsyaAllah, proses dilakukan sesuai ketentuan fiqih oleh tim yang memahami tata cara penyembelihan.</p>
          </details>
          <details className="group bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
            <summary className="cursor-pointer font-semibold text-slate-900">Dapatkah pesan antar?</summary>
            <p className="mt-3 text-slate-600">Ya, kami melayani pengantaran ke area sekitar. Jadwal dan biaya antar dapat dikonfirmasi melalui WhatsApp.</p>
          </details>
          <details className="group bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
            <summary className="cursor-pointer font-semibold text-slate-900">Susu kambingnya harian?</summary>
            <p className="mt-3 text-slate-600">Susu diperah setiap hari, disimpan dingin, dan dikirim dalam kondisi segar. Tanpa bahan pengawet.</p>
          </details>
        </div>
      </section>

      {/* CTA */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl px-6 py-10 md:px-10 md:py-14 shadow-lg text-white">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h3 className="text-2xl md:text-3xl font-extrabold">Siap membantu aqiqah & kebutuhan susu keluarga Anda</h3>
                <p className="mt-2 text-white/90">Konsultasi gratis bersama {ownerName}. Kami bantu dari pemilihan hewan hingga pengantaran.</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link to="/kambing" className="px-5 py-3 bg-white text-green-700 font-semibold rounded-xl shadow hover:bg-slate-50">Pilih Paket Aqiqah</Link>
                  <Link to="/susu" className="px-5 py-3 bg-white/10 border border-white/40 text-white font-semibold rounded-xl shadow hover:bg-white/15">Pesan Susu</Link>
                </div>
              </div>
              <div className="bg-white/10 rounded-2xl p-5 md:p-6 border border-white/20">
                <div className="flex items-center gap-3 text-white">
                  <FaRegClock /> <span>Jam Layanan</span>
                </div>
                <div className="mt-2 text-white/90">Senin–Ahad 07.00–21.00 WITA</div>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-green-700 font-semibold rounded-xl shadow">
                  <FaWhatsapp/> Chat via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lokasi (teks, bisa diganti embed peta) */}
      <section className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Lokasi</h2>
          <p className="mt-2 text-slate-600">{locationText}</p>
          <div className="mt-4 text-sm text-slate-500">*Butuh pin Maps? Tambahkan embed peta Google di sini.</div>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-sm text-slate-500">
        © {new Date().getFullYear()} {brand}. Dikelola oleh {ownerName}.
      </footer>
    </main>
  );
}
