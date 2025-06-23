// JS
<script setup>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState.js'
import { cheeseService } from "./services/CheeseService.js";
import { upgradeService } from "./services/UpgradeService.js";

const miningPower = computed(() => AppState.miningPower)
const clickPower = computed(() => AppState.clickPower)
const autoCollect = computed(() => AppState.autoCollect)
const cheese = computed(() => AppState.cheese)
const autoUpgrades = computed(() => AppState.autoUpgrades)
const clickUpgrades = computed(() => AppState.clickUpgrades)
const interval = computed(() => AppState.interval / 1000)
onMounted(upgradeService.autoUpgrades())

function mine() {
  cheeseService.mine()
}
function buyUpgrade(upgrade) {
  upgradeService.buyUpgrade(upgrade)
}
</script>


// HTML
<template>
  <span>you have {{ cheese }} ched</span>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-6"></div>
      <img id="planet"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Jupiter_Rotation_Movie_-_Hubble_2015.gif/640px-Jupiter_Rotation_Movie_-_Hubble_2015.gif"
        alt="jupiter" @click="mine()" @contextmenu.prevent="mine()">
    </div>
  </div>
  <b class="text-center fs-1">CHEESE UPGRADE SHOP</b>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <div>{{ miningPower + clickPower }} per click</div>
        <div v-for="upgrade in clickUpgrades" :key="upgrade.id" class="row">
          <div class="col-5">
            <button :disabled="AppState.cheese < upgrade.price" @click="buyUpgrade(upgrade)" type="button">Buy {{
              upgrade.name }} for {{ upgrade.price
              }} ched</button>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div>{{ autoCollect }} every {{ interval }} seconds</div>
        <div v-for="upgrade in autoUpgrades" :key="upgrade.id" class="row">
          <div class="col-5">
            <button type="button" :disabled="AppState.cheese < upgrade.price" @click="buyUpgrade(upgrade)">Buy {{
              upgrade.name }} for {{ upgrade.price }} ched</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


// styles
<style lang="scss">
@import "./assets/scss/main.scss";

button {
  background: yellow;
  border-radius: 10px;
  margin-bottom: 1rem;
  border: none;
  box-shadow: 0px 3px 4px black;
  max-height: 4.5rem;
}

#planet {
  max-height: 30dvh;
  width: auto;
}
</style>