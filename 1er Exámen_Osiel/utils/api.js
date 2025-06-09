const ApiUtils = {
    // Purchases API
    getPurchases: async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [
            { id: '1', supplier: 'Proveedor A', amount: 1500, date: '2024-01-15', status: 'Completada' },
            { id: '2', supplier: 'Proveedor B', amount: 2300, date: '2024-01-20', status: 'Pendiente' },
            { id: '3', supplier: 'Proveedor C', amount: 800, date: '2024-01-25', status: 'Cancelada' }
        ];
    },

    // Contacts API
    getContacts: async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [
            { id: '1', name: 'Juan Pérez', email: 'juan@email.com', phone: '+1234567890', company: 'Empresa A' },
            { id: '2', name: 'María García', email: 'maria@email.com', phone: '+1234567891', company: 'Empresa B' },
            { id: '3', name: 'Carlos López', email: 'carlos@email.com', phone: '+1234567892', company: 'Empresa C' }
        ];
    },

    // Business API
    getBusiness: async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [
            { id: '1', name: 'Negocio Software', value: 50000, stage: 'Propuesta', probability: 70 },
            { id: '2', name: 'Consultoría TI', value: 25000, stage: 'Negociación', probability: 85 },
            { id: '3', name: 'Desarrollo Web', value: 15000, stage: 'Calificación', probability: 40 }
        ];
    },

    // Tickets API
    getTickets: async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [
            { id: '1', title: 'Error en sistema', priority: 'Alta', status: 'Abierto', assignee: 'Juan Pérez' },
            { id: '2', title: 'Solicitud de función', priority: 'Media', status: 'En progreso', assignee: 'María García' },
            { id: '3', title: 'Bug en interfaz', priority: 'Baja', status: 'Cerrado', assignee: 'Carlos López' }
        ];
    }
};
