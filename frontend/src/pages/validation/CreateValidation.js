export default function AddDataValidation(data){
    
    const error={}

    if(data.title=='')
    {
        error.title="Title required"
    }

    if(data.price=='')
    {
        error.price="Price required"
    }
    if(data.country=='')
    {
        error.country="Country required"
    }

    if(data.location=='')
    {
        error.location="Location required"
    }

    if(data.image=='')
    {
        error.image="Image required"
    }

    
    return error;
}

