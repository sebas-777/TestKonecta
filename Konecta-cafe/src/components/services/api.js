const API_URL ='http://localhost:3000/api';

export const api ={
    async fetchProducts(){
        const response = await fetch(`${API_URL}/productos`);
        if(!response.ok)throw new Error('Failed to fetch products');
         return response.json();
    },

    async createProduct(products){
        const response = await fetch(`${API_URL}/productos`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(products)
        });
        if(!response.ok)throw new Error('Failed to create product');
        return response.json();
    },

    async updateProduct(id, products) {
        try {
            console.log("Iniciando petición de actualización");
            const response = await fetch(`${API_URL}/productos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(products)
            });
            
            console.log("Status de la respuesta:", response.status);
            console.log("Headers de la respuesta:", Object.fromEntries(response.headers.entries()));
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Texto del error:", errorText);
                throw new Error(`Failed to update product: ${errorText}`);
            }
            
            const responseText = await response.text();
            console.log("Respuesta del servidor:", responseText);
            
            // Intenta parsear como JSON solo si es posible
            try {
                return JSON.parse(responseText);
            } catch {
                return responseText;
            }
        } catch (error) {
            console.error("Error en updateProduct:", error);
            throw error;
        }
    },

    async deleteProduct(id){
        const response = await fetch(`${API_URL}/productos/${id}`,{
            method: 'DELETE'
        });
        if(!response.ok)throw new Error('Failed to delete product');
        //return response.json();
    },

    async createSale(sale){
        const response = await fetch(`${API_URL}/ventas`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sale)
        });
        if(!response.ok)throw new Error('Failed to create sale');
        return response.json();
    }
}