import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qphidvkhcxfgrlrlxcrj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwaGlkdmtoY3hmZ3Jscmx4Y3JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyNjMxMjksImV4cCI6MjA2NjgzOTEyOX0.1AOVJwHGS1lcsyELfteun-PewP001S8kUXQvIUqE2lg'
export const supabase = createClient(supabaseUrl, supabaseKey)