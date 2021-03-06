var isEmailValid = function (db, email, callback) {
  console.log('is email valid function called');
    db.appUsers.findOne({
        email: email
    }, function (err, user) {
        callback(user);
    });
};

  console.log('loaded validateRequest.js')

module.exports.validate = function (req, res, db, callback) {
    // if the request dosent have a header with email, reject the request. i.e. if there is no token, no access
    if (!req.params.token) {
        console.log('invalid request')
        res.writeHead(403, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify({
            error: "You are not authorized to access this application",
            message: "An Email is required as part of the header"
        }));
    };


    isEmailValid(db, req.params.token, function (user) {
        if (!user) {
            res.writeHead(403, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify({
                error: "You are not authorized to access this application",
                message: "Invalid User Email"
            }));
        } else {
            callback();
        }
    });
};
