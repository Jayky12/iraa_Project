const express = require('express');
const router = express.Router();
const postController = require('../controllers/postcontroller');

router.get('/', postController.getAllposts);
router.get('/:id', postController.getPostById);           
router.post('/postcreate', postController.createPost); 
router.put('/update/:id', postController.updatePost);
router.delete('/delete/:id', postController.deletePost);
module.exports = router;