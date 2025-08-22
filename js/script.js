document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todoForm");
  const taskInput = document.getElementById("task");
  const dateInput = document.getElementById("date");
  const todoList = document.getElementById("todoList"); // <tbody>
  const searchInput = document.getElementById("search");
  const clearAllBtn = document.getElementById("clearAll");

  function showEmptyMessage() {
    // kosongkan tbody lalu isi pesan default
    todoList.replaceChildren();
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 4;
    cell.style.textAlign = "center";
    cell.textContent = "Belum ada kegiatan";
    row.appendChild(cell);
    todoList.appendChild(row);
  }

  // panggil sekali di awal (kalau belum ada data)
  if (todoList.children.length === 0) showEmptyMessage();

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const task = taskInput.value.trim();
    const date = dateInput.value;

    if (task === "" || date === "") {
      alert("Harap isi kegiatan dan tanggal!");
      return;
    }

    // jika masih ada placeholder "Belum ada kegiatan", hapus dulu
    if (
      todoList.children.length === 1 &&
      todoList.children[0].textContent.includes("Belum ada")
    ) {
      todoList.innerHTML = "";
    }

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${task}</td>
      <td>${date}</td>
      <td><span class="status belum">Belum selesai</span></td>
      <td>
        <button class="delete-btn" type="button">Hapus</button>
        <button class="toggle-btn" type="button">Ubah Status</button>
      </td>
    `;

    // hapus 1 baris
    row.querySelector(".delete-btn").addEventListener("click", function () {
      row.remove();
      if (todoList.children.length === 0) showEmptyMessage();
    });

    // toggle status
    row.querySelector(".toggle-btn").addEventListener("click", function () {
      const statusSpan = row.querySelector(".status");
      if (statusSpan.classList.contains("belum")) {
        statusSpan.textContent = "Selesai";
        statusSpan.classList.remove("belum");
        statusSpan.classList.add("selesai");
      } else {
        statusSpan.textContent = "Belum selesai";
        statusSpan.classList.remove("selesai");
        statusSpan.classList.add("belum");
      }
    });

    todoList.appendChild(row);
    taskInput.value = "";
    dateInput.value = "";
  });

  // filter by teks
  searchInput.addEventListener("keyup", function () {
    const filter = searchInput.value.toLowerCase();
    const rows = todoList.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
      const td = rows[i].getElementsByTagName("td")[0];
      if (td) {
        const textValue = td.textContent || td.innerText;
        rows[i].style.display = textValue.toLowerCase().includes(filter) ? "" : "none";
      }
    }
  });

  // HAPUS SEMUA
  clearAllBtn.addEventListener("click", function (e) {
    e.preventDefault();        
    searchInput.value = "";    
    showEmptyMessage();        
    clearAllBtn.blur();        
  });
});
