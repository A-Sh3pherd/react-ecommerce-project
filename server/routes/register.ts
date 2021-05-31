// Todo: Add more validations

const express = require('express');
const router = express.Router();
import { User } from '../db/entity/User'
import { getRepository } from "typeorm";

router.get('/', async (req, res) => {
    const { email } = req.query
    const userRepo = getRepository(User);

    const emailExist = await userRepo.findOne({ where: { email } })
    if (emailExist) {
        res.json({
            status: 'Fuck',
            message: 'Email is unavailable.'
        })
    } else {
        res.json({
            status: 'ok',
            message: 'email available',
        })
    }

})

router.post('/', async (req, res) => {
    const { fname, lname, email, password, city, street } = req.body
    // First and Last name validation
    if (fname.length < 3 && typeof fname !== 'string') return res.json({ status: 'Fuck', message: 'First name must be 3 letters or more!' })
    if (lname.length < 3 && typeof fname !== 'string') return res.json({ status: 'Fuck', message: 'Last name must be 3 letters or more!' })
    // City and Street validation
    if (typeof city !== 'string' && city.length < 3) return res.json({ status: 'Fuck', message: 'City MUST be 3 letters or more!' })
    if (typeof street !== 'string' && street.length < 3) return res.json({ status: 'Fuck', message: 'Street MUST be 3 letters or more.' })
    // Fetching User repository
    const userRepo = getRepository(User);
    // Check if user already exists
    const oldUser: User = await User.findOne({ where: { email } })
    if (oldUser) return res.json({ message: `Sorry ${fname}, Email already exists, pick another one!` })
    // Creating new user
    const newUser = userRepo.create({ fname, lname, email, password, city, street });
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


