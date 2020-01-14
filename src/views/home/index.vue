<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.text" link>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content @click="handleClickItem(item)">
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="mt-4" link>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-plus-circle-outline</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Browse Channels</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Manage Subscriptions</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" style="color: white"/>
      <v-icon class="mx-4" style="color: white">{{ icon.mdiSpiderWeb }}</v-icon>
      <v-toolbar-title style="color: white">
        <span class="title">{{ appName }} {{ version }} {{ environment }}</span>
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key"/>
      </transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { AppUtil } from '@/utils/app-util'
import Vue from 'vue'
import { mdiSpiderWeb } from '@mdi/js'

export default Vue.extend({
  props: {
    source: String
  },
  computed: {
    key (): string {
      return this.$route.path
    }
  },
  data: () => ({
    icon: {
      mdiSpiderWeb
    },
    drawer: null,
    items: [
      {
        icon: 'subscriptions',
        text: 'Hello World',
        path: '/'
      },
      {
        icon: 'trending_up',
        text: 'ExRx.net',
        path: '/exrx-net'
      }
      // {
      //   icon: 'history',
      //   text: 'Unnamed1',
      //   path: '/'
      // },
      // {
      //   icon: 'featured_play_list',
      //   text: 'Unnamed2',
      //   path: '/'
      // },
      // {
      //   icon: 'watch_later',
      //   text: 'Unnamed3',
      //   path: '/'
      // }
    ],
    appName: '',
    version: '',
    environment: ''
  }),
  mounted (): void {
    this.appName = AppUtil.getCamelCaseName()
    this.version = AppUtil.getVersionInfo()
    this.environment = `Environment: ${process.env.NODE_ENV} (${process.env.VUE_APP_ENV})`
  },
  methods: {
    handleClickItem (item: any) {
      this.$router.push(item.path)
    }
  }
})
</script>

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

#version {
  text-align: right;
  font-size: 20px;
  position: relative;
  left: 8px;
}

#environment {
  text-align: right;
  font-size: 12px;
  position: relative;
  left: 16px;
}
</style>
