const express=require('express')
const router=express.Router()

const {createListing,getAllListing}=require('../controller/listingController')
const {updateListing,editListing}= require('../controller/editController')
const deleteListing=require('../controller/deleteController')
const showindividualListing= require('../controller/showListingController')
const verifyUser=require('../middleware/authmiddelware')

router.post('/createListing',verifyUser,createListing)
router.get('/allListing',getAllListing)
router.get('/EditListing/:id',verifyUser,editListing)
router.put('/updateListing/:id',verifyUser,updateListing)
router.delete('/deleteListing/:id',verifyUser,deleteListing)
router.get('/showListing/:id',showindividualListing)


module.exports=router;