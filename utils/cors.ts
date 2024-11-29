import cors from 'cors';

export const corsHandler = cors({
  origin: 'http://127.0.0.1:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
