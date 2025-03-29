const { secureHeaders } = require('../middleware/security');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const configureServer = (app) => {
    // Production CORS configuration
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'https://skyfallcheats.shop');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });
    
    // Security middleware
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", "cdn.tailwindcss.com"],
                styleSrc: ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com"],
                imgSrc: ["'self'", "i.imgur.com", "data:"],
                connectSrc: ["'self'"]
            }
        }
    }));
    
    app.use(cors({
        origin: process.env.ALLOWED_ORIGIN || 'http://localhost:8000'
    }));
    
    app.use(express.json({ limit: '10kb' }));
    app.use(express.urlencoded({ extended: true, limit: '10kb' }));
    app.disable('x-powered-by');
    app.use(secureHeaders);
    
    // Rate limiting
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100
    }));
};

module.exports = configureServer;