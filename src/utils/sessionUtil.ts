export default class SessionUtil {
  save = async (key: string, value: object): Promise<void> => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  load = async (key: string) => {
    const store = (await localStorage.getItem(key)) || null
    if (store) {
      console.log(store)
      return JSON.parse(store)
    }
  }
}
