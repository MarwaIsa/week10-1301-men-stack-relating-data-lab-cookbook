const mongoose = require('mongoose');
const foodSchema = new mongoose.Schema({
  foodName:{
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true, 
    min: 1,

  },
  foodCategory: {
    type: String,
    required: true,
    enum: ['vegetables', 'fruits', 'Dairy', 'Sweets and Desserts']
  }
});
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  foods:[foodSchema]
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
