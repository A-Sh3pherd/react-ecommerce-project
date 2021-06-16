import {getRepository} from "typeorm";
import {User} from "../db/entity/User";

const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const {email, password} = req.query
    const userRepo = getRepository(User)

    const user = await userRepo.findOne({where: {email, password}})


    if (user) {

        if (user.role === 'admin') return res.json({message: 'Welcome back admin', user})
        return res.json({message: 'user found', user})
    }
    res.json({message: 'Username or password are incorrect.'})


})

module.exports = router


