const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Algo salio mal');
};

module.exports = errorHandler;