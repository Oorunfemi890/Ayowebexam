const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const dataFilePath = path.join(__dirname, '../data/user.json');

// Save a new user to the JSON file
const saveUser = (userDetails) => {
    return new Promise((resolve, reject) => {
        // Read existing user data
        fs.readFile(dataFilePath, 'utf8', (err, data) => {
            if (err) {
                return reject('Error reading user data');
            }

            let users = [];
            try {
                users = JSON.parse(data); // Parse existing users
            } catch (err) {
                // Handle JSON parsing error
            }

            // Add the new user data
            users.push(userDetails);

            // Save the updated user list back to the file
            fs.writeFile(dataFilePath, JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    return reject('Error saving user data');
                }
                resolve();
            });
        });
    });
};

// Hash the password and save the user
const registerUser = async (userDetails) => {
    const hashedPassword = await bcrypt.hash(userDetails.password, 10); // Hash the password
    const newUser = { ...userDetails, password: hashedPassword }; // Create new user with hashed password
    return saveUser(newUser); // Save the user
};

// Authenticate user by checking username and password
const authenticateUser = async (username, password) => {
    return new Promise((resolve, reject) => {
        // Read user data
        fs.readFile(dataFilePath, 'utf8', (err, data) => {
            if (err) {
                return reject('Error reading user data');
            }

            let users = [];
            try {
                users = JSON.parse(data); // Parse the JSON data
            } catch (err) {
                // Handle JSON parsing error
            }

            // Find user with matching username
            const user = users.find(user => user.username === username);
            if (user) {
                // Check password match
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        return reject('Error comparing passwords');
                    }
                    resolve(isMatch ? user : null); // Resolve with user data if the password matches
                });
            } else {
                resolve(null); // User not found
            }
        });
    });
};

module.exports = { registerUser, authenticateUser };
