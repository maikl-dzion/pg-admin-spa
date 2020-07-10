
const StoreFn = {
  install: function (Vue, options) {
    Vue.mixin({
      data: function () {
        return {}
      },

      methods: {

        storeGet () {
          return this.$store.getters
        },

        storeFetch (fnName, data = null) {
          this.$store.dispatch(fnName, data)
        },

        fetchDbList () {
          this.$store.dispatch('fetchDbList')
        },

        fetchUserList () {
          this.$store.dispatch('fetchUserList')
        },

        fetchTableList () {
          this.$store.dispatch('fetchTableList')
        },

        fetchDbRoles () {
          this.$store.dispatch('fetchDbRoles')
        },

        fetchTableData (tableName) {
            this.$store.dispatch('fetchTableData', tableName)
        },

        fetchTableFields (tableName) {
            this.$store.dispatch('fetchTableFields', tableName)
        },

        setParam (data) {
            this.$store.dispatch('setParam', data)
        },

      } // ------- methods

    }) // --------- Vue.mixin
  }
}

export default StoreFn
