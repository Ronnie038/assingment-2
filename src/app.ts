import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

app.use(express.json());
app.use(cors());

// routes
import { userRoute } from './app/modules/user/user.route';

app.use('/api/users', userRoute);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('hello from behind');
});

export default app;
