# Deployment Guide - Movie Explorer

## 🚀 Deployment Options

This guide covers the easiest and most recommended ways to deploy your Next.js 15 Movie Explorer app.

---

## 1️⃣ Vercel (Recommended) ⭐

**Why Vercel?**
- Created by Next.js team
- One-click deployment
- Auto-scaling, fast CDN
- Free tier available
- Environment variables built-in
- Automatic CI/CD

### Deploy to Vercel

#### **Option A: Vercel Dashboard (Easiest)**

1. **Push to GitHub:**
```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

2. **Import on Vercel:**
   - Go to https://vercel.com
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Add Environment Variables:**
   - In "Environment Variables" section:
   - Name: `NEXT_PUBLIC_OMDB_API_KEY`
   - Value: `your_api_key_here`
   - Click "Save"

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Your app is live! 🎉

#### **Option B: Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts and set environment variables
```

### **Vercel Configuration (Optional)**

Create `vercel.json` in root:
```json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_OMDB_API_KEY": "@omdb_api_key"
  }
}
```

---

## 2️⃣ Netlify

### Deploy to Netlify

1. **Connect GitHub:**
   - Go to https://netlify.com
   - Click "Add new site" → "Connect to Git"
   - Select GitHub and authorize

2. **Select Repository:**
   - Choose `movieexplorer` repository
   - Click "Connect"

3. **Build Settings:**
   - Build command: `next build`
   - Publish directory: `.next`

4. **Environment Variables:**
   - Click "Site settings" → "Build & deploy"
   - Add: `NEXT_PUBLIC_OMDB_API_KEY=your_key`

5. **Deploy:**
   - Click "Deploy site"
   - Wait for build

### **Troubleshooting Netlify:**

If deployment fails, check `netlify.toml`:
```toml
[build]
  command = "next build"
  functions = "api"

[context.production.environment]
  NEXT_PUBLIC_OMDB_API_KEY = "your_key"
```

---

## 3️⃣ Docker Deployment

### Build Docker Image

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build
RUN npm run build

# Expose port
EXPOSE 3000

# Start
CMD ["npm", "start"]
```

Create `.dockerignore`:
```
node_modules
npm-debug.log
.next
.git
.env
```

### Run Docker

```bash
# Build image
docker build -t movieexplorer .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_OMDB_API_KEY=your_key \
  movieexplorer
```

### Docker Compose

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_OMDB_API_KEY: ${NEXT_PUBLIC_OMDB_API_KEY}
    restart: unless-stopped
```

Run:
```bash
docker-compose up -d
```

---

## 4️⃣ Traditional Server (VPS/Hosting)

### Prerequisites
- Node.js 18+ installed
- PM2 or similar process manager
- Nginx or Apache for reverse proxy

### Steps

1. **Upload Code:**
```bash
scp -r movieexplorer user@server.com:/var/www/
ssh user@server.com
cd /var/www/movieexplorer
```

2. **Install Dependencies:**
```bash
npm install --production
```

3. **Build:**
```bash
npm run build
```

4. **Create .env:**
```bash
echo "NEXT_PUBLIC_OMDB_API_KEY=your_key" > .env.production.local
```

5. **Start with PM2:**
```bash
npm install -g pm2

pm2 start npm --name "movieexplorer" -- start

pm2 save
pm2 startup
```

6. **Nginx Reverse Proxy:**

Edit `/etc/nginx/sites-available/default`:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Test and restart:
```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

## 5️⃣ AWS Deployment

### AWS Amplify (Easiest)

1. **Go to AWS Amplify Console**
2. **Connect GitHub repository**
3. **Configure build settings:**
   - Framework: Next.js
   - Build command: `npm run build`
   - Output: `.next`
4. **Add environment variables:**
   - `NEXT_PUBLIC_OMDB_API_KEY`
5. **Deploy**

### AWS EC2 (Advanced)

1. **Launch EC2 instance** (Ubuntu 22.04)
2. **SSH into instance:**
```bash
ssh -i key.pem ec2-user@instance-ip
```

3. **Install Node.js:**
```bash
curl -sL https://deb.nodesource.com/setup_18.x | sudo bash -
sudo apt-get install nodejs
```

4. **Clone and deploy:**
```bash
cd /home/ec2-user
git clone your-repo movieexplorer
cd movieexplorer
npm install
npm run build
npm start
```

5. **Use Elastic IP** for permanent URL
6. **Configure Security Groups** to allow ports 80, 443, 3000

---

## 🔐 Security Checklist

Before deploying:

- [ ] Environment variables configured
- [ ] `.env` files not committed to git
- [ ] API key has appropriate rate limits
- [ ] HTTPS enabled (SSL/TLS certificate)
- [ ] CORS configured if needed
- [ ] Security headers set
- [ ] Rate limiting enabled
- [ ] Monitoring and logging configured

---

## 📊 Monitoring & Analytics

### Vercel Analytics
- Automatically enabled
- Dashboard shows performance metrics
- Real-time monitoring

### Setup Custom Analytics

```javascript
// Track page views
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useAnalytics() {
  const pathname = usePathname()
  
  useEffect(() => {
    // Send analytics event
    console.log(`Page view: ${pathname}`)
  }, [pathname])
}
```

### Monitoring Services
- **Sentry:** Error tracking
- **LogRocket:** Session replay
- **New Relic:** Performance monitoring
- **Datadog:** Infrastructure monitoring

---

## 🚨 Common Issues

### Build Fails
```
Error: Cannot find module '@/lib/omdb'
```
**Solution:** Check `jsconfig.json` has correct path aliases

### API Key Not Found
```
Error: buildUrl returns empty apikey
```
**Solution:** Ensure environment variable is set and app restarted

### Memory Issues on Build
```
JavaScript heap out of memory
```
**Solution:** Increase Node memory:
```bash
NODE_OPTIONS=--max-old-space-size=2048 npm run build
```

### Slow Build Times
- Disable unused plugins
- Optimize images
- Check for large dependencies

---

## 📈 Performance Optimization

### Build Size
```bash
npm run build
# Outputs: .next/static/chunks/

# Analyze:
npm install -D @next/bundle-analyzer
```

### Cache Configuration

Vercel automatically caches:
- Static assets: 1 year
- HTML pages: 0 (no cache)
- API responses: Based on headers

### CDN Configuration
- Vercel: Automatic global CDN
- Cloudflare: Add custom domain
- AWS CloudFront: Configure with EC2/ALB

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  Deploy-Production:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### Testing Before Deploy
```bash
npm run lint    # Check code quality
npm run build   # Test build
npm start       # Test production server locally
```

---

## 📱 Domain Configuration

### Point Domain to Vercel
1. In Vercel dashboard: Settings → Domains
2. Add your domain
3. Update DNS records with Vercel's nameservers
4. Wait for DNS propagation (24-48 hours)

### SSL Certificate
- Automatically provisioned by Vercel
- Renewed automatically
- HTTPS enabled by default

---

## 💰 Cost Estimates

| Platform | Free Tier | Pro Tier |
|----------|-----------|----------|
| Vercel | 100GB bandwidth/month | $20/month |
| Netlify | Unlimited builds | $19/month |
| AWS EC2 | 12 months free | $5-50+/month |
| Docker Hub | Unlimited free repos | $7/month |

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Environment variables configured
- [ ] Build tested locally (`npm run build`)
- [ ] Environment deployed
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Monitoring enabled
- [ ] Backup strategy in place
- [ ] Tested in production environment
- [ ] Performance verified

---

## 📞 Support

**Issue?** Check:
1. Vercel Status: https://www.vercelstatus.com
2. GitHub Actions logs
3. Application logs in deployment dashboard
4. Browser console for errors

---

**Deployment completed! 🎉**

Your Movie Explorer app is now live and accessible to the world!
