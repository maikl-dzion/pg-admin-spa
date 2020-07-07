<template><div class="dataListPage" >

    <section class="breadcrumbs">
        <div class="container-fluid">
            <div class="d-flex justify-content-between align-items-center">

                <div class="link__div_flex">
                    <div v-for="(title, fname) in panelSettingsMenu"
                         @click="commonAction(fname, $event, 'link_item_active')" class="link_div">
                        <div class="link_item">{{title}}</div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!--<pre>{{showDbList}}</pre>-->

    <!-- ======= Page Section ======= -->
    <section class="data-section" style="margin:0px; padding:0px;">

    </section>


</div></template>

<script>

// import LeftPanel from './BaseControlLeftPanel'
// import BaseSimpleForm from './BaseControlSimpleForm'

export default {
  name: 'BaseControl',
  data: () => ({}),
  components: {},

  computed: {
    getDbList () {
      return this.storeGet().getDbList
    },

    getUserList () {
      return this.storeGet().getUserList
    },

    getDbTables () {
      return this.storeGet().getTableList
    },

    getDbRoles () {
      return this.storeGet().getDbRoles
    }

  },

  created () {
    this.getCurrentDbUser() // currentDbUser
    this.getCurrentDatabase() // currentDatabase
    this.getCurConfig() // получаем текущий конфиг
    this.getFileUsersConfig()

    this.storeFetch('fetchDbList')
    this.storeFetch('fetchUserList')
    this.storeFetch('fetchTableList')
    this.storeFetch('fetchDbRoles')
  },

  methods: {


  },
}
</script>

<style scoped>

    /*@media (min-width: 992px) {*/
        /*.modal .modal-full-height {*/
            /*width: 60%;*/
            /*max-width: 60%;*/
        /*}*/
    /*}*/

    /*@media (max-width: 400px) {*/
        /*.modal .modal-full-height {*/
            /*width: 60%;*/
            /*max-width: 60%;*/
        /*}*/
    /*}*/

    /*@media (min-width: 576px) {*/
        /*.modal-dialog {*/
            /*max-width: 95%;*/
        /*}*/
    /*}*/

</style>
