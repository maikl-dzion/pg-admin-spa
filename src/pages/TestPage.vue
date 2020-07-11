<template>
    <div class="about" >

        <CustomForm/>

        <Spinner
                size="1"
        ></Spinner>

        <div class="container">
            <button id="button"></button>
        </div>

        <!--<TabPanel style="border: 0px red solid; margin:10px"-->

             <!--:tabs="['Редактирование','Создание объектов']" >-->

            <!--<div slot="content-1">-->
                <!--1-->
            <!--</div>-->

            <!--<div slot="content-2">-->
                <!--2-->
            <!--</div>-->

        <!--</TabPanel>-->

        <AnimeButton

        ></AnimeButton>

    </div>
</template>

<script>
import CustomForm from '@/components/elements/CustomForm'
export default {
    name: 'home',
    components: {
        CustomForm
    },

    mounted () {

        // $(function() {
        //     $( "#button" ).click(function() {
        //         $( "#button" ).addClass( "onclic", 250, validate);
        //     });
        //
        //     function validate() {
        //         setTimeout(function() {
        //             $( "#button" ).removeClass( "onclic" );
        //             $( "#button" ).addClass( "validate", 450, callback );
        //         }, 2250 );
        //     }
        //     function callback() {
        //         setTimeout(function() {
        //             $( "#button" ).removeClass( "validate" );
        //         }, 1250 );
        //     }
        // });

    },
}
</script>

<style >



</style>
