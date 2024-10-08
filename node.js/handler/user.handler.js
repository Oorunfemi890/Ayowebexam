const userService = require('../service/user.service');

// Handler for registering a new user
const registerUser = async (req, res) => {
    const formData = req.body;

    // Check if password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Prepare user data excluding confirmPassword
    const { confirmPassword, ...userDetails } = formData;

    // Save user using userService and handle the response
    try {
        await userService.registerUser(userDetails); // Use the new registerUser function
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving user data' });
    }
};

// Handler for logging in a user
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    // Authenticate user using userService
    try {
        const user = await userService.authenticateUser(username, password);
        if (user) {
            return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error during login' });
    }
};

module.exports = { registerUser, loginUser };
