const userServices = require("./users.service");

module.exports = {
    fetch: async (request, response, next) => {
        let users = null;
        try {
            users = await userServices.fetch()
            response.json(users)
        } catch (e) {
            next(e)
        }
        return users;
    },
    fetchById: async (request, response, next) => {
        let user = null;
        const id = request.params.id;
        try {
            user = await userServices.fetchById(id);
            if(user.length !== 0) {
                response.json(userInfo);
            }
            next({
                message: 'Not found !!!'
            });
          } catch (err) {
            next(err);
          }
    },
    create: async (request, response, next) => {
        let user = null;
        const user = request.body;
        try {
          user = await userServices.create(user);
          if(userInfo.affectedRows){
            response.json({
              message: 'Added Successfully'
            });
          }
        } catch (err) {
          next(err);
        }
    },
    update: async (request, response, next) => {
        let userInfo = null;
        const userData = request.body;
        try {
          userInfo = await userServices.update(userData);
          if(userInfo.affectedRows){
            response.json({
              message: 'Updated Successfully'
            });
          }
        } catch (err) {   
          next(err);
        }
    },
    remove: async (request, response, next) => {
        const id = request.params.id;
        try {
            await userServices.remove(id)
            response.json({
                message: "Deleted Successfully"
            })
        } catch (e) {
            next(e);
        }
    },

}