// ************ Require's ************
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const methodOverride = require("method-override"); // Pasar poder usar los métodos PUT y DELETE
const port = 3000;

// ************ express() - (don't touch) ************
const app = express();

app.listen(process.env.PORT || port, () => {
    console.log("Servidor iniciado");
});

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, "../public"))); // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false })); //Para poder capturar datos como json y objetos literales
app.use(express.json()); //Para poder capturar datos como json y objetos literales
app.use(logger("dev")); //Para que envie los cambios y lo que va pasando por consola
app.use(cookieParser()); //Para trabajar con las cookies
app.use(methodOverride("_method")); // Para poder pisar el method="POST" en el formulario por PUT y DELETE

// ************ Template Engine - (don't touch) ************
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views")); // Define la ubicación de la carpeta de las Vistas

// ************ WRITE YOUR CODE FROM HERE ************
// ************ Route System require and use() ************
const mainRouter = require("./routes/main"); // Rutas main
const productsRouter = require("./routes/products"); // Rutas /products
const usersRouter = require("./routes/users");

app.use("/", mainRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.path = req.path;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

// ************ exports app - dont'touch ************
module.exports = app;