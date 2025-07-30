import express from 'express';
import { getAllOrders, getOrdersByID, getOrdersByIdAndDelete, getOrdersByIdAndUpdate, postOrder } from '../controllers/orderControllers.js';




const router = express.Router();

router
.post('/order' , postOrder)
.get('/order' , getAllOrders)
.get('/order/:id' , getOrdersByID)
.put('/order/:id' , getOrdersByIdAndUpdate)
.delete('/order/:id' , getOrdersByIdAndDelete)


export default router;