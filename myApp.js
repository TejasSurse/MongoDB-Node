require('dotenv').config();
const mongoose = require("mongoose");


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;
const PersonSchema = new  Schema(
  {
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
  }
);

const Person = mongoose.model("Person", PersonSchema);


let Tejas = new Person({
  name :"Tejas",
  age : 21,
  favoriteFoods : ["sweet", "biryani", "chicken"  ]

});

const createAndSavePerson = (done) => {
  Tejas.save((err, result)=>{
    if(err) { 
      console.log(err);
    }else{
      done(null, result);
    }
  });
 
};


let family = new Person([
  {
    name:"Shital",
    age : 40,
    favoriteFoods : ["sweet", "biryani", "chicken"  ]
  },
  {
    name:"Krishna",
    age : 17,
    favoriteFoods : ["sweet", "biryani", "chicken"  ]
  },
  {
    name:"Sunil",
    age : 45,
    favoriteFoods : ["sweet", "biryani", "chicken"  ]
  }
]);
const createManyPeople = (family, done) => {
  Person.create(family, (err, data)=>{
      if(err) console.log(err);
      done(null , data);
  })
  
};

/** 5) Use `Model.find()` */
var findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods : food}, (err, data)=>{
    if(err) return console.log(err);
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, data)=>{
    if(err) console.log(err);
    done(null, data);

  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
  
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name : personName}, {age : ageToSet}, {new : true}, (err, data)=>{
    if(err) console.log(err);
    done(null , data);
  });
  
};

const removeById = (personId, done) => {

  Person.findByIdAndRemove(personId, (err, data)=>{
    if(err) console.log(err);
    done(null, data);
  });
  
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
