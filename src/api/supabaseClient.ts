// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || (() => { throw new Error("REACT_APP_SUPABASE_URL is not defined") })();
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || (() => { throw new Error("REACT_APP_SUPABASE_ANON_KEY is not defined") })();

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
