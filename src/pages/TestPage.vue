<template>
    <div class="about" >

        <CustomForm/>

        <Spinner
                size="1"
        ></Spinner>

        <TabPanel style="border: 0px red solid; margin:10px"

             :tabs="['Редактирование','Создание объектов']" >

            <div slot="content-1">
                ghjj
            </div>

            <div slot="content-2">
                rtyyyyy
            </div>

        </TabPanel>

    </div>
</template>

<script>

    import CustomForm from '@/components/elements/CustomForm'

    export default {
        name: 'home',
        components: {
            CustomForm
        }
    }
</script>
