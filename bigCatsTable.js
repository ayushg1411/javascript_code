// bigCatsTable.ts
import { AnimalTable } from "./public/animalTable.js";

export class BigCatsTable extends AnimalTable {
 
  constructor(data, containerId) {
    super(data, containerId, ["name", "location", "size"]);
    console.log("catstable", containerId, data);
  }
  
}
