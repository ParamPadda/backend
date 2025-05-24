
const express = require("express");

const router = express.Router();
const { register } = require('../../controllers/AdminController');
const adminModel = require('../../models/admin'); 



// router.post('/register' ,(req,res)=>{
//          res.send(' Admin register successgully');
//      });

router.post('/register',register);

// router.get('/register' ,(req,res)=>{
//          res.send(' Admin data');
//      });

router.get('/register', async (req, res) => {
    try {
      const admins = await adminModel.find(); // get all admin docs
      res.status(200).json(admins); // send as JSON
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch admin data' });
    }
  });

  

  




module.exports = router;