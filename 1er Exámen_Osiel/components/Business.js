function Business() {
    try {
        const [business, setBusiness] = React.useState([]);
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            const loadBusiness = async () => {
                try {
                    const data = await ApiUtils.getBusiness();
                    setBusiness(data);
                } catch (error) {
                    console.error('Error loading business:', error);
                } finally {
                    setLoading(false);
                }
            };

            loadBusiness();
        }, []);

        const getStageColor = (stage) => {
            const colors = {
                'Calificación': 'bg-info',
                'Propuesta': 'bg-warning',
                'Negociación': 'bg-primary'
            };
            return colors[stage] || 'bg-secondary';
        };

        if (loading) {
            return React.createElement('div', { 
                className: 'text-center',
                'data-name': 'loading',
                'data-file': 'components/Business.js'
            }, 'Cargando...');
        }

        return React.createElement('div', {
            'data-name': 'business-container',
            'data-file': 'components/Business.js'
        }, [
            React.createElement('div', { 
                className: 'd-flex justify-content-between align-items-center mb-4',
                key: 'header'
            }, [
                React.createElement('h1', { key: 'title' }, 'Gestión de Negocios'),
                React.createElement('button', { 
                    className: 'btn btn-primary',
                    key: 'add-btn'
                }, [
                    React.createElement('i', { 
                        className: 'fas fa-plus me-2',
                        key: 'plus-icon'
                    }),
                    'Nuevo Negocio'
                ])
            ]),

            React.createElement('div', { className: 'row', key: 'business-grid' },
                business.map(deal =>
                    React.createElement('div', { 
                        className: 'col-md-4 mb-4',
                        key: deal.id
                    },
                        React.createElement('div', { className: 'card h-100' }, [
                            React.createElement('div', { className: 'card-body', key: 'body' }, [
                                React.createElement('h5', { 
                                    className: 'card-title',
                                    key: 'name'
                                }, deal.name),
                                React.createElement('p', { 
                                    className: 'card-text',
                                    key: 'value'
                                }, [
                                    React.createElement('i', { 
                                        className: 'fas fa-dollar-sign me-2 text-success',
                                        key: 'value-icon'
                                    }),
                                    `$${deal.value.toLocaleString()}`
                                ]),
                                React.createElement('p', { 
                                    className: 'card-text',
                                    key: 'stage'
                                }, [
                                    React.createElement('span', { 
                                        className: `badge ${getStageColor(deal.stage)}`,
                                        key: 'stage-badge'
                                    }, deal.stage)
                                ]),
                                React.createElement('div', { 
                                    className: 'progress mb-2',
                                    key: 'progress'
                                },
                                    React.createElement('div', {
                                        className: 'progress-bar',
                                        role: 'progressbar',
                                        style: { width: `${deal.probability}%` },
                                        'aria-valuenow': deal.probability,
                                        'aria-valuemin': '0',
                                        'aria-valuemax': '100'
                                    }, `${deal.probability}%`)
                                )
                            ]),
                            React.createElement('div', { 
                                className: 'card-footer text-center',
                                key: 'footer'
                            }, [
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
            )
        ]);
    } catch (error) {
        console.error('Business component error:', error);
        reportError(error);
    }
}
