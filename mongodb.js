const mongodb=require("mongodb");
const MongoClient=mongodb.MongoClient 
const url='mongodb://127.0.0.1:27017'
const dbname='e-commerce'
MongoClient.connect(url,{useNewURLParser:true},(error,client)=>{
 if(error)
 {
     console.log(error);
 }
   
   
      const db= client.db(dbname);
    
    /*Insert Product Info in Collection*/
    var products = [
        {
             
            prodid:"sam1" ,
            title: "samsung galaxy",
            description: "Flagship Android phone",
          
            manufacture_details: {
              model_number: "S20",
               
            },
            
            seller :{
                seller_name:"AElectronics",
                seller_add:"Mumbai"
            },

            shipping_details: {
              weight: 350,
              width: 10,
              height: 10,
              depth: 1
            },
          
            pricing: {
              price: 1000
            }
          },
          
     { 
        prodid:"dell8" ,
        title: "Dell Laptop",
        description: "Fastest Laptop",
      
        manufacture_details: {
          model_number: "LattitudeL10",
           
        },
        
        seller :{
            seller_name:"BElectronics",
            seller_add:"Delhi"
        },

        shipping_details: {
          weight: 850,
          width: 40,
          height: 40,
          depth: 5
        },
      
        pricing: {
          price: 2000
        }
        

         
      }
      ];
      db.collection('products').insertMany(products,(error,result)=>{
            if(error)
             {
               console.log(error)
              }
              else{
                 console.log(result.insertedCount);
              }
       })
      /*Reading every product with price 1000*/
     
      db.collection('products').find({ pricing:{price: 1000 }}).toArray((error,tasks)=>{
      console.log(tasks)
     })
     
    /*Update product seller address from Delhi to New Delhi*/
      
    const update=db.collection('products').updateMany(
        {
        
        "seller.seller_add" :"Delhi"
        }
    
        ,
        {
            $set:
            {
                "seller.seller_add" :"New Delhi"
                 
            }
        }
    )
    update.then(result=>{
       console.log(result.modifiedCount)
    }
    ).catch(error=>{
        console.log(error)
    })
   /*Deleting entry with shipping weight >600  */
   db.collection('products').deleteMany(
       {
        "shipping_details.weight": {$gte:600} 
       }
             
        
   ).then(result =>
   {
    console.log(result.deletedCount)
   }
   ).catch(error=>{
       console.log(error)
   })

})
 
