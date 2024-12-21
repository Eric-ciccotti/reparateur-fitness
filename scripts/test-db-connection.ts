import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Charger les variables d'environnement depuis .env et .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true });

async function testSupabaseConnection() {
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Supabase URL or Anon Key is missing');
    console.error('SUPABASE_URL:', supabaseUrl);
    console.error('SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Present' : 'Missing');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    // Test connection by fetching bookings
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .limit(1);

    if (error) throw error;

    console.log('✅ Supabase Connection Successful!');
    console.log('Total Bookings:', data.length);
  } catch (error) {
    console.error('❌ Supabase Connection Failed!', error);
    process.exit(1);
  }
}

testSupabaseConnection();
