
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

        storeFetch (fnName) {
          this.$store.dispatch(fnName)
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
        }

      } // ------- methods

    }) // --------- Vue.mixin
  }
}

export default StoreFn
