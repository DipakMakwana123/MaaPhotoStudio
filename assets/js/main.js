document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const toggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('primary-nav');
  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Initialize Supabase integration
  initializeSupabase();

  // Lightbox behavior
  const gallery = document.querySelector('[data-lightbox]');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  if (gallery && lightbox && lightboxImage) {
    gallery.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      e.preventDefault();
      const fullSrc = link.getAttribute('href');
      if (!fullSrc) return;
      lightboxImage.src = fullSrc;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImage.src = '';
      document.body.style.overflow = '';
    };

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });
  }
});

// Supabase Integration Functions
async function initializeSupabase() {
  // Load testimonials dynamically
  await loadTestimonials();
  
  // Load gallery images dynamically
  await loadGalleryImages();
  
  // Load service-specific images if on services page
  if (window.location.pathname.includes('services.html')) {
    await loadServiceImages();
  }
  
  // Setup contact form
  setupContactForm();
}

async function loadTestimonials() {
  if (!window.Database) return;
  
  try {
    const result = await Database.getTestimonials();
    if (result.success && result.data.length > 0) {
      updateTestimonialsSection(result.data);
    }
  } catch (error) {
    console.error('Error loading testimonials:', error);
  }
}

function updateTestimonialsSection(testimonials) {
  const testimonialsSection = document.querySelector('.section .two-col div:first-child');
  if (!testimonialsSection) return;

  const featuredTestimonials = testimonials.filter(t => t.is_featured).slice(0, 2);
  
  if (featuredTestimonials.length > 0) {
    const quotesHTML = featuredTestimonials.map(testimonial => 
      `<p class="quote">"${testimonial.testimonial}"</p>`
    ).join('');
    
    const existingQuotes = testimonialsSection.querySelectorAll('.quote');
    existingQuotes.forEach(quote => quote.remove());
    
    const h2 = testimonialsSection.querySelector('h2');
    if (h2) {
      h2.insertAdjacentHTML('afterend', quotesHTML);
    }
  }
}

async function loadGalleryImages() {
  if (!window.Database) return;
  
  try {
    const result = await Database.getGalleryImages();
    if (result.success && result.data.length > 0) {
      updateGallerySection(result.data);
    }
  } catch (error) {
    console.error('Error loading gallery images:', error);
  }
}

function updateGallerySection(images) {
  const galleryGrid = document.querySelector('.gallery-grid');
  if (!galleryGrid) return;

  // Clear existing images
  galleryGrid.innerHTML = '';

  // Add new images
  images.forEach(image => {
    const li = document.createElement('li');
    li.innerHTML = `
      <a href="${image.image_url}" target="_blank" rel="noopener">
        <img loading="lazy" alt="${image.alt_text || image.title}" src="${image.thumbnail_url || image.image_url}">
      </a>
    `;
    galleryGrid.appendChild(li);
  });
}

async function loadServiceImages() {
  if (!window.Database) return;
  
  try {
    // Get all service gallery sections
    const serviceSections = document.querySelectorAll('.gallery-grid[data-category]');
    
    for (const section of serviceSections) {
      const category = section.dataset.category;
      const result = await Database.getGalleryImages(category);
      
      if (result.success && result.data.length > 0) {
        updateServiceGallerySection(section, result.data);
      }
    }
  } catch (error) {
    console.error('Error loading service images:', error);
  }
}

function updateServiceGallerySection(galleryGrid, images) {
  // Clear existing images
  galleryGrid.innerHTML = '';

  // Add new images (limit to 6 images per service)
  const limitedImages = images.slice(0, 6);
  
  limitedImages.forEach(image => {
    const li = document.createElement('li');
    li.innerHTML = `
      <a href="${image.image_url}" target="_blank" rel="noopener">
        <img loading="lazy" alt="${image.alt_text || image.title}" src="${image.thumbnail_url || image.image_url}">
      </a>
    `;
    galleryGrid.appendChild(li);
  });
}

function setupContactForm() {
  const contactForm = document.querySelector('form[name="contact"]');
  if (!contactForm || !window.Database) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const result = await Database.submitContact(data);
      
      if (result.success) {
        // Show success message
        showMessage('Thank you for your message! We will get back to you soon.', 'success');
        contactForm.reset();
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      showMessage('Sorry, there was an error sending your message. Please try again or call us directly.', 'error');
    } finally {
      // Reset button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

function showMessage(message, type = 'info') {
  // Remove existing messages
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create new message
  const messageDiv = document.createElement('div');
  messageDiv.className = `form-message form-message-${type}`;
  messageDiv.textContent = message;
  
  // Add styles
  messageDiv.style.cssText = `
    padding: 12px 16px;
    margin: 16px 0;
    border-radius: 8px;
    font-weight: 500;
    background: ${type === 'success' ? '#d1fae5' : type === 'error' ? '#fee2e2' : '#dbeafe'};
    color: ${type === 'success' ? '#065f46' : type === 'error' ? '#991b1b' : '#1e40af'};
    border: 1px solid ${type === 'success' ? '#a7f3d0' : type === 'error' ? '#fecaca' : '#bfdbfe'};
  `;

  // Insert after form
  const contactForm = document.querySelector('form[name="contact"]');
  if (contactForm) {
    contactForm.parentNode.insertBefore(messageDiv, contactForm.nextSibling);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 5000);
  }
}

