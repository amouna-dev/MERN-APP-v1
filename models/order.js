const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  nameProd: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  imageProd: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const OrderSchema = new mongoose.Schema({
  orderItems: [orderItemSchema],
  shippingAddress: {
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true, 
    },
  },
  paymentMethod: {
    type: String,
    required: true
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String,
  },
  itemsPrice: { 
    type: Number, 
    required: true 
  },
  shippingPrice: { 
    type: Number, 
    required: true 
  },
  taxPrice: { 
    type: Number, 
    required: true 
  },
  totalPrice: { 
    type: Number, 
    required: true 
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);