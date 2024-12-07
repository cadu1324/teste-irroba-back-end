const express = require('express');
const router = express.Router();
const championshipController = require('../controllers/championshipController');  

router.get('/start', championshipController.startChampionship);
router.get('/:id', championshipController.getChampionshipById)

module.exports = router;
