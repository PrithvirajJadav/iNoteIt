import userRouter from './auth.js'
import noteRouter from './notes.js'
import {Router} from 'express';

const router=Router();

router.use(userRouter);
router.use(noteRouter);

export default router;
