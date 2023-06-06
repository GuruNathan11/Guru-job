var User = require('../Model/Models');
const { use } = require('../Routes/routes.js');

exports.Dao_index = function (req, callback) {
  User.find({}, function (err, users) {
    if (err) {
      callback.json({
        status: "Error",
        message: err
      });
    } else {
      if (users.length === 0) {
        callback.json({
          status: "Success",
          message: "User list is empty. Please add some users."
        });
      } else {
        callback.json({
          status: "Success",
          message: "Got user details successfully",
          data: users
        });
      }
    }
  });
};
