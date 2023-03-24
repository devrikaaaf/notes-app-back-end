const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async() => {
    const server = Hapi.server({
        port: 5000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
                //mekanisme Cross-Origin Resources Sharing (CORS) dg Hapi
                //dilakukan ketika client mengakses data dg origin yg berbeda
                //tanda(*) sebagai tanda utk memperbolehkan data dikonsumsi oleh seluruh origin
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();