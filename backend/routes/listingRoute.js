const express=require('express')
const router=express.Router()

const {createListing,getAllListing}=require('../controller/listingController')
const {updateListing,editListing}= require('../controller/editController')
const deleteListing=require('../controller/deleteController')
const showindividualListing= require('../controller/showListingController')

router.post('/createListing',createListing)
router.get('/allListing',getAllListing)
router.get('/EditListing/:id',editListing)
router.put('/updateListing/:id',updateListing)
router.delete('/deleteListing/:id',deleteListing)
router.get('/showListing/:id',showindividualListing)


module.exports=router;