require('dotenv').config();
const { Pool } = require('pg');

async function testConnection() {
    console.log('🔍 Testing database connection...');
    console.log('📍 Connection string:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'));

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        connectionTimeoutMillis: 10000,
    });

    try {
        console.log('⏳ Attempting to connect...');
        const client = await pool.connect();
        console.log('✅ Connection successful!');

        const result = await client.query('SELECT NOW()');
        console.log('🕐 Server time:', result.rows[0].now);

        client.release();
        await pool.end();

        console.log('\n✅ Database is working correctly!');
    } catch (error) {
        console.error('\n❌ Connection failed:');
        console.error('Error:', error.message);
        console.error('\nPossible issues:');
        console.error('1. Database credentials are incorrect');
        console.error('2. Database server is not accessible');
        console.error('3. Firewall is blocking the connection');
        console.error('4. Database does not exist');
        process.exit(1);
    }
}

testConnection();
