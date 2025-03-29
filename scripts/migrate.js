const fs = require('fs');
const bcrypt = require('bcryptjs');

async function migrate() {
    try {
        console.log('Generating secure password hash...');
        const hash = await bcrypt.hash('ChristianC1123!', 12);
        
        console.log('Updating .env file...');
        let envContent = fs.existsSync('.env') ? fs.readFileSync('.env', 'utf8') : '';
        
        // Remove old hash if exists
        envContent = envContent.replace(/ADMIN_PASSWORD_HASH=.*\n/, '');
        
        // Add new hash
        envContent += `ADMIN_PASSWORD_HASH=${hash}\n`;
        
        fs.writeFileSync('.env', envContent);
        console.log('Migration completed successfully!');
        console.log('New password hash saved to .env file');
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();