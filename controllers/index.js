const
    url = require('url'),
    jwt = require('jsonwebtoken'); //used to create, sign and verify tokens

// Handler for HTTP GET all
exports.list = function (model, response) {
    model.find({}, function (error, result) {
        if (error) {
            console.error(error);
            return null;
        }
        if (response != null) {
            response.setHeader('content-type', 'application/json');
            response.send(JSON.stringify({data: result}));
        }
    });
}

// handler for Hello endpoint
exports.sayHello = function (req, res) {
    let get_params = url.parse(req.url, true).query;

    if (Object.keys(get_params).length == 0) {
        res.send({'Response': 'Hello World!'});
    }
    else {
        res.send({'Response': 'Hello ' + get_params.user});
    }
}

//authenticate user
exports.authenticate = function (model, req, res) {
// find the user
    model.findOne({
        name: req.body.name
    }, function (err, user) {

        if (err) throw err;

        if (!user) {
            res.json({success: false, message: 'Authentication failed. User not found.'})
        } else if (user) {

            //check if password matches
            if (user.password !== req.body.password) {
                res.json({success: false, message: 'Authentication failed. Wrong password.'});
            } else {
                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                    admin: user.admin
                };
                var token = jwt.sign(payload, process.env.SECRET, {
                    expiresIn: 3600 // expires in 1 hour
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    });
}