

// Get a reference to the paragraph element
const paragraph = document.getElementById("my-paragraph");



document.getElementById('openFormBtn').addEventListener('click', () => {
    document.getElementById('popupForm').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
  });

  // Close form
  document.getElementById('cancelFormBtn').addEventListener('click', () => {
    document.getElementById('popupForm').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  });

  // Form validation and submission
  document.getElementById('animalForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    console.log("Submitted Data:", data);
    function addApi( data) {
        fetch("http://localhost:3000/data")
        .then((response) => response.json())
        .then((resp) => {
          // Remove the target dog
        //  window.location.reload();
          let animalType="";

          
    
         let toBeFilterData ;
         switch (data.species){
    
            case "Big Cats" : toBeFilterData=resp.bigCats
            data.url="https://lh7-rt.googleusercontent.com/docsz/AD_4nXd-uvJLYor__5IcvpWtmeJD2juDCUBYMKjjqzoghCDV8WWbmz2lEHtxG18zVphSR7WiyjzUtljp7gV4eX66I-CqnkT_63hPFFJod8diiSJpFQJnEswzH8FvoQnt4rv9G_HzRrA-5g?key=diMK_80ckKTiDYYhCkLD1Q"
            animalType="bigCats"
            break;
            case "Dog" : toBeFilterData = resp.dogs
             data.url="https://lh7-rt.googleusercontent.com/docsz/AD_4nXcCbxAYeLW_9aj1NLfMyfrDam0cBmK7nAhB14rmzPCkEzQUHapWaj2g5IoaiElpnO7tRGlkEIiCEb_RXDMUXuaiU4wZKlTr860dTwIK_R7mQe_aKlLBFrwaN5b7Xu8neciKMocN?key=diMK_80ckKTiDYYhCkLD1Q"
             animalType="dogs"
            break;
            case "Big Fish" : toBeFilterData = resp.bigFish
             data.url="https://lh7-rt.googleusercontent.com/docsz/AD_4nXes7S9t9VNolJG1e7aZR8Sn6xogxeAqvhxIknmrDuVZsy5x50PqPXCib1C2_TRvpEd5-lq_KtqJj2HVY7GLuSRGIBd9yLwPJU-Pt9goqd0PcfoSnw56KwJ3pFcueFOxRw80rmQw?key=diMK_80ckKTiDYYhCkLD1Q"
             animalType="bigFish"
            break;
    
         }
         console.log(toBeFilterData)
         console.log(resp);
    
          toBeFilterData.push(data);
        
         console.log(toBeFilterData);
         
          // Update the JSON
       resp[animalType] = toBeFilterData;
       console.log(resp);
    
           fetch("http://localhost:3000/data", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(resp)
          });
        })
        .then(() => {
               window.location.reload();
          console.log("Dog with id=2 deleted successfully.");
          
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      
      }

      addApi(data);

    // Close the form
    document.getElementById('popupForm').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';


  })

let data= {};
 fetch("http://localhost:3000/data")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch bigCats data");
    }
    return response.json();
  })
  .then((response) => {
    data= response;
    console.log("Big Cats Data:", data);
    asdf();
  })
  .catch((error) => {
    console.error("Error:", error);
  });



   class AnimalTable {
    data ;
    containerId ;
    sortableFields ;
 
   constructor(data, containerId, sortableFields) {
     this.data = data;
     this.containerId = containerId;
     this.sortableFields = sortableFields;
     this.renderTable(containerId);
     console.log("animalsdf", data, containerId, sortableFields)
   }
 
    
 
    getSortableIcon(field) {
     return this.sortableFields.includes(field) ? "&#x25B2;&#x25BC;" : "";
   }
 
    renderTable(containerId) {
     const table = document.getElementById(containerId) ;
     console.log("ta",table);
     
     if (!table) return;
 
     table.innerHTML = `
       <thead>
         <tr class="header-row">
          <th class="fix-size">Identity</th>
           <th >Species</th>
           <th>Name ${this.getSortableIcon("name")}</th>
         
           <th>Size ${this.getSortableIcon("size")}</th>
             <th>Location ${this.getSortableIcon("location")}</th>
          
           <th>Actions</th>
         </tr>
       </thead>
       <tbody>
         ${this.data.map(this.renderRow.bind(this)).join("")}
       </tbody>
     `;
   }
 }

 class BigCatsTable extends AnimalTable {
 
    constructor(data, containerId) {
      super(data, containerId, ["name", "location", "size"]);
      console.log("catstable", containerId, data);
    }
    renderRow(animal) {
        let  obj = {
            id: animal.id,
            type: this.containerId,
     }
        return `
           <tr class="data-row fix-height" >
           <td>
            <div class="img-container">
           
            <img src=${animal.url} class="image-hover" alt=${animal.name}  />
             <p class="name-cond">${animal.name}</p>
            </div>
              <td>${animal.species}</td>
             </td>
            <td>${animal.name}</td>
          
            <td>${animal.size}</td>
              <td>${animal.location}</td>
           
            <td>
              <button class="btn btn-warning btn-sm">Edit</button>
              <button class="btn btn-danger btn-sm" onClick=deleteAnimal(${JSON.stringify(obj)})>Delete</button>
            </td>
          </tr>
        `;
      }
    
  }
  

  function deleteAnimal ( name )
  {
console.log("name",name);
let type="";
console.log("method ",name.type);

switch (name.type)
{
    case "bigCatsTable": 
        type="bigCats"
        break;
    case "dogsTable": 
        type="dogs"
        break;
    case "bigFishTable": 
        type="bigFish"
        break;
}


deleteAnimalApi(type, name.id)

  }


  function deleteAnimalApi(animalType, animalId) {
    fetch("http://localhost:3000/data")
    .then((response) => response.json())
    .then((data) => {
      // Remove the target dog
      window.location.reload();
        console.log(animalType, "type")

     let toBeFilterData ;
     switch (animalType){

        case "bigCats" : toBeFilterData=data.bigCats
        break;
        case "dogs" : toBeFilterData = data.dogs
        break;
        case "bigFish" : toBeFilterData = data.bigFish
        break;

     }
     console.log(toBeFilterData)
     console.log(data);

      const filteredData = toBeFilterData.filter((item) => item.id !== animalId);
    
     console.log(filteredData);
     
      // Update the JSON
   data[animalType] = filteredData;
   console.log(data);

       fetch("http://localhost:3000/data", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    })
    .then(() => {
      console.log("Dog with id=2 deleted successfully.");
      
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  
  }
  
  

  
 class DogsTable extends AnimalTable {
     set = "DSf";
    constructor(data, containerId) {
       
      super(data, containerId, ["name", "location"]);
      this.set=containerId
    }

    
  
     renderRow(animal) {
       let  obj = {
            id: animal.id,
            type: this.containerId,
     }

      return `
         <tr class="data-row fix-height" >
         <td>
           <div class="img-container">
           
            <img src=${animal.url} class="image-hover" alt=${animal.name}  />
             <p class="name-cond">${animal.name}</p>
            </div>
              <td>${animal.species}</td>
          </td>
          <td class="bold">${animal.name}</td>
         
          <td>${animal.size}</td>
           <td>${animal.location}</td>
         
          <td>
            <button class="btn btn-warning btn-sm">Edit</button>
            <button class="btn btn-danger btn-sm" onClick=deleteAnimal(${JSON.stringify(obj)})>Delete</button>
          </td>
        </tr>
      `;
    }
  }
  
 class BigFishTable extends AnimalTable {
    constructor(data, containerId) {
      super(data, containerId, ["size"]);
    }
  
     renderRow(animal) {
        let  obj = {
            id: animal.id,
            type: this.containerId,
     }
      return `
      <tr class="data-row fix-height" >
         <td>
            <div class="img-container">
           
            <img src=${animal.url} class="image-hover" alt=${animal.name}  />
             <p class="name-cond">${animal.name}</p>
            </div>
              <td>${animal.species}</td>
          </td>
          <td class="bold-italic-blue"><p class="bold-italic-blue">${animal.name}</p></td>
         
          <td>${animal.size}</td>
           <td>${animal.location}</td>
         
          <td>
            <button class="btn btn-warning btn-sm">Edit</button>
            <button class="btn btn-danger btn-sm" onClick=deleteAnimal(${JSON.stringify(obj)})>Delete</button>
          </td>
        </tr>
      `;
    }
  }
  


function asdf (){


  console.log("first",data)
  new BigCatsTable(data.bigCats, "bigCatsTable");
  new DogsTable(data.dogs, "dogsTable");
  new BigFishTable(data.bigFish, "bigFishTable");
 
 

}

  

console.log(paragraph)

    const table = document.getElementById("bigCatsTable") ;
    console.log("tadf",table);

// Modify the text content of the paragraph
paragraph.textContent = "Text";

console.log(document.body.innerHTML);


