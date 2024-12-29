const express=require('express')
const router=express.Router()

const {createReview,getReview,deleteReview}=require('../controller/reviewController')

router.post('/listings/:id/reviews',createReview)
router.get('/listings/reviews/:id',getReview)
router.delete('/listng/:id/deleteReview/:reviewId',deleteReview)

module.exports=router
