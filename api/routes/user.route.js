import express from 'express'
import { test } from '../controller/user.controller.js';
import { verifyToken } from '../utils/verifyuser.js';
import { updateUser } from '../controller/user.controller.js';

const router=express.Router()

router.get('/',test)
router.post('/update/:id',verifyToken,updateUser)

export default router;  