function Login({ onLogin }) {
    try {
        const [email, setEmail] = React.useState('');
        const [password, setPassword] = React.useState('');
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError('');

            const result = await AuthUtils.login(email, password);
            
            if (result.success) {
                onLogin();
            } else {
                setError(result.error);
            }
            
            setLoading(false);
        };

        return React.createElement('div', { 
            className: 'login-container d-flex align-items-center justify-content-center',
            'data-name': 'login-container',
            'data-file': 'components/Login.js'
        }, 
            React.createElement('div', { className: 'card shadow-lg', style: { width: '400px' } }, [
                React.createElement('div', { className: 'card-body p-5', key: 'card-body' }, [
                    React.createElement('h2', { 
                        className: 'text-center mb-4',
                        key: 'title'
                    }, 'Iniciar Sesión'),
                    
                    error && React.createElement('div', { 
                        className: 'alert alert-danger',
                        key: 'error'
                    }, error),

                    React.createElement('form', { onSubmit: handleSubmit, key: 'form' }, [
                        React.createElement('div', { className: 'mb-3', key: 'email-group' }, [
                            React.createElement('label', { 
                                className: 'form-label',
                                key: 'email-label'
                            }, 'Email'),
                            React.createElement('input', {
                                type: 'email',
                                className: 'form-control',
                                value: email,
                                onChange: (e) => setEmail(e.target.value),
                                required: true,
                                placeholder: 'admin@crm.com',
                                key: 'email-input'
                            })
                        ]),
                        
                        React.createElement('div', { className: 'mb-4', key: 'password-group' }, [
                            React.createElement('label', { 
                                className: 'form-label',
                                key: 'password-label'
                            }, 'Contraseña'),
                            React.createElement('input', {
                                type: 'password',
                                className: 'form-control',
                                value: password,
                                onChange: (e) => setPassword(e.target.value),
                                required: true,
                                placeholder: 'admin123',
                                key: 'password-input'
                            })
                        ]),
                        
                        React.createElement('button', {
                            type: 'submit',
                            className: 'btn btn-primary w-100',
                            disabled: loading,
                            key: 'submit-btn'
                        }, loading ? 'Iniciando...' : 'Iniciar Sesión')
                    ]),

                    React.createElement('div', { 
                        className: 'text-center mt-3 text-muted small',
                        key: 'demo-info'
                    }, 'Demo: admin@crm.com / admin123')
                ])
            ])
        );
    } catch (error) {
        console.error('Login component error:', error);
        reportError(error);
    }
}
