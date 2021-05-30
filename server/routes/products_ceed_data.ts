const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
import axios from "axios";
import md5 from 'md5';

router.get('/', async (req, res) => {
    const ts = Date.now();
    const apiKey = process.env.COMICS_API_KEY
    const banana = md5('banana')
    console.log(banana)
    
    const {data} = await axios.get(``)
})


module.exports = router;