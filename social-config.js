/**
 * Social Media Feed Configuration
 * 
 * This file contains the configuration for Instagram and Facebook API integration.
 * You'll need to set up API access for both platforms to fetch live posts.
 * 
 * SETUP INSTRUCTIONS:
 * 
 * === INSTAGRAM BASIC DISPLAY API ===
 * 1. Go to https://developers.facebook.com/
 * 2. Create a new app and add Instagram Basic Display product
 * 3. Configure Instagram Basic Display settings:
 *    - Valid OAuth Redirect URIs: https://yourdomain.com/auth/instagram
 *    - Deauthorize Callback URL: https://yourdomain.com/auth/instagram/deauth
 *    - Data Deletion Request URL: https://yourdomain.com/auth/instagram/delete
 * 4. Get your Access Token:
 *    - Generate a User Token with instagram_graph_user_media scope
 *    - Exchange short-lived token for long-lived token (60 days)
 * 5. Add your credentials below
 * 
 * === FACEBOOK GRAPH API ===
 * 1. Go to https://developers.facebook.com/
 * 2. Create a new app (or use existing)
 * 3. Add your Facebook Page
 * 4. Generate a Page Access Token:
 *    - Go to Graph API Explorer
 *    - Select your app and page
 *    - Generate token with pages_show_list and pages_read_engagement permissions
 * 5. Convert to long-lived token (never expires for pages)
 * 6. Add your credentials below
 * 
 * SECURITY NOTE:
 * - Never commit real API keys to version control
 * - Use environment variables in production
 * - Regenerate tokens if compromised
 */

// Instagram Configuration
const INSTAGRAM_CONFIG = {
    // Your Instagram User Access Token (long-lived, 60 days)
    accessToken: process.env.INSTAGRAM_ACCESS_TOKEN || '',
    
    // Your Instagram User ID
    userId: process.env.INSTAGRAM_USER_ID || '',
    
    // Fields to fetch from Instagram API
    fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,username'
};

// Facebook Configuration  
const FACEBOOK_CONFIG = {
    // Your Facebook Page Access Token (long-lived, never expires)
    accessToken: process.env.FACEBOOK_ACCESS_TOKEN || '',
    
    // Your Facebook Page ID
    pageId: process.env.FACEBOOK_PAGE_ID || '',
    
    // Fields to fetch from Facebook API
    fields: 'id,message,full_picture,permalink_url,created_time,type,attachments{media,url}'
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = {
        instagram: INSTAGRAM_CONFIG,
        facebook: FACEBOOK_CONFIG
    };
} else {
    // Browser environment
    window.SOCIAL_CONFIG = {
        instagram: INSTAGRAM_CONFIG,
        facebook: FACEBOOK_CONFIG
    };
}

/**
 * ALTERNATIVE SETUP FOR DEMO/DEVELOPMENT:
 * 
 * If you want to test the feed without API setup, the system will automatically
 * fall back to demo data. This includes sample posts that demonstrate the
 * functionality and styling.
 * 
 * To enable live data:
 * 1. Follow the setup instructions above
 * 2. Add your credentials to the config objects
 * 3. The feed will automatically switch to live data
 * 
 * RATE LIMITING:
 * - Instagram: 200 requests per hour per user
 * - Facebook: Varies by app usage tier
 * - Consider implementing caching for production use
 * 
 * REFRESH TOKENS:
 * - Instagram tokens expire after 60 days
 * - Facebook page tokens never expire (if properly configured)
 * - Implement token refresh logic for production
 */