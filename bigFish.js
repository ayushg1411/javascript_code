// bigFishTable.ts
import { AnimalTable } from "./public/animalTable.js";

export class BigFishTable extends AnimalTable {
  constructor(data, containerId) {
    super(data, containerId, ["size"]);
  }

   renderRow(animal) {
    return `
      <tr>
        <td class="bold-italic-blue">${animal.name}</td>
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
