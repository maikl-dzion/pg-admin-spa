<template>
    <div class="about" >

        <CustomForm/>

        <Spinner
                size="3"
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
        <pre>{{checkboxValue}}</pre>

        <Checkbox style="margin-left:2px"
            label="rtyy"
            :value="checkboxValue"
            :fname="email"
            :param = "{}"
            label_class="rrrr"
            @change_value="d => { checkboxValue = d.value }"
        ></Checkbox>

        <AnimeButton></AnimeButton>

    </div>
</template>

<script>
import CustomForm from '@/components/elements/CustomForm'
export default {
    name: 'home',

    data: () => ({
        checkboxValue : false,
    }),

    components: {
        CustomForm
    },

    computed: {
        getDbTables() {
            return this.storeGet().getTableList
        },
        getDataList() {
            return this.storeGet().getDataList
        },
    },

    methods : {

        btnClickCss() {

            $(function() {
                $( "#button" ).click(function() {
                    $( "#button" ).addClass( "onclic", 250, validate);
                });

                function validate() {
                    setTimeout(function() {
                        $( "#button" ).removeClass( "onclic" );
                        $( "#button" ).addClass( "validate", 450, callback );
                    }, 2250 );
                }
                function callback() {
                    setTimeout(function() {
                        $( "#button" ).removeClass( "validate" );
                    }, 1250 );
                }
            });
        },
    },


    mounted () {

    },

}
</script>


<style >

    .rrrr::before {
        content: '';
        width: 70px;
        height: 70px;
    }

</style>


