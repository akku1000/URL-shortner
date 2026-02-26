import express from 'express';
import { get } from 'mongoose';
import { shortenUrl, getAllUrls } from '../controllers/url.controller.js';
import protect from '../middleware/auth.middleware.js';
const router= express.Router();

router.post('/shorten',protect,shortenUrl);
router.get('/geturl',protect,getAllUrls);

export default router;