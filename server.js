const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // For password hashing

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your actual database or user data storage
const users = [
    { id: 1, username: 'user1', password: '123456' } // Example hashed password
];

// Middleware to parse JSON requests
app.use(express.json());

// Authentication endpoint
app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;

    // Simulate database lookup or actual database query
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Validate password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

    // Send token as response
    res.status(200).json({ token });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
