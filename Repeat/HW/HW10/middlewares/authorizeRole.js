const authorizeRole = (findUserById, role) => {
  return (req, res, next) => {
    const user = req.user ? findUserById(req.user.id) : null;

    if (!user || user.role !== role) {
      return res.status(403).json({
        message: "Access denied. Anmins only!",
      });
    }
    next();
  };
};

export default authorizeRole;
