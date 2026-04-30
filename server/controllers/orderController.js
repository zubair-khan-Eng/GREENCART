import Order from "../models/Order.js";
import Product from "../models/Product.js";


// Place Order COD : /api/order/cod
export const placeOrderCOD = async (req, res)=>{
    try {
        const { items, address } = req.body;
        const userId = req.userId;
        if(!address || !Array.isArray(items) || items.length === 0){
            return res.status(400).json({success: false, message: "Invalid data"})
        }
        // Calculate Amount Using Items
        let amount = await items.reduce(async (acc, item)=>{
            const product = await Product.findById(item.product);
            if (!product) {
                throw new Error("One or more products not found");
            }
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        // Add Tax Charge (2%)
        amount += Math.floor(amount * 0.02);
        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        });

        return res.status(201).json({success: true, message: "Order Placed Successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
        
    }
}

// Get Orders by User ID : /api/order/user
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({
            userId,
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({ createdAt: -1})
        res.json({ success: true, orders});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        
    }
}

// Get All Orders ( for seller / admin ) : /api/order/seller
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({ createdAt: -1});
        res.json({ success: true, orders })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        
    }
}