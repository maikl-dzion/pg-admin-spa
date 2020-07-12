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
    constructor(apiUrl) {
        this.apiUrl = apiUrl
    }

    async send(url, method = 'get', data = null) {
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

        tableName : '',
        dbName    : '',
        userName  : '',

        currentUser   : '',
        currentDb     : '',
        currentConfig : {},

        dababaseList: [],
        userList: [],
        tableList: [],
        dbRoles: [],
        tableData : [],
        tableFields: {}
    },
    mutations: {
        setDbList(state, data) {
            state.dababaseList = data
        },
        setUserList(state, data) {
            state.userList = data
        },
        setTableList(state, data) {
            state.tableList = data
        },
        setDbRoles(state, data) {
            state.dbRoles = data
        },
        setTableData(state, data) {
            state.tableData = data
        },

        setTableFields(state, data) {
            state.tableFields = data
        },

        setParam(state, data) {
            const value = data.value
            const name  = data.name
            state[name] = value
        }
    },
    actions: {

        async fetchDbList(context) {
            let url = '/SHOW_DATABASE_LIST'
            let data = await http.send(url)
            context.commit('setDbList', data)
        },

        async fetchUserList(context) {
            let url = '/getDbUsersList'
            let data = await http.send(url)
            context.commit('setUserList', data)
        },

        async fetchTableList(context) {
            let url = '/GET_TABLE_LIST'
            let data = await http.send(url)
            context.commit('setTableList', data)
        },

        async fetchDbRoles(context) {
            let command = 'SELECT * FROM pg_roles'
            let url = '/EXEC_SQL_COMMAND/' + command + '/query'
            let data = await http.send(url)
            context.commit('setDbRoles', data)
        },

        async fetchTableData(context, tableName) {
            const url = '/GET_TABLE_DATA/' + tableName
            let data = await http.send(url)
            context.commit('setTableData', data)
        },

        async fetchTableFields(context, tableName) {
            const url = '/GET_TABLE_FIELDS/' + tableName
            let data = await http.send(url)
            context.commit('setTableFields', data)
        },

        setParam(context, data) {
            context.commit('setParam', data)
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
        },

        getDbRoles: state => {
            return state.dbRoles
        },

        getDataList: state => {
            return state.tableData
        },

        getTableFields: state => {
            return state.tableFields
        },

        getParam: (state, name) => {
            return state[name]
        },
    }
})
