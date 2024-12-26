import React, { useState } from 'react';
import { api } from './services/api'; 

const ProductModal = ({ showModal, setShowModal, setProducts }) => {
    const [newProduct, setNewProduct] = useState({
        nombre: '',
        referencia: '',
        precio: 0,
        peso: 0,
        categoria: '',
        stock: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.createProduct(newProduct);
            console.log("Producto creado:", response);

            
            setProducts(prevProducts => [...prevProducts, response]);

           
            console.log("Cerrando el modal");
            setShowModal(false); 
        } catch (error) {
            console.error("Error al crear el producto:", error);
        }
    };

    return (
        <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} onClick={() => setShowModal(false)}>
            <div className="modal-dialog" onClick={e => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Nuevo Producto</h5>
                        <button type="button" className="close" onClick={() => setShowModal(false)}>
                            &times;
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            
                            <input type="text" name="nombre" placeholder="Nombre" value={newProduct.nombre} onChange={handleChange} required />
                            <div className="form-group">
                            <label>Referencia</label>
                            <input type="text" name="referencia" className="form-control" value={newProduct.referencia} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Precio</label>
                            <input type="number" name="precio" className="form-control" value={newProduct.precio} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Peso</label>
                            <input type="number" name="peso" className="form-control" value={newProduct.peso} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Categoría</label>
                            <input type="text" name="categoria" className="form-control" value={newProduct.categoria} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Stock</label>
                            <input type="number" name="stock" className="form-control" value={newProduct.stock} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
);
};

export default ProductModal;
