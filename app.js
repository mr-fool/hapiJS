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

// Start Server
const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();