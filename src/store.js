import Vue from 'vue'
import Vuex from 'vuex'

async function http(url) {
    let data = []
    let response = await fetch(url)
    if (response.ok) {
      data = await response.json()
    } else {
      alert('Ошибка HTTP: ' + response.status)
    }
    return data
}


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl : apiUrl,
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
      var url = context.state.apiUrl + '/SHOW_DATABASE_LIST/'
      data = await http(url)
      context.commit('setDbList', data.data)
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
