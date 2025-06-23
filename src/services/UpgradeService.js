import { AppState } from "@/AppState.js";
import { Pop } from "@/utils/Pop.js";

class UpgradeService {
  buyUpgrade(upgrade) {
    if (AppState.cheese < upgrade.price) {
      Pop.error(Error, "NOT ENOUGH CHEDDAH BROTHA", "GET MO CHED");
      return;
    }
    upgrade.quantity++;
    AppState.cheese -= upgrade.price;
    upgrade.price = Math.floor(
      upgrade.price + upgrade.multiplier * upgrade.quantity
    );
    if (upgrade.id == 0) {
      AppState.clickPower += Math.ceil(upgrade.multiplier);
    } else {
      AppState.autoCollect += Math.ceil(upgrade.multiplier);
    }
  }
  autoUpgrades() {
    let collect = 0;
    AppState.autoUpgrades.forEach(
      (upgrade) => (collect += upgrade.quantity * upgrade.multiplier)
    );
    AppState.cheese += collect;
    setTimeout(() => {
      this.autoUpgrades();
    }, AppState.interval);
  }
}
export const upgradeService = new UpgradeService();
