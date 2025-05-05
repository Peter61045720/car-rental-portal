import express, { Request, Response } from 'express';
import authRoutes from './routes/auth.routes';
import carRoutes from './routes/car.routes';
import extraRoutes from './routes/extra.routes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import { connectToDatabase } from './config/database';
import './config/passport';

dotenv.config();
const { ATLAS_URI, SESSION_SECRET, PORT, IONIC_PORT } = process.env;

if (!ATLAS_URI) {
  console.error('"No ATLAS_URI environment variable has been defined in config.env"');
  process.exit(1);
}

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Server is ready');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: SESSION_SECRET || 'fallback-secret',
    saveUninitialized: false,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: `http://localhost:${IONIC_PORT}`, credentials: true }));

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/extras', extraRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  connectToDatabase(ATLAS_URI);
});
