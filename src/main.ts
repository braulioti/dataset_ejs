import * as express from 'express';
import * as path from 'path';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/pesquisa', (req, res) => {
    res.render('pesquisa.ejs');
    // res.send('<h1>Hello Pesquisa!</h1>');
});

app.get('/aprovacao', (req, res) => {
    res.render('aprovacao.ejs');
});

app.listen(3000, () => {
    console.log('Servidor executando na porta 3000');
});
