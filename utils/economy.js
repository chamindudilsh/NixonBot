const Balance = require('../models/schemas/balance');

async function createBalance (member) {
    let balanceProfile = await Balance.findOne({ memberId: member.id });
    if (balanceProfile) {
        return balanceProfile;
    } else {
        balanceProfile = await new Balance({ memberId: member.id });
        await balanceProfile.save().catch(err => console.log(err));
        return balanceProfile;
    };
};

async function addBalance (member, amount) {
    Balance.findOne({ memberId: member.id }, async(err,data) =>{
        if (err) throw err;
        if (data) {
            data.wallet += amount;
        } else {
            data = await new Balance({ memberId: member.id });
            data.wallet += amount;
        }
        await data.save().catch(err => console.log(err));
    });
};

async function removeBalance (member, amount) {
    Balance.findOne({ memberId: member.id }, async(err,data) =>{
        if (err) throw err;
        if (data) {
            data.wallet -= amount;
        } else {
            data = await new Balance({ memberId: member.id });
            data.wallet -= amount;
        }
        await data.save().catch(err => console.log(err));
    });
};

function randomAmount(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    createBalance,
    addBalance,
    removeBalance,
    randomAmount
}