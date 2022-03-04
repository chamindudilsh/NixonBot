const mongoose = require('mongoose');
const { GiveawaysManager } = require('discord-giveaways');
const giveawaySchema = require('./schemas/giveawaySchema');

const giveawayModel = mongoose.model('giveaways', giveawaySchema);

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
    // This function is called when the manager needs to get all giveaways which are stored in the database.
    async getAllGiveaways() {
        // Get all giveaways from the database. We fetch all documents by passing an empty condition.
        return await giveawayModel.find().lean().exec();
    }

    async saveGiveaway(messageId, giveawayData) {
        await giveawayModel.create(giveawayData);
        // Don't forget to return something!
        return true;
    }

    async editGiveaway(messageId, giveawayData) {
        await giveawayModel.updateOne({ messageId }, giveawayData, { omitUndefined: true }).exec();
        // Don't forget to return something!
        return true;
    }

    async deleteGiveaway(messageId) {
        await giveawayModel.deleteOne({ messageId }).exec();
        // Don't forget to return something!
        return true;
    }
};

module.exports = GiveawayManagerWithOwnDatabase;