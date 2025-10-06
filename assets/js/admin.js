// Admin Dashboard JavaScript
document.addEventListener('DOMContentLoaded', () => {
  initializeAdmin();
});

function initializeAdmin() {
  // Setup navigation
  setupNavigation();
  
  // Load initial data
  loadContacts();
  
  // Setup forms
  setupForms();
}

function setupNavigation() {
  const navButtons = document.querySelectorAll('.admin-nav-btn');
  const sections = document.querySelectorAll('.admin-section');
  
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetSection = button.dataset.section;
      
      // Update active nav button
      navButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Show target section
      sections.forEach(section => section.classList.remove('active'));
      document.getElementById(targetSection).classList.add('active');
      
      // Load section data
      switch(targetSection) {
        case 'contacts':
          loadContacts();
          break;
        case 'gallery':
          loadGallery();
          break;
        case 'testimonials':
          loadTestimonials();
          break;
        case 'services':
          loadServices();
          break;
      }
    });
  });
}

async function loadContacts() {
  if (!window.supabaseClient) return;
  
  try {
    const { data, error } = await supabaseClient
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    const tbody = document.getElementById('contacts-table-body');
    tbody.innerHTML = '';
    
    data.forEach(contact => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${contact.name}</td>
        <td><a href="tel:${contact.phone}">${contact.phone}</a></td>
        <td>${contact.email || '-'}</td>
        <td>${contact.message.substring(0, 100)}${contact.message.length > 100 ? '...' : ''}</td>
        <td><span class="status-badge status-${contact.status}">${contact.status}</span></td>
        <td>${new Date(contact.created_at).toLocaleDateString()}</td>
        <td>
          <button class="btn btn-small btn-primary" onclick="updateContactStatus('${contact.id}', 'read')">Mark Read</button>
          <button class="btn btn-small btn-ghost" onclick="updateContactStatus('${contact.id}', 'replied')">Mark Replied</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Error loading contacts:', error);
    showMessage('Error loading contacts: ' + error.message, 'error');
  }
}

async function loadGallery() {
  if (!window.supabaseClient) return;
  
  try {
    const { data, error } = await supabaseClient
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    const tbody = document.getElementById('gallery-table-body');
    tbody.innerHTML = '';
    
    data.forEach(image => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${image.thumbnail_url || image.image_url}" alt="${image.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
        <td>${image.title}</td>
        <td>${image.category}</td>
        <td><span class="status-badge status-${image.is_active ? 'active' : 'inactive'}">${image.is_active ? 'Active' : 'Inactive'}</span></td>
        <td>${new Date(image.created_at).toLocaleDateString()}</td>
        <td>
          <button class="btn btn-small btn-primary" onclick="toggleGalleryStatus('${image.id}', ${!image.is_active})">${image.is_active ? 'Hide' : 'Show'}</button>
          <button class="btn btn-small btn-ghost" onclick="deleteGalleryItem('${image.id}')">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Error loading gallery:', error);
    showMessage('Error loading gallery: ' + error.message, 'error');
  }
}

async function loadTestimonials() {
  if (!window.supabaseClient) return;
  
  try {
    const { data, error } = await supabaseClient
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    const tbody = document.getElementById('testimonials-table-body');
    tbody.innerHTML = '';
    
    data.forEach(testimonial => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${testimonial.client_name}</td>
        <td>${testimonial.client_location || '-'}</td>
        <td>${'★'.repeat(testimonial.rating)}</td>
        <td>${testimonial.testimonial.substring(0, 100)}${testimonial.testimonial.length > 100 ? '...' : ''}</td>
        <td>${testimonial.is_featured ? 'Yes' : 'No'}</td>
        <td><span class="status-badge status-${testimonial.is_active ? 'active' : 'inactive'}">${testimonial.is_active ? 'Active' : 'Inactive'}</span></td>
        <td>
          <button class="btn btn-small btn-primary" onclick="toggleTestimonialStatus('${testimonial.id}', ${!testimonial.is_active})">${testimonial.is_active ? 'Hide' : 'Show'}</button>
          <button class="btn btn-small btn-ghost" onclick="deleteTestimonial('${testimonial.id}')">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Error loading testimonials:', error);
    showMessage('Error loading testimonials: ' + error.message, 'error');
  }
}

async function loadServices() {
  if (!window.supabaseClient) return;
  
  try {
    const { data, error } = await supabaseClient
      .from('services')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (error) throw error;
    
    const tbody = document.getElementById('services-table-body');
    tbody.innerHTML = '';
    
    data.forEach(service => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${service.name}</td>
        <td>${service.description || '-'}</td>
        <td>${service.price_range || '-'}</td>
        <td>${service.sort_order}</td>
        <td><span class="status-badge status-${service.is_active ? 'active' : 'inactive'}">${service.is_active ? 'Active' : 'Inactive'}</span></td>
        <td>
          <button class="btn btn-small btn-primary" onclick="toggleServiceStatus('${service.id}', ${!service.is_active})">${service.is_active ? 'Hide' : 'Show'}</button>
          <button class="btn btn-small btn-ghost" onclick="deleteService('${service.id}')">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Error loading services:', error);
    showMessage('Error loading services: ' + error.message, 'error');
  }
}

function setupForms() {
  // Gallery form
  const galleryForm = document.getElementById('gallery-form');
  if (galleryForm) {
    galleryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(galleryForm);
      const data = Object.fromEntries(formData.entries());
      
      try {
        const { error } = await supabaseClient
          .from('gallery')
          .insert([{
            ...data,
            is_active: true,
            sort_order: parseInt(data.sort_order) || 0
          }]);
        
        if (error) throw error;
        
        showMessage('Image added successfully!', 'success');
        galleryForm.reset();
        loadGallery();
      } catch (error) {
        showMessage('Error adding image: ' + error.message, 'error');
      }
    });
  }

  // Testimonial form
  const testimonialForm = document.getElementById('testimonial-form');
  if (testimonialForm) {
    testimonialForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(testimonialForm);
      const data = Object.fromEntries(formData.entries());
      
      try {
        const { error } = await supabaseClient
          .from('testimonials')
          .insert([{
            ...data,
            is_featured: data.is_featured === 'on',
            is_active: true,
            rating: parseInt(data.rating)
          }]);
        
        if (error) throw error;
        
        showMessage('Testimonial added successfully!', 'success');
        testimonialForm.reset();
        loadTestimonials();
      } catch (error) {
        showMessage('Error adding testimonial: ' + error.message, 'error');
      }
    });
  }

  // Service form
  const serviceForm = document.getElementById('service-form');
  if (serviceForm) {
    serviceForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(serviceForm);
      const data = Object.fromEntries(formData.entries());
      
      try {
        const { error } = await supabaseClient
          .from('services')
          .insert([{
            ...data,
            is_active: data.is_active === 'on',
            sort_order: parseInt(data.sort_order) || 0
          }]);
        
        if (error) throw error;
        
        showMessage('Service added successfully!', 'success');
        serviceForm.reset();
        loadServices();
      } catch (error) {
        showMessage('Error adding service: ' + error.message, 'error');
      }
    });
  }
}

// Action functions
async function updateContactStatus(id, status) {
  try {
    const { error } = await supabaseClient
      .from('contacts')
      .update({ status })
      .eq('id', id);
    
    if (error) throw error;
    
    showMessage('Contact status updated!', 'success');
    loadContacts();
  } catch (error) {
    showMessage('Error updating contact: ' + error.message, 'error');
  }
}

async function toggleGalleryStatus(id, isActive) {
  try {
    const { error } = await supabaseClient
      .from('gallery')
      .update({ is_active: isActive })
      .eq('id', id);
    
    if (error) throw error;
    
    showMessage('Gallery item updated!', 'success');
    loadGallery();
  } catch (error) {
    showMessage('Error updating gallery item: ' + error.message, 'error');
  }
}

async function deleteGalleryItem(id) {
  if (!confirm('Are you sure you want to delete this gallery item?')) return;
  
  try {
    const { error } = await supabaseClient
      .from('gallery')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    showMessage('Gallery item deleted!', 'success');
    loadGallery();
  } catch (error) {
    showMessage('Error deleting gallery item: ' + error.message, 'error');
  }
}

async function toggleTestimonialStatus(id, isActive) {
  try {
    const { error } = await supabaseClient
      .from('testimonials')
      .update({ is_active: isActive })
      .eq('id', id);
    
    if (error) throw error;
    
    showMessage('Testimonial updated!', 'success');
    loadTestimonials();
  } catch (error) {
    showMessage('Error updating testimonial: ' + error.message, 'error');
  }
}

async function deleteTestimonial(id) {
  if (!confirm('Are you sure you want to delete this testimonial?')) return;
  
  try {
    const { error } = await supabaseClient
      .from('testimonials')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    showMessage('Testimonial deleted!', 'success');
    loadTestimonials();
  } catch (error) {
    showMessage('Error deleting testimonial: ' + error.message, 'error');
  }
}

async function toggleServiceStatus(id, isActive) {
  try {
    const { error } = await supabaseClient
      .from('services')
      .update({ is_active: isActive })
      .eq('id', id);
    
    if (error) throw error;
    
    showMessage('Service updated!', 'success');
    loadServices();
  } catch (error) {
    showMessage('Error updating service: ' + error.message, 'error');
  }
}

async function deleteService(id) {
  if (!confirm('Are you sure you want to delete this service?')) return;
  
  try {
    const { error } = await supabaseClient
      .from('services')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    showMessage('Service deleted!', 'success');
    loadServices();
  } catch (error) {
    showMessage('Error deleting service: ' + error.message, 'error');
  }
}

function showMessage(message, type = 'info') {
  // Remove existing messages
  const existingMessage = document.querySelector('.admin-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create new message
  const messageDiv = document.createElement('div');
  messageDiv.className = `admin-message admin-message-${type}`;
  messageDiv.textContent = message;
  
  // Add styles
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 500;
    z-index: 1000;
    background: ${type === 'success' ? '#d1fae5' : type === 'error' ? '#fee2e2' : '#dbeafe'};
    color: ${type === 'success' ? '#065f46' : type === 'error' ? '#991b1b' : '#1e40af'};
    border: 1px solid ${type === 'success' ? '#a7f3d0' : type === 'error' ? '#fecaca' : '#bfdbfe'};
  `;

  document.body.appendChild(messageDiv);
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 3000);
}
