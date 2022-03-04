const mongoose = require('mongoose');

const balanceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    memberId: String,
    wallet: { type: Number, default: 2000 },
    bank: { type: Number, default: 0 }
});

module.exports = mongoose.model('Balance', balanceSchema, 'balances');