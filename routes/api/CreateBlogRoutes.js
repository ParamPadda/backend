
const express =require('express');
const addBlog = require('../../controllers/addBlog');
const getBlogs = require('../../controllers/getBlogs');
const markMostLiked = require('../../controllers/markMostLiked');
const getMarkMostLiked = require('../../controllers/getMostLiked');
const getUserBlogs = require('../../controllers/getUserBlogs');
const deleteUserBlogs = require("../../controllers/deleteUserBlogs")
const router = express.Router();


router.post('/addBlogs',addBlog);
router.get('/getBlogs',getBlogs);
router.get('/getUserBlogs/:email',getUserBlogs);
router.delete('/deleteBlog/:blogId/:email', deleteUserBlogs);
// router.delete('/deleteBlog', deleteUserBlogs);
router.put('/markMostLiked/:id',markMostLiked);
router.get('/getMarkMostLiked',getMarkMostLiked);

         
module.exports = router;