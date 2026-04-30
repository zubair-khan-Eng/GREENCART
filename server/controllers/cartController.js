import User from "../models/User.js"

// Update User CartData : /api/cart/update


export const updateCart = async (req, res)=>{
    try {
        const { cartItems } = req.body
        const userId = req.userId;
        if (!cartItems || typeof cartItems !== "object") {
            return res.status(400).json({ success: false, message: "Invalid cart payload" });
        }
        await User.findByIdAndUpdate(userId, {cartItems})
        res.json({ success: true, message: "Cart Updated"})

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ success: false, message: error.message })
    }
}