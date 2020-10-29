import _Vue from 'vue'
import { ModuleTree } from 'vuex'
import lodash from 'lodash'

export default class LoaderUtils {
  public static registerAllComponents(vue: typeof _Vue): void {
    const components = require.context('@/components', true, /\w\.(vue|ts)$/)

    components.keys().forEach((path: string) => {
      const fileName = path.split('/').pop()
      if (fileName) {
        const componentName = lodash.kebabCase(fileName.replace(/\.\w+$/, ''))
        vue.component(componentName, () =>
          import(`@/components/${path.slice(2)}`)
        )
      }
    })
  }

  public static loadStores(): ModuleTree<unknown> {
    const files = require.context('@/stores', false, /\Store.ts$/)
    const modules: { [key: string]: any } = {}
    files.keys().forEach((path: string) => {
      const name = path.replace(/^.\//, '').replace(/Store.ts$/, '')
      modules[name] = files(path).default
    })
    return modules
  }
}
