const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.json());
var path = require("path");


// --------------------------------------------
const cors = require('cors');
app.use(
    cors(),
    bodyparser.json(),
    bodyparser.urlencoded({
        extended: true
    })
); app.post('/post', (req, res) => {
    const { body } = req;
    // console.log(`${body.v}`)


    console.log(`${body.totalall}`)
    
    mysqlConnection.query(` INSERT INTO datareceipt (customernumber,number,date,name,address,phone1,phone2,taxid,branch,payment
                                                    ,no,list,price,outstanding,no1,list1,price1,outstanding1,no2,list2,price2,outstanding2,totalall) 
    VALUES ( '${body.customernumber}','${body.number}','${body.date}','${body.name}','${body.address}', '${body.phone1}', '${body.phone2}',
     '${body.taxid}', '${body.branch}', '${body.payment}'
     , '${body.no}', '${body.list}' , '${body.price}', '${body.outstanding}'
     , '${body.no1}', '${body.list1}' , '${body.price1}', '${body.outstanding1}'
     , '${body.no2}', '${body.list2}' , '${body.price2}', '${body.outstanding2}''
     , '${body.totalall}')`, (err, rows, fields) => {
        if (!err) {
            console.log(rows)
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});
// --------------------------------------------
//date,name,address,	phone1, phone2,	taxid, 	branch,	payment,no,	list,	price,outstanding,	total


var mysqlConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: '3306',
    password: '',
    database: 'cs392database',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

app.listen(8080, '127.0.0.1')
//app.listen(3000, () => console.log('Express server is runnig at port no : 3306'));
//Get all 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});
app.get('/post', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'post.html'));
});

//Get an employees
app.get('/data', (req, res) => {
    mysqlConnection.query('SELECT * FROM datareceipt', (err, rows, fields) => {
        if (!err) {
            console.log(rows)
            res.send(rows);
        } else {
            console.log(err);
        }

    })
});
