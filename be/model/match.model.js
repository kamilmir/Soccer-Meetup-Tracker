const { Schema, default: mongoose } = require("mongoose");
const { connection } = require("../common/connection");

const matchSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },
    listPeopleSubscribed: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

const MatchModel = connection.model('Match', matchSchema);

module.exports = {
    MatchModel
};