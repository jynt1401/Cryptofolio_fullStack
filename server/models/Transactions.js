//table
const mongoose = require("mongoose");

const subTransaction = new mongoose.Schema({
  CoinId: { type: String, require: true },
  Quantity: { type: Number, require: true },
  Amount: { type: Number, require: true },
  Prise: { type: Number, require: true },
  Date: { type: String },
});

const transactionSchema = new mongoose.Schema({
  UserId: {
    type: String,
    require: true,
  },
  Transaction: [subTransaction]
});

//we have created the table now we will export this table

module.exports = mongoose.model("transaction", transactionSchema);
