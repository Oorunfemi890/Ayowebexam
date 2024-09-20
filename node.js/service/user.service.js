const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '../data/user.json');

exports.registerUser = (userDetails) => {
    return new Promise((resolve, reject) => {
        // Read existing users from the JSON file
        fs.readFile(dataFilePath, 'utf8', (err, data) => {
            if (err) {
                return reject(new Error('Error reading data'));
            }

            let users = [];
            try {
                users = JSON.parse(data);  // Parse existing users
            } catch (err) {
                return reject(new Error('Error parsing user data'));
            }

            // Add the new user
            users.push(userDetails);

            // Save the updated user list to the JSON file
            fs.writeFile(dataFilePath, JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    return reject(new Error('Error saving user data'));
                }
                resolve();
            });
        });
    });
};

exports.loginUser = (username, password) => {
    return new Promise((resolve, reject) => {
        // Read user data from the JSON file
        fs.readFile(dataFilePath, 'utf8', (err, data) => {
            if (err) {
                return reject(new Error('Error reading data'));
            }

            let users = [];
            try {
                users = JSON.parse(data);  // Parse existing users
            } catch (err) {
                return reject(new Error('Error parsing user data'));
            }

            // Find the user with matching username and password
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                resolve();
            } else {
                reject(new Error('Invalid username or password'));
            }
        });
    });
};
