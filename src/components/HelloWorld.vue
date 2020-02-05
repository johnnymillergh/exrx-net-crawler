<!--suppress HtmlUnknownBooleanAttribute -->
<template>
  <v-container>
    <div class="text-center">
      <v-sheet color="orange lighten-2">{{ msg }}</v-sheet>
    </div>
    <v-layout text-center wrap>
      <v-flex xs12>
        <!--suppress HtmlUnknownTarget -->
        <v-img :src="require('@/assets/exrx-net-crawler-social-image.png')" class="my-3" contain height="400"/>
      </v-flex>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">Welcome to Exrx Net Crawler</h1>
        <p>Version: {{ version }}</p>
        <p>Environment: {{ environment }}</p>
      </v-flex>
    </v-layout>
    <v-divider style="margin-bottom: 24px"/>
    <v-row>
      <v-btn v-debounced-click="handelClickTest" block color="primary">Test Back-end Service</v-btn>
      <v-btn @click="handleClickOpenNewPage" block>Open New Page</v-btn>
    </v-row>
    <v-row>Response: {{ response }}</v-row>
    <v-row>Value from sub window: {{ JSON.stringify(valueFromSubWindow) }}</v-row>
  </v-container>
</template>

<!--suppress JSUnusedLocalSymbols, JSUnusedGlobalSymbols -->
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { AppUtil } from '@/utils/app-util'
import { GetByIdPayload } from '@/domain/test-table/get-by-id-payload'
import { testTableApi } from '@/requests/test-table-api'

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string
  private version = ''
  private environment = ''
  private response = null as any
  private valueFromSubWindow = null as any

  async mounted () {
    this.version = AppUtil.getVersionInfo()
    this.environment = `${process.env.NODE_ENV} (${process.env.VUE_APP_ENV})`
  }

  async handelClickTest (): Promise<void> {
    const getByIdPayload = new GetByIdPayload()
    getByIdPayload.id = 1
    try {
      this.response = await testTableApi.getById(getByIdPayload)
      this.$toast.success('Succeed to interact with back-end server `exrx-net-crawler-server`')
    } catch (error) {
      console.error('Error occurred when sending request `getById`!', error)
      this.$toast.error(error.message)
    }
  }

  handleClickOpenNewPage () {
    this.openWindow(this, '/second-page', {
      callback: 'logCallback',
      version: 'this.version'
    })
  }

  logCallback (value: any) {
    console.info('logCallback', value)
    this.valueFromSubWindow = value
  }
}
</script>
