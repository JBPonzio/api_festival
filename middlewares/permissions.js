const verifyRole = (role) => {
    return(req, res, next) => {
        console.log(req.role)
        if (!req.role) return res.status(401).json("Un erreur est survenue, aucun rôles définis.");
        if (req.role === role) {
            next();
        } else {
            res.status(403).json("Vous n'êtes pas autorisé à accéder à cette page.")
        }
    }
}
module.exports = verifyRole;