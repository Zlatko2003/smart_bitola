/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    'GET /getData': { controller: 'main', action: "getAllData" },

    'GET /login': { view: 'pages/login', locals: { layout: "layouts/layoutLogin", title: "SmartBitola - Најава" } },
    'POST /login': 'AuthController.login',
    '/logout': 'AuthController.logout',
    'GET /register': { view: 'pages/register', locals: { layout: "layouts/layoutLogin", title: "SmartBitola - Регистрација" }  },
    'POST /register': 'AuthController.register',

    'GET /': { view: 'pages/index' },
    'GET /smart-parking': { view: 'pages/smart-parking' },
    'GET /smart-parks': { view: 'pages/smart-parks' },
    'GET /about': { view: 'pages/about' },
    'GET /contact': { view: 'pages/contact' },

    'POST /submitReservation': { controller: "parking", action: "submitReservation" },

    // Admin
    '/admin/dashboard': { view: 'pages/admin/index', controller: "main", action: "allData", locals: { layout: "layouts/layoutAdmin", title: "Контролна табла" }},

    'GET /admin/users': { view: 'pages/admin/user/index', controller: "user", action: "allData", locals: { layout: "layouts/layoutAdmin", title: "Корисници" }},
    'GET /admin/add-user': { view: 'pages/admin/user/add-user', locals: { layout: "layouts/layoutAdmin", title: "Додади корисник" }},
    'POST /admin/create-user': { controller: "user", action: "addUser"},
    'GET /admin/user/:id': { view: 'pages/admin/user/get-user', controller: "user", action: "getUser", locals: { layout: "layouts/layoutAdmin", title: "Измени корсиник" }},
    'POST /admin/update-user/:id': { controller: "user", action: "updateUser"},
    '/admin/delete-user/:id': { controller: "user", action: "deleteUser"},

    'GET /admin/parks': { view: 'pages/admin/park/index', controller: "park", action: "allData", locals: { layout: "layouts/layoutAdmin", title: "Паметни паркови" }},
    'GET /admin/add-park': { view: 'pages/admin/park/add-park', locals: { layout: "layouts/layoutAdmin", title: "Додади парк" }},
    'POST /admin/create-park': { controller: "park", action: "addPark"},
    'GET /admin/park/:id': { view: 'pages/admin/park/get-park', controller: "park", action: "getPark", locals: { layout: "layouts/layoutAdmin", title: "Измени парк" }},
    'POST /admin/update-park/:id': { controller: "park", action: "updatePark"},
    '/admin/delete-park/:id': { controller: "park", action: "deletePark"},

    'GET /admin/parkings': { view: 'pages/admin/parking/index', controller: "parking", action: "allData", locals: { layout: "layouts/layoutAdmin", title: "Паметни паркинзи" }},
    'GET /admin/add-parking': { view: 'pages/admin/parking/add-parking', locals: { layout: "layouts/layoutAdmin", title: "Додади паркинг" }},
    'POST /admin/create-parking': { controller: "parking", action: "addParking"},
    'GET /admin/parking/:id': { view: 'pages/admin/parking/get-parking', controller: "parking", action: "getParking", locals: { layout: "layouts/layoutAdmin", title: "Измени паркинг" }},
    'POST /admin/update-parking/:id': { controller: "parking", action: "updateParking"},
    '/admin/delete-parking/:id': { controller: "parking", action: "deleteParking"},

};
