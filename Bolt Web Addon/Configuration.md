---
sidebar_position: 3
---

# Configuration

This guide covers all environment variables available in Bolt Web Addon for customizing your installation.

## Application Settings

```env
# Application Identity
APP_NAME=YourServerName           # Your server/brand name displayed throughout the site
APP_URL=https://yourdomain.com    # Your website URL (used for console clickable links)
APP_TIMEZONE=UTC                  # Server timezone for date/time displays
```

## Branding Configuration

```env
# Logo and Favicon Settings
APP_LOGO=/img/branding/logo.png           # Path to your main logo image
APP_FAVICON_32=/img/branding/favicon-32.png  # 32x32 favicon
APP_FAVICON_16=/img/branding/favicon-16.png  # 16x16 favicon

# Navbar Logo Display
SHOW_LOGO=true                    # Show/hide logo in navbar (true/false)
SHOW_TEXT_LOGO=false             # Show/hide text logo alongside image (true/false)
```

## Database Configuration

```env
# MongoDB Connection Settings
DB_HOST=127.0.0.1                # MongoDB server IP address
DB_PORT=27017                     # MongoDB port (default: 27017)
DB_DATABASE=Bolt                  # Your Bolt database name
DB_USERNAME=                      # MongoDB username (optional, leave empty for no auth)
DB_PASSWORD=                      # MongoDB password (optional, leave empty for no auth)
DB_URI=                          # Full connection string (e.g., mongodb+srv://...) - overrides above settings if provided
```

:::info Database Connection
Use either individual connection settings (HOST, PORT, etc.) or provide a full connection URI.
:::

:::warning Database Security
For security purposes, it is highly recommended to use a **read-only** MongoDB user for the web addon.
Since the web interface only displays data and doesn't modify your Bolt database, read-only access provides the necessary functionality while maintaining security best practices.
:::

## Performance Settings

```env
# Cache Configuration
LEADERBOARD_CACHE_INTERVAL=30     # Cache refresh interval in minutes (15/30/60 recommended)
```

**Cache Intervals:**
- `15` - High-frequency updates (more server load)
- `30` - Balanced updates (recommended)
- `60` - Low-frequency updates (less server load)

## Visual Customization

### Card Header Colors
```env
CARD_HEADER_COLOR=blue           # Predefined color theme
CARD_HEADER_CUSTOM_COLOR=3B82F6  # Custom hex color (only if CARD_HEADER_COLOR=custom)
CARD_HEADER_DARK_MODE=keep       # Custom color dark mode behavior
```

**Available Colors:**
- `blue` - Professional blue theme
- `green` - Nature/eco green theme  
- `purple` - Royal purple theme
- `red` - Bold red theme
- `orange` - Energetic orange theme
- `teal` - Calm teal theme
- `indigo` - Deep indigo theme
- `pink` - Vibrant pink theme
- `custom` - Use custom hex color (requires `CARD_HEADER_CUSTOM_COLOR`)

**Custom Color Dark Mode:**
- `keep` - Use custom color in both light and dark modes
- `default` - Use default gray in dark mode, custom color in light mode

## Minecraft Integration

```env
# Sprite System Configuration
MINECRAFT_VERSION=legacy          # Texture version compatibility
INVENTORY_DISPLAY=full            # Inventory display mode
```

**Minecraft Version Options:**
- `legacy` - For servers running 1.8.8 and older versions
- `modern` - For servers running 1.14+ with updated textures

**Inventory Display Options:**
- `content` - Shows only inventory items (hotbar and main inventory)
- `full` - Shows complete setup (armor, inventory, and offhand/shield)

## Social Media Integration

```env
# Social Platform Links
SOCIAL_TWITTER_URL=https://x.com/YourServer
SOCIAL_DISCORD_URL=https://discord.gg/YourServer
SOCIAL_YOUTUBE_URL=https://youtube.com/@YourChannel
```

Leave any social media URL empty to hide that platform's icon from your site.

## Discord Widget

```env
# Discord Server Widget Configuration
DISCORD_SERVER_ID=888463667895623812    # Your Discord server ID for the homepage widget
```

To get your Discord server ID:
1. Enable Developer Mode in Discord (User Settings → Advanced → Developer Mode)
2. Right-click your server icon
3. Select "Copy ID"

## Featured Posts

Configure the featured post displayed on your homepage:

```env
# Post Configuration
POST_TYPE=SHORT                   # Post length (SHORT/LONG)
POST_TITLE="🎉 Season I Now Live!"
POST_AUTHOR="Admin"
POST_AUTHOR_SKIN="Admin"         # Minecraft username for author skin
POST_IMAGE="/img/posts/post.jpeg"
POST_IMAGE_ALT="Season Banner"
```

### Short Post Content
Used when `POST_TYPE=SHORT`:
```env
POST_SHORT_CONTENT_1="We're excited to announce that Season I is now officially live!"
POST_SHORT_CONTENT_2="Join thousands of players competing for the top spots on our leaderboards."
```

### Long Post Content  
Used when `POST_TYPE=LONG`:
```env
POST_LONG_CONTENT_1="First paragraph of your announcement..."
POST_LONG_CONTENT_2="Second paragraph..."
POST_LONG_CONTENT_3="Third paragraph..."
POST_LONG_CONTENT_4="Fourth paragraph..."
POST_LONG_CONTENT_5="Final paragraph..."
```

**Post Types:**
- `SHORT` - Brief announcement with 2 paragraphs
- `LONG` - Extended post with 5 paragraphs for detailed updates

