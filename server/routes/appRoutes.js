
const { Router } = require('express');
const router = Router();


router.get('/', (req, res) => {
    res.sendFile('./index.html', { root: '../../whiskyRandomizer' });
})

router.get('/:file', (req, res) => {
    const file = req.params.file;
    const fileType = file.split('.').pop();
    if (fileType == 'css') {
        res.setHeader('Content-Type', 'text/css');
    } else {
        res.setHeader('Content-Type', 'text/javascript');
    };
    res.sendFile(`./${file}`, { root: '../../whiskyRandomizer' });
});

router.get('/img/:file', (req, res) => {
    const file = req.params.file;
    const fileType = file.split('.').pop();
    if (fileType == 'ico') {
        res.setHeader('Content-Type', 'img/ico');
    } else {
        res.setHeader('Content-Type', 'image/png');
    };
    res.sendFile(`./img/${file}`, { root: '../../whiskyRandomizer' });
});

router.get('/modules/:file', (req, res) => {
    res.setHeader('Content-Type', 'text/javascript');
    const file = req.params.file;
    res.sendFile(`./modules/${file}`, { root: '../../whiskyRandomizer' });
});

router.get('/pages/:file', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    const file = req.params.file;
    res.sendFile(`./pages/${file}`, { root: '../../whiskyRandomizer' });
});


module.exports = router;