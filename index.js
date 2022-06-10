const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Use Middleware
app.use(cors());
app.use(express.json());

app.get('/download-resume', function (req, res) {
  const file = `${__dirname}/files/MD_SAIF_ULLAH.pdf`;
  res.download(file);
});

// MongoDB
const uri = `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@cluster0.eae4u.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const projectCollection = client.db('portfolio').collection('projects');

    // get all projects
    app.get('/project', async (req, res) => {
      const result = await projectCollection.find({}).toArray();
      res.send(result);
    });

    // get a project
    app.get('/project/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await projectCollection.findOne(query);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running..`);
});
