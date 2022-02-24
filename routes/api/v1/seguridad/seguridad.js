const express = require('express');
const router = express.Router();

router.post('/signin', async (req, res) => {
    res.status(502).json({msg: 'No Implement'});
});

router.post('/login', async (req, res) => {
    res.status(502).json({msg: 'No Implement'});
})

module.exports = router;