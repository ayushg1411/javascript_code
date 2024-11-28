// dogsTable.ts
import { AnimalTable } from "./public/animalTable.js";
import { global_document, global_window } from "./document.js";

export class DogsTable extends AnimalTable {
  constructor(data, containerId) {
    super(data, containerId, ["name", "location"]);
  }

   renderRow(animal) {
    return `
      <tr>
        <td class="bold">${animal.name}</td>
        <td>${animal.location}</td>
        <td>${animal.size}</td>
        <td>
          <img src="${animal.image}" class="image-hover" alt="${animal.name}" />
        </td>
        <td>
          <button class="btn btn-warning btn-sm">Edit</button>
          <button class="btn btn-danger btn-sm">Delete</button>
        </td>
      </tr>
    `;
  }
}
