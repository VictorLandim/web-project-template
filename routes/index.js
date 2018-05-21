const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { body: 'Welcome.' });
});

module.exports = router;
