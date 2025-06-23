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
function shortenInterval() {
  upgradeService.shortenInterval()
}
</script>


// HTML
<template>
  <h1 class="text-center my-2">VUE MINER</h1>
  <hr>
  <span class="text-center fs-1">you have {{ cheese }} ched</span>
  <div class="container">
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <img id="planet"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Jupiter_Rotation_Movie_-_Hubble_2015.gif/640px-Jupiter_Rotation_Movie_-_Hubble_2015.gif"
          alt="jupiter" @click="mine()" @contextmenu.prevent="mine()">
      </div>
    </div>
  </div>
  <hr>
  <b class="text-center fs-1">CHEESE UPGRADE SHOP</b>
  <hr>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6 ps-3">
        <div>{{ miningPower + clickPower }} per click</div>
        <hr>
        <div v-for="upgrade in clickUpgrades" :key="upgrade.id" class="row">
          <div class="col-5">
            <button class="mb-0" type="button" :disabled="AppState.cheese < upgrade.price"
              @click="buyUpgrade(upgrade)">Buy {{
                upgrade.name }} for {{ upgrade.price }} ched</button>
            <p class="mt-1">{{ upgrade.quantity }}/{{ upgrade.name }}s</p>
          </div>
        </div>
      </div>
      <div class="col-6 ps-3">
        <div>{{ autoCollect }} every {{ interval }} seconds</div>
        <hr>
        <div v-for="upgrade in autoUpgrades" :key="upgrade.id" class="row">
          <div class="col-5">
            <button class="mb-0" type="button" :disabled="AppState.cheese < upgrade.price"
              @click="buyUpgrade(upgrade)">Buy {{
                upgrade.name }} for {{ upgrade.price }} ched</button>
            <p class="mt-1">{{ upgrade.quantity }}/{{ upgrade.name }}s</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr>
  <b class="text-center fs-1">MODIFIER UPGRADE SHOP</b>
  <hr>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3 my-3">
        <button type="button" @click="shortenInterval()">Lower auto collect interval by 5%</button>
      </div>
    </div>
  </div>
</template>


// styles
<style lang="scss">
@import "./assets/scss/main.scss";

body {
  background: black;
  color: whitesmoke;
  font-family: "Cherry Bomb One";
}

img {
  border-radius: 100%;
}

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