const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
const users = mongoCollections.users;
const bcrypt = require("bcrypt");
const saltRounds = 8;
//const users = require("./users");
const uuid = require("node-uuid");

let exportedMethods = {

  // async getrestaurants(state,city,cuisineArray) {
  //   const recipeCollection = await recipes();
  //   const restaurantall = await recipeCollection.find({}).toArray();
  //   var correct = [];
  //   for(var i=0;i<restaurantall.length;i++)
  //   {
  //    // console.log(restaurantall[i].obj.state, state)
  //    if(cuisineArray.length == 5)
  //    {
  //      if( restaurantall[i].obj.state == state && restaurantall[i].obj.city == city  )
  //      {
         
  //          correct[i] = restaurantall[i];
  //      } 
  //     }
  //     else 
  //     {
  //       for(var k = 0; k<restaurantall[i].obj.cuisine.length; k++)
  //       {
  //       if( restaurantall[i].obj.state == state && restaurantall[i].obj.city == city && restaurantall[i].obj.cuisine[k] == cuisineArray[0] )
  //       {
          
  //           correct[i] = restaurantall[i];
  //       } 
  //     }
  //     }
  //   }

  //  return correct;

  // },


  async getrestaurants(state,city) {
    const recipeCollection = await recipes();
    const restaurantall = await recipeCollection.find({}).toArray();
    var correct = {};

    var fr = restaurantall[0].fruits;
    var veg = restaurantall[0].vegetables;
    var bac = restaurantall[0].breadsandcereals;
    var maf = restaurantall[0].meatsandfish;
    var mad = restaurantall[0].milkanddairy;
    var fas = restaurantall[0].fatsandsugars;
    if(state == "fruits")
    {
      for(var k = 0;k<fr.length;k++)
      {
        if(fr[k].name==city)
        {
            correct.name = fr[k].name;
            correct.calorie = fr[k].calorie;
            correct.image = fr[k].image;
            break;
        }
      }
    }
    else if(state == "vegetables")
    {
      for(var k = 0;k<veg.length;k++)
      {
        if(veg[k].name==city)
        {
            correct.name = veg[k].name;
            correct.calorie = veg[k].calorie;
            correct.image = veg[k].image;
            break;
        }
      }
    }

    else if(state == "breadsandcereals")
    {
      for(var k = 0;k<bac.length;k++)
      {
        if(bac[k].name==city)
        {
            correct.name = bac[k].name;
            correct.calorie = bac[k].calorie;
            correct.image = bac[k].image;
            break;
        }
      }
    }

    else if(state == "meatsandfish")
    {
      for(var k = 0;k<maf.length;k++)
      {
        if(maf[k].name==city)
        {
            correct.name = maf[k].name;
            correct.calorie = maf[k].calorie;
            correct.image = maf[k].image;
            break;
        }
      }
    }

    else if(state == "milkanddairy")
    {
      for(var k = 0;k<mad.length;k++)
      {
        if(mad[k].name==city)
        {
            correct.name = mad[k].name;
            correct.calorie = mad[k].calorie;
            correct.image = mad[k].image;
            break;
        }
      }
    }

    else if(state == "fatsandsugars")
    {
      for(var k = 0;k<fas.length;k++)
      {
        if(fas[k].name==city)
        {
            correct.name = fas[k].name;
            correct.calorie = fas[k].calorie;
            correct.image = fas[k].image;
            break;
        }
      }
    }
    console.log(correct);
    
 return correct;

  },

  
  async getrestaurantbyid(id) {
 
    if(id==undefined)
    {
       throw 'Provide id'
    }
    if(id==null)
    {
       throw 'Provide id'
    }
    
    if(!id)
    {
       throw 'Provide id'
    }
    const   recipeCollection = await recipes();
    const onerest = await recipeCollection.findOne({_id: id});
    if(!(onerest))
    {
      throw 'Recipe not found'
    }
    return onerest;
  },


  async addrecipe(obj) {
    

    return recipes().then(recipeCollection => {

      
      return recipeCollection
        .insertOne(obj);
        
    });


  },

  async validateUser(username,password) {
    const userCollection = await users();
    const userall = await userCollection.find({}).toArray();
    //var userinfo2correct;
    for(var i=0;i<userall.length;i++){
      //console.log(userall[i]);
      if(userall[i].profile.username == username){
        let compareToMatch = false;
        
          try {
            compareToMatch = await bcrypt.compare(password, userall[i].hashedPassword);
          } catch (e) {
            console.log("Cannot hash")
          }
          if (compareToMatch === true) {
            return userall[i];
        //console.log(userall[i].fname);
         
        }
      }
    }
    return "empty";
  },

  // async adduser(fname,lname,username,email,pass) {
  
  //   const userCollections = await users();
  //   const userall = await userCollections.find({}).toArray();
  //   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
  //   if(!(re.test(String(email).toLowerCase())))
  //   {
  //       return "InvalidEmail"
  //   }

  //   for(var i = 0; i<userall.length;i++)
  //   {
      
  //     if(userall[i].profile.username.toLowerCase() == username.toLowerCase())
  //     {
  //       return "DuplicateUser"
  //     }
  //     else if(userall[i].profile.email.toLowerCase() == email.toLowerCase())
  //     {
  //       return "DuplicateEmail"
  //     }
     
      
  //   }
    
  //   try{
  //     hashpass = await bcrypt.hash(pass,saltRounds)
  //   }
  //   catch(e)
  //   {
  //     console.log("cannot hash")
  //   }

  //   return users().then(userCollection => {
     
  //     let newuser = {
  //       _id: uuid.v4(),
  //       sessionId: "",
  //       hashedPassword: hashpass,
  //       profile:{
  //       firstname: fname,
  //       lastname: lname,
  //       username: username,
  //       email: email,
  //       }
  //     };

  //     return userCollection
  //       .insertOne(newuser)
  //       .then(newInsertInformation => {
  //         return newInsertInformation.insertedId;
  //       })
  //       .then(newId => {
          
  //        // return this.getrestaurantbyid(newId);
  //       });
  //   });


  // },

  async adduser(fname,lname,username,email,pass) {
  
    const userCollections = await users();
    const userall = await userCollections.find({}).toArray();
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
    if(!(re.test(String(email).toLowerCase())))
    {
        return "InvalidEmail"
    }
    console.log(fname,lname,username,email,pass)
    for(var i = 0; i<userall.length;i++)
    {
      
      if(userall[i].profile.username.toLowerCase() == username.toLowerCase())
      {
        return "DuplicateUser"
      }
      else if(userall[i].profile.email.toLowerCase() == email.toLowerCase())
      {
        return "DuplicateEmail"
      }
     
      
    }
    
    try{
      hashpass = await bcrypt.hash(pass,saltRounds)
    }
    catch(e)
    {
      console.log("cannot hash")
    }

    return users().then(userCollection => {
     
      let newuser = {
        _id: uuid.v4(),
        sessionId: "",
        hashedPassword: hashpass,
        profile:{
        firstname: fname,
        lastname: lname,
        username: username,
        email: email
        },
        today:[],
        custommeal:[],
        dailycalorie:null,
        remainingcalorie:null,
        bio:{
          age: null,
        height: null,
        activity:null,
        gender:null,
        currentweight:null,
        targetweight: null,
        }
        
      };

      return userCollection
        .insertOne(newuser)
        .then(newInsertInformation => {
          return newInsertInformation.insertedId;
        })
        .then(newId => {
          
         // return this.getrestaurantbyid(newId);
        });
    });


  },

  async calculation(id,bioDataObject)
  {
    var bmi =0;
    var modbmi = 0;
    var neededcal = 0;
      if(bioDataObject.gender == "Male")
      {
        bmi = (10 * (bioDataObject.currentweight * 0.4535)) + (6.25  * (bioDataObject.height * 2.54)) - (5* bioDataObject.age) + 5;
      }
      else if(bioDataObject.gender == "Female")
      {
        bmi = (10 * (bioDataObject.currentweight * 0.4535)) + (6.25  * (bioDataObject.height * 2.54)) - (5* bioDataObject.age) - 161;
      }    

      if(bioDataObject.activity == "low")
      {
        modbmi = bmi * 1.2;
      }
      
      else if(bioDataObject.activity == "moderate")
      {
        modbmi = bmi * 1.5;
      }
      else if(bioDataObject.activity == "high")
      {
        modbmi = bmi * 1.8;
      }

      if(bioDataObject.targetweight<bioDataObject.currentweight)
      {
           neededcal = modbmi - 500;   
      }
      else if(bioDataObject.targetweight>bioDataObject.currentweight)
      {
           neededcal = modbmi + 500;   
      }
      else if(bioDataObject.targetweight == bioDataObject.currentweight)
      {
           neededcal = modbmi;   
      }

     neededcal =  parseInt(neededcal);
      const userCollection = await users()
      //add code here
        let updateCommand = {
          $set: {
            dailycalorie: neededcal,
            remainingcalorie: neededcal
          }
        };
        const query = {
          _id: id
        };
      
        await userCollection.updateOne(query, updateCommand); 
        var getuser = await this.getUserById(id);
        return getuser;
  },

   

  async removerecipe(id) {
    const recipeCollection = await recipes();
    try
    {
    const getrecipe = await this.getrestaurantbyid(id);
    }
    catch(e)
    {
      throw e;
    }
    
    const deletionInfo = await recipeCollection.removeOne({ _id: id });
    
    
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete post with id of ${id}`;
    }
  },






  // DELETE





  async deleteMeal(id,item,quant)
  {
   
      const recipeCollection = await recipes();
      var getuser;
      try
      {
       getuser = await this.getUserById(id);
      
      console.log(getuser);
      }
      catch(e)
      {
        throw e;
      }

      var count = 0;
      
      for(var i=0;i<getuser.today.length;i++)
      {
        if(count == 0)
        {
          if(getuser.today[i].item == item && getuser.today[i] == quant)
          {
              count++;
              getuser.today.splice(i,1);
          }
        }
         
      }
    
    
    
  },








  async patchmeal(id,item,quantity,calorie,image){
    
    const userCollection = await users();
   var getuser = await this.getUserById(id);
    const updatedPostData ={};
    var sendtochange = calorie * quantity;
    var arr = [];
    var newmeal = {
      item: item,
      quantity: quantity,
      calorie:calorie,
      image: image
    }
    getuser.today.push(newmeal);
    
    updatedPostData.today = getuser.today;
    let updateCommand = {
      $set: updatedPostData
    };
    const query = {
      _id: id
    };
    
    await userCollection.updateOne(query, updateCommand);
   var thisuserid =  await this.changeremaining(id,sendtochange);
   var thisuser = await this.getUserById(thisuserid);
    return thisuser;

  },

  // async changeremaining(id,sendtochange)
  // {
  //   const userCollection = await users();
  //    var getuser = await this.getUserById(id);
  //    var remain = getuser.remainingcalorie;
  //     var remainingcalorie = remain - sendtochange;
  //     if(remainingcalorie<0)
  //     {
  //       remainingcalorie = 1;
  //     }
      
  //    let updateCommand = {
  //     $set: {
  //       remainingcalorie: remainingcalorie
  //     }
  //   };
  //   const query = {
  //     _id: id
  //   };
  
  //   await userCollection.updateOne(query, updateCommand)
  //   return id;

  // },


  async changeremaining(id,sendtochange)
  {
    const userCollection = await users();
     var getuser = await this.getUserById(id);
     var remain = getuser.remainingcalorie;
      var remainingcalorie = remain - sendtochange;
      var f; 
      var nf;
      var rf;
      var exceededcal;
      if(remainingcalorie==0)
      {
        f=1;
        rf=0;
        nf-0;
      }
      else if(remainingcalorie>0){
        f=0;
        rf=1;
        nf=0;
      }
      else if(remainingcalorie<0)
      {
        f=0;
        rf=0;
        nf=1;
        exceededcal = Math.abs(remainingcalorie);
      }
      
     let updateCommand = {
      $set: {
        remainingcalorie: remainingcalorie,
        remflag:rf,
        flag:f,
        exceededcalorie: exceededcal,
        negflag:nf
      }
    };
    const query = {
      _id: id
    };
  
    await userCollection.updateOne(query, updateCommand)
    return id;

  },


  async patchcustommeal(id,item,quantity,calorie){
   
    const userCollection = await users();
   var getuser = await this.getUserById(id);
    const updatedPostData ={};
    var arr = [];
    var newmeal = {
      item: item,
      quantity: quantity,
      calorie:calorie
    }


    getuser.custommeal.push(newmeal);
    
    updatedPostData.custommeal = getuser.custommeal;
    let updateCommand = {
      $set: updatedPostData
    };
    const query = {
      _id: id
    };

    await userCollection.updateOne(query, updateCommand);
  
    return await this.getUserById(id);

  },

  async addBioDataObject(id, bioDataObject){
    const userCollection = await users()
//add code here
  let updateCommand = {
    $set: {
      bio: bioDataObject
    }
  };
  const query = {
    _id: id
  };

  await userCollection.updateOne(query, updateCommand)


},


  // async updaterecipe(id, updatedUser) {

  //   if(arguments.length!=2)
  //   {
  //     throw 'Enter proper arguments'
  //   }
  //   try
  //   {
  //   const getrecipe = await this.getrestaurantbyid(id);
  //   }
  //   catch(e)
  //   {
  //     throw e;
  //   }
  //   if(updatedUser.title==null && updatedUser.ingredients==null && updatedUser.steps==null)
  //   {
  //      throw 'Invalid input'
  //   }
   
  
    
  //   if (typeof updatedUser.title !== "string" || updatedUser.title==null) throw "No title provided";

    
      
  //     var check = updatedUser.title;
  //     if(check.replace(/\s/g,"").length==0)
  //     {
  //       throw 'Title cannot be blank'
  //     }
    
  //   //if (typeof ingredients !== "Array") throw "I aint got nobody!";

  //   if (!Array.isArray(updatedUser.ingredients) || updatedUser.ingredients==null) {
  //     throw 'Ingredients not provided'
  //   }
  //   if(updatedUser.ingredients.length==0)
  //   {
  //     throw 'ingredients Array Empty'
  //   }
  //   if(updatedUser.ingredients==null)
  //   {
  //     throw 'ingredients array null'
  //   }
  
    
  //   if(Array.isArray(updatedUser.ingredients))
  //   {
  //       for(var i=0;i<updatedUser.ingredients.length;i++)
  //       {
          
  //          if(Object.prototype.toString.call(updatedUser.ingredients[i])!= '[object Object]')
  //          {
  //             throw 'Ingredients value Not an Object'
  //          }
  //          else
  //          {
           
  //           if(Object.keys(updatedUser.ingredients[i]).length!=2)
  //           {
  //             throw 'Invalid number of keys in ingredients';
  //           }
  //             if(updatedUser.ingredients[i].name==null || updatedUser.ingredients[i].amount==null)
  //             {
  //               throw 'Name or Amount is not provided';
  //             }
  //             else
  //             {
                
  //                if(!(typeof updatedUser.ingredients[i].name=='string')|| !(typeof updatedUser.ingredients[i].amount=='string'))
  //                 {
  //                   throw 'Not a string in object in ingredients'
  //                 }
  //                 else
  //                 {
  //                   var str1 = updatedUser.ingredients[i].name;
  //                     var str2 = updatedUser.ingredients[i].amount;
                      
  //                     if (str1.replace(/\s/g, "").length==0 || str2.replace(/\s/g, "").length==0) {
                        
  //                       throw 'Invalid value for objects in ingredients'
  //                   }
  //                 }
  //             }
              
  //          }
  //       }
  //   }
  //   if (!Array.isArray(updatedUser.steps)) {
  //     throw 'Steps not provided'
  //   }
    
  //   if(updatedUser.steps.length==0)
  //   {
  //     throw 'steps Array Empty'
  //   }
  //   if(updatedUser.steps==null)
  //   {
  //     throw 'steps array null'
  //   }
  //   if(Array.isArray(updatedUser.steps))
  //   {
  //       for(var i=0;i<updatedUser.steps.length;i++)
  //       {
  //          if(typeof updatedUser.steps[i]!=='string')
  //          {
  //             throw 'Not a string in steps'
  //          }
  //          else
  //          {
             
  //              var str1 =updatedUser.steps[i];
               
  //               if (str1.replace(/\s/g, "").length==0) {
                 
  //                throw 'Invalid string in steps'
  //            }
  //          }
  //       }
  //   }
    
  //   if(Object.keys(updatedUser).length ==0 && updatedUser.constructor == Object)
  //   {
  //     throw 'Invalid input'
  //   }
    
  //   return this.getrestaurantbyid(id).then(currentrecipe => {
  //     let userUpdateInfo = {
  //       title: updatedUser.title,
  //       ingredients: updatedUser.ingredients,
  //       steps: updatedUser.steps
  //     };
     
  //     let updateCommand = {
  //       $set: userUpdateInfo
  //     };
  //     return recipes().then(recipeCollection => {
  //       return recipeCollection.updateOne({ _id: id }, updateCommand).then(() => {
  //         return this.getrestaurantbyid(id);
  //       });
  //     });
  //   });
  // },

  async getUserById(id) {
    
      //  if(id==undefined)
      //  {
      //     throw 'Provide id'
      //  }
      //  if(id==null)
      //  {
      //     throw 'Provide id'
      //  }
       
      //  if(!id)
      //  {
      //     throw 'Provide id'
      //  }
       const userCollection = await users();
       const oneuser = await userCollection.findOne({_id: id});
       if(!(oneuser))
       {
         throw 'Recipe not found'
       }
       return oneuser;
     },


     async patchsession(id)
     {
      var getuser
      const userCollection = await users();
      try
      {
      getuser = await this.getUserById(id);
      }
      catch(e)
      {
        throw e;
      }
      const updatedPostData ={};
      if(getuser.sessionId == ""){
     // console.log("empty")
      updatedPostData.sessionId = uuid.v4()
      }
      else{
       // console.log("DGASFFGFH")
        updatedPostData.sessionId = "";
      }
      let updateCommand = {
        $set: updatedPostData
      };
      const query = {
        _id: id
      };
      await userCollection.updateOne(query, updateCommand);
    
      return await this.getUserById(id);
     },


   

  //    async addreview (authUser,comment,onerest,rating)
  //    {
  //      //console.log(authUser+"this")
  //      var name =  authUser.profile.firstname +" "+authUser.profile.lastname;
  //       const recipeCollection = await recipes();
  //         let newreview = {
  //       //  _id: uuid.v4(),
  //         user: name,
  //         comment : comment, 
  //         rating: rating 
          
  //       };
  //     //  console.log("Rating",rating)
  //       const query = {
  //         _id: onerest._id
  
  //       };
  //        onerest.reviews.push(newreview);
  //        const updatedPostData ={};
  //        updatedPostData.reviews = onerest.reviews;
  // let updateCommand = {
  //         $set: updatedPostData
  //       };
  //        await recipeCollection.updateOne(query, updateCommand);
  
  //        var numberofrating = onerest.reviews.length;
  //        var sumofratings=0;
  //        for(var i = 0; i<numberofrating;i++)
  //        {
  //         // console.log("asffadsfadfd",onerest.reviews[i])
  //          sumofratings = sumofratings + parseInt(onerest.reviews[i].rating)
  //        }
  //        var avgrating = Math.round((sumofratings/numberofrating) * 10) / 10
  //       // console.log("AVGRAT",avgrating)
  
  //        const updatedPostData1 ={};
  //       onerest.obj.rating=avgrating
  //        updatedPostData1.obj = onerest.obj;
  //      //  console.log("UDATEPOSE",updatedPostData1)
         
  //        let updateCommand1 = {
  //          $set: updatedPostData1
  //        };
  //        const query1 = {
  //          _id: onerest._id
  //        };
  //      //  console.log("ONEREST",onerest)
  //        await recipeCollection.updateOne(query1, updateCommand1);
  
  
      
  //    },


   async patchpassword(oldpassword, newpassword, authUser)
{ 
  const userCollection = await users();
  let compareToMatch = false;
  
    try {
      compareToMatch = await bcrypt.compare(oldpassword, authUser.hashedPassword);
    } catch (e) {
      console.log("Cannot hash")
    }
    if (compareToMatch === true) {

      if(oldpassword == newpassword)
      {
        return "same"
      }
      var newhashpassword = await bcrypt.hash(newpassword,saltRounds)
      const updatedPostData ={};
      
      updatedPostData.hashedPassword = newhashpassword;
      
      let updateCommand = {
        $set: updatedPostData
      };
      const query = {
        _id: authUser._id
      };
      await userCollection.updateOne(query, updateCommand);
    
      return await this.getUserById(authUser._id);
   
  }
  else{
    return "incorrect"
  }
},


  // async patchrecipe(id, updatedPost) {

  //   if(arguments.length!=2)
  //   {
  //     throw 'Enter proper arguments'
  //   }
  //   const recipeCollection = await recipes();
  //   try
  //   {
  //   const getrecipe = await this.getrecipeById(id);
  //   }
  //   catch(e)
  //   {
  //     throw e;
  //   }
  //  const updatedPostData ={};
  
  //   if (updatedPost.title) {
  //     if (typeof updatedPost.title !== 'string' || updatedPost.title==null) throw "No title provided";
  //     updatedPostData.title = updatedPost.title;
  //   }
   
  //     var check = updatedPost.title;
  //     if(check.replace(/\s/g,"").length==0)
  //     {
  //       throw 'Title cannot be blank'
  //     }
    
    
  //   if (updatedPost.ingredients) {
  //     if (!Array.isArray(updatedPost.ingredients) || updatedPost.ingredients==null) {
  //       throw 'Ingredients not an Array'
  //     }
  //     if(updatedPost.ingredients.length==0)
  //     {
  //       throw 'ingredients Array Empty'
  //     }
  //     if(updatedPost.ingredients==null)
  //     {
  //       throw 'ingredients array null'
  //     }
  //     if(Array.isArray(updatedPost.ingredients))
  //     {
  //         for(var i=0;i<updatedPost.ingredients.length;i++)
  //         {
  //            if(Object.prototype.toString.call(updatedPost.ingredients[i])!='[object Object]')
  //            {
  //               throw 'Ingredients value Not an Object'
  //            }
  //            if(updatedPost.ingredients[i]==null  || Object.keys(updatedPost.ingredients[i]).length==0)
  //            {
  //              throw 'NULL/Empty Object in ingredients'
  //            }
  //            else
  //            {
  //             if(Object.keys(updatedPost.ingredients[i]).length!=2)
  //             {
  //               throw 'Invalid number of keys in ingredients '
  //             }
  //               if(!(updatedPost.ingredients[i].name)|| !(updatedPost.ingredients[i].amount))
  //               {
  //                 throw 'Not a proper object in ingredients'
  //               }
  //               else
  //               {


  //                  if(!(typeof updatedPost.ingredients[i].name=='string')|| !(typeof updatedPost.ingredients[i].amount=='string'))
  //                   {
  //                     throw 'Not a string in ingredients'
  //                   }
  //                   else
  //                   {
  //                     var str1 = updatedPost.ingredients[i].name
  //                     var str2 = updatedPost.ingredients[i].amount
  //                     if (str1.replace(/\s/g, '').length==0 || str2.replace(/\s/g, '').length==0) {
                        
  //                       throw 'Invalid value for objects in ingredients'
  //                   }
  //                   }
  //               }
  //           }
  //         //  updatedPostData.ingredients[i] = updatedPost.ingredients[i];
  //         }
  //     }
  //     updatedPostData.ingredients = updatedPost.ingredients;
  //   }

  //   if (updatedPost.steps) {
  //     if (!Array.isArray(updatedPost.steps)) {
  //       throw 'Steps not an array'
  //     }
      
  //     if(updatedPost.steps.length==0)
  //     {
  //       throw 'steps Array Empty'
  //     }
  //     if(updatedPost.steps==null)
  //     {
  //       throw 'steps array null'
  //     }
  //     if(Array.isArray(updatedPost.steps))
  //     {
  //         for(var i=0;i<updatedPost.steps.length;i++)
  //         {
  //            if(typeof updatedPost.steps[i]!=='string')
  //            {
  //               throw 'Not a string in steps'
  //            }
  //            else
  //            {
               
  //                var str1 =updatedPost.steps[i];
                
  //                 if (!str1.replace(/\s/g, '').length) {
                   
  //                  throw 'Invalid string in steps'
  //              }
  //            }
  //         }
  //     }
     
  //     updatedPostData.steps = updatedPost.steps;
  //   }
  //   if(Object.keys(updatedPostData).length ===0 && updatedPostData.constructor === Object)
  //   {
  //     throw 'Invalid input'
  //   }
  //   let updateCommand = {
  //     $set: updatedPostData
  //   };
  //   const query = {
  //     _id: id
  //   };
  //   await recipeCollection.updateOne(query, updateCommand);

  //   return await this.getrecipeById(id);
  // },

 };

module.exports = exportedMethods;