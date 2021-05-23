import {getRepository} from "typeorm";
import {User} from "../db/entity/User";

const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const {email, password} = req.query
    const userRepo = getRepository(User)

    const user = await userRepo.findOne({where: {email, password}})
    if (user) return res.json({message: 'user found', user})
    res.json({message: 'User was not Found'})



})

module.exports = router


