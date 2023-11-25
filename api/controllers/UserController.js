/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt-nodejs');

module.exports = {
  
    allData: async function(req, res) {
        let users = await User.find();
        let parks = await Park.find();
        let parkings = await Parking.find();

        return res.view({ users: users, parks: parks, parkings: parkings })
    },

    addUser: async function(req, res){
        let createdUser;
        try{
            let foundUser = await User.find({ username: req.param('username') });
            if(foundUser){
                createdUser = await User.create(req.allParams());
            } else {
                createdUser = "Корисникот со тоа корисничко име веќе постои."
            }
        } catch(err){
            console.log(err)
        }

        return res.redirect("/admin/users");
    },

    getUser: async function(req, res) {
        let getUser;
        try{
            let foundUser = await User.find({ id: req.param('id') });
            if(foundUser){
                getUser = await User.findOne({ id: req.param('id') });
            } else {
                getUser = "Корисникот не постои."
            }
        } catch(err){
            console.log(err);
        }

        return res.view({ user: getUser })
    },

    updateUser: async function(req, res) {
        let updatedUser;
        try {
            let foundUser = await User.find({ id: req.param('id') });
            if(foundUser){
                updatedUser = await User.update({ id: req.param('id') }, req.allParams());
            } else {
                updatedUser = "Корисникот не постои."
            } 
        } catch(err){
            console.log(err);
        }

        return res.redirect("/admin/users");
    },

    deleteUser: async function(req, res) {
        let deleteUser;
        try{
            let foundUser = await User.find({ id: req.param('id') });
            if(foundUser){
                deleteUser = await User.destroy({ id: req.param('id') });
            } else {
                deleteUser = "Корисникот не постои."
            }
        } catch(err) {
            console.log(err)
        }

        return res.redirect("/admin/users");
    }

};

