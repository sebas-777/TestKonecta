import React, { useEffect, useState } from 'react';
import { api } from './services/api'; 

const SaleModal = ({ showModal, setShowModal, setProducts }) => {
    const [selectedProductId, setSelectedProductId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [availableProducts, setAvailableProducts] = useState([]);

    useEffect(() => {
        const fetchAvailableProducts = async () => {
            try {
                const data = await api.fetchProducts();
                
                const filteredProducts = data.filter(product => product.stock > 0);
                setAvailableProducts(filteredProducts);
            } catch (error) {
                console.error("Error al cargar productos:", error);
            }
        };
        fetchAvailableProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           
            const product = availableProducts.find(p => p.id === selectedProductId);
            if (!product) return;

            const newStock = product.stock - quantity;

            
            await api.createSale({ producto_id: product.id, cantidad: quantity });

          
            await api.updateProduct(product.id, { ...product, stock: newStock });

            
            setShowModal(false);
        } catch (error) {
            console.error("Error al realizar la venta:", error);
        }
    };


    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value) || 0;
        if(value >= 0 && value <= maxQuantity){
            setQuantity(value);
        }
    }
    
    const selectedProduct = availableProducts.find(p => p.id === selectedProductId);
    const maxQuantity = selectedProduct ? selectedProduct.stock : 0;

    return (
        <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} onClick={() => setShowModal(false)}>
            <div className="modal-dialog" onClick={e => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Realizar Venta</h5>
                        <button type="button" className="close" onClick={() => setShowModal(false)}>
                            &times;
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Seleccionar Producto</label>
                                <select 
                                    className="form-control" 
                                    value={selectedProductId} 
                                    onChange={(e) => setSelectedProductId(e.target.value)} 
                                    required
                                >
                                    <option value="">Seleccione un producto</option>
                                    {availableProducts.map(product => (
                                        <option key={product.id} value={product.id}>
                                            {product.nombre} (Stock: {product.stock})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Cantidad</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    value={quantity} 
                                    onChange={(e) => setQuantity(e.target.value)} 
                                    min="1" 
                                    max={availableProducts.find(p => p.id === selectedProductId)?.stock || 0}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Vender</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaleModal;
