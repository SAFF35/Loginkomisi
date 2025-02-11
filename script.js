document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Ambil nilai input
    const kodeid = document.getElementById("kodeid").value.trim();
    const password = document.getElementById("password").value.trim();

    if (kodeid === "" || password === "") {
      alert("Kode ID dan Password harus diisi!");
      return;
    }

    // URL Google Apps Script – Ganti YOUR_DEPLOYED_SCRIPT_ID dengan ID deploy web app Anda!
    const scriptURL = "https://script.google.com/macros/s/AKfycbyqa3H9xysGUj3quFv53palb3a4XErvKmyiJHgTJX2MkmjDhP9do78M3OdSrqBzOT1M/exec";

    // Susun URL dengan parameter action, kodeid, dan password
    const url = scriptURL +
      "?action=login&kodeid=" + encodeURIComponent(kodeid) +
      "&password=" + encodeURIComponent(password);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          displayData(data.data);
        } else {
          alert(data.message || "Login gagal!");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat koneksi ke server.");
      });
  });

  // Tombol HOME menuju URL utama
  const homeBtn = document.getElementById("homeBtn");
  homeBtn.addEventListener("click", function () {
    window.location.href = "https://SAFF35.github.io/";
  });
});

function displayData(userData) {
  // Sembunyikan kontainer login dan tampilkan kontainer data
  document.getElementById("loginContainer").style.display = "none";
  const dataContainer = document.getElementById("dataContainer");
  dataContainer.style.display = "block";

  // Set judul untuk WD
  document.getElementById("dataTitle").innerText = "Komisi dan Bonus";

  // Buat tabel untuk menampilkan data dengan label dan nilai
  const table = document.createElement("table");
  table.className = "table-data";

  // Urutan field sesuai dengan data di Google Sheet (Password tidak ditampilkan)
  const fieldsOrder = [
    "Kode ID",
    "Tgl Bergabung",
    "Nama",
    "Pengundang",
    "WA Pengundang",
    "Kode Produk",
    "Poin Produk",
    "Poin Sebelumnya",
    "Anggota Generasi 1",
    "Poin Generasi 1",
    "Komisi Generasi 1",
    "Anggota Generasi 2-10",
    "Poin Generasi 2",
    "Komisi Generasi 2-10",
    "Jumlah Komisi",
    "Bonus Spesial 1",
    "Bonus Spesial 2",
    "Bonus Spesial 3",
    "Bonus Spesial 4",
    "Bonus Spesial 5",
    "Total Komisi+Bonus",
    "Pencairan Sebelumnya",
    "Pencairan Baru",
    "Tgl Pencairan",
    "Jumlah Pencairan",
    "Jumlah Komisi+Bonus",
    "Bonus Tambahan 1",
    "Bonus Tambahan 2",
    "Bonus Tambahan 3"
  ];

  fieldsOrder.forEach(function (field) {
    const tr = document.createElement("tr");

    // Kolom label
    const th = document.createElement("th");
    th.innerText = field;
    // Kolom titik dua (dengan lebar tetap agar sejajar)
    const tdColon = document.createElement("td");
    tdColon.innerText = ":";
    tdColon.style.width = "10px";
    // Kolom nilai
    const tdValue = document.createElement("td");
    tdValue.innerText = userData[field] || "";

    tr.appendChild(th);
    tr.appendChild(tdColon);
    tr.appendChild(tdValue);
    table.appendChild(tr);
  });

  // Masukkan tabel ke dalam kontainer data
  document.getElementById("dataContent").appendChild(table);
}
