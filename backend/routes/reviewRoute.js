const express=require('express')
const router=express.Router()

const {createReview,getReview}=require('../controller/reviewController')

router.post('/listings/:id/reviews',createReview)
router.get('/listings/reviews/:id',getReview)

module.exports=router
