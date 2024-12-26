import { useState } from 'react';
import ProductModal from './ProductModal';

const Header = ({ setProducts }) => { 
    const [showModal, setShowModal] = useState(false);

    return (  
      <>
          <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
              <div className="container">
                  <a className="navbar-brand d-flex align-items-center" href="#">
                      <i className="bi bi-cup-hot fs-4 text-primary me-2"></i>
                      <span className="fw-bold">KONECTA Cafe</span>
                  </a>
                  <div className="d-flex gap-2">
                    
                      <button 
                          id="new-product-btn" 
                          className="btn btn-primary d-flex align-items-center" 
                          onClick={() => setShowModal(true)} 
                      >
                          <i className="bi bi-plus-lg me-2"></i>
                          Agregar Nuevo Producto
                      </button>
                      <button 
                          id="new-product-btn" 
                          className="btn btn-success d-flex align-items-center" 
                          onClick={() => setShowModal(true)} 
                      >
                          <i className="bi bi-plus-lg me-2"></i>
                          Vender Producto 
                      </button>
                      {/* Otros botones */}
                  </div>
              </div>
          </nav>

          {showModal && (
              <ProductModal
                  showModal={showModal} 
                  setShowModal={setShowModal} 
                  setProducts={setProducts}
              />
          )}
      </>
  );
}

export default Header;


