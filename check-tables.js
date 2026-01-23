const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function checkTables() {
    try {
        const res = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name;
        `);
        console.log('Tables in public schema:');
        res.rows.forEach(row => console.log(`- ${row.table_name}`));
    } catch (err) {
        console.error('Error querying tables:', err);
    } finally {
        await pool.end();
    }
}

checkTables();
