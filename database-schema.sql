-- Maa Photo Studio Database Schema
-- Run this SQL in your Supabase SQL editor

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category VARCHAR(100) NOT NULL,
  alt_text VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  client_location VARCHAR(255),
  testimonial TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price_range VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table (for future use)
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample services
INSERT INTO services (name, description, sort_order) VALUES
('Wedding Photography & Videography', 'Candid coverage of your big day with professional photography and videography services.', 1),
('Maternity Photoshoot', 'Celebrate the magic of parenthood with beautiful maternity photography.', 2),
('Family Portrait Photography', 'Timeless portraits with your loved ones to cherish forever.', 3),
('Kids Photoshoots', 'Capture the boundless energy and smiles of your little ones.', 4),
('Business Portrait Photography', 'Minimal yet powerful professional portraits for your business needs.', 5),
('Classical Dance Photography', 'Expertly crafted performance visuals for dance and cultural events.', 6),
('Engagement Photography & Videography', 'Capture the joy and excitement of your engagement celebration.', 7),
('Pre-wedding Photography & Videography', 'Beautiful pre-wedding shoots to celebrate your love story.', 8),
('Baby Shower Photography & Videography', 'Document the celebration of new life and family joy.', 9),
('New Born Child Photography', 'Precious moments of your newborn baby captured beautifully.', 10),
('Birthday Party Photography & Videography', 'Fun and memorable birthday celebrations captured professionally.', 11),
('Festival Celebration Photography & Videography', 'Cultural and religious festival celebrations documented with care.', 12),
('Event Photography & Videography', 'Professional coverage for all types of events and celebrations.', 13);

-- Insert sample testimonials
INSERT INTO testimonials (client_name, client_location, testimonial, rating, is_featured) VALUES
('Priya & Rajesh', 'Bhavnagar', 'Amazing professionals who did a fantastic job capturing our wedding. Every moment was beautifully documented. Highly recommended!', 5, true),
('Sneha Patel', 'Bhavnagar', 'Patient, kid-friendly, and delivered photos in a day. The quality was outstanding and my kids loved the experience. 10/10.', 5, true),
('Amit & Kavya', 'Bhavnagar', 'The maternity photoshoot was absolutely beautiful. They made me feel comfortable and the results exceeded our expectations.', 5, false),
('Rohit Sharma', 'Bhavnagar', 'Professional approach and excellent quality. They captured our family moments perfectly. Will definitely book again.', 5, false);

-- Insert sample gallery images (using placeholder URLs - replace with actual images)
INSERT INTO gallery (title, description, image_url, thumbnail_url, category, alt_text, sort_order) VALUES
-- Wedding Photography Images
('Wedding Ceremony', 'Beautiful wedding ceremony moments', 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&auto=format&fit=crop&q=60', 'wedding', 'Wedding ceremony photography', 1),
('Wedding Reception', 'Elegant wedding reception moments', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=60', 'wedding', 'Wedding reception photography', 2),
('Wedding Details', 'Beautiful wedding details and decorations', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop&q=60', 'wedding', 'Wedding details photography', 3),

-- Engagement Photography Images
('Engagement Shoot', 'Romantic engagement photography', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=60', 'engagement', 'Engagement photography', 4),
('Engagement Couple', 'Beautiful engagement couple moments', 'https://images.unsplash.com/photo-1521334726092-b509a19597c6?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1521334726092-b509a19597c6?w=600&auto=format&fit=crop&q=60', 'engagement', 'Engagement couple photography', 5),
('Engagement Ring', 'Elegant engagement ring photography', 'https://images.unsplash.com/photo-1503104834685-7205e8607eb9?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1503104834685-7205e8607eb9?w=600&auto=format&fit=crop&q=60', 'engagement', 'Engagement ring photography', 6),

-- Portrait Photography Images
('Portrait Session', 'Professional portrait photography', 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=600&auto=format&fit=crop&q=60', 'portrait', 'Portrait photography', 7),
('Business Portrait', 'Professional business portrait', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=60', 'portrait', 'Business portrait photography', 8),
('Creative Portrait', 'Creative portrait photography', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=60', 'portrait', 'Creative portrait photography', 9),

-- Family Photography Images
('Family Portrait', 'Beautiful family moments', 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&auto=format&fit=crop&q=60', 'family', 'Family photography', 10),
('Family Outdoor', 'Outdoor family photography', 'https://images.unsplash.com/photo-1513281449917-58a985797049?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1513281449917-58a985797049?w=600&auto=format&fit=crop&q=60', 'family', 'Outdoor family photography', 11),
('Family Candid', 'Candid family moments', 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&auto=format&fit=crop&q=60', 'family', 'Candid family photography', 12),

-- Maternity Photography Images
('Maternity Shoot', 'Beautiful maternity photography', 'https://images.unsplash.com/photo-1560759226-14da22a643a1?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1560759226-14da22a643a1?w=600&auto=format&fit=crop&q=60', 'maternity', 'Maternity photography', 13),
('Maternity Couple', 'Maternity couple photography', 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&auto=format&fit=crop&q=60', 'maternity', 'Maternity couple photography', 14),
('Maternity Silhouette', 'Elegant maternity silhouette', 'https://images.unsplash.com/photo-1515488042361-ee0a582ff524?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1515488042361-ee0a582ff524?w=600&auto=format&fit=crop&q=60', 'maternity', 'Maternity silhouette photography', 15),

-- Newborn Photography Images
('Newborn Baby', 'Precious newborn moments', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=60', 'newborn', 'Newborn photography', 16),
('Newborn Family', 'Newborn with family', 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=60', 'newborn', 'Newborn family photography', 17),
('Newborn Details', 'Tiny newborn details', 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=600&auto=format&fit=crop&q=60', 'newborn', 'Newborn details photography', 18),

-- Birthday Photography Images
('Birthday Celebration', 'Fun birthday party moments', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&auto=format&fit=crop&q=60', 'birthday', 'Birthday photography', 19),
('Kids Birthday', 'Kids birthday party fun', 'https://images.unsplash.com/photo-1521334726092-b509a19597c6?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1521334726092-b509a19597c6?w=600&auto=format&fit=crop&q=60', 'birthday', 'Kids birthday photography', 20),
('Birthday Cake', 'Beautiful birthday cake moments', 'https://images.unsplash.com/photo-1542596594-649edbc13630?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1542596594-649edbc13630?w=600&auto=format&fit=crop&q=60', 'birthday', 'Birthday cake photography', 21),

-- Event Photography Images
('Corporate Event', 'Professional corporate event photography', 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=600&auto=format&fit=crop&q=60', 'event', 'Corporate event photography', 22),
('Festival Celebration', 'Cultural festival photography', 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&auto=format&fit=crop&q=60', 'event', 'Festival photography', 23),
('Social Event', 'Social event photography', 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=60', 'event', 'Social event photography', 24);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_active ON gallery(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);

-- Enable Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON gallery FOR SELECT USING (is_active = true);
CREATE POLICY "Enable read access for all users" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Enable read access for all users" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Enable read access for all users" ON blog_posts FOR SELECT USING (is_published = true AND is_active = true);

-- Create policy for contact form submissions (allow insert for all users)
CREATE POLICY "Enable insert for all users" ON contacts FOR INSERT WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON gallery FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
