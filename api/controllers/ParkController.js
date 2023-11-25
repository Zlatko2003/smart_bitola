/**
 * ParkController
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

    addPark: async function(req, res){
        let createdPark;
        try{
            let foundPark = await Park.find({ name: req.param('name') });
            if(foundPark){
                createdPark = await Park.create(req.allParams());
            } else {
                createdPark = "Паркот со тоа име постои"
            }
        } catch(err){
            console.log(err)
        }

        return res.redirect("/admin/parks");
    },

    getPark: async function(req, res) {
        let getPark;
        try{
            let foundPark = await Park.find({ id: req.param('id') });
            if(foundPark){
                getPark = await Park.findOne({ id: req.param('id') });
            } else {
                getPark = "Паркот не постои."
            }
        } catch(err){
            console.log(err);
        }

        return res.view({ park: getPark })
    },

    updatePark: async function(req, res) {
        let updatedPark;
        try {
            let foundPark = await Park.find({ id: req.param('id') });
            if(foundPark){
                updatedPark = await Park.update({ id: req.param('id') }, req.allParams());
            } else {
                updatedPark = "Паркот не постои."
            } 
        } catch(err){
            console.log(err);
        }

        return res.redirect("/admin/parks");
    },

    deletePark: async function(req, res) {
        let deletePark;
        try{
            let foundPark = await Park.find({ id: req.param('id') });
            if(foundPark){
                deletePark = await Park.destroy({ id: req.param('id') });
            } else {
                deletePark = "Паркот не постои."
            }
        } catch(err) {
            console.log(err)
        }

        return res.redirect("/admin/parks");
    }

};

