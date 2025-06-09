function Dashboard() {
    try {
        const [stats, setStats] = React.useState({
            totalPurchases: 0,
            totalContacts: 0,
            totalBusiness: 0,
            openTickets: 0
        });

        React.useEffect(() => {
            const loadStats = async () => {
                try {
                    const [purchases, contacts, business, tickets] = await Promise.all([
                        ApiUtils.getPurchases(),
                        ApiUtils.getContacts(),
                        ApiUtils.getBusiness(),
                        ApiUtils.getTickets()
                    ]);

                    setStats({
                        totalPurchases: purchases.length,
                        totalContacts: contacts.length,
                        totalBusiness: business.length,
                        openTickets: tickets.filter(t => t.status !== 'Cerrado').length
                    });
                } catch (error) {
                    console.error('Error loading dashboard stats:', error);
                }
            };

            loadStats();
        }, []);

        const cards = [
            { title: 'Total Compras', value: stats.totalPurchases, icon: 'fas fa-shopping-cart', color: 'text-primary' },
            { title: 'Contactos', value: stats.totalContacts, icon: 'fas fa-users', color: 'text-success' },
            { title: 'Negocios', value: stats.totalBusiness, icon: 'fas fa-briefcase', color: 'text-warning' },
            { title: 'Tickets Abiertos', value: stats.openTickets, icon: 'fas fa-ticket-alt', color: 'text-danger' }
        ];

        return React.createElement('div', {
            'data-name': 'dashboard-container',
            'data-file': 'components/Dashboard.js'
        }, [
            React.createElement('h1', { className: 'mb-4', key: 'title' }, 'Dashboard'),
            
            React.createElement('div', { className: 'row', key: 'stats-row' },
                cards.map((card, index) =>
                    React.createElement('div', { 
                        className: 'col-md-3 mb-4',
                        key: index
                    }, 
                        React.createElement('div', { className: 'card h-100' },
                            React.createElement('div', { className: 'card-body text-center' }, [
                                React.createElement('i', { 
                                    className: `${card.icon} fa-3x ${card.color} mb-3`,
                                    key: 'icon'
                                }),
                                React.createElement('h3', { 
                                    className: card.color,
                                    key: 'value'
                                }, card.value),
                                React.createElement('p', { 
                                    className: 'card-text',
                                    key: 'title'
                                }, card.title)
                            ])
                        )
                    )
                )
            ),

            React.createElement('div', { className: 'row mt-4', key: 'info-row' }, [
                React.createElement('div', { className: 'col-md-12', key: 'welcome-card' },
                    React.createElement('div', { className: 'card' },
                        React.createElement('div', { className: 'card-body' }, [
                            React.createElement('h5', { 
                                className: 'card-title',
                                key: 'welcome-title'
                            }, 'Bienvenido al Sistema CRM'),
                            React.createElement('p', { 
                                className: 'card-text',
                                key: 'welcome-text'
                            }, 'Gestiona eficientemente tus compras, contactos, negocios y tickets desde un solo lugar. Utiliza el menú lateral para navegar entre los diferentes módulos del sistema.')
                        ])
                    )
                )
            ])
        ]);
    } catch (error) {
        console.error('Dashboard component error:', error);
        reportError(error);
    }
}
