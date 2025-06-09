import Tabs from "./Tabs";

function Contacts() {

    try {
        const [contacts, setContacts] = React.useState([]);
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            const loadContacts = async () => {
                try {
                    const data = await ApiUtils.getContacts();
                    setContacts(data);
                } catch (error) {
                    console.error('Error loading contacts:', error);
                } finally {
                    setLoading(false);
                }
            };

            loadContacts();
        }, []);

        if (loading) {
            return React.createElement('div', { 
                className: 'text-center',
                'data-name': 'loading',
                'data-file': 'components/Contacts.js'
            }, 'Cargando...');
        }

        return React.createElement('div', {
            'data-name': 'contacts-container',
            'data-file': 'components/Contacts.js'
        }, [
            React.createElement('div', { 
                className: 'd-flex justify-content-between align-items-center mb-4',
                key: 'header'
            },  
            <Tabs/> ,
            
            [
                React.createElement('h1', { key: 'title' }, 'Gestión de Contactos'),
                React.createElement('button', { 
                    className: 'btn btn-primary',
                    key: 'add-btn'
                }, [
                    React.createElement('i', { 
                        className: 'fas fa-user-plus me-2',
                        key: 'plus-icon'
                    }),
                    'Nuevo Contacto'
                ])
            ]),

            React.createElement('div', { className: 'row', key: 'contacts-grid' },
                contacts.map(contact =>
                    React.createElement('div', { 
                        className: 'col-md-4 mb-4',
                        key: contact.id
                    },
                        React.createElement('div', { className: 'card h-100' }, [
                            React.createElement('div', { className: 'card-body', key: 'body' }, [
                                React.createElement('div', { 
                                    className: 'text-center mb-3',
                                    key: 'avatar'
                                },
                                    React.createElement('i', { 
                                        className: 'fas fa-user-circle fa-4x text-muted'
                                    })
                                ),
                                React.createElement('h5', { 
                                    className: 'card-title text-center',
                                    key: 'name'
                                }, contact.name),
                                React.createElement('p', { 
                                    className: 'card-text',
                                    key: 'email'
                                }, [
                                    React.createElement('i', { 
                                        className: 'fas fa-envelope me-2',
                                        key: 'email-icon'
                                    }),
                                    contact.email
                                ]),
                                React.createElement('p', { 
                                    className: 'card-text',
                                    key: 'phone'
                                }, [
                                    React.createElement('i', { 
                                        className: 'fas fa-phone me-2',
                                        key: 'phone-icon'
                                    }),
                                    contact.phone
                                ]),
                                React.createElement('p', { 
                                    className: 'card-text',
                                    key: 'company'
                                }, [
                                    React.createElement('i', { 
                                        className: 'fas fa-building me-2',
                                        key: 'company-icon'
                                    }),
                                    contact.company
                                ])
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
        console.error('Contacts component error:', error);
        reportError(error);
    }
}
