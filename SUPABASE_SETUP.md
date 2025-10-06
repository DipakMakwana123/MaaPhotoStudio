# Supabase Integration Setup Guide

This guide will help you set up Supabase database integration for your Maa Photo Studio website.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. A new Supabase project created

## Step 1: Create Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `maa-photo-studio`
   - Database Password: (choose a strong password)
   - Region: Choose closest to your location
5. Click "Create new project"

## Step 2: Set Up Database Schema

1. In your Supabase dashboard, go to the SQL Editor
2. Copy the contents of `database-schema.sql` file
3. Paste it into the SQL Editor
4. Click "Run" to execute the schema

This will create all necessary tables:
- `contacts` - for contact form submissions
- `gallery` - for managing gallery images
- `testimonials` - for client testimonials
- `services` - for service listings
- `blog_posts` - for future blog functionality

## Step 3: Get API Keys

1. In your Supabase dashboard, go to Settings > API
2. Copy the following values:
   - Project URL
   - Anon public key

## Step 4: Update Configuration

1. Open `assets/js/supabase-config.js`
2. Replace the placeholder values:
   ```javascript
   const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // Replace with your Project URL
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Replace with your Anon public key
   ```

## Step 5: Test the Integration

1. Open your website in a browser
2. Go to the contact page and submit a test form
3. Check your Supabase dashboard > Table Editor > contacts to see the submission
4. Visit the admin dashboard at `/admin.html` to manage content

## Features Included

### Contact Form Integration
- Contact form submissions are automatically saved to the database
- Real-time form validation and success/error messages
- Admin dashboard to view and manage inquiries

### Dynamic Gallery
- Gallery images are loaded from the database
- Easy management through admin dashboard
- Support for different categories and sorting

### Dynamic Testimonials
- Testimonials are loaded from the database
- Featured testimonials are highlighted
- Easy management through admin dashboard

### Dynamic Services
- Services are loaded from the database
- Easy management through admin dashboard
- Support for pricing and descriptions

### Admin Dashboard
- Access at `/admin.html`
- Manage all content types
- View contact inquiries
- Add/edit/delete gallery images, testimonials, and services

## Security Notes

- Row Level Security (RLS) is enabled on all tables
- Public read access is allowed for gallery, testimonials, and services
- Contact form submissions are allowed for all users
- Admin functions require proper authentication (you may want to add login functionality)

## Next Steps

1. **Add Authentication**: Consider adding user authentication for the admin dashboard
2. **Image Upload**: Integrate with Supabase Storage for image uploads
3. **Email Notifications**: Set up email notifications for new contact submissions
4. **Analytics**: Add analytics to track form submissions and gallery views
5. **SEO**: Add dynamic meta tags based on database content

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your domain is added to the allowed origins in Supabase settings
2. **API Key Issues**: Double-check that you've copied the correct API keys
3. **Database Connection**: Verify that the database schema was created successfully

### Getting Help

- Check the browser console for error messages
- Verify your Supabase project is active and running
- Ensure all API keys are correctly configured

## File Structure

```
/assets/js/
├── supabase-config.js    # Supabase configuration and database functions
├── main.js              # Main website functionality with Supabase integration
└── admin.js             # Admin dashboard functionality

/admin.html              # Admin dashboard for content management
database-schema.sql      # SQL schema for setting up the database
SUPABASE_SETUP.md        # This setup guide
```

## Support

If you encounter any issues, check:
1. Browser console for JavaScript errors
2. Supabase dashboard for database errors
3. Network tab for API call failures

The integration is designed to be robust and will gracefully handle errors without breaking the website functionality.
