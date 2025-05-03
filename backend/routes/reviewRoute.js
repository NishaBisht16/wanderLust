const express=require('express')
const router=express.Router()
const verifyUser=require('../middleware/authmiddelware')
const {createReview,getReview,deleteReview}=require('../controller/reviewController')

router.post('/listings/:id/reviews',verifyUser,createReview)
router.get('/listings/reviews/:id',verifyUser,getReview)
router.delete('/listng/:id/deleteReview/:reviewId',verifyUser,deleteReview)

module.exports=router
