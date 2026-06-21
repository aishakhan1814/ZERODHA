const {Schema} =require("mongoose");
const OrdersSchema=new Schema({
  name: String,
    price: Number,
    mode: String,
    qty:Number,
    
})

module.exports={OrdersSchema};