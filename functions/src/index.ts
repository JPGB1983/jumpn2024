import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import { subscriptionRoutes } from './routes/subscription.routes';

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.use('/api/subscriptions', subscriptionRoutes);

export const api = functions.https.onRequest(app);