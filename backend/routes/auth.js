const jwt = require('jsonwebtoken');
const express = require('express');
const router = new express.Router();
const jsonschema = require('jsonschema')

const { createToken } = require('../helpers/token')

const userAuthSchema = require('../schemas/user/userAuth.json');
const userRegisterSchema = require('../schemas/user/userRegister.json')
const {User} = require('../models/user.js')

const { BadRequestError } = require('../ExpressError')


/**
 *  POST /auth/token: {username, password} => {token}
 * 
 * Returns JWT token which can be used to authenticate further requests.
 * 
 * Authorization required: none
 */

router.post("/token", async function (req, res, next){
    try{
        const validator  = jsonschema.validate(req.body, userAuthSchema)
        if(!validator.valid){ 
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs)
        }

        const { username , password } = req.body;
        const user = await User.authenticate(username, password);
        const token = createToken(user);
        
        return res.json({token});


    } catch(err){
        return next(err);
    }
})


/**
 *  POST /auth/register: {user} => {token}
 * 
 * user must include {username, password}
 * 
 * Returns JWT token which can be used to authenticate further requests.  
 * 
 * Authorization required: none
 */

router.post("/register", async function (req, res, next) {
    try{
        const validator = jsonschema.validate(req.body, userRegisterSchema);

        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const newUser = await User.register({...req.body});
        const token = createToken(newUser);
        return res.status(201).json({token})

    } catch(err){
        return next(err);
    }
})

module.exports = router;