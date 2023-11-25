/**
 * ParkingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    allData: async function(req, res) {
        let users = await User.find();
        let parks = await Park.find();
        let parkings = await Parking.find();

        return res.view({ users: users, parks: parks, parkings: parkings })
    },

    addParking: async function(req, res){
        let createdParking;
        let parking_spaces_array = [];
        try{
            let foundParking = await Parking.find({ name: req.param('name') });
            if(foundParking){
                for (let i = 1; i <= req.param('parking_spaces'); i++) {
                    const parkingSpace = {
                        parking_space: i,
                        holder: 'Празно',
                        finishAt: '',
                        orderNumber: ''
                    };
                    parking_spaces_array.push(parkingSpace);
                }
                createdParking = await Parking.create({
                    name: req.param('name'),
                    location: req.param('location'),
                    working_time_start: req.param('working_time_start'),
                    working_time_end: req.param('working_time_end'),
                    price: req.param('price'),
                    parking_spaces: parking_spaces_array,
                });
            } else {
                createdParking = "Паркингот со тоа име постои"
            }
        } catch(err){
            console.log(err)
        }

        return res.redirect("/admin/parkings");
    },

    getParking: async function(req, res) {
        let getParking;
        try{
            let foundParking = await Parking.find({ id: req.param('id') });
            if(foundParking){
                getParking = await Parking.findOne({ id: req.param('id') });
            } else {
                getParking = "Паркингот не постои."
            }
        } catch(err){
            console.log(err);
        }

        return res.view({ parking: getParking })
    },

    updateParking: async function(req, res) {
        let updatedParking;
        try {
            const id = req.param('id');
            const requestedSpaces = req.param('parking_spaces');

            let foundParking = await Parking.findOne({ id });
            if (foundParking) {
                const currentSpaces = foundParking.parking_spaces.length;
                if (requestedSpaces !== currentSpaces) {
                    let parking_spaces_array = [...foundParking.parking_spaces];

                    if (requestedSpaces < currentSpaces) {
                        parking_spaces_array = parking_spaces_array.slice(0, requestedSpaces);
                    } else {
                        for (let i = currentSpaces + 1; i <= requestedSpaces; i++) {
                            const parkingSpace = {
                                parking_space: i,
                                holder: 'Празно',
                                finishAt: '',
                                orderNumber: ''
                            };
                            parking_spaces_array.push(parkingSpace);
                        }
                    }

                    updatedParking = await Parking.updateOne({ id }, {
                        name: req.param('name'),
                        location: req.param('location'),
                        working_time_start: req.param('working_time_start'),
                        working_time_end: req.param('working_time_end'),
                        price: req.param('price'),
                        parking_spaces: parking_spaces_array,
                    });
                } else {
                    updatedParking = await Parking.updateOne({ id }, req.allParams());
                }
            } else {
                updatedParking = "Паркингот не постои.";
            }
        } catch(err) {
            console.log(err);
        }

        return res.redirect("/admin/parkings");
    },


    deleteParking: async function(req, res) {
        let deleteParking;
        let parkings;
        try{
            let foundParking = await Parking.find({ id: req.param('id') });
            if(foundParking){
                deleteParking = await Parking.destroy({ id: req.param('id') });
                parkings = await Parking.find();
            } else {
                deleteParking = "Паркингот не постои."
            }
        } catch(err) {
            console.log(err)
        }

        return res.status(200).json({ parkings: parkings });
    },

    submitReservation: async function(req, res) {
        let parkingNumber;
        try {
            const parkingId = req.param('id');
            const foundParking = await Parking.find({ id: parkingId });

            if (foundParking.length > 0) {
                const parkingSpaces = foundParking[0].parking_spaces;
                const index = parkingSpaces.findIndex(parkingSpace => parkingSpace.holder === 'Празно');

                if (index !== -1) {
                    parkingNumber = index;
                    parkingSpaces[index].holder = req.param('holder');
                    parkingSpaces[index].orderNumber = req.param('orderNumber');
                    parkingSpaces[index].finishAt = req.param('finishAt');

                    updatedParking = await Parking.update({ id: parkingId }, {
                        parking_spaces: parkingSpaces,
                    });
                } else {
                    updatedParking = "Нема слободни паркинг места.";
                }
            } else {
                updatedParking = "Паркингот не постои.";
            }
        } catch (err) {
            console.log(err);
        }

        return res.status(200).json({ message: 'Success', parkingNumber: parkingNumber });
    }
};

