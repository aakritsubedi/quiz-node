const userModel = require("./users.model");
const jwt = require("jsonwebtoken");


module.exports = {
    fetch: async () => {
        let users = null;
        try {
            users = await userModel.fetch()
        } catch (e) {
            throw e;
        }
        return users;
    },
    fetchById: async (id) => {
        let user = null;
        try {
            user = await userModel.fetchById()
        } catch (e) {
            throw e;
        }
        return user;
    },
    create: async (userData) => {
        let user = null;
        try {
            users = await userModel.create(userData)
        } catch (e) {
            throw e;
        }
        return user;
    },
    update: async (userData) => {
        let user = null;
        try {
            user = await userModel.update(userData)
        } catch (e) {
            throw e;
        }
        return user;
    },
    remove: async (id) => {
        try {
            await userModel.remove(id)
        } catch (e) {
            throw e;
        }
    },
    login: async (user) => {
        let userData = null;
        let newUser= null;
        try {
            userData = await userModel.fetchByEmail(user.email)
            if (!userData.length){
                newUser = module.exports.create(user)
            }
            userData = new Set({...userData, ...newUser})
            const token = jwt.sign(userData, "jwttoken", {
                expiresIn: "3h",
            });
        } catch (e) {
            throw e;
        }
    }

}
