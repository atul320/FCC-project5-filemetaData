var express = require('express');
var cors = require('cors');
const multer = require('multer')
require('dotenv').config()

var app = express();

app.use(cors());
app.use(express.urlencoded({ extended: 'false' }));
const upload = multer({ dest: "uploads/" })
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  let name = req.file.originalname;
  let type = req.file.mimetype;
  let size = req.file.size;
  res.json({
    name,
    type,
    size
  });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Running on http://localhost:${PORT}`);
});
