const express = require("express");
const router = express.Router();
const {UserTransactions} = require("../Controllers/userTransactions");

router.post("/transactions", UserTransactions);

module.exports = router;