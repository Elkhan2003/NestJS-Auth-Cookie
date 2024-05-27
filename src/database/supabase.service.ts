import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { supabaseConfig } from './supabase.config';

@Injectable()
export class SupabaseService {
	private supabase: SupabaseClient;

	constructor() {
		this.supabase = createClient(supabaseConfig.apiUrl, supabaseConfig.apiKey);
	}
}
