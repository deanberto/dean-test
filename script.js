// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            });
        });
    }
});

// Information Page Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
    const infoNavBtns = document.querySelectorAll('.info-nav-btn');
    const infoSections = document.querySelectorAll('.info-section');
    
    infoNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Remove active class from all buttons and sections
            infoNavBtns.forEach(b => b.classList.remove('active'));
            infoSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            this.classList.add('active');
            const targetSection = document.getElementById(target);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
});

// Smooth Scrolling for Anchor Links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual form handling)
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            this.reset();
        });
    }
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontFamily: 'Oswald, sans-serif',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #4a7c59, #5a8c69)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #8b4513, #a0522d)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #2a2a2a, #3a3a3a)';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Navbar background on scroll
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            }
        });
    }
});

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .species-card, .tip-card, .resource-card, .contact-method, .social-card');
    
    animatedElements.forEach((element, index) => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        // Observe element
        observer.observe(element);
    });
});

// Keyboard navigation support
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard support for info navigation buttons
    const infoNavBtns = document.querySelectorAll('.info-nav-btn');
    
    infoNavBtns.forEach((btn, index) => {
        btn.addEventListener('keydown', function(e) {
            let targetIndex = index;
            
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    targetIndex = index > 0 ? index - 1 : infoNavBtns.length - 1;
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    targetIndex = index < infoNavBtns.length - 1 ? index + 1 : 0;
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    btn.click();
                    return;
                default:
                    return;
            }
            
            infoNavBtns[targetIndex].focus();
        });
    });
});

// Social media link tracking (for analytics)
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-link, .social-button');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.textContent.toLowerCase().includes('facebook') ? 'Facebook' : 'Instagram';
            
            // Log social media click (replace with actual analytics)
            console.log(`Social media click: ${platform}`);
            
            // You can add Google Analytics or other tracking here
            // gtag('event', 'social_click', { platform: platform });
        });
    });
});

// Performance optimization: Lazy loading for images (if added later)
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Error handling for missing elements
window.addEventListener('error', function(e) {
    console.warn('JavaScript error caught:', e.message);
    // Prevent errors from breaking the entire page
    return true;
});

// Social Media Feed Configuration
// Configuration is loaded from social-config.js
// If not available, use empty config (will fall back to demo data)
const SOCIAL_CONFIG = window.SOCIAL_CONFIG || {
    instagram: {
        accessToken: '',
        userId: '',
        fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,username'
    },
    facebook: {
        accessToken: '',
        pageId: '',
        fields: 'id,message,full_picture,permalink_url,created_time,type,attachments{media,url}'
    }
};

// Social Media Feed Class
class SocialMediaFeed {
    constructor() {
        this.posts = [];
        this.currentFilter = 'all';
        this.isLoading = false;
        this.hasError = false;
        this.loadedPosts = 6; // Number of posts to show initially
        this.postsPerLoad = 3; // Number of posts to load when "Load More" is clicked
        
        this.initializeElements();
        this.bindEvents();
        this.loadFeed();
    }

    initializeElements() {
        this.feedGrid = document.getElementById('social-feed-grid');
        this.feedLoading = document.getElementById('feed-loading');
        this.feedError = document.getElementById('feed-error');
        this.loadMoreBtn = document.getElementById('load-more-posts');
        this.filterBtns = document.querySelectorAll('.feed-filter');
    }

    bindEvents() {
        // Filter buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Load more button
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.loadMorePosts();
            });
        }
    }

    async loadFeed() {
        this.showLoading();
        
        try {
            // Load posts from both platforms
            const [instagramPosts, facebookPosts] = await Promise.allSettled([
                this.fetchInstagramPosts(),
                this.fetchFacebookPosts()
            ]);

            // Combine and process posts
            let allPosts = [];
            
            if (instagramPosts.status === 'fulfilled' && instagramPosts.value) {
                allPosts = allPosts.concat(instagramPosts.value);
            }
            
            if (facebookPosts.status === 'fulfilled' && facebookPosts.value) {
                allPosts = allPosts.concat(facebookPosts.value);
            }

            // If no posts were loaded, use demo data
            if (allPosts.length === 0) {
                allPosts = this.getDemoData();
            }

            // Sort posts by date (newest first)
            this.posts = allPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            
            this.hideLoading();
            this.renderPosts();
            
        } catch (error) {
            console.error('Error loading social media feed:', error);
            this.showError();
        }
    }

    async fetchInstagramPosts() {
        if (!SOCIAL_CONFIG.instagram.accessToken || !SOCIAL_CONFIG.instagram.userId) {
            console.warn('Instagram API credentials not configured');
            return null;
        }

        try {
            const response = await fetch(
                `https://graph.instagram.com/${SOCIAL_CONFIG.instagram.userId}/media?fields=${SOCIAL_CONFIG.instagram.fields}&access_token=${SOCIAL_CONFIG.instagram.accessToken}&limit=10`
            );
            
            if (!response.ok) {
                throw new Error(`Instagram API error: ${response.status}`);
            }
            
            const data = await response.json();
            
            return data.data.map(post => ({
                id: post.id,
                platform: 'instagram',
                author: 'Reptile Ireland',
                avatar: '🦎',
                text: post.caption || '',
                image: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
                link: post.permalink,
                timestamp: post.timestamp,
                type: post.media_type
            }));
            
        } catch (error) {
            console.error('Error fetching Instagram posts:', error);
            return null;
        }
    }

    async fetchFacebookPosts() {
        if (!SOCIAL_CONFIG.facebook.accessToken || !SOCIAL_CONFIG.facebook.pageId) {
            console.warn('Facebook API credentials not configured');
            return null;
        }

        try {
            const response = await fetch(
                `https://graph.facebook.com/v18.0/${SOCIAL_CONFIG.facebook.pageId}/posts?fields=${SOCIAL_CONFIG.facebook.fields}&access_token=${SOCIAL_CONFIG.facebook.accessToken}&limit=10`
            );
            
            if (!response.ok) {
                throw new Error(`Facebook API error: ${response.status}`);
            }
            
            const data = await response.json();
            
            return data.data.map(post => ({
                id: post.id,
                platform: 'facebook',
                author: 'Reptile Ireland',
                avatar: '📘',
                text: post.message || '',
                image: post.full_picture,
                link: post.permalink_url,
                timestamp: post.created_time,
                type: post.type
            }));
            
        } catch (error) {
            console.error('Error fetching Facebook posts:', error);
            return null;
        }
    }

    getDemoData() {
        // Demo data to show the feed functionality
        return [
            {
                id: 'demo_1',
                platform: 'instagram',
                author: 'Reptile Ireland',
                avatar: '🦎',
                text: 'Check out this beautiful Savannah Monitor enjoying some morning sun! These intelligent reptiles make fascinating companions when properly cared for. 🌞 #SavannahMonitor #ReptileLife #MonitorLizard #ReptileIreland',
                image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop',
                link: '#',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
                type: 'IMAGE'
            },
            {
                id: 'demo_2',
                platform: 'facebook',
                author: 'Reptile Ireland',
                avatar: '📘',
                text: 'Feeding time for our resident Boa Constrictor! Remember, proper feeding schedules are crucial for your snake\'s health. Adult boas typically eat every 2-3 weeks. Always monitor your pet\'s body condition and adjust accordingly.',
                image: 'https://images.unsplash.com/photo-1516728778615-2d590ea18d8d?w=400&h=400&fit=crop',
                link: '#',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
                type: 'photo'
            },
            {
                id: 'demo_3',
                platform: 'instagram',
                author: 'Reptile Ireland',
                avatar: '🦎',
                text: 'Habitat setup tip: Creating proper temperature gradients is essential for large lizards. This Tegu enclosure shows a perfect basking spot setup! 🔥 #Terrarium #ReptileHabitat #Tegu #ReptileCare',
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
                link: '#',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
                type: 'IMAGE'
            },
            {
                id: 'demo_4',
                platform: 'facebook',
                author: 'Reptile Ireland',
                avatar: '📘',
                text: 'Educational post: Did you know that Green Tree Monitors are excellent climbers? Their prehensile tails act like a fifth limb, helping them navigate through branches with incredible agility. These arboreal beauties require tall enclosures with plenty of climbing opportunities.',
                image: 'https://images.unsplash.com/photo-1516728778615-2d590ea18d8d?w=400&h=400&fit=crop',
                link: '#',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
                type: 'photo'
            },
            {
                id: 'demo_5',
                platform: 'instagram',
                author: 'Reptile Ireland',
                avatar: '🦎',
                text: 'Shedding season! This beautiful Ball Python is getting ready to shed. Notice the milky eyes and dull coloration - classic pre-shed signs. 🐍 #BallPython #Shedding #SnakeCare #ReptileHealth',
                image: 'https://images.unsplash.com/photo-1516728778615-2d590ea18d8d?w=400&h=400&fit=crop',
                link: '#',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 1.5 days ago
                type: 'IMAGE'
            },
            {
                id: 'demo_6',
                platform: 'facebook',
                author: 'Reptile Ireland',
                avatar: '📘',
                text: 'Weekly care tip: UVB lighting is crucial for many reptile species. Replace your UVB bulbs every 6-12 months, even if they still produce visible light. The UV output decreases over time, which can lead to health issues in your pets.',
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
                link: '#',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
                type: 'photo'
            }
        ];
    }

    renderPosts() {
        const filteredPosts = this.getFilteredPosts();
        const postsToShow = filteredPosts.slice(0, this.loadedPosts);
        
        this.feedGrid.innerHTML = '';
        
        postsToShow.forEach(post => {
            const postElement = this.createPostElement(post);
            this.feedGrid.appendChild(postElement);
        });

        // Show/hide load more button
        if (this.loadMoreBtn) {
            if (filteredPosts.length > this.loadedPosts) {
                this.loadMoreBtn.style.display = 'inline-block';
            } else {
                this.loadMoreBtn.style.display = 'none';
            }
        }

        // Animate posts in
        setTimeout(() => {
            const posts = this.feedGrid.querySelectorAll('.social-post');
            posts.forEach((post, index) => {
                setTimeout(() => {
                    post.style.opacity = '1';
                    post.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 100);
    }

    createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.className = `social-post ${post.platform}`;
        postDiv.style.opacity = '0';
        postDiv.style.transform = 'translateY(20px)';
        postDiv.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        const timeAgo = this.getTimeAgo(post.timestamp);
        const truncatedText = this.truncateText(post.text, 150);
        
        postDiv.innerHTML = `
            <div class="post-header">
                <div class="post-avatar">${post.avatar}</div>
                <div class="post-info">
                    <div class="post-author">${post.author}</div>
                    <div class="post-date">${timeAgo}</div>
                </div>
                <div class="post-platform ${post.platform}">${post.platform}</div>
            </div>
            ${post.image ? `<img src="${post.image}" alt="Social media post" class="post-image" loading="lazy">` : ''}
            <div class="post-content">
                <div class="post-text">${this.formatPostText(truncatedText)}</div>
            </div>
            <div class="post-actions">
                <div class="post-stats">
                    <span>📅 ${timeAgo}</span>
                </div>
                <a href="${post.link}" class="post-link" target="_blank" rel="noopener noreferrer">View Post</a>
            </div>
        `;
        
        return postDiv;
    }

    formatPostText(text) {
        // Convert hashtags to styled spans
        return text.replace(/#(\w+)/g, '<span class="post-hashtags">#$1</span>');
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    }

    getTimeAgo(timestamp) {
        const now = new Date();
        const postTime = new Date(timestamp);
        const diffMs = now - postTime;
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMins < 60) {
            return `${diffMins}m ago`;
        } else if (diffHours < 24) {
            return `${diffHours}h ago`;
        } else {
            return `${diffDays}d ago`;
        }
    }

    getFilteredPosts() {
        if (this.currentFilter === 'all') {
            return this.posts;
        }
        return this.posts.filter(post => post.platform === this.currentFilter);
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.loadedPosts = 6; // Reset to initial load amount
        
        // Update active filter button
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.renderPosts();
    }

    loadMorePosts() {
        this.loadedPosts += this.postsPerLoad;
        this.renderPosts();
    }

    showLoading() {
        this.isLoading = true;
        this.feedLoading.style.display = 'block';
        this.feedGrid.style.display = 'none';
        this.feedError.style.display = 'none';
    }

    hideLoading() {
        this.isLoading = false;
        this.feedLoading.style.display = 'none';
        this.feedGrid.style.display = 'grid';
    }

    showError() {
        this.hasError = true;
        this.feedLoading.style.display = 'none';
        this.feedGrid.style.display = 'none';
        this.feedError.style.display = 'block';
    }
}

// Initialize social media feed when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize social media feed if the element exists
    if (document.getElementById('social-feed-grid')) {
        window.socialFeed = new SocialMediaFeed();
    }
});

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Log successful initialization
    console.log('Reptile Ireland website initialized successfully');
});