function App() {
    try {
        const [currentPage, setCurrentPage] = React.useState('login');
        const [isAuthenticated, setIsAuthenticated] = React.useState(false);

        React.useEffect(() => {
            const checkAuth = () => {
                if (AuthUtils.isAuthenticated()) {
                    setIsAuthenticated(true);
                    setCurrentPage('dashboard');
                } else {
                    setIsAuthenticated(false);
                    setCurrentPage('login');
                }
            };

            checkAuth();
        }, []);

        const handleLogin = () => {
            setIsAuthenticated(true);
            setCurrentPage('dashboard');
        };

        const handleNavigate = (page) => {
            if (page === 'login') {
                setIsAuthenticated(false);
            }
            setCurrentPage(page);
        };

        const renderPage = () => {
            switch (currentPage) {
                case 'dashboard':
                    return React.createElement(Dashboard);
                case 'purchases':
                    return React.createElement(Purchases);
                case 'contacts':
                    return React.createElement(Contacts);
                case 'business':
                    return React.createElement(Business);
                case 'tickets':
                    return React.createElement(Tickets);
                default:
                    return React.createElement(Dashboard);
            }
        };

        if (!isAuthenticated) {
            return React.createElement(Login, { onLogin: handleLogin });
        }

        return React.createElement(Layout, {
            currentPage: currentPage,
            onNavigate: handleNavigate
        }, renderPage());

    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
