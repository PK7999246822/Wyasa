const mongoose=require('mongoose')

const isvalid = (value) => {
    if (typeof value != 'string'){return false}
       
    if (typeof value === 'undefined' || typeof value === null){return false}
        
    if (typeof value === 'string' && value.trim().length == 0){return false}
       
    return true
  }
  const isvalidTime = function (value){
    return (/^([1-9]|0[1-9]|1[0-2]):[0-5][0-9] ([AaPp][Mm])$/.test(value))
  }
  const isValidObjectId= function(ObjectId){
    return mongoose.Types.ObjectId.isValid(ObjectId)
  }
  module.exports.isValidObjectId=isValidObjectId

  module.exports.isvalidTime=isvalidTime
  
  module.exports.isvalid=isvalid