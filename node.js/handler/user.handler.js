const userService = require('../service/user.service');

exports.signup = (req, res) => {
    const formData = req.body;
    userService.registerUser(formData)
        .then(result => res.send('<html><body><h1>Registration successful!</h1></body></html>'))
        .catch(error => res.status(500).json({ message: error.message }));
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    userService.loginUser(username, password)
        .then(result => res.json({ success: true, message: 'Login successful' }))
        .catch(error => res.status(401).json({ success: false, message: error.message }));
};
