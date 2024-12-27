const express = require('express');
const router = express.Router();
const validateProduct = require('./validators/productValidator');


// Obtener todos los productos 
router.get('/productos',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.status(500).send(err);
            conn.query('SELECT * FROM productos',(err,rows)=>{ 
                if(err) return res.send(err);
                res.json(rows);
            });
    });
});

//Crear un nuevo producto
router.post('/productos', validateProduct, (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        
        // Inserta el nuevo producto
        conn.query('INSERT INTO productos SET ?', [req.body], (err, result) => { 
            if (err) return res.status(500).send(err);

            // Obtiene el ID del último producto insertado
            const newProductId = result.insertId;

            // Consulta para obtener el nuevo producto
            conn.query('SELECT * FROM productos WHERE id = ?', [newProductId], (err, rows) => {
                if (err) return res.status(500).send(err);
                
                // Devuelve el producto creado
                res.status(201).json(rows[0]); // Devuelve el primer resultado
            });
        });
    });
});



// Eliminar un producto
router.delete('/productos/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ error: err.message }); // Devuelve un objeto JSON
        }
        conn.query('DELETE FROM productos WHERE id = ?', [req.params.id], (err, result) => { 
            if (err) {
                return res.status(500).json({ error: err.message }); // Devuelve un objeto JSON
            }
            // Verifica si se eliminó algún registro
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Producto no encontrado' }); // Devuelve un objeto JSON
            }
            res.json({ message: 'Producto Borrado' }); // Devuelve un objeto JSON
        });
    });
});


//Actualizar un producto 
router.put('/productos/:id', validateProduct, (req, res) => {
    console.log("Recibida petición PUT con ID:", req.params.id);
    console.log("Datos recibidos:", req.body);
    
    req.getConnection((err, conn) => {
        if (err) {
            console.error("Error de conexión:", err);
            return res.status(500).json({ error: err.message });
        }
        
        conn.query('UPDATE productos set ? WHERE id = ?', [req.body, req.params.id], (err, result) => {
            if (err) {
                console.error("Error en la consulta:", err);
                return res.status(500).json({ error: err.message });
            }
            
            console.log("Resultado de la actualización:", result);
            res.json({ message: 'Producto Actualizado', result });
        });
    });
});

//Modulo de ventas 
// Módulo de ventas 
router.post('/ventas', (req, res) => {
    const { producto_id, cantidad } = req.body;

    req.getConnection((err, conn) => { 
        if (err) return res.status(500).send(err);
         
        // Verificar stock antes de realizar la venta
        conn.query('SELECT stock FROM productos WHERE id = ?', [producto_id], (err, rows) => {
            if (err || rows.length === 0 || rows[0].stock < cantidad) {
                return res.status(400).send('Stock insuficiente o producto no encontrado.');
            }

            // Actualizar el stock después de la venta
            const newStock = rows[0].stock - cantidad;
            conn.query('UPDATE productos SET stock = ? WHERE id = ?', [newStock, producto_id], (err) => {
                if (err) return res.status(500).send(err);        
       
                // Registrar la venta 
                conn.query('INSERT INTO ventas (producto_id, cantidad) VALUES (?, ?)', [producto_id, cantidad], (err) => { 
                    if (err) return res.status(500).send(err);
                    res.send('Venta registrada correctamente');
                });
            });
        });
    });
});


module.exports = router