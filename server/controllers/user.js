const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const { username, password } = req.body;
        const { profile_pic } = `https://robohash.org/${username}.png`
        const db = req.app.get('db');
        const result = await db.get_user([username]);
        const existingUser = result[0];
        if(existingUser){
            return res.status(409).send('Username taken');
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const registeredUser = await db.register_user([username, hash]);
        const user = registeredUser[0];
        req.session.user = { 
            username: user.username,
            id: user.id
        }
        return res.status(201).send(req.session.user);
    },

    login: async (req, res) => {
        const { username, password } = req.body;
        const foundUser = await req.app.get('db').get_user([username]);
        const user = foundUser[0];
        if(!user){
            return res.status(401).send('User not found. Please register as a new user before logging in.');
        }
        const isAuthenticated = bcrypt.compareSync(password, user.hash);
        if(!isAuthenticated){
            return res.status(403).send('Incorrect password');
        }
        req.session.user = {
            id: user.id,
            username: user.username
        };
        return res.send(req.session.user);
    },

    getUser: async (req, res) => {
        if(!user){
            return res.status(404).send('User not logged in.');
        }
        req.session.user = {
            id: user.id,
            username: user.username
        }
        return res.sed(req.session.user)
    },

    logout: async (req, res) => {
        req.session.destroy()
        return res.sendStatus(200)
    }
}