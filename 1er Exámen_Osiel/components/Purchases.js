function Purchases() {
    try {
        const [purchases, setPurchases] = React.useState([]);
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            const loadPurchases = async () => {
                try {
                    const data = await ApiUtils.getPurchases();
                    setPurchases(data);
                } catch (error) {
                    console.error('Error loading purchases:', error);
                } finally {
                    setLoading(false);
                }
            };

            loadPurchases();
        }, []);

        const getStatusBadge = (status) => {
            const badgeClass = {
                'Completada': 'bg-success',
                'Pendiente': 'bg-warning',
                'Cancelada': 'bg-danger'
            };
            return `badge ${badgeClass[status] || 'bg-secondary'}`;
        };

        if (loading) {
            return React.createElement('div', { 
                className: 'text-center',
                'data-name': 'loading',
                'data-file': 'components/Purchases.js'
            }, 'Cargando...');
        }

        return React.createElement('div', {
            'data-name': 'purchases-container',
            'data-file': 'components/Purchases.js'
        }, [
            React.createElement('div', { 
                className: 'd-flex justify-content-between align-items-center mb-4',
                key: 'header'
            }, [
                React.createElement('h1', { key: 'title' }, 'Gestión de Compras'),
                React.createElement('button', { 
                    className: 'btn btn-primary',
                    key: 'add-btn'
                }, [
                    React.createElement('i', { 
                        className: 'fas fa-plus me-2',
                        key: 'plus-icon'
                    }),
                    'Nueva Compra'
                ])
            ]),

            React.createElement('div', { className: 'card', key: 'table-card' },
                React.createElement('div', { className: 'card-body' },
                    React.createElement('div', { className: 'table-responsive' },
                        React.createElement('table', { className: 'table table-hover' }, [
                            React.createElement('thead', { key: 'thead' },
                                React.createElement('tr', {}, [
                                    React.createElement('th', { key: 'id' }, 'ID'),
                                    React.createElement('th', { key: 'supplier' }, 'Proveedor'),
                                    React.createElement('th', { key: 'amount' }, 'Monto'),
                                    React.createElement('th', { key: 'date' }, 'Fecha'),
                                    React.createElement('th', { key: 'status' }, 'Estado'),
                                    React.createElement('th', { key: 'actions' }, 'Acciones')
                                ])
                            ),
                            React.createElement('tbody', { key: 'tbody' },
                                purchases.map(purchase =>
                                    React.createElement('tr', { key: purchase.id }, [
                                        React.createElement('td', { key: 'id' }, purchase.id),
                                        React.createElement('td', { key: 'supplier' }, purchase.supplier),
                                        React.createElement('td', { key: 'amount' }, `$${purchase.amount.toLocaleString()}`),
                                        React.createElement('td', { key: 'date' }, purchase.date),
                                        React.createElement('td', { key: 'status' },
                                            React.createElement('span', { 
                                                className: getStatusBadge(purchase.status)
                                            }, purchase.status)
                                        ),
                                        React.createElement('td', { key: 'actions' }, [
                                            React.createElement('button', { 
                                                className: 'btn btn-sm btn-outline-primary me-2',
                                                key: 'edit'
                                            }, React.createElement('i', { className: 'fas fa-edit' })),
                                            React.createElement('button', { 
                                                className: 'btn btn-sm btn-outline-danger',
                                                key: 'delete'
                                            }, React.createElement('i', { className: 'fas fa-trash' }))
                                        ])
                                    ])
                                )
                            )
                        ])
                    )
                )
            )
        ]);
    } catch (error) {
        console.error('Purchases component error:', error);
        reportError(error);
    }
}
