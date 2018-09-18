import express from 'express';
import logger from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Parcel from 'parcel-bundler';

// Express app setup
const app = express();
const port = 3000;

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cookie parser
app.use(cookieParser());

// use parcel bundler
if (process.env.NODE_ENV !== 'production') {
  const bundler = new Parcel('./src/index.js', {
    outDir: 'public/js',
    watch: true,
  });

  bundler.bundle();

  app.use(bundler.middleware());
}

// logger
app.use(logger('combined'));

// view engine
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

// serve static files from 'public'
app.use(express.static(path.join(__dirname, './public')));

// routes
app.get('*', (req, res) => {
  res.render('index');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: app.get('env') === 'development' ? err : {},
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
