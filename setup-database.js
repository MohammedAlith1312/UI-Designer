const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        console.log('🔌 Connecting to database...');

        // Read the SQL schema file
        const schemaPath = path.join(__dirname, 'database-schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('📝 Executing schema...');
        await pool.query(schema);

        console.log('✅ Database setup complete!');
        console.log('📊 Tables created:');
        console.log('   - dynamic_pages');
        console.log('   - dynamic_assets');

    } catch (error) {
        console.error('❌ Database setup failed:', error.message);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

setupDatabase();
