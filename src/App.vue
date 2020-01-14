<template>
  <v-app id="app">
    <transition name="fade-transform" mode="out-in">
      <router-view/>
    </transition>
  </v-app>
</template>

<!--suppress CssUnusedSymbol -->
<style lang="scss" scoped>
.fade-transform-leave-active, .fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

#app-container {
  #app-name {
    font-size: 32px;
    font-weight: bold;
  }
}
</style>
