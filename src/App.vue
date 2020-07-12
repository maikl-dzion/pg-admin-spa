<template><div @mouseup="dragStop($event)" class="wrapper" >

        <AlertMessage></AlertMessage>

        <WarnMessage></WarnMessage>

        <!--  Header -->
        <header id="header" class="fixed-top ">
            <div class="container-fluid">
                <div class="logo float-left">
                    <h4 class="text-light">
                        <router-link  to="/" tag="a">
                            <span>Pg-Admin</span>
                        </router-link>
                    </h4>
                    <div class="current-config-container" >
                        <div>База:{{this.curUserInfo.datname}}</div>
                        <div>Пользователь:{{this.curUserInfo.usename}}</div>
                        <div>Ip:{{this.curUserInfo.client_addr}}</div>
                        <div>port:{{this.curUserInfo.client_port}}</div>
                    </div>
                </div>
                <nav class="nav-menu float-right d-none d-lg-block">
                    <ul>
						<router-link v-for="(item) in routes"
                             tag="li" :to="item.path">
						     <a>{{item.title}}</a>
						</router-link>
                    </ul>
                </nav>
            </div>
        </header>
        <!-- End Header -->

		<!--<div id="nav" class="container" style="text-align:center;">-->
		  <!--<router-link to="/">Главная</router-link> |-->
		  <!--<router-link to="/about">About</router-link>-->
		<!--</div>-->

        <main id="main" style="min-height: 790px; border: 0px red solid" >
            <router-view/>
        </main>

        <Footer/>

        <a href="#" class="back-to-top">
            <i class="icofont-simple-up"></i>
        </a>

</div></template>

<script>
import Footer from '@/components/Footer'
export default {
    name: 'App',
    data: () => ({
        routes : [],
    }),
    components: {
        Footer
    },

    created() {

        this.routes = this.getRoutesNav();

        this.getCurrentDbUser() // currentDbUser
        this.getCurrentDatabase() // currentDatabase
        this.getCurConfig() // получаем текущий конфиг
        this.getFileUsersConfig()

        // this.showDatabaseList() // databaseList
        // this.getDbUsersList() // usersList
        // this.getTableList() // получаем таблицы

        // this.fetchDbList()
        // this.fetchUserList()
        // this.fetchTableList()
        // this.fetchDbRoles()

        this.storeFetch('fetchDbList')
        this.storeFetch('fetchUserList')
        this.storeFetch('fetchTableList')
        this.storeFetch('fetchDbRoles')
    },
}
</script>

<style>
   .nav-menu .router-link-exact-active {
       background: red;
   }
   .wrapper {}
   .current-config-container {
       background: #b8daff;
       display: flex;
       padding:0px;
       position: absolute;
       /*right:10px;*/
   }
   .current-config-container div {
       margin:1px;
       padding:1px;
       border-bottom: 1px #326690 solid;
       font-size: 11px;
   }

</style>
