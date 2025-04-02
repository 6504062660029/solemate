import { query } from './lib/db.js';

async function getProducts() {
  try {
    const products = await query('SELECT * FROM products LIMIT 10');
    console.log('✅ Fetched products:', products);
  } catch (error) {
    console.error('❌ Failed to fetch products:', error);
  }
}

getProducts();
