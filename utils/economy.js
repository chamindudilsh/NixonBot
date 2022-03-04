const Balance = require('../models/schemas/balance');
const mongoose = require('mongoose');

async function createBalance (member) {
    let balanceProfile = await Balance.findOne({ memberId: member.id });
    if (balanceProfile) {
        return balanceProfile;
    } else {
        balanceProfile = await new Balance({
            _id: mongoose.Types.ObjectId,
            memberId: String,
        });
        await balanceProfile.save().catch(err => console.log(err));
        return balanceProfile;
    };
};

module.exports = {
    createBalance
}