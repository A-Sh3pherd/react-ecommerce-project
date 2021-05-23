import {getRepository} from "typeorm";
import {Category} from '../db/entity/Category';

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const categoryRepo = getRepository(Category);
    const allCategories = await categoryRepo.find().catch(err => console.log(err));

    res.json({message: 'Heres all the categories: ',allCategories})
})

module.exports = router;