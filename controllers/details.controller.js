
const { Booking, Car, User, Details, sequelize } = require('../models/index')
const { Op } = require(`sequelize`);

exports.getAllDetails = async (req, res) => {

    const details = await Details.findAll({
        include: [
            { model : Car, attributes: ["carID", "name", "price"]},
            { model : Booking, attributes: ["bookingID", "booking_date"]}
        ]
    })
    return res.json({
        status : "true",
        data : details,
        message : "Data has successfully loaded"
    })
}

exports.carSigma = async (req, res) => {
    const details = await Car.findAll({
        attributes: ["carID", "name", "price"],
        include : [
            { model : Booking, attributes: ["booking_date"] }
        ]
    })

    // const details = await Details.findAll({ 
    //     include: [
    //         { model : Car, attributes: ["carID", "name", "price"]},
    //         { model : Booking, attributes: ["booking_date"]}
    //     ]
    // })
    return res.json({
        status : "true",
        data : details,
        message : "Data has successfully loaded"
    })
}


// const { Sequelize, sequelize, fn, col, literal } = require('sequelize');

exports.carDetails = async (req, res) => {
    try {
        const { carID } = req.body;
        const detailsData = await Details.findAll({
            where : {carID : carID},
            include : [{model : Car, attributes: ["name", "capacity", "am"]}],
            attributes: [
                'carID',
                [sequelize.fn('COUNT', sequelize.col('carID')), 'count'],
                [sequelize.fn('SUM', sequelize.col('total')), 'total']
            ],
            group: ['carID']
        });

        res.status(200).json({
            success: true,
            data: detailsData,
            message: "Details data successfully fetched"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};