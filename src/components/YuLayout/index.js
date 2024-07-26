import YuLoginLayout from './src/login.vue'

export const LoginLayout = Object.assign(YuLoginLayout, {
  /**
   * Install the YuLoginLayout component into the provided app.
   *
   * @param {Object} app - The Vue app to install the component into.
   * @return {void}
   */
  install(app) {
    app.component(YuLoginLayout.name, YuLoginLayout)
  }
})
