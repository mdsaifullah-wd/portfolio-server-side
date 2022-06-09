const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Use Middleware
app.use(cors());
app.use(express.json());

app.get('/download-resume', function (req, res) {
  const file = `${__dirname}/files/MD_SAIF_ULLAH.pdf`;
  console.log(file);
  res.download(file);
});

app.listen(port, () => {
  console.log(`Server is running..`);
});
