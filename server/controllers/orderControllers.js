import { json } from "express";
import orders from "../models/orderSchema.js"


export const  getAllOrders = async(req , res) => {
try {
    const order = await orders.find();
    res.status(200).json(order)

} catch (err) {
res.status(401).json({ error : err.message})}
}

export const getOrdersByID = async(req , res) => {
    try {
        const order = await orders.findById(req.params.id);
        order ? res.status(200).json(order) : res.status(401).send("Order not found by this ID!");
    } catch (err) {
        res.status(401).json({error : err.message})
    }
}

export const getOrdersByIdAndUpdate = async(req , res) => {
    try {
        const order = await orders.findByIdAndUpdate(req.params.id , req.body);
        order ? res.status(200).json(order) : res.status(401).send("Order not found by this ID!");
    } catch (err) {
        res.status(401).json({error : err.message})
    }
};


export const getOrdersByIdAndDelete = async(req , res) => {
    try {
        const order = await orders.findByIdAndDelete(req.params.id);
        order ? res.status(200).json(order) : res.status(401).send("Order not found by this ID!");
    } catch (err) {
        res.status(401).json({error : err.message})
    }
};


export const postOrder = async(req , res) => {
    try {
        const order = await orders.create(req.body);
        res.status(200).json(order);
    } catch (err) {
        res.status(401).json({error : err.message})
    }
};