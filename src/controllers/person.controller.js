const express = require('express');
const router = express.Router();

const { updateCellphone } = require('../models/person');

router.put('/cellphone', async (req, res, next) => {

    updateCellphone(req.body)
        .then(result => res.status(200).send(result))
        .catch(err => next(err));    
})


module.exports = router;