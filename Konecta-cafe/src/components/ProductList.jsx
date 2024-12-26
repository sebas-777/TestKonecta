
import { useEffect, useState } from "react";
import { api } from "./services/api";
import { Alert, Button, Form, Modal, Spinner, Table } from "react-bootstrap";
import Header from "./Header";

const ProductList = () => {
    const[products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    

    useEffect(() => { 

        const fetchProducts = async () => {
            try{
                const data = await api.fetchProducts();
                setProducts(data);
                
            }catch(error){
                setError(error.message);
            }finally{
                setLoading(false);
            }
        };
        fetchProducts();

    }, []);

    const handleDelete = async (id) => {
        try {
            await api.deleteProduct(id);
            setProducts(products.filter((product) => product.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEdit = async (product) => {
        const {fecha_creacion, ...productWithoutDate} = product;  
       setCurrentProduct(productWithoutDate);
       setShowEditModal(true);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        console.log("Datos a enviar para actualizar:", currentProduct);
        
        // Crear una copia del objeto sin el campo id
        const { id, ...updatedProduct } = currentProduct;
    
        try {
            const response = await api.updateProduct(id, updatedProduct);
            console.log("Respuesta del servidor:", response);
            
            setProducts(
                products.map((product) =>
                    product.id === id ? { ...product, ...updatedProduct } : product
                )
            );
            setShowEditModal(false);
        } catch (error) {
            console.error("Error completo:", error);
            console.error("Mensaje de error:", error.message);
            setError("Error al actualizar el producto: " + error.message);
        }
    };
    
    
    if (loading){
        return < Spinner animation="border" variant="primary" />;
    }

    if (error){
        return <Alert variant="danger"  >{error}</Alert>;
    }
    
    return ( 
       <>
       <div className="containermt-4">
        <Header setProducts={setProducts} />
        {loading && <Spinner animation="border" variant="primary" />}
        {error && <Alert variant="danger">{error}</Alert>}
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Referencia</th>
                    <th>Precio</th>
                    <th>Peso</th>
                    <th>Categoria</th>
                    <th>Stock</th>
                    {/* <th>Fecha de Creacion</th> */}
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                   <tr key={product.id}>
                   <td>{product.id}</td>
                   <td>{product.nombre}</td>
                   <td>{product.referencia}</td>
                   <td>{product.precio}</td>
                   <td>{product.peso}</td>
                   <td>{product.categoria}</td>
                   <td>{product.stock}</td>
                   {/* <td>{new Date(product.createdAt).toLocaleDateString()}</td> Formatear fecha */}
                   
                   <td>
                        <Button variant="warning" onClick={()=>handleEdit(product)}>
                            Editar
                        </Button>
                        <Button variant="danger" onClick={()=>handleDelete(product.id)}>
                            Eliminar
                        </Button>
                    </td>
                    </tr>
                ))}
            </tbody> 
            </Table>
            { currentProduct && (
                <Modal show={showEditModal} onHide={() => {setShowEditModal(false)}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleUpdate}>
                            {/* Formulario para editar el producto */}
                            <Form.Group controlId="Forname">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentProduct.nombre}
                                    onChange={(event) => {
                                        setCurrentProduct({ ...currentProduct, nombre: event.target.value });
                                    }} 
                                    required
                                />
                                <Form.Label>Referencia</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentProduct.referencia}
                                    onChange={(event) => {
                                        setCurrentProduct({ ...currentProduct, referencia: event.target.value });
                                    }} 
                                    required
                                />
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={currentProduct.precio}
                                    onChange={(event) => {
                                        setCurrentProduct({ ...currentProduct, precio: event.target.value });
                                    }} 
                                    required
                                />
                                <Form.Label>Peso</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={currentProduct.peso}
                                    onChange={(event) => {
                                        setCurrentProduct({ ...currentProduct, peso: event.target.value });
                                    }} 
                                    required
                                />
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentProduct.categoria}
                                    onChange={(event) => {
                                        setCurrentProduct({ ...currentProduct, categoria: event.target.value });
                                    }} 
                                    required
                                />
                                <Form.Label>Stock</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={currentProduct.stock}
                                    onChange={(event) => {
                                        setCurrentProduct({ ...currentProduct, stock: event.target.value });
                                    }} 
                                    required
                                />
                             {/* <Form.Label>Fecha de Creacion </Form.Label>
                                <Form.Control
                                    type="date"
                                    value={currentProduct.createdAt}
                                    onChange={(event) => {
                                        setCurrentProduct({ ...currentProduct, createdAt: event.target.value });    
                                    }}
                                />  */}
                            </Form.Group>
                            <Button type="submit">Guardar Cambios</Button>
                        </Form>
                    </Modal.Body>
                    
                </Modal>
            )}

       </div>
        
        </>
     );
}
 
export default ProductList;