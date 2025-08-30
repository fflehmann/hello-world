# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Start the Application
```bash
# Option 1: Using Python (recommended)
python3 server.py

# Option 2: Using Node.js
npm install
npm run serve

# Option 3: Using any HTTP server
npx serve .
```

### 2. Open Your Browser
Navigate to: `http://localhost:8000`

### 3. Connect to Fabric
1. Click "Connect to Fabric"
2. Enter your Azure AD credentials:
   - Tenant ID
   - Client ID
   - Workspace ID
   - Lakehouse ID

### 4. Explore Your Data
- Browse lakehouse tables
- View data statistics
- Export to Excel Online

## 🔧 Configuration

### Azure AD Setup (Required)
1. Go to [Azure Portal](https://portal.azure.com)
2. Create an App Registration
3. Add API permissions:
   - Microsoft Graph: `Files.ReadWrite.All`
   - Power BI Service: `Dataset.Read.All`

### Environment Variables
Create a `.env` file:
```env
AZURE_TENANT_ID=your-tenant-id
AZURE_CLIENT_ID=your-client-id
FABRIC_WORKSPACE_ID=your-workspace-id
FABRIC_LAKEHOUSE_ID=your-lakehouse-id
```

## 📊 Features

- **Real-time Data**: View live lakehouse data
- **Excel Export**: One-click export to Excel Online
- **Data Sync**: Keep data synchronized
- **Modern UI**: Beautiful, responsive interface

## 🆘 Need Help?

- Check the browser console for errors
- Verify your Azure AD configuration
- Ensure your Fabric workspace permissions are correct

## 🎯 Next Steps

1. Customize the UI for your needs
2. Add more data visualization features
3. Implement real-time data streaming
4. Add data transformation capabilities
