/* eslint-disable linebreak-style */

const { nanoid } = require('nanoid');
const books = require('../db/books');

const addBookService = (data) =>{
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = data;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  let finished = false;

  if (pageCount === readPage){
    finished = true;
  }
  //Memasukkan data buku ke dalam Books
  const newBooks = { id, name, year, author, summary, pageCount, publisher, readPage, finished, reading, insertedAt, updatedAt };

  books.push(newBooks);

  const isSuccess = books.filter((book) => book.id === id);
  return ({
    id,
    isSuccess
  });
};

module.exports = { addBookService };