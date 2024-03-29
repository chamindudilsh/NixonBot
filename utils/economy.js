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

async function checkWallet (userID) {
    let balanceProfile = await Balance.findOne({ memberId: userID });
    if (balanceProfile) {
        return balanceProfile.wallet;
    } else {
        balanceProfile = await new Balance({ memberId: userID });
        await balanceProfile.save().catch(err => console.log(err));
        return balanceProfile.wallet;
    };
}

async function checkBank (userID) {
    let balanceProfile = await Balance.findOne({ memberId: userID });
    if (balanceProfile) {
        return balanceProfile.bank;
    } else {
        balanceProfile = await new Balance({ memberId: userID });
        await balanceProfile.save().catch(err => console.log(err));
        return balanceProfile.bank;
    };
}

async function addBalance (member, amount) {
    Balance.findOne({ memberId: member.id }, async(err,data) => {
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
    Balance.findOne({ memberId: member.id }, async(err,data) => {
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

function formatNumber (val) {
    multiplier = val.substr(-1).toLowerCase();
    if (multiplier == "k")
      return parseFloat(val) * 1000;
    else if (multiplier == "m")
      return parseFloat(val) * 1000000;
    else return parseInt(val);
}

module.exports = {
    createBalance,
    addBalance,
    removeBalance,
    checkWallet,
    checkBank,
    formatNumber,
    randomAmount
}