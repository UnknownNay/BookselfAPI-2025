/* eslint-disable linebreak-style */
const  { addBookHandler, getAllBooksHandler, getBooksByIdHandler, updateBookHandler, deleteBookByIdHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBooksByIdHandler
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBookHandler
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdHandler
  }
];

module.exports = routes;
