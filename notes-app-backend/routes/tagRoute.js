const router = require('express').Router();
const {
  getTags,
  manipulateTags
} = require('../controller/tagController');

router.get('/getTags', getTags);
router.get('/manipulateTags', manipulateTags);

module.exports = router;
