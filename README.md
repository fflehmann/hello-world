# Excel Online + Fabric Lakehouse UI

A modern web interface that connects Microsoft Fabric Lakehouse with Excel Online, enabling seamless data export and analysis.

## Features

- 🔗 **Fabric Lakehouse Integration**: Connect to your Microsoft Fabric Lakehouse
- 📊 **Data Visualization**: View and analyze your lakehouse data
- 📈 **Excel Export**: Export data directly to Excel Online
- 🔄 **Real-time Sync**: Synchronize data between Fabric and Excel
- 🎨 **Modern UI**: Beautiful, responsive interface with glassmorphism design

## Setup Instructions

### Prerequisites

1. **Microsoft Fabric Workspace**: You need access to a Microsoft Fabric workspace
2. **Azure AD Application**: Register an application in Azure AD for authentication
3. **Lakehouse**: Create or have access to a lakehouse in your Fabric workspace

### Azure AD Application Setup

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to Azure Active Directory > App registrations
3. Create a new registration with the following settings:
   - Name: "Excel-Fabric-Lakehouse-UI"
   - Supported account types: "Accounts in this organizational directory only"
   - Redirect URI: Web - `http://localhost:3000`

4. After registration, note down:
   - Application (client) ID
   - Directory (tenant) ID

5. Configure API permissions:
   - Microsoft Graph: `Files.ReadWrite.All`, `Sites.ReadWrite.All`
   - Power BI Service: `Dataset.Read.All`, `Report.Read.All`

### Environment Variables

Create a `.env` file in the project root:

```env
AZURE_TENANT_ID=your-tenant-id
AZURE_CLIENT_ID=your-client-id
FABRIC_WORKSPACE_ID=your-workspace-id
FABRIC_LAKEHOUSE_ID=your-lakehouse-id
```

### Running the Application

1. **Simple Setup** (for testing):
   ```bash
   # Start a local server
   python -m http.server 8000
   # or
   npx serve .
   ```

2. **Advanced Setup** (with Node.js):
   ```bash
   npm install
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:8000`

## Usage

1. **Connect to Fabric**: Click "Connect to Fabric" and enter your configuration details
2. **View Data**: Browse your lakehouse tables and data
3. **Export to Excel**: Click "Export to Excel" on any table to create an Excel Online workbook
4. **Sync Data**: Use the sync button to refresh your data

## Architecture

- **Frontend**: React.js with modern CSS
- **Authentication**: Microsoft Authentication Library (MSAL)
- **APIs**: Microsoft Graph API, Fabric REST API
- **Data Flow**: Fabric Lakehouse → UI → Excel Online

## API Integration

The application integrates with:
- **Microsoft Fabric API**: For lakehouse data access
- **Microsoft Graph API**: For Excel Online integration
- **Azure AD**: For authentication and authorization

## Security

- All API calls are authenticated using Azure AD
- No sensitive data is stored locally
- Uses OAuth 2.0 flow for secure authentication

## Troubleshooting

### Common Issues

1. **Authentication Errors**: Ensure your Azure AD app has the correct permissions
2. **CORS Issues**: Make sure your redirect URI is correctly configured
3. **API Errors**: Verify your workspace and lakehouse IDs are correct

### Getting Help

- Check the browser console for error messages
- Verify your Azure AD application configuration
- Ensure your Fabric workspace permissions are correct

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
