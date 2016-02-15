module.exports = function (server, db) {
  //require validateRequest
    var validateRequest = require("../auth/validateRequest");

      console.log('loaded manageList.js')

    //GET bucklist
    server.get("/api/v1/bucketList/data/list", function (req, res, next) {
        validateRequest.validate(req, res, db, function () {
            db.bucketLists.find({
              //find user with token
                user : req.params.token
            },function (err, list) {
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(list));
            });
        });
        //return next function
        return next();
    });
    //GET bucket list item
    server.get('/api/v1/bucketList/data/item/:id', function (req, res, next) {
        validateRequest.validate(req, res, db, function () {
            db.bucketLists.find({
                _id: db.ObjectId(req.params.id)
            }, function (err, data) {
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(data));
            });
        });
        return next();
    });
    //POST new item
    server.post('/api/v1/bucketList/data/item', function (req, res, next) {
        validateRequest.validate(req, res, db, function () {
            var item = req.params;
            db.bucketLists.save(item,
                function (err, data) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8'
                    });
                    res.end(JSON.stringify(data));
                });
        });
        return next();
    });
    //PUT modify existing item
    server.put('/api/v1/bucketList/data/item/:id', function (req, res, next) {
        validateRequest.validate(req, res, db, function () {
            db.bucketLists.findOne({
                _id: db.ObjectId(req.params.id)
            }, function (err, data) {
                // merge req.params/product with the server/product

                var updProd = {}; // updated products array
                // logic similar to jQuery.extend(); to merge 2 objects.
                //map new updated products into array
                for (var n in data) {
                    updProd[n] = data[n];
                }
                //lookup prodid, make a new one
                for (var n in req.params) {
                    if (n != "id")
                        updProd[n] = req.params[n];
                }
                //update the merged object to the existing list
                db.bucketLists.update({
                    _id: db.ObjectId(req.params.id)
                }, updProd, {
                    multi: false
                }, function (err, data) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8'
                    });
                    res.end(JSON.stringify(data));
                });
            });
        });
        return next();
    });
    //DELETE item
    server.del('/api/v1/bucketList/data/item/:id', function (req, res, next) {
        validateRequest.validate(req, res, db, function () {
            db.bucketLists.remove({
                _id: db.ObjectId(req.params.id)
            }, function (err, data) {
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(data));
            });
            return next();
        });
    });

}
