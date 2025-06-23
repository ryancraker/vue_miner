import { reactive } from "vue";
import { Upgrade } from "./models/Upgrade.js";

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  cheese: 0,
  miningPower: 1,
  clickPower: 0,
  autoCollect: 0,
  interval: 3000,
  clickUpgrades: [
    new Upgrade({
      name: "Pickaxe",
      quantity: 0,
      multiplier: 1,
      price: 10,
      id: 0,
    }),
    new Upgrade({
      name: "Bucket",
      quantity: 0,
      multiplier: 2,
      price: 30,
      id: 0,
    }),
  ],
  autoUpgrades: [
    new Upgrade({
      name: "Ratstronaut",
      quantity: 0,
      multiplier: 2,
      price: 40,
      id: 1,
    }),
    new Upgrade({
      name: "Big Ratstronaut",
      quantity: 0,
      multiplier: 3,
      price: 50,
      id: 1,
    }),
  ],
});
