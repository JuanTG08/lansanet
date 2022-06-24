const homeCtrl = {};

homeCtrl.home = (req, res) => {
    res.json({saludar: "holi"});
};

module.exports = homeCtrl;