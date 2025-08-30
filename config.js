// Microsoft Fabric Lakehouse Configuration
const FABRIC_CONFIG = {
    // Azure AD Configuration
    auth: {
        tenantId: process.env.AZURE_TENANT_ID || '',
        clientId: process.env.AZURE_CLIENT_ID || '',
        redirectUri: window.location.origin,
        scopes: [
            'https://graph.microsoft.com/.default',
            'https://analysis.windows.net/powerbi/api/.default'
        ]
    },
    
    // Fabric API Configuration
    fabric: {
        baseUrl: 'https://api.fabric.microsoft.com',
        apiVersion: 'v1',
        workspaceId: process.env.FABRIC_WORKSPACE_ID || '',
        lakehouseId: process.env.FABRIC_LAKEHOUSE_ID || ''
    },
    
    // Excel Online Configuration
    excel: {
        baseUrl: 'https://graph.microsoft.com/v1.0',
        scopes: ['Files.ReadWrite.All', 'Sites.ReadWrite.All']
    }
};

// API Endpoints
const API_ENDPOINTS = {
    // Fabric Lakehouse endpoints
    lakehouse: {
        tables: `${FABRIC_CONFIG.fabric.baseUrl}/v1/workspaces/${FABRIC_CONFIG.fabric.workspaceId}/lakehouses/${FABRIC_CONFIG.fabric.lakehouseId}/tables`,
        data: `${FABRIC_CONFIG.fabric.baseUrl}/v1/workspaces/${FABRIC_CONFIG.fabric.workspaceId}/lakehouses/${FABRIC_CONFIG.fabric.lakehouseId}/tables/{tableName}/data`,
        schema: `${FABRIC_CONFIG.fabric.baseUrl}/v1/workspaces/${FABRIC_CONFIG.fabric.workspaceId}/lakehouses/${FABRIC_CONFIG.fabric.lakehouseId}/tables/{tableName}/schema`
    },
    
    // Excel Online endpoints
    excel: {
        workbooks: `${FABRIC_CONFIG.excel.baseUrl}/me/drive/root:/Excel Files:/children`,
        createWorkbook: `${FABRIC_CONFIG.excel.baseUrl}/me/drive/items/{parent-id}:/Excel Files:/children`,
        updateWorkbook: `${FABRIC_CONFIG.excel.baseUrl}/me/drive/items/{item-id}/workbook`
    }
};

// Utility functions for API calls
const API_UTILS = {
    // Get access token for Microsoft Graph
    async getAccessToken() {
        // This would integrate with MSAL.js for authentication
        return localStorage.getItem('accessToken') || null;
    },
    
    // Make authenticated API request
    async makeRequest(url, options = {}) {
        const token = await this.getAccessToken();
        if (!token) {
            throw new Error('No access token available');
        }
        
        const defaultOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        
        return fetch(url, { ...defaultOptions, ...options });
    },
    
    // Get lakehouse tables
    async getLakehouseTables() {
        const response = await this.makeRequest(API_ENDPOINTS.lakehouse.tables);
        return response.json();
    },
    
    // Get table data
    async getTableData(tableName, limit = 1000) {
        const url = API_ENDPOINTS.lakehouse.data.replace('{tableName}', tableName);
        const response = await this.makeRequest(`${url}?$top=${limit}`);
        return response.json();
    },
    
    // Export data to Excel Online
    async exportToExcel(tableName, data) {
        // Create new workbook in OneDrive
        const workbookName = `${tableName}_Export_${new Date().toISOString().split('T')[0]}.xlsx`;
        
        // This would create the Excel file with the data
        // Implementation would use Microsoft Graph API to create and populate the workbook
        
        return {
            success: true,
            workbookName,
            url: `https://office.live.com/start/Excel.aspx?ui=en-US&rs=en-US&from=web`
        };
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FABRIC_CONFIG, API_ENDPOINTS, API_UTILS };
} else {
    window.FABRIC_CONFIG = FABRIC_CONFIG;
    window.API_ENDPOINTS = API_ENDPOINTS;
    window.API_UTILS = API_UTILS;
}
