/* eslint-disable linebreak-style */
const books = require('./books.js');
const { nanoid } = require('nanoid');

const addBookHandler = (request, h) =>{

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  let finished = false;

  if (pageCount === readPage){
    finished = true;
  }

  // Validasi nama buku
  if (name === undefined){
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  // Validasi Halaman buku
  if (readPage > pageCount){
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  //Memasukkan data buku ke dalam Books
  const newBooks = { id, name, year, author, summary, pageCount, publisher, readPage, finished, reading, insertedAt, updatedAt };

  books.push(newBooks);

  const isSuccess = books.filter((book) => book.id === id);

  if (isSuccess.length > 0){
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId : id
      }
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal menambahkan buku',
  });
  response.code(400);
  return response;
};

const getAllBooksHandler = () => {
  return {
    status : 'success',
    data: {
      books : books.map((book) => ({
        id:book.id,
        name: book.name,
        publisher: book.publisher
      })),
    }
  };
};

const getBooksByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((n) => n.id === bookId)[0];

  if (book !== undefined){
    return {
      status: 'success',
      data: {
        book
      }
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  });
  response.code(404);
  return response;
};

const updateBookHandler = (request, h) => {
  const { bookId } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const index = books.findIndex((book) => book.id === bookId);

  //Validasi Id
  if (index === -1){
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    });
    response.code(404);
    return response;
  }

  //Validasi nama
  if (name === undefined){
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    });
    response.code(400);
    return response;
  }

  //Validasi halaman
  if (readPage > pageCount){
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    });
    response.code(400);
    return response;
  }

  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  };

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui'
  });

  response.code(200);
  return response;
};

const deleteBookByIdHandler = (request, h) => {

  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1){
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  });
  response.code(404);
  return response;
};

module.exports = { addBookHandler, getAllBooksHandler, getBooksByIdHandler, updateBookHandler, deleteBookByIdHandler };