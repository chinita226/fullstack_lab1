const router = require('express').Router();
const path = require('path');//read and send html page
const User = require('../models/User');


// send html batcave
router.get('/', (req, res) => {
    res.sendFile(path.resolve('view/index.html'));
});

// get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
});

//create a new user
router.post('/users', async (req, res) => {

    //check for existing user with email
    const userExist = await User.findOne({email: req.body.email})
    if(userExist){
        return res.status(409).json({ error: 'User already exists!'});
    }
    else {
        const data = new User({
            firstName: req.body.firstName,
            age: req.body.age,
            email: req.body.email
        })
        try{
            //save new user and return all users
            await data.save()
            const users = await User.find()
            res.status(202).json(users)
        }catch (err){
            res.status(400).json({message: err.message})
        }
    }

});

// show a specific user with ID 
router.get('/users/:id', getUsers, (req, res) => {
    res.json(res.users)
})

// update a user

// delete a user
router.delete('/users/:id', getUsers, async (req, res) => {
    try{
        await res.users.remove()
        res.json({message: "User is deleted!"})
    }catch(err) {
        res.status(500).json({message: err.message})
    }
})

// update using put
router.put('/users/:id', getUsers, async (req, res) => {
     
    if(res.users.email == req.body.email){
        return res.status(409).json({ error: 'User already exists!'});
    } else {
        res.users.firstName = req.body.firstName
        res.users.age = req.body.age
        res.users.email = req.body.email
        try{
            const updateUser = await res.users.save()
            res.json(updateUser)
        } catch(err){
            res.json({ message: err.message})
        }
    }
 
})


//middle ware function to get user by ID
async function getUsers(req, res, next) {
    let users
    try {
        users = await User.findById(req.params.id)
        if(users==null) {
            return res.status(404).json({message: 'Cannot find the user with this ID!'})
        }

    }catch(err) {
        // this is to avoid cast objectid error result from mongoose id object
        if (err.kind === "ObjectId") {
            return res.status(404).json({ message: 'User cannot be found!'});}
        return res.status(500).json({ message: err.message})
    }
    res.users = users
    next()
}

module.exports= router