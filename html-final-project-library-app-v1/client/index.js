let currentPage = 'home';
let currentBook = null;
let books = [];

const main = document.querySelector('main');

const pageListMainContent = `<h2 class="text-2xl font-bold mb-4">Daftar Buku Perpustakaan</h2>

<table class="min-w-full border border-gray-300">
  <thead>
    <tr>
      <th class="px-6 py-3 bg-gray-100 border-b text-left">Judul</th>
      <th class="px-6 py-3 bg-gray-100 border-b text-left">Penulis</th>
      <th class="px-6 py-3 bg-gray-100 border-b text-left">Tahun Terbit</th>
      <th class="px-6 py-3 bg-gray-100 border-b text-left">Jumlah</th>
      <th class="px-6 py-3 bg-gray-100 border-b text-center">Action</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>`;

const pageEditBookMainContent = `<h2 class="text-2xl font-bold mb-4">Edit Buku</h2>

<form class="max-w-sm mx-auto" onsubmit="return handleEditForm(event)">
</form>
`;

const pageAddBookMainContent = `<h2 class="text-2xl font-bold mb-4">Tambah Buku</h2>

<form class="max-w-sm mx-auto" onsubmit="return handleAddForm(event)">
  <div class="mb-4">
    <label for="title" class="block text-gray-700 font-semibold mb-2">Judul Buku</label>
    <input required type="text" id="title" name="title" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
  </div>
  <div class="mb-4">
    <label for="author" class="block text-gray-700 font-semibold mb-2">Penulis Buku</label>
    <input required type="text" id="author" name="author" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
  </div>
  <div class="mb-4">
    <label for="year" class="block text-gray-700 font-semibold mb-2">Tahun Terbit</label>
    <input required type="number" id="year" name="year" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
  </div>
  <div class="mb-4">
    <label for="quantity" class="block text-gray-700 font-semibold mb-2">Jumlah Stok</label>
    <input required type="number" id="quantity" name="quantity" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
  </div>
  <div class="flex justify-center">
    <input type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="Tambah Buku" />
  </div>
</form>
`;

async function handleClickEditButton(bookId) {
  try {
    const response = await fetch(`http://localhost:3333/books/${bookId}`);
    const data = await response.json();
    currentBook = data;

    currentPage = 'edit';
    loadPage();
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat mengambil data buku');
  }
}
async function handleClickDeleteButton(bookId) {
  try {
    // const confirmation = confirm('Apakah anda yakin ingin menghapus buku ini?');
    // if (!confirmation) {
    //   return;
    // }

    //panggil function deleteBook dengan parameter bookId
    // TODO: answer here
    const confirmation = confirm('Apakah anda yakin ingin menghapus buku ini?');
    if (!confirmation) {
      return;
    }
    const response = await fetch(`http://localhost:3333/books/${bookId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Gagal menghapus buku');
    }

    loadPage();
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat menghapus buku');
  }
}

async function handleEditForm(event) {
  try {
    // gunakan preventDefault untuk mencegah browser melakukan reload halaman
    // TODO: answer here

    /* 
      Ambil data dari form, simpan ke dalam variabel book
      bentuknya seperti ini:
      {
        title: 'example judul',
        author: 'example penulis',
        year: 2020,
        quantity: 10,
      }
    */
    // TODO: answer here

    // panggil function editBook dengan parameter book
    // TODO: answer here

    event.preventDefault(); // Gunakan preventDefault untuk mencegah browser melakukan reload halaman

    const form = event.target; // Dapatkan form dari event.target
    const title = form.title.value; // Dapatkan nilai input judul dari form
    const author = form.author.value; // Dapatkan nilai input penulis dari form
    const year = parseInt(form.year.value); // Dapatkan nilai input tahun dari form dan ubah ke tipe data number
    const quantity = parseInt(form.quantity.value); // Dapatkan nilai input kuantitas dari form dan ubah ke tipe data number

    const book = {
      title: title,
      author: author,
      year: year,
      quantity: quantity,
    }; // Simpan data buku dalam objek book

    await editBook(book);

    currentBook = null;

    currentPage = 'home';
    loadPage();
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat mengubah buku');
  }
}

async function handleAddForm(event) {
  try {
    // gunakan preventDefault untuk mencegah browser melakukan reload halaman
    // TODO: answer here

    /*
      Ambil data dari form, simpan ke dalam variabel book
      bentuknya seperti ini:
      {
        title: 'example judul',
        author: 'example penulis',
        year: 2020,
        quantity: 10,
      }
    */
    // TODO: answer here

    // panggil function addBook dengan parameter book
    // TODO: answer here
    event.preventDefault(); // Gunakan preventDefault untuk mencegah browser melakukan reload halaman

    const form = event.target; // Dapatkan form dari event.target
    const title = form.title.value; // Dapatkan nilai input judul dari form
    const author = form.author.value; // Dapatkan nilai input penulis dari form
    const year = parseInt(form.year.value); // Dapatkan nilai input tahun dari form dan ubah ke tipe data number
    const quantity = parseInt(form.quantity.value); // Dapatkan nilai input kuantitas dari form dan ubah ke tipe data number

    const book = {
      title: title,
      author: author,
      year: year,
      quantity: quantity,
    }; // Simpan data buku dalam objek book

    await addBook(book);


    currentPage = 'home';
    loadPage();
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat menambah buku');
  }
}

function handleClickAddNav() {
  // ubah currentPage menjadi 'add'
  // TODO: answer here
  currentPage = 'add';
  loadPage();
}

// add event listener click tag a didalam li dengan function handleClickAddNav
const navLinks = document.querySelectorAll('li a');
navLinks.forEach((navLink) => {
  navLink.addEventListener('click', handleClickAddNav);
  // TODO: answer here
});

function generateRows(books) {
  let rows = '';
  if (books.length === 0) {
    rows = `<tr>
   <td colspan="6" class="px-6 py-4 border-b text-center">Tidak ada buku yang ditemukan</td>
</tr>`;
  } else {
    /*
      looping books, untuk setiap book, buat row seperti ini:
      <tr class="book-item">
        <td class="px-6 py-4 border-b">Judul Buku</td>
        <td class="px-6 py-4 border-b">Penulis Buku</td>
        <td class="px-6 py-4 border-b">Tahun Terbit</td>
        <td class="px-6 py-4 border-b">Jumlah Stok</td>
        <td class="px-6 py-4 border-b text-center">
          <button class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="handleClickEditButton(BookId)">Edit</button>
          <button class="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onclick="handleClickDeleteButton(BookId)">Hapus</button>  
        </td>
      </tr>
      Jangan lupa untuk ganti BookId dengan id dari book yang sedang di looping
      simpan row yang dibuat ke variabel rows
    */

    // TODO: answer here
    rows = books
      .map((book) => {
        return `<tr class="book-item">
          <td class="px-6 py-4 border-b">${book.title}</td>
          <td class="px-6 py-4 border-b">${book.author}</td>
          <td class="px-6 py-4 border-b">${book.year}</td>
          <td class="px-6 py-4 border-b">${book.quantity}</td>
          <td class="px-6 py-4 border-b text-center">
            <button class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="handleClickEditButton(${book.id})">Edit</button>
            <button class="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onclick="handleClickDeleteButton(${book.id})">Hapus</button>  
          </td>
        </tr>`;
      })
      .join('');
  }
  return rows;
}

function generateEditFormInput() {
  return `<div class="mb-4">
  <label for="title" class="block text-gray-700 font-semibold mb-2">Judul Buku</label>
  <input required type="text" id="title" name="title" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value="${currentBook?.title}">
</div>
<div class="mb-4">
  <label for="author" class="block text-gray-700 font-semibold mb-2">Penulis Buku</label>
  <input required type="text" id="author" name="author" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value="${currentBook?.author}">
</div>
<div class="mb-4">
  <label for="year" class="block text-gray-700 font-semibold mb-2">Tahun Terbit</label>
  <input required type="number" id="year" name="year" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value="${currentBook?.year}">
</div>
<div class="mb-4">
  <label for="quantity" class="block text-gray-700 font-semibold mb-2">Jumlah Stok</label>
  <input required type="number" id="quantity" name="quantity" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value="${currentBook?.quantity}">
</div>
<div class="flex justify-center">
  <input type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="simpan" />
</div>`;
}

async function loadPage() {
  switch (currentPage) {
    case 'home':
      // TODO: answer here
      const books = await fetchBooks();
      main.innerHTML = pageListMainContent;

      const tableBody = document.querySelector('tbody');
      const rows = generateRows(books);
      tableBody.innerHTML = rows;
      break;
    case 'edit':
      main.innerHTML = pageEditBookMainContent;

      const form = document.querySelector('form');
      const formInput = generateEditFormInput();
      form.innerHTML = formInput;
      break;
    case 'add':
      main.innerHTML = pageAddBookMainContent;
      break;
  }
}

async function fetchBooks() {
  try {
    const response = await fetch('http://localhost:3333/books');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat mengambil data buku');
  }
}

async function editBook(book) {
  try {
    const response = await fetch(`http://localhost:3333/books/${books.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    });

    if (!response.ok) {
      throw new Error('Gagal mengubah buku');
    }
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat mengubah buku');
  }
}

async function deleteBook(bookId) {
  try {
    const response = await fetch(`http://localhost:3333/books/${bookId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Gagal menghapus buku');
    }
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat menghapus buku');
  }
}
async function addBook(book) {
  try {
    const response = await fetch(`http://localhost:3333/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    });

    if (!response.ok) {
      throw new Error('Gagal menambahkan buku');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat menambah buku');
  }
}

loadPage();
