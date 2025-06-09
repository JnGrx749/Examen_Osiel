const AuthUtils = {
    login: async (email, password) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            if (email === 'admin@crm.com' && password === 'admin123') {
                const user = {
                    id: '1',
                    email: email,
                    name: 'Administrador',
                    role: 'admin'
                };
                localStorage.setItem('crmUser', JSON.stringify(user));
                localStorage.setItem('crmToken', 'sample-jwt-token');
                return { success: true, user };
            }
            
            return { success: false, error: 'Credenciales inválidas' };
        } catch (error) {
            return { success: false, error: 'Error de conexión' };
        }
    },

    logout: () => {
        localStorage.removeItem('crmUser');
        localStorage.removeItem('crmToken');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('crmUser');
        return userStr ? JSON.parse(userStr) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('crmToken');
    }
};
