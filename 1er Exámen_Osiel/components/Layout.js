function Layout({ children, currentPage, onNavigate }) {
    try {
        const user = AuthUtils.getCurrentUser();

        const handleLogout = () => {
            AuthUtils.logout();
            onNavigate('login');
        };

        const menuItems = [
            { id: 'dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
            { id: 'purchases', icon: 'fas fa-shopping-cart', label: 'Compras' },
            { id: 'contacts', icon: 'fas fa-users', label: 'Contactos' },
            { id: 'business', icon: 'fas fa-briefcase', label: 'Negocios' },
            { id: 'tickets', icon: 'fas fa-ticket-alt', label: 'Tickets' }
        ];

        return React.createElement('div', { 
            className: 'container-fluid',
            'data-name': 'layout-container',
            'data-file': 'components/Layout.js'
        }, [
            React.createElement('div', { className: 'row', key: 'main-row' }, [
                React.createElement('div', { 
                    className: 'col-md-3 col-lg-2 sidebar p-0',
                    key: 'sidebar'
                }, [
                    React.createElement('div', { className: 'p-3' }, [
                        React.createElement('h4', { 
                            className: 'text-white mb-4',
                            key: 'brand'
                        }, 'CRM System'),
                        React.createElement('nav', { className: 'nav flex-column' }, 
                            menuItems.map(item => 
                                React.createElement('a', {
                                    key: item.id,
                                    className: `nav-link ${currentPage === item.id ? 'active' : ''}`,
                                    href: '#',
                                    onClick: (e) => {
                                        e.preventDefault();
                                        onNavigate(item.id);
                                    }
                                }, [
                                    React.createElement('i', { 
                                        className: `${item.icon} me-2`,
                                        key: 'icon'
                                    }),
                                    item.label
                                ])
                            )
                        )
                    ])
                ]),
                React.createElement('div', { 
                    className: 'col-md-9 col-lg-10',
                    key: 'content'
                }, [
                    React.createElement('nav', { 
                        className: 'navbar navbar-expand-lg navbar-light bg-light',
                        key: 'navbar'
                    }, [
                        React.createElement('div', { className: 'container-fluid' }, [
                            React.createElement('span', { 
                                className: 'navbar-brand',
                                key: 'welcome'
                            }, `Bienvenido, ${user?.name}`),
                            React.createElement('button', {
                                className: 'btn btn-outline-danger btn-sm',
                                onClick: handleLogout,
                                key: 'logout'
                            }, [
                                React.createElement('i', { 
                                    className: 'fas fa-sign-out-alt me-1',
                                    key: 'logout-icon'
                                }),
                                'Cerrar Sesión'
                            ])
                        ])
                    ]),
                    React.createElement('div', { 
                        className: 'p-4',
                        key: 'main-content'
                    }, children)
                ])
            ])
        ]);
    } catch (error) {
        console.error('Layout component error:', error);
        reportError(error);
    }
}
