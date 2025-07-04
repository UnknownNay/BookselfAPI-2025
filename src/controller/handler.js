/* eslint-disable linebreak-style */
const books = require('../db/books.js');
const { addBookService } = require('../services/booksServices.js');

const addBookHandler = (request, h) =>{
  const { name, pageCount, readPage, } = request.payload;

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

  const { id, isSuccess } = addBookService(request.payload);

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

const getAllBooksHandler = (request) => {

  const { name, reading, finished } = request.query;

  //Ini aman
  if (reading === '1'){
    const allRead = books.filter((book) => book.reading === true);
    return {
      status: 'success',
      data: {
        books : allRead.map((book) => ({
          id:book.id,
          name: book.name,
          publisher: book.publisher
        })),
      }
    };
  }

  if (reading === '0'){
    const allRead = books.filter((book) => book.reading === false);
    return {
      status: 'success',
      data: {
        books : allRead.map((book) => ({
          id:book.id,
          name: book.name,
          publisher: book.publisher
        })),
      }
    };
  }

  if (finished === '1'){
    const allFinish = books.filter((book) => book.finished === true);
    return {
      status: 'success',
      data: {
        books : allFinish.map((book) => ({
          id:book.id,
          name: book.name,
          publisher: book.publisher
        })),
      }
    };
  }

  if (finished === '0'){
    const allFinish = books.filter((book) => book.finished === false);
    return {
      status: 'success',
      data: {
        books : allFinish.map((book) => ({
          id:book.id,
          name: book.name,
          publisher: book.publisher
        })),
      }
    };
  }

  //Bugnya disi
  if (name !== undefined){
    const sameBook = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    return {
      status : 'success',
      data: {
        books : sameBook.map((book) => ({
          id:book.id,
          name: book.name,
          publisher: book.publisher
        })),
      }
    };
  }

  //Get All
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