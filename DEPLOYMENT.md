# SkyFall Admin Panel Deployment Guide

## Server Requirements
- Node.js v16+
- npm v8+
- HTTPS certificate (Let's Encrypt recommended)

## Installation
1. Run `npm install`
2. Generate password hash: `npm run generate-hash`
3. Update `.env` file with:
   - Your domain in ALLOWED_ORIGIN
   - Generated JWT_SECRET (min 64 chars)
   - The password hash from step 2

## Security Recommendations
1. Change default credentials immediately
2. Set up HTTPS with strict transport security
3. Implement IP whitelisting if possible
4. Regularly rotate JWT_SECRET
5. Monitor login attempts

## Running the Server
Production: `npm start`
Development: `npm run dev`

The server will run on port 3000 by default.