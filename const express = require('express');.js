const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to verify user token
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    
    if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid or expired token." });
        req.user = user;
        next();
    });
}

// Protected route to read posted tenders immediately post-login
router.get('/api/tenders', verifyToken, async (req, res) => {
    try {
        // Fetch active tenders from your database (e.g., MongoDB, PostgreSQL)
        // const tenders = await TenderModel.find({ status: 'Active' });
        
        // Mock data response for demonstration:
        const mockTenders = [
            {
                id: "TEN-2026-01",
                referenceNumber: "RFQ/2026/089",
                title: "Supply and Installation of Cloud Server Infrastructure",
                category: "IT & Telecom",
                deadline: "2026-05-15",
                description: "Proposals are invited from eligible vendors for upgrading core cloud infrastructure components..."
            },
            {
                id: "TEN-2026-02",
                referenceNumber: "CB/2026/042",
                title: "Corporate Office Renovation & Interior Design",
                category: "Construction",
                deadline: "2026-06-01",
                description: "Seeking certified contractors to handle full-scale interior remodeling and eco-friendly lighting retrofits..."
            }
        ];

        res.status(200).json(mockTenders);
    } catch (err) {
        res.status(500).json({ error: "Server error while fetching tenders." });
    }
});

module.exports = router;