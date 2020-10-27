const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : '',
  database : 'clase node1'
});

//Conectarnos a la base de datos
connection.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.send("Bienvenido a la API de Paloma Ortega");
});

app.get('/cocina', (req, res) => {
  //Consultar cocina
  connection.query('SELECT * FROM cocina', function (error, results, fields) {
    if(error) {
      res.status(400).json({ error: 'consulta no valida.'});
    }
    //Regresar un objeto json con el listado de cocina.
    res.status(200).json(results);
  });
});


app.get('/cocina/:id', (req, res) => {
  const id = Number(req.params.id);
  if(isNaN(id)) {
    res.status(400).json({ error: 'parametros no validos.'});
    return;
  }
  //Consultar cocina
  connection.query(`SELECT * FROM cocina WHERE id=?`, [id] ,function (error, results, fields) {
    if(error) {
      res.status(400).json({ error: 'consulta no valida.'});
      return;
    }
    if(results.length === 0) {
      res.status(404).json({ error: 'cocina no existente.'});
      return;
    }
    //Regresar un objeto json con el listado de cocina.
    res.status(200).json(results);
  });
});

app.post('/cocina', (req, res) => {
  console.log("req", req.body);
  const platillo = req.body.platillo;
  const ingredientes = req.body.ingredientes;
  const proceso = req.body.proceso;
  connection.query(`INSERT INTO cocina (nombre del platillo, ingredientes, procesp) VALUES (?,?,?)`, [platillo,ingredientes,proceso] ,function (error, results, fields) {
    if(error) {
      res.status(400).json({ error: 'consulta no valida.'});
      return;
    }
    res.status(200).json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});