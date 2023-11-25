/**
 * Parking.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        name: {
            type: 'string',
        },

        location: {
            type: 'string',
        },

        working_time_start: {
            type: 'string',
        },

        working_time_end: {
            type: 'string',
        },

        price: {
            type: 'number',
        },

        parking_spaces: {
            type: 'json',
        }
    },

};

