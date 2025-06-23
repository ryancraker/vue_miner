import { AppState } from "@/AppState.js";

class CheeseService {
  mine() {
    let upgradePower = 0;
    AppState.clickUpgrades.forEach(
      (upgrade) => (upgradePower += upgrade.quantity * upgrade.multiplier)
    );
    AppState.cheese += AppState.miningPower + upgradePower;
  }
}
export const cheeseService = new CheeseService();
