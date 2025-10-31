const express=require('express')

const router=express.Router()
const {getCordinates}=require('../controller/mapController')

router.post('/getcordinates',getCordinates)

module.exports=router;
