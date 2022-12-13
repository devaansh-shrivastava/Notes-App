const router = require('express').Router();
const {
  getNotes,
  manipulateNotes
} = require('../controller/noteController');

router.get('/getNotes', getNotes);
router.get('/manipulateNotes', manipulateNotes);

module.exports = router;