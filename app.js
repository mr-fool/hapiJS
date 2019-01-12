const Hapi = require('hapi');
// Init Server
const server =  Hapi.Server(
    {
        port: 8000,
        host:'localhost'
    }
);

//Home Route
server.route({
    method:'GET',
    path:'/',
    handler: (request, h) => {

        return '<h1>Hello, world!</h1>';
    }
});

//Dynamic Route
server.route({
    method:'GET',
    path:'/user/{name}',
    handler: (request, h) => {

        return 'Hello, ' + request.params.name;
    }
});

// Static Routes
const start = async () => {

    await server.register(require('inert'));

    server.route({
        method: 'GET',
        path: '/about',
        handler: function (request, h) {

            return h.file('./public/about.html');
        }
    });
}

// Start Server
const init = async () => {
    await start();
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();