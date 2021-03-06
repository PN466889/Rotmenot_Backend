"use strict";
const {
    ErrorHandler
} = require("../../../lib/utils");
const db = require("../../../models");
// const constants = require("../../../config/constants");

module.exports = async (req, res, next) => {
    try {
        // Get user
        const user = req.user;
        const body = req.body;

        await db.Recipe.findOneAndUpdate({
            _id: body.id
        },{
            name: body.name,
            ingredients: body.ingredients,
            isHealthy: body.isHealthy,
            img: body.img,
            video: body.video,
            calories: body.calories,
            description: body.description,
            ratings: body.ratings,
            cuisineId: body.cuisineId,
            timeToPrepare: body.timeToPrepare,
            cost: body.cost,
            comments: body.comments
        });

        const recipe = await db.Recipe.findOne({ _id: body.id }).populate("ingredients");
        return res.success({
            Message: 'Recipe updated successfully',
            recipe
        });
    } catch (error) {
        return res.serverError(500, ErrorHandler(error));
    }
};