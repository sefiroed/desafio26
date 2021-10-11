import express from 'express';
import path from 'path';
import routerProductos from './routes/productosRoute';
import handlebars from 'express-handlebars';
import * as http from 'http';
import { initWSServer } from './logicasocket/websocket';
import { productos } from './modules/data';
import {connect} from '../src/db/connectionmongodb';
import vistaRouter from '../src/routes/productosvistafake'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import config from '../src/config';
import "reflect-metadata";
import user from './routes/user';
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };


/** INICIALIZACION API con EXPRESS y conectamos la base de datos **/
connect();
const app = express();
const puerto = 8080;


//Creando he inisializando nuestro objeto myServer en socketIo
const myServer = http.createServer(app);
initWSServer(myServer);
myServer.listen(puerto, () => console.log(`SERVER UP ON PORT ${puerto}`));


// /*Con los siguientes metodos podemos pasar el body via postman*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// /*Invocamos a nuestra archivo index.html con una llamada al localhost:8080*/
export const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: config.MONGO_ATLAS_URL
  }),
  secret: 'shhhhhhhhhhhhhhhhhhhhh',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 40000
  }
};

app.use(cookieParser());
app.use(session(StoreOptions));


/*Invocamos los path para utilizarlos en el motor de plantillas */
const layoutFolderPath = path.resolve(__dirname, '../views/layouts');
const defaultLayerPth = path.resolve(__dirname, '../views/layouts/main.hbs');
const partialFolderPath = path.resolve(__dirname, '../views/partial');

/* Trabajamos con el motor de plantillas handlebars */
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    layoutsDir: layoutFolderPath,
    partialsDir: partialFolderPath,
    defaultLayout: defaultLayerPth,
    extname: 'hbs',
  })
);


/*Invocamos a nuestra carpeta ruta para realizar las llamadas*/
app.use('/api/productos', routerProductos);
app.use('/', vistaRouter);



