---
sidebar_position: 2
---

# Installation

The Bolt Web Addon provides a modern web interface for your Bolt Minecraft server, allowing players to view their statistics, match history, and server leaderboards through a sleek, responsive website. This installation guide walks you through deploying the web addon using our automated scripts that handle all technical setup requirements.

Our deployment system automatically configures your server environment, installs all necessary dependencies, and sets up a production-ready web application that connects directly to your existing Bolt MongoDB database - no data migration required.

## Installation Script

Our Linux and Windows scripts automatically handle the complete setup process including:
- **PHP 8.3** with MongoDB extension
- **Web server** (Caddy) with automatic HTTPS
- **Composer** for dependency management
- **Security hardening** and proper file permissions

Choose the installation method that best fits your needs:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="linux" label="🐧 Linux">

<Tabs>
<TabItem value="linux-fresh" label="🆕 Fresh Install">

## Prerequisites

Before starting, ensure you have:
- [ ] **Upload your ZIP file** - Have your Bolt Web Addon ZIP ready
- [ ] **Domain setup** - DNS A record pointing your domain to your server's public IP address (optional)
- [ ] **MongoDB access** - Connection details for your Bolt database
- [ ] **Server access** - Root/Administrator access to your server
- [ ] **Firewall rules** - Ports 80/443 open for web traffic

**Run the script:**

```bash
bash <(curl -fsSL https://linux.oysterlabs.dev)
```

</TabItem>
<TabItem value="linux-update" label="🔄 Update">

## Prerequisites

Before starting, ensure you have:
- [ ] **Upload the update ZIP file** - Have the Bolt Web Addon updated ZIP ready
- [ ] **Server access** - Root/Administrator access to your server
- [ ] **Existing installation** - Current Bolt Web Addon installation directory

To update an existing Bolt Web Addon installation:

```bash
bash <(curl -fsSL https://linux.oysterlabs.dev) --update
```

**What the update process does:**
- Creates automatic backup of current installation
- Preserves `.env` configuration and storage data
- Updates application files with new version
- Maintains proper file permissions

</TabItem>
<TabItem value="linux-domain" label="🌐 Domain Setup">

## Prerequisites

Before starting, ensure you have:
- [ ] **Domain name** - A registered domain name you want to use
- [ ] **DNS A record** - Your domain's DNS A record pointing to your server's public IP address
- [ ] **Firewall rules** - Ports 80/443 open for web traffic

If you initially skipped domain setup and want to configure Caddy web server with HTTPS later:

```bash
bash <(curl -fsSL https://linux.oysterlabs.dev) --caddy
```

**This option:**
- Installs Caddy if not already present
- Configures automatic HTTPS for your domain
- Updates web server configuration

</TabItem>
</Tabs>

</TabItem>
<TabItem value="windows" label="🪟 Windows">

<Tabs>
<TabItem value="windows-fresh" label="🆕 Fresh Install">

## Prerequisites

Before starting, ensure you have:
- [ ] **Upload the ZIP file** - Have the Bolt Web Addon ZIP ready
- [ ] **Domain setup** - DNS A record pointing your domain to your server's public IP address (optional)
- [ ] **MongoDB access** - Connection details for your Bolt database
- [ ] **Server access** - Administrator access to your server
- [ ] **Firewall rules** - Ports 80/443 open for web traffic

**Run the script:**

```powershell
irm https://windows.oysterlabs.dev | iex
```

</TabItem>
<TabItem value="windows-update" label="🔄 Update">

## Prerequisites

Before starting, ensure you have:
- [ ] **Upload your ZIP file** - Have your new Bolt Web Addon ZIP ready
- [ ] **Server access** - Administrator access to your server
- [ ] **Existing installation** - Current Bolt Web Addon installation directory

To update an existing installation:

```powershell
irm https://windows.oysterlabs.dev | iex -- --update
```

</TabItem>
<TabItem value="windows-domain" label="🌐 Domain Setup">

## Prerequisites

Before starting, ensure you have:
- [ ] **Domain name** - A registered domain name you want to use
- [ ] **DNS A record** - Your domain's DNS A record pointing to your server's public IP address
- [ ] **Firewall rules** - Ports 80/443 open for web traffic

For adding Caddy web server with domain/HTTPS to existing installations:

```powershell
irm https://windows.oysterlabs.dev | iex -- --caddy
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>

## Next Steps

- [⚙️ Configuration](Configuration.md) - Environment variables and database setup