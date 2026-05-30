const express = require("express");

const mongobd = require("./data/database");

const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', require('./routes'));


mongobd.initDb((err) =>{
    if(err){
        console.log(err)
    }
    else{
        app.listen(port, () =>(console.log(`Database is listening and node is Runing on port ${port}`)));
    }
})
app.listen(port, () => {console.log(`runing on port ${port}`)});
