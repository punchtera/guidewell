const express = require("express");
const router = express.Router();
const PumpController = require("../controllers/PumpController");


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/pump', PumpController.getData);

module.exports = router;