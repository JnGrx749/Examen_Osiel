function Tickets() {
    try {
        const [tickets, setTickets] = React.useState([]);
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            const loadTickets = async () => {
                try {
                    const data = await ApiUtils.getTickets();
                    setTickets(data);
                } catch (error) {
                    console.error('Error loading tickets:', error);
                } finally {
                    setLoading(false);
                }
            };

            loadTickets();
        }, []);

        const getPriorityBadge = (priority) => {
            const badges = {
                'Alta': 'bg-danger',
                'Media': 'bg-warning',
                'Baja': 'bg-info'
            };
            return `badge ${badges[priority] || 'bg-secondary'}`;
        };

        const getStatusBadge = (status) => {
            const badges = {
                'Abierto': 'bg-success',
                'En progreso': 'bg-primary',
                'Cerrado': 'bg-secondary'
            };
            return `badge ${badges[status] || 'bg-secondary'}`;
        };

        if (loading) {
            return React.createElement('div', { 
                className: 'text-center',
                'data-name': 'loading',
                'data-file': 'components/Tickets.js'
            }, 'Cargando...');
        }

        return React.createElement('div', {
            'data-name': 'tickets-container',
            'data-file': 'components/Tickets.js'
        }, [
            React.createElement('div', { 
                className: 'd-flex justify-content-between align-items-center mb-4',
                key: 'header'
            }, [
                React.createElement('h1', { key: 'title' }, 'Gestión de Tickets'),
                React.createElement('button', { 
                    className: 'btn btn-primary',
                    key: 'add-btn'
                }, [
                    React.createElement('i', { 
                        className: 'fas fa-plus me-2',
                        key: 'plus-icon'
                    }),
                    'Nuevo Ticket'
                ])
            ]),

            React.createElement('div', { className: 'card', key: 'table-card' },
                React.createElement('div', { className: 'card-body' },
                    React.createElement('div', { className: 'table-responsive' },
                        React.createElement('table', { className: 'table table-hover' }, [
                            React.createElement('thead', { key: 'thead' },
                                React.createElement('tr', {}, [
                                    React.createElement('th', { key: 'id' }, 'ID'),
                                    React.createElement('th', { key: 'title' }, 'Título'),
                                    React.createElement('th', { key: 'priority' }, 'Prioridad'),
                                    React.createElement('th', { key: 'status' }, 'Estado'),
                                    React.createElement('th', { key: 'assignee' }, 'Asignado'),
                                    React.createElement('th', { key: 'actions' }, 'Acciones')
                                ])
                            ),
                            React.createElement('tbody', { key: 'tbody' },
                                tickets.map(ticket =>
                                    React.createElement('tr', { key: ticket.id }, [
                                        React.createElement('td', { key: 'id' }, ticket.id),
                                        React.createElement('td', { key: 'title' }, ticket.title),
                                        React.createElement('td', { key: 'priority' },
                                            React.createElement('span', { 
                                                className: getPriorityBadge(ticket.priority)
                                            }, ticket.priority)
                                        ),
                                        React.createElement('td', { key: 'status' },
                                            React.createElement('span', { 
                                                className: getStatusBadge(ticket.status)
                                            }, ticket.status)
                                        ),
                                        React.createElement('td', { key: 'assignee' }, ticket.assignee),
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
        console.error('Tickets component error:', error);
        reportError(error);
    }
}
