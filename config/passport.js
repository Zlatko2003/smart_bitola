const passport = require('passport'),
LocalStratrgy = require('passport-local').Strategy,
bcrypt = require('bcrypt-nodejs');
  
//Serialize the User
passport.serializeUser(function(user, cb){
    cb(null, user.id);
});
  
//Deserialize the User
passport.deserializeUser(function(id, cb){
    User.findOne({id}).exec(function(err, user){
        cb(err, user);
    });
})
  
//Local
passport.use(new LocalStratrgy({
        usernameField: 'email',
        passportField: 'password'
    }, function(email, password, cb){
  
    User.findOne({email: email}).exec(function(err, user){
        if(err) return cb(err);
        if(!user) return cb(null, false, {message: 'Email адресата не е пронајдена'});
  
        bcrypt.compare(password, user.password, function(err, res){
            if(!res) return cb(null, false, {message: 'Грешка при најава'});
            return cb(null, user, {message: 'Успешна најава'});
        })
    });
}));