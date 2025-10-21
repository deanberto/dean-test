# Social Media Feed Setup Guide

This guide will help you set up live Instagram and Facebook feeds for your Reptile Ireland website.

## 🚀 Quick Start

The social media feed is already integrated into your website and will work immediately with demo data. To connect your real Instagram and Facebook accounts, follow the setup instructions below.

## 📋 What's Included

- **Live Social Media Feed**: Displays posts from both Instagram and Facebook
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Filter System**: Users can filter posts by platform (All, Instagram, Facebook)
- **Loading States**: Beautiful skeleton loading animations
- **Error Handling**: Graceful fallback when APIs are unavailable
- **Demo Data**: Works out of the box with sample reptile-themed posts

## 🔧 API Setup Instructions

### Instagram Basic Display API

1. **Create Facebook Developer Account**
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Create an account or log in

2. **Create New App**
   - Click "Create App" → "Consumer" → "Next"
   - Enter app name: "Reptile Ireland Social Feed"
   - Add your email and select app purpose

3. **Add Instagram Basic Display**
   - In your app dashboard, click "Add Product"
   - Find "Instagram Basic Display" and click "Set Up"

4. **Configure Instagram Basic Display**
   - Go to Instagram Basic Display → Basic Display
   - Add the following URLs:
     - Valid OAuth Redirect URIs: `https://yourdomain.com/auth/instagram`
     - Deauthorize Callback URL: `https://yourdomain.com/auth/instagram/deauth`
     - Data Deletion Request URL: `https://yourdomain.com/auth/instagram/delete`

5. **Create Instagram Test User**
   - Go to Roles → Roles
   - Add Instagram Testers → Add your Instagram username
   - Accept the invitation in your Instagram app

6. **Generate Access Token**
   - Use the User Token Generator in Basic Display settings
   - Authorize your Instagram account
   - Copy the generated access token
   - Exchange for long-lived token (60 days) using this URL:
     ```
     https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret={app-secret}&access_token={short-lived-token}
     ```

### Facebook Graph API

1. **Use Same App** (from Instagram setup above)

2. **Add Facebook Page**
   - Go to your Facebook page settings
   - Add your app to the page

3. **Generate Page Access Token**
   - Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
   - Select your app
   - Select your page from "User or Page" dropdown
   - Add permissions: `pages_show_list`, `pages_read_engagement`
   - Generate Access Token

4. **Convert to Long-lived Token**
   - Use this URL to get a never-expiring page token:
     ```
     https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id={app-id}&client_secret={app-secret}&fb_exchange_token={short-lived-token}
     ```

## ⚙️ Configuration

### Method 1: Direct Configuration (Quick Setup)

Edit the `social-config.js` file and add your credentials:

```javascript
const INSTAGRAM_CONFIG = {
    accessToken: 'YOUR_INSTAGRAM_ACCESS_TOKEN',
    userId: 'YOUR_INSTAGRAM_USER_ID',
    fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,username'
};

const FACEBOOK_CONFIG = {
    accessToken: 'YOUR_FACEBOOK_PAGE_ACCESS_TOKEN',
    pageId: 'YOUR_FACEBOOK_PAGE_ID',
    fields: 'id,message,full_picture,permalink_url,created_time,type,attachments{media,url}'
};
```

### Method 2: Environment Variables (Production)

For production environments, use environment variables:

```bash
INSTAGRAM_ACCESS_TOKEN=your_instagram_token
INSTAGRAM_USER_ID=your_instagram_user_id
FACEBOOK_ACCESS_TOKEN=your_facebook_token
FACEBOOK_PAGE_ID=your_facebook_page_id
```

## 🎨 Customization

### Styling

The feed uses CSS custom properties that match your website's design:

```css
:root {
    --accent-color: #4a7c59;
    --card-bg: #151515;
    --text-primary: #e0e0e0;
    /* ... other variables */
}
```

### Post Display

You can customize what information is shown in posts by modifying the `createPostElement()` method in `script.js`.

### Demo Data

To customize the demo posts, edit the `getDemoData()` method in `script.js`. This is useful for:
- Testing different post layouts
- Showing relevant content while setting up APIs
- Providing fallback content

## 🔒 Security Best Practices

1. **Never commit API keys to version control**
2. **Use environment variables in production**
3. **Regenerate tokens if compromised**
4. **Implement rate limiting for production use**
5. **Set up token refresh for Instagram (60-day expiry)**

## 📱 Features

### Filter System
Users can filter posts by:
- All Posts (default)
- Instagram only
- Facebook only

### Loading States
- Beautiful skeleton loading animations
- Smooth transitions when posts load
- Progressive loading with "Load More" button

### Error Handling
- Graceful fallback to demo data
- User-friendly error messages
- Direct links to social media profiles

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface

## 🐛 Troubleshooting

### Common Issues

**"Unable to load social media feed"**
- Check API credentials in `social-config.js`
- Verify tokens haven't expired
- Check browser console for detailed errors

**Instagram posts not loading**
- Ensure Instagram account is connected to Facebook app
- Verify access token is long-lived (60 days)
- Check that user ID is correct

**Facebook posts not loading**
- Verify page access token permissions
- Ensure page is connected to the app
- Check that page ID is correct

### API Rate Limits

- **Instagram**: 200 requests per hour per user
- **Facebook**: Varies by app usage tier
- Consider implementing caching for high-traffic sites

### Token Expiry

- **Instagram**: Tokens expire after 60 days
- **Facebook**: Page tokens never expire (if properly configured)
- Implement automatic token refresh for production

## 📞 Support

If you need help setting up the social media feed:

1. Check the browser console for error messages
2. Verify all credentials are correct
3. Test API endpoints directly using Graph API Explorer
4. Ensure your Instagram account is public or properly configured for API access

## 🚀 Going Live

1. Complete API setup for both platforms
2. Add your credentials to `social-config.js`
3. Test the feed loads correctly
4. Update social media links in the footer to point to your actual profiles
5. Consider implementing caching for better performance

The feed will automatically switch from demo data to live data once valid API credentials are provided!