const express = require("express");
const router = express.Router();
const {UserTransactions} = require("../Controllers/userTransactions");
const {UserSellTransactions} = require("../Controllers/UserSellTransactions");

router.post("/transactions", UserTransactions);
router.post("/selltransactions", UserSellTransactions);

module.exports = router;