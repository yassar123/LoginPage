const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const privateKey = fs.readFileSync('./keys/server.key');
app.set('privateKey', privateKey);
const publicKey = fs.readFileSync('./keys/server.key.pub');
app.set('publicKey', publicKey);
app.set('passphrase', 'example');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '10mb'}))
app.use(cors());

const routes = require('./src/routes')
app.use('/api', routes())
app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running at port: ${process.env.PORT || 8080}`)
})