import { createClient } from '@supabase/supabase-js'

const BASE_URL = import.meta.env.VITE_SUPABASE_BASE_URL
const API_KEY = import.meta.env.VITE_SUPABASE_API_KEY

const supabaseClient = createClient(BASE_URL, API_KEY)

export default supabaseClient
