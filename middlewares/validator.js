const { body, validationResult } = require('express-validator')

const RegisterRules = () => [
    body('firstName', 'Name is required').notEmpty(),
    body('lastName', 'Last Name is required').notEmpty(),
    body('email', 'Email should be valid ').isEmail(),
    body('password', 'Password must be 5 characters at least').isLength({
        min: 5,
        max: 20
    }),
    body('address', 'Address is required').notEmpty(),
    body('phone', 'Phone is required').notEmpty()
]

const loginRules = () => [
    body('email', 'Email should be valid ').isEmail(),
    body('password', 'Password must be 5 characters at least').isLength({
        min: 5,
        max: 20
    })
]

const validator = (req, res, next) => {
    const errors = validationResult(req)
    //if errors return array of errors 
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()})
    }
    next()
}
//check rules for adding product
const productRules = () => [
    body('nameProd', 'Name of product is required!').notEmpty(),
    body('imageProd', `L'URL of product is required!`).notEmpty(),
    body('brand', 'The brand of product is required!').notEmpty(),
    body('price', 'Price of product is required!').notEmpty(),
    body('rating', 'Rating of product is required!').notEmpty(),
    body('countInStock', 'The nbre of product in stock is required!').notEmpty(),
    body('description', 'Description of product is required!').notEmpty(),
]
module.exports = {validator, RegisterRules, loginRules, productRules}