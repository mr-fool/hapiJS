const Hapi = require('hapi');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hapidb', {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error(err));

// Create Task Model
const Task = mongoose.model('Task', {text:String});

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

        //return '<h1>Hello, world!</h1>';
        return h.view('index',{
            name: "John "
        });
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

//Tasks Route
server.route({
    method:'GET',
    path:'/tasks',
    handler: (request, h) => {

        let tasks = Task.find((err, tasks) => {
            console.log(tasks);
            h.view('tasks', {
                tasks:tasks
                /*tasks:[
                    {text:'Task One'},
                    {text:'Task Two'},
                    {text:'Task Three'}
                ]*/
            });
        });
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

    server.route({
        method: 'GET',
        path: '/image',
        handler: function (request, h) {

            return h.file('./public/hapi.png');
        }
    });


}

//vision Template
const startVision = async () => {

    await server.register(require('vision'));

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: __dirname + '/views'
    });
};

// Start Server
const init = async () => {
    await start();
    await startVision();
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();