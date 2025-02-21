const Reporte = require('../models/Reporte');

const getReportes = async (req, res) => {
    try {
        const reportes = await Reporte.find();
        res.json(reportes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getReportes };
