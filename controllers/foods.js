// controllers/foods.js

const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// router logic will go here - will be built later on in the lab
/* router.get('/', (req, res) => {
    res.render('foods/index.ejs');
  }); */
  router.get('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id)
      res.render('foods/index.ejs',{foods:currentUser.foods});
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
  //add new food

  router.get('/new', (req, res) => {
    res.render('./foods/new.ejs');
  }); 

  router.post('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.foods.push(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/foods`);
    } catch (err) {
      console.log(err);
      res.redirect('/');
    }
  });

  // Show food dtl
  router.get('/:foodId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const foods = currentUser.foods.id(req.params.foodId);

        if (!foods) {
            // Handle the case where the food item is not found
            return res.status(404).send('Food item not found'); // Or render a 404 page
        }

        res.render('foods/show.ejs', { foods: foods });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


  //delete food
  router.delete('/:foodId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.foods.id(req.params.foodId).deleteOne();
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  
  });

  //update

  router.get('/:foodId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const foods = currentUser.foods.id(req.params.foodId);
      res.render('foods/edit.ejs', {
        foods: foods,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });


  router.put('/:foodId', async (req, res) => {
    try {
      // Find the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      // Find the current food from the id by req.params
      const foods = currentUser.foods.id(req.params.foodId);
      // Use the Mongoose .set() method
      // this method updates the current food to reflect the new form data on `req.body`
      foods.set(req.body);
      // Save the current user
      await currentUser.save();
      // Redirect back to the show view of the current application
      res.redirect(
        `/users/${currentUser._id}/foods/${req.params.foodId}`
      );
      
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
module.exports = router;
