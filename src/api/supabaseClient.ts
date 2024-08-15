// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://jbkyczpykhtzhnbokrsi.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impia3ljenB5a2h0emhuYm9rcnNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM1OTE1ODMsImV4cCI6MjAzOTE2NzU4M30.wiwZ0139ogKihwFDX2sReYYhnuljnc3zHJIMLAjxDJg"
// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
