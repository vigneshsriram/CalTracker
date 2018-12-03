


/////////////////////////////////
const express = require("express");
const router = express.Router();
const data = require("../data");
const recipeData = data.recipes;
const xss = require("xss");

//var xss = require('xss');



// router.get("/:id", async (req, res) => {
//   try {
//    // res.send(req.params.id);
//     const user = await recipeData.getrecipeById(req.params.id);
//     res.json(user);
  
//   } catch (e) {
//     res.status(404).json({ message: e});
//   }
// });
var authUser;
var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyBW868Z1gfMZA_pQjyDopOLvsxyN9YujO8', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
//  var yeh;
 var geocoder = NodeGeocoder(options);


 router.get("/", async (req, res) => {
   var cook = req.cookies.AuthCookie;
  if( cook === undefined)
 {
    res.render("restaurant/login");
    
}
else
 {
    if(authUser!=undefined)
    { 
      res.redirect("/mainpage");
    }
    else
    {
       res.clearCookie("AuthCookie");
       res.render("restaurant/login");
    }
}
});


router.get("/signup", async (req, res) => {
  res.render("restaurant/signup")
});


router.post("/login", async (req, res) => {
  var cook = req.cookies.AuthCookie;
  var fname = xss(req.body.fname);
  var lname = xss(req.body.lname);
  var username = xss(req.body.username);
  var pass = xss(req.body.password)
  var email = xss(req.body.email)
  var userinfo = await recipeData.adduser(fname,lname,username,email,pass);
  
 if(userinfo == "DuplicateUser")
 {
   res.render("restaurant/signup",{"message":"Error: Username exists."})
 }
 else if(userinfo == "DuplicateEmail")
 {
   res.render("restaurant/signup",{"message":"Error: Email exists."})
 }
 else if(userinfo == "InvalidEmail")
 {
   res.render("restaurant/signup",{"message":"Error: Invalid email"})
 }
 else{

  
  res.render("restaurant/login",{"message":"Thankyou. Login now."})
 }
});

// router.post("/restaurantfilter", async (req, res) => {
//   var username = xss(req.body.username)
//   var pass = xss(req.body.password)
//   var user = await recipeData.validateUser(username,pass)
  
  
//   if(user!="empty")
//   {
    
//   authUser = await recipeData.patchsession(user._id)

//   res.cookie("AuthCookie",authUser.sessionId);  

//   res.render("restaurant/restaurant_filter",{userauth: authUser})
//   }
//   else{

//   res.render("restaurant/login",{"message":"Invalid user"})
//   }
// });


// router.get("/restaurantfilter", async (req, res) => {
  // var  cook = req.cookies.AuthCookie;
  // if(cook===undefined)
  // {
  //   res.redirect("/");
  // }
  // else
  // {
  // res.render("restaurant/restaurant_filter",{userauth:authUser})
  // }
// });



/* This gets all the reviews when you refresh the page*/

// router.get("/restaurant/:id", async (req, res) => {
 
//  var cook = req.cookies.AuthCookie;
//  if(cook === undefined)
//  {
//     res.redirect("/");
//  }
//  else
//  {

//    var onerest =  await recipeData.getrestaurantbyid(req.params.id);
  

//    geocoder.geocode(onerest.obj.location,function(err,results)
//    {
//      lat = results[0].latitude;
//      longi = results[0].longitude;
   
//      res.render("restaurant/restaurant_detail", {latit:lat , longit:longi, restone:onerest, userauth: authUser });
//    });
//   }

// });




/* I AM Posting the Reviews to this route*/


// router.post("/restaurant/:id", async (req, res) => {
  
//    var onerest =  await recipeData.getrestaurantbyid(req.params.id);
  
//    var cook = req.cookies.AuthCookie;

//    await recipeData.addreview(authUser,xss(req.body.comment),onerest,(req.body.rating));
//    var sanitizedComment  =  xss(req.body.comment);
    
//    geocoder.geocode(onerest.obj.location,function(err,results)
//    {
//      lat = results[0].latitude;
//      longi = results[0].longitude;

//      res.json({comment: sanitizedComment, latit: lat, longit: longi, restone: onerest});
   
//    });

// });



// router.post("/restaurantlist", async (req, res) => {
   


//    var state = req.body.state;
//    var city = req.body.city;

//      var rest= {};
  
//    if(state == ""){
//     res.render("restaurant/restaurant_filter",{"message":"Enter State",userauth:authUser})
//      return;
//    }
  
//    if(city == ""){
//     res.render("restaurant/restaurant_filter",{"message":"Enter City",userauth:authUser})
//     return;
//    }


//  var cuisineArray = [];
//  if(cuisine == ""){
//    cuisineArray = ["Indian", "American", "Mexican", "Italian", "Chinese"]
   
//  }else{
//    cuisineArray.push(cuisine);
//    }
   
  

  
//   var arrrest = await recipeData.getrestaurants(state,city);
//   res.render("restaurant/restaurant_list",{rests:arrrest,userauth:authUser});

     
// });




router.get("/logout", async (req, res) => {
  var cook = req.cookies.AuthCookie;
  if(cook === undefined)
  {
      res.redirect("/");

  }
  else
  {    
    if(authUser!=undefined)
    {
       var loggedout = await recipeData.patchsession(authUser._id)
        res.clearCookie("AuthCookie");
       
         authUser = null;
 
       res.redirect("/")
    }
    else
    {
      res.clearCookie("AuthCookie");
      res.redirect("/");
        
    }
  }
});





router.get("/changepassword", async (req, res) => {
  res.render("restaurant/changepassword",{userauth:authUser})
});

router.post("/changepassword", async (req, res) => {


var cook = req.cookies.AuthCookie;
if(cook ==  undefined)
{
    res.redirect("/");
}
else
{
    
  var oldpassword = xss(req.body.oldpassword);
  var newpassword = xss(req.body.newpassword);

  var test = await recipeData.patchpassword(oldpassword, newpassword, authUser)
  if(test == "incorrect")
  {
    res.render("restaurant/changepassword",{"message" : "Error: Old password doesn't match entered password.",userauth:authUser})
  }
  else if(test == "same")
  {
    res.render("restaurant/changepassword",{"message" : "Error: New password and current password are the same.",userauth:authUser})
  }
  else{
    authUser = test;
    res.render("restaurant/changepassword",{"message" : "Password successfully changed.",userauth:authUser})
  }
}
});



//=======================HCI ROUTES================================//

//after login mainpage
var  pathimg = "../public/pics/HeaderRedNoise.png";
router.get("/mainpage", async(req,res)=>{


  
  var  cook = req.cookies.AuthCookie;
  if(cook===undefined)
  {
    res.redirect("/");
  }
  else
  {
    //1st time login
    if(authUser.bio == null)
    {
      res.render("restaurant/mainpage",{userauth:authUser, message:"Please Edit your Bio"})
    }
    else if(authUser.dailycalorie == null)
    {
         
       res.render("restaurant/mainpage",{userauth:authUser, message:"Please Edit your Bio"})

    }
    else
    {

      var daily = authUser.dailycalorie;
      var remain = authUser.remainingcalorie;
      var consumed = daily - remain;
      var percent = parseInt((consumed / daily ) * 100);
      if(percent>100)
      {
        percent=100;
      }
      res.render("restaurant/mainpage",{userauth:authUser,path:pathimg, consumed: percent})

    }
    
  }


});

router.post("/mainpage",async(req,res)=>{

  var username = xss(req.body.username)
  var pass = xss(req.body.password)
  var user = await recipeData.validateUser(username,pass)
  

  if(user!="empty")
  {
    
  authUser = await recipeData.patchsession(user._id)

  res.cookie("AuthCookie",authUser.sessionId); 
  if(authUser.bio == null)
  {
    res.render("restaurant/mainpage",{userauth:authUser, message:"Please Edit your Bio"})
  }
  else if(authUser.dailycalorie == null)
  {
       
     res.render("restaurant/mainpage",{userauth:authUser, message:"Please Edit your Bio"})

  }
  else
  {
    res.render("restaurant/mainpage",{userauth:authUser,path:pathimg})

  } 

       //res.render("restaurant/mainpage",{userauth: authUser});
  }
  else{

     res.render("restaurant/login",{"message":"Invalid user"})
  }

} );


router.get("/addmeal", async(req,res) => {

    res.render("restaurant/add_meal");

});

router.post("/addmeal", async (req,res)=>{
  var item = req.body.item;
  var quantity = req.body.quantity;
  var calorie = req.body.calorie;
   authUser = await recipeData.patchmeal(authUser._id,item,quantity,calorie);
   

   authUser = await recipeData.patchcustommeal(authUser._id,item,quantity,calorie);
  if(item=="" || quantity=="" || calorie==""){
    res.render("restaurant/add_meal");
  }
  else{
    res.redirect("/mainpage");
  }

});

router.get("/preadded",async(req,res) => {
 
      res.render("restaurant/preadded", {userauth:authUser});

});

router.post("/preadded",async(req,res) =>{

      var state = req.body.state;
   var city = req.body.city;
  var quantity = req.body.quantity;
     var rest= {};
  
   if(state == ""){
    res.render("restaurant/preadded",{"message":"Enter Category",userauth:authUser})
     return;
   }
  
   if(city == ""){
    res.render("restaurant/preadded",{"message":"Enter Item",userauth:authUser})
    return;
   }


  
  var arrrest = await recipeData.getrestaurants(state,city);
  
  authUser = await recipeData.patchmeal(authUser._id,arrrest.name,quantity,arrrest.calorie,arrrest.image);
  //  add quant
  
  if(arrrest!=undefined)
  {
    res.redirect("/mainpage");
  }
  

});

router.post("/addprevious",async(req,res) =>{
  
  var prevadd = req.body.prevmeal;
  var quant = req.body.quantity;
 var rest= {};
 var cal = 0;
  for(var j = 0; j<authUser.custommeal.length;j++)
  {
      if(authUser.custommeal[j].item == prevadd)
      {
          cal = authUser.custommeal[j].calorie;
          break;
      }
  }
  //console.log("New", authUser)


//var arrrest = await recipeData.getrestaurants(state,city);
//console.log("HI",arrrest,quantity);
authUser = await recipeData.patchmeal(authUser._id,prevadd,quant,cal);
//  add quant


res.redirect("/mainpage");



});

router.get("/profile", async(req,res)=>{

     res.render("restaurant/profile");

});


router.post("/delete", async (req,res) => {
  
  var prod = req.body.product;
  var prodarr = prod.split(" ");
  var item = prodarr[0];
  var quant = prodarr[1];
  await recipeData.deleteMeal(authUser._id,item,quant);


    res.redirect('/mainpage');


});


router.post("/profile", async (req, res) => {
   
  //save data to mongodb and take this back to restaurant_filter
  var age = req.body.age;
  var gender = req.body.gender;
  var weight = req.body.weight;
  var height = req.body.height;
  var activity = req.body.activity;
  var targetWeight = req.body.targetWeight;
  
  //get the id
  var id = authUser._id
  var bioDataObject = {};
  bioDataObject.age= age;
  bioDataObject.currentweight= weight;
  bioDataObject.gender= gender;
  bioDataObject.height= height;
  bioDataObject.activity= activity;
  bioDataObject.targetweight= targetWeight;


  
  //take these values and save it in the database:
  await recipeData.addBioDataObject(id,bioDataObject)
   authUser = await recipeData.calculation(id,bioDataObject);
  
 
  res.redirect("/mainpage");
     
});



module.exports = router;
