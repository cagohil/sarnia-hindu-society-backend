const connectToMongo = require('./config/mongodb');
var cors = require('cors')
const express = require('express')
const bodyParser = require("body-parser")


let path = require('path');
path.join(__dirname, 'public');

connectToMongo();
const app = express()
const port = 8000
app.use('/resources', express.static(__dirname + '/upload'));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors())
app.use(express.json());

//Available Routes
app.use('/api/admin', require('./routes/admin'))
app.use('/api/events', require('./routes/events'))
app.use('/api/gallery', require('./routes/gallery'))
app.use('/api/members', require('./routes/members')) 
app.use('/api/schedules', require('./routes/schedule')) 


app.get('/', (req, res) => {
  res.send('Sarnia Hindu Society Backend Running!')
})


app.listen(port, () => {
  console.log(`Sarnia Hindu Society listening on port http://localhost:${port}`)
})


