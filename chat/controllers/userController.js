var gravatarUtil = require('../utils/gravatar')
, User = require('../models/userSchema');

exports.createUser = function(req, res){

    var username = req.body.username
    , password = req.body.password
    , firstname = req.body.firstname
    , lastname = req.body.lastname
    , email = req.body.email
    , phone = req.body.phone
    , digest = req.body.digest
    , gravatar =  gravatarUtil(req.body.email);

    new User({
        username: username
        , password: password
        , firstname: firstname
        , lastname: lastname
        , email: email
        , phone: phone
        , digest: digest
        , gravatar: gravatar
    }).save(function (err, user){
        if (err) throw err;
        req.session.isLoggedIn = true;
        req.session.user = user.username;
        req.session.gravatar = user.gravatar;
        res.redirect('/account/' + user.username, {user:user});
    })

};

exports.signupUser = function(req, res){
  res.render('./account/createAccount');
};

exports.updateUser = function(req, res){
  res.send('/users');
};

exports.deleteUser = function(req, res){
  res.send('/users');
};

exports.profileUser = function(req, res){
  res.send('/users');
}

exports.paramUserName = function(req, res, next, name) {
    User.find({ username: name}, function ( err, docs ) {
        req.user = docs[0];
        next();
    })
}
