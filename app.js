const { useState, useEffect } = React;

// Main App Component
function App() {
    const [isConnected, setIsConnected] = useState(false);
    const [lakehouseData, setLakehouseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [connectionConfig, setConnectionConfig] = useState({
        tenantId: '',
        clientId: '',
        workspaceId: '',
        lakehouseId: ''
    });

    // Mock data for demonstration
    const mockData = [
        { id: 1, table: 'SalesData', records: 15420, lastUpdated: '2024-01-15', status: 'Active' },
        { id: 2, table: 'CustomerInfo', records: 8920, lastUpdated: '2024-01-14', status: 'Active' },
        { id: 3, table: 'ProductCatalog', records: 2340, lastUpdated: '2024-01-13', status: 'Active' },
        { id: 4, table: 'Inventory', records: 5670, lastUpdated: '2024-01-12', status: 'Active' }
    ];

    useEffect(() => {
        // Simulate loading lakehouse data
        setLakehouseData(mockData);
    }, []);

    const connectToFabric = () => {
        setModalType('connection');
        setShowModal(true);
    };

    const exportToExcel = (tableName) => {
        setLoading(true);
        // Simulate API call to export data to Excel Online
        setTimeout(() => {
            alert(`Data from ${tableName} has been exported to Excel Online!`);
            setLoading(false);
        }, 2000);
    };

    const syncData = () => {
        setLoading(true);
        // Simulate data synchronization
        setTimeout(() => {
            alert('Data synchronized successfully!');
            setLoading(false);
        }, 1500);
    };

    const handleConnection = () => {
        setIsConnected(true);
        setShowModal(false);
        alert('Successfully connected to Microsoft Fabric Lakehouse!');
    };

    return (
        <div className="container">
            <Header />
            
            <Dashboard 
                isConnected={isConnected}
                onConnect={connectToFabric}
                onSync={syncData}
                loading={loading}
            />
            
            <DataSection 
                data={lakehouseData}
                onExport={exportToExcel}
                loading={loading}
            />
            
            {showModal && (
                <ConnectionModal 
                    type={modalType}
                    config={connectionConfig}
                    onConfigChange={setConnectionConfig}
                    onConnect={handleConnection}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}

// Header Component
function Header() {
    return (
        <div className="header">
            <h1>
                <i className="fas fa-chart-line"></i>
                Excel Online + Fabric Lakehouse UI
            </h1>
            <p>Connect, analyze, and export your data seamlessly between Microsoft Fabric Lakehouse and Excel Online</p>
        </div>
    );
}

// Dashboard Component
function Dashboard({ isConnected, onConnect, onSync, loading }) {
    return (
        <div className="dashboard">
            <div className="card">
                <h3>
                    <i className="fas fa-plug card-icon"></i>
                    Connection Status
                </h3>
                <div className={`status-badge ${isConnected ? 'status-connected' : 'status-disconnected'}`}>
                    {isConnected ? 'Connected' : 'Disconnected'}
                </div>
                <button 
                    className="btn" 
                    onClick={onConnect}
                    disabled={loading}
                >
                    <i className="fas fa-link"></i>
                    {isConnected ? 'Reconnect' : 'Connect to Fabric'}
                </button>
            </div>

            <div className="card">
                <h3>
                    <i className="fas fa-database card-icon"></i>
                    Lakehouse Overview
                </h3>
                <p>Tables: 4</p>
                <p>Total Records: 32,350</p>
                <p>Last Sync: 2 hours ago</p>
                <button 
                    className="btn btn-secondary" 
                    onClick={onSync}
                    disabled={loading}
                >
                    <i className="fas fa-sync"></i>
                    Sync Data
                </button>
            </div>

            <div className="card">
                <h3>
                    <i className="fas fa-file-excel card-icon"></i>
                    Excel Integration
                </h3>
                <p>Export data directly to Excel Online</p>
                <p>Create interactive dashboards</p>
                <p>Real-time collaboration</p>
                <button className="btn btn-secondary">
                    <i className="fas fa-external-link-alt"></i>
                    Open Excel Online
                </button>
            </div>
        </div>
    );
}

// Data Section Component
function DataSection({ data, onExport, loading }) {
    if (loading) {
        return (
            <div className="card">
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <h3>
                <i className="fas fa-table card-icon"></i>
                Lakehouse Tables
            </h3>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Table Name</th>
                        <th>Records</th>
                        <th>Last Updated</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(table => (
                        <tr key={table.id}>
                            <td>{table.table}</td>
                            <td>{table.records.toLocaleString()}</td>
                            <td>{table.lastUpdated}</td>
                            <td>
                                <span className="status-badge status-connected">
                                    {table.status}
                                </span>
                            </td>
                            <td>
                                <button 
                                    className="btn"
                                    onClick={() => onExport(table.table)}
                                >
                                    <i className="fas fa-download"></i>
                                    Export to Excel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Connection Modal Component
function ConnectionModal({ type, config, onConfigChange, onConnect, onClose }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onConnect();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>
                    <i className="fas fa-cog"></i>
                    Connect to Microsoft Fabric
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Tenant ID</label>
                        <input 
                            type="text" 
                            value={config.tenantId}
                            onChange={(e) => onConfigChange({...config, tenantId: e.target.value})}
                            placeholder="Enter your Azure AD Tenant ID"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Client ID</label>
                        <input 
                            type="text" 
                            value={config.clientId}
                            onChange={(e) => onConfigChange({...config, clientId: e.target.value})}
                            placeholder="Enter your Application Client ID"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Workspace ID</label>
                        <input 
                            type="text" 
                            value={config.workspaceId}
                            onChange={(e) => onConfigChange({...config, workspaceId: e.target.value})}
                            placeholder="Enter your Fabric Workspace ID"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Lakehouse ID</label>
                        <input 
                            type="text" 
                            value={config.lakehouseId}
                            onChange={(e) => onConfigChange({...config, lakehouseId: e.target.value})}
                            placeholder="Enter your Lakehouse ID"
                            required
                        />
                    </div>
                    <div className="btn-group">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn">
                            <i className="fas fa-link"></i>
                            Connect
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));
