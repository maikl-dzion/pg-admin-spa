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
    created () {
        this.routes = this.getRoutesNav();
    }
}
</script>

<style>
   .nav-menu .router-link-exact-active {
       background: red;
   }
   .wrapper {

   }
</style>
