 const Header = () => {
    return (  

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
            //onClick={onNewProduct}
          >
            <i className="bi bi-plus-lg me-2"></i>
            New Product
          </button>
          <button 
            id="new-sale-btn" 
            className="btn btn-success d-flex align-items-center" 
            //onClick={onNewSale}
          >
            <i className="bi bi-plus-lg me-2"></i>
            New Sale
          </button>
        </div>
      </div>
    </nav>
    );
}

export default Header