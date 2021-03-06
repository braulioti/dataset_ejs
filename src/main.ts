import * as express from 'express';
import * as path from 'path';
// https://node-postgres.com/
import {Client} from 'pg';
// json2csv
import {Parser} from 'json2csv';
import * as fs from 'fs';

const app = express();
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'dataset_ejs',
    password: 'postgres',
    port: 5432
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.get('/', (req, res) => {
    // res.send('<h1>Hello Pesquisa!</h1>');
    res.render('index.ejs');
});

app.post('/aprovado', async (req, res) => {
    try {
        // throw new Error('Teste de erro!');
        await client.connect();
        const data = await client.query('SELECT * FROM obesity WHERE entity <> $1;', ['World']);

        const parser = new Parser();
        const csv = parser.parse(data.rows);

        fs.writeFile(path.join(__dirname, '../datasets/obesity.csv'), csv, (err) => {
            if (err) {
                throw new Error(err.message);
            } else {
                res.render('aprovado.ejs');
            }
        });
    } catch (e) {
        console.log(e.message);
        res.render('erro-aprovacao.ejs');
    }
});

app.listen(3000, () => {
    console.log('Servidor executando na porta 3000');
});
