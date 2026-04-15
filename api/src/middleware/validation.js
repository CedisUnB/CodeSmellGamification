export const validateIdParam = (req, res, next) => {
    const { id } = req.params;
    const numericId = parseInt(id);
    
    if (isNaN(numericId) || numericId <= 0) {
        return res.status(400).json({ 
            error: 'ID inválido. O parâmetro deve ser um número positivo.' 
        });
    }
    
    req.params.id = numericId;
    next();
};