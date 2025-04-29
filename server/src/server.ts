import express, { Request, Response } from 'express';

const app = express();
const port = 5000;

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Server is ready');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
