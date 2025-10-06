// Supabase Configuration
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Database utility functions
const Database = {
  // Contact form submissions
  async submitContact(formData) {
    try {
      const { data, error } = await supabaseClient
        .from('contacts')
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ]);
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return { success: false, error: error.message };
    }
  },

  // Get gallery images
  async getGalleryImages(category = null) {
    try {
      let query = supabaseClient
        .from('gallery')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      return { success: false, error: error.message };
    }
  },

  // Get testimonials
  async getTestimonials() {
    try {
      const { data, error } = await supabaseClient
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return { success: false, error: error.message };
    }
  },

  // Get services
  async getServices() {
    try {
      const { data, error } = await supabaseClient
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching services:', error);
      return { success: false, error: error.message };
    }
  }
};

// Export for use in other scripts
window.Database = Database;
window.supabaseClient = supabaseClient;
