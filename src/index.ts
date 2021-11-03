import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.get('/', (req, res) => {
  return res.sendFile('./index.html', {root: '.'});
});

app.listen(process.env.PORT, ()=>console.log(`App listening at http://localhost:${process.env.PORT}`));