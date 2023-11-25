/**
 * MainController
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

    getAllData: async function(req, res) {
        let users = await User.find();
        let parks = await Park.find();
        let parkings = await Parking.find();

        return res.status(200).json({ users: users, parks: parks, parkings: parkings })
    },
};

