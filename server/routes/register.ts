// Todo: Add more validations

const express = require('express');
const router = express.Router();
import {User} from '../db/entity/User'
import {getRepository} from "typeorm";

router.post('/', async (req, res) => {
    const {fname, lname, email, password, city, street} = req.body
    // Fetching User repository
    const userRepo = getRepository(User);
    // Check if user already exists
    const oldUser: User = await User.findOne({where: {email}})
    if (oldUser) return res.json({message: `Sorry ${fname}, Email already exists, pick another one!`})
    // Creating new user
    const newUser = userRepo.create({fname, lname, email, password, city, street});
    // Saving new user at DB
    await userRepo.save(newUser)
        .then(() => {
            res.json({
                message: 'User was successfully registered!',
                user: req.body,
                status: 200
            })
        })
        .catch(err => {
            res.json({
                message: `Something went wrong! ${err}`,
                status: 400
            })
        })
})

module.exports = router


