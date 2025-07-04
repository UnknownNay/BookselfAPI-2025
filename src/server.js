/* eslint-disable linebreak-style */
const routes = require('./routes/routes');
const hapi = require('@hapi/hapi');


const init = async () => {

  const server = hapi.server({
    port : 9000,
    host: 'localhost'
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan di ${server.info.uri}`);
};

init();