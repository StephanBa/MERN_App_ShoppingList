const express = require('express');
const router = express.Router();

//Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    GET All items
// @access  Public
router.get('/', (req, res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post('/', (req, res) => {
    //create in memory
    const newItem = new Item({
        name: req.body.name
    })
    //save to the database
    newItem.save().then(item => res.json(item)); // I don't get why we need to save that item first, before to send it to the dataBase
});

// @route   DELETE api/items/:id
// @desc    Delete An Item
// @access  Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success:false}));
});


//make it readable to all files
module.exports = router;