// ..................................................problems............................................//


// 1.Create a JSON object representing a person with properties like name, age, and address. Add methods to the object to calculate the person's birth year and full address.

const person = {
    name: "John Doe",
    age: 30,
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345"
    },
    getBirthYear: function() {
      const currentYear = new Date().getFullYear();
      return currentYear - this.age;
    },
    getFullAddress: function() {
      return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.zip}`;
    }
  };
  
 
  console.log("Birth Year:", person.getBirthYear());
  console.log("Full Address:", person.getFullAddress());
  

//2.Write a function that takes two JSON objects as input and merges them into a single JSON object. Handle conflicts if both objects have the same property.

  function mergeJSONObjects(obj1, obj2) {
    const mergedObject = {};
  
    // Merge properties from the first object
    for (let key in obj1) {
      mergedObject[key] = obj1[key];
    }
  
    // Merge properties from the second object, handling conflicts
    for (let key in obj2) {
      if (mergedObject.hasOwnProperty(key)) {
        
        console.log(`Conflict detected for property "${key}". Choosing value from the second object.`);
      }
      mergedObject[key] = obj2[key];
    }
  
    return mergedObject;
  }
  

  const obj1 = {
    name: "John",
    age: 30,
    city: "New York"
  };
  
  const obj2 = {
    age: 35,
    country: "USA",
    city: "Los Angeles"
  };
  
  const mergedObj = mergeJSONObjects(obj1, obj2);
  console.log(mergedObj);
  


//3.Write a function to deep clone a JSON object, i.e., create a new JSON object with the same structure and values as the original object, but not referencing the same memory.

function deepClone(obj) {
    if (obj === null || typeof obj !== "object") {
      // If obj is null or not an object, return it directly
      return obj;
    }
  
    let clonedObj = Array.isArray(obj) ? [] : {};
  
    for (let key in obj) {
      // Recursively deep clone each property
      clonedObj[key] = deepClone(obj[key]);
    }
  
    return clonedObj;
  }
  

  const originalObj = {
    name: "John",
    age: 30,
    address: {
      street: "123 Main St",
      city: "Anytown"
    }
  };
  
  const clonedObj = deepClone(originalObj);
  console.log(clonedObj);
  
  
  console.log(originalObj === clonedObj); // Should print false
  console.log(originalObj.address === clonedObj.address); // Should print false
  


// 4.Write a function that takes a JSON object and a path (string representing the path to a property in the object, e.g., "person.address.city") and returns the value at that path in the object. Handle cases where the path is invalid.

function getValueAtPath(obj, path) {
    const keys = path.split('.');
    let value = obj;
  
    for (let key of keys) {
      // Check if the current value is an object and contains the key
      if (typeof value === 'object' && value !== null && value.hasOwnProperty(key)) {
        value = value[key]; // Update value to the nested property
      } else {
        // Path is invalid, return undefined
        return undefined;
      }
    }
  
    return value;
  }
  

  const persons = {
    name: "John",
    age: 30,
    address: {
      street: "123 Main St",
      city: "Anytown"
    }
  };
  
  console.log(getValueAtPath(persons, "name"));
  console.log(getValueAtPath(persons, "age")); 
  console.log(getValueAtPath(persons, "address.city"));
  console.log(getValueAtPath(persons, "address.postalCode"));
  


// 5.Implement a function to flatten a nested JSON object, i.e., convert it into a flat JSON object where each key is a dot-separated path to a leaf node in the original object.


function flattenObject(obj, parentKey = '') {
    let flattened = {};
  
    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        // If the value is an object, recursively flatten it
        const nestedKeys = flattenObject(obj[key], `${parentKey}${key}.`);
        flattened = { ...flattened, ...nestedKeys };
      } else {
        // If the value is a leaf node, add it to the flattened object
        flattened[`${parentKey}${key}`] = obj[key];
      }
    }
  
    return flattened;
  }
  
  
  const nestedObj = {
    person: {
      name: "John",
      age: 30,
      address: {
        street: "123 Main St",
        city: "Anytown"
      }
    },
    company: {
      name: "XYZ Corp",
      employees: 100
    }
  };
  
  const flattenedObj = flattenObject(nestedObj);
  console.log(flattenedObj);
  