import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// async function http1 (url) {
//   let data = []
//   let response = await fetch(url)
//   if (response.ok) {
//     data = await response.json()
//   } else {
//     alert('Ошибка HTTP: ' + response.status)
//   }
//   return data
// }

class HttpService {
  constructor (apiUrl) {
    this.apiUrl = apiUrl
  }

  async send (url, method = 'get', data = null) {
    const apiUrl = this.apiUrl + url
    let response = await fetch(apiUrl)
    if (response.ok) {
      const result = await response.json()
      return result.data
    }

    alert('Ошибка HTTP: ' + response.status)
  }
}

const http = new HttpService(apiUrl)

export default new Vuex.Store({
  state: {
    dababaseList: [],
    userList: [],
    tableList: []
  },
  mutations: {
    setDbList (state, data) {
      state.dababaseList = data
    }
  },
  actions: {
    async fetchDbList (context) {
      let data = []
      var url = '/SHOW_DATABASE_LIST'
      data = await http.send(url)
      context.commit('setDbList', data)
    }
  },
  getters: {
    getUserList: state => {
      return state.userList
    },
    getDbList: state => {
      return state.dababaseList
    },
    getTableList: state => {
      return state.tableList
    }
  }
})
