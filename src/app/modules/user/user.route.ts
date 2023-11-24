import express from 'express';

const router = express.Router();

router.post('/');

router.get('/');

router.route('/:userId').get().put().delete();

export const userRoute = router;
