const { NewAppPayload, NewPagePayload } = require('./src/data/example-payloads.js');
const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3000/api';

async function runSeed() {
    try {
        console.log('🚀 Starting seed process...');

        // 1. Create the App
        console.log('\n📱 Creating App...');
        const appRes = await fetch(`${API_BASE}/apps`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(NewAppPayload)
        });

        if (!appRes.ok) throw new Error(`Failed to create app: ${appRes.statusText}`);
        const app = await appRes.json();
        console.log(`✅ App created: ${app.name} (${app.id})`);

        // 2. Create the Page (linked to the App)
        console.log('\n📄 Creating Dashboard Page...');
        const pagePayload = {
            ...NewPagePayload,
            app_id: app.id // Link the page to the new app
        };

        const pageRes = await fetch(`${API_BASE}/pages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pagePayload)
        });

        if (!pageRes.ok) throw new Error(`Failed to create page: ${pageRes.statusText}`);
        const page = await pageRes.json();
        console.log(`✅ Page created: ${page.name} (${page.route})`);

        console.log('\n✨ Success! You can now view your new page at:');
        console.log(`http://localhost:3000/builder?page=${page.route.substring(1)}`);

    } catch (error) {
        console.error('❌ Error during seed:', error);
    }
}

runSeed();
