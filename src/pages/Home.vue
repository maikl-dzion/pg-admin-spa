<template><div class="baseControlPage" >

<!-- Верхнее меню -->
<section class="breadcrumbs">
    <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center">

            <div class="link__div_flex">
                <div v-for="(title, fname) in panelSettingsMenu"
                     @click="commonAction(fname, $event, 'link_item_active')"
                     class="link_div">
                    <div class="link_item">{{title}}</div>
                </div>
            </div>

        </div>
    </div>
</section>
<!-- Верхнее меню -->

<!-- ################ -->
<!-- ОСНОВНОЙ КОНТЕНТ -->
<ContentSection>

        <!--border-bottom: 1px red solid;-->
        <!--border-right: 1px red solid;-->
        <!--background: cadetblue;-->
        <!--color: white;-->

        <!--border: 0;-->
        <!--border-top: 1px red solid;-->
        <!--border-right: 1px red solid;-->
        <!--background: brown;-->
        <!--color: white;-->


        <!-- Левая часть -->
        <template slot="left-panel-header"></template>
        <template slot="left-panel">
            <template v-if="commonActionName == 'databases'">
                <left-panel
                        :items="getDbList"
                        @delete_item="deleteDb"
                        @select_item="commonForm"
                        title="datname"
                        icon="fas fa-database"
                        :action="commonActionName"
                ></left-panel>
            </template>
            <template v-else-if="commonActionName == 'tables'">
                <left-panel
                        :items="getDbTables"
                        @delete_item="commonDeleteTable"
                        @select_item="commonForm"
                        title="table_name"
                        icon="far fa-credit-card"
                        :action="commonActionName"
                ></left-panel>
            </template>
            <template v-else-if="commonActionName == 'users'">
                <left-panel
                        :items="getUserList"
                        @delete_item="deleteDbUser"
                        @select_item="commonForm"
                        title="usename"
                        icon="fas fa-address-card"
                        :action="commonActionName"
                ></left-panel>
            </template>
            <template v-else-if="commonActionName == 'get_roles'">
                <left-panel
                        :items="getDbRoles"
                        @select_item="commonForm"
                        title="rolname"
                        icon="fas fa-address-card"
                        :action="commonActionName"
                ></left-panel>
            </template>
        </template>

        <!-- Средняя часть (контентная часть)-->
        <template slot="content-panel-header"></template>
        <template slot="content-panel">

            <!--<div style="display: flex; border: 1px red solid">-->
                <!--<div>content 1</div>-->
                <!--<div style="border-bottom:2px blue solid">content 2</div>-->
                <!--<div>content 2</div>-->
            <!--</div>-->

            <TabPanel style="margin:0px;"
                      :tabs="[{ label : 'Редактирование объектов', active : 1 },
                              { label : 'Создание объектов'},
                              { label : 'Настройки / привилегии'}]">
                <!--:tabs="['Редактирование','Создание объектов']" >-->
                <template slot="content-1">

                    <template v-if="commonActionName == 'tables'">

                        <TableFielsEdit
                                :fields="commonItem"
                                :table_name="tableName"
                        ></TableFielsEdit>

                    </template>
                    <template v-else-if="commonActionName == 'databases'">
                        <BaseSimpleForm
                                :item="commonItem"
                                name="datname"
                                :fields="['datname']"
                                @input_item="inputFormItem"
                        ></BaseSimpleForm>
                    </template>
                    <template v-else-if="commonActionName == 'users'">
                        <BaseSimpleForm
                                :item="commonItem"
                                name="usename"
                                :fields="['usename', 'passwd']"
                                @input_item="inputFormItem"
                        ></BaseSimpleForm>
                    </template>
                    <template v-else-if="commonActionName == 'get_roles'">
                        <BaseSimpleForm
                                :item="commonItem"
                                name="rolname"
                                :fields="['rolname', 'rolpassword']"
                                @input_item="inputFormItem"
                        ></BaseSimpleForm>
                    </template>

                </template>
                <template slot="content-2">

                    <!-- Создание объектов   -->
                    <CreateNewObject
                          @btn_click="getActionResponse"
                    ></CreateNewObject>
                    <!-- / Создание объектов -->

                </template>
                <template slot="content-3">

                    <div style="border-bottom:1px gainsboro solid;
                                margin: -15px 0px 10px 0px; padding:2px 0px 2px 0px">

                        <button @click="setDefaultConfig()"
                                style="width:200px; margin:0px; border-radius: 0; "
                                class="btn btn-success btn-sm px-2 waves-effect export-to-snippet">
                            <i class="fa fa-cogs"></i> &nbsp; Установить конфигурацию по умолчанию
                        </button>

                        <!--<CustomButton-->
                           <!--type="0"-->
                           <!--attr=""-->
                           <!--icon=""-->
                           <!--param="tryrttr"-->
                           <!--title="Выполнить"-->
                           <!--@btn_click="testButton()"-->
                        <!--&gt;</CustomButton>-->

                        <!--<div class="bw" style="padding:0px">-->
                            <!--<button @click="setDefaultConfig()" class="animeCustomBtn"-->
                                    <!--style="padding:2px 5px 2px 5px; color:black; font-size:12px;">-->
                                <!--Установить конфигурацию по умолчанию-->
                            <!--</button>-->
                        <!--</div><hr style="margin:0px 0px 15px 0px"/>-->

                    </div>

                    <div class="row1" style="display:flex; margin:0px; padding: 0px;">

                        <!-- Изменение конфигурации базы   -->
                        <div class="col-41" style="margin: 0px 10px 0px 0px; padding: 0px;" >
                            <ChangeDbConfig ></ChangeDbConfig>
                        </div>
                        <!-- / Изменение конфигурации базы -->

                        <!--  Управление правами пользователя  -->
                        <div class="col-41" style="margin: 0px 0px 0px ; padding: 0px;" >
                            <DelegateUserRole ></DelegateUserRole>
                        </div>
                        <!--  / Управление правами пользователя -->

                    </div><div style="clear: both"></div>

                </template>

            </TabPanel>
        </template>

</ContentSection>

</div></template>

<script>

    import LeftPanel       from '@/components/BaseControlLeftPanel'
    import BaseSimpleForm  from '@/components/BaseControlSimpleForm'
    import CreateNewObject from '@/components/CreateNewObject'
    import TableFielsEdit  from '@/components/db-control/TableFieldsEdit'
    import ChangeDbConfig  from '@/components/db-control/ChangeDbConfig'
    import ContentSection  from '@/components/db-control/ContentSection'
    import DelegateUserRole from '@/components/db-control/DelegateUserRole'

    import BlueBtn  from '@/components/elements/BlueBtn'

    export default {
        name: 'BaseControl',
        data: () => ({t1: ''}),
        components: {
            LeftPanel,
            BaseSimpleForm,
            CreateNewObject,
            TableFielsEdit,
            ChangeDbConfig,
            ContentSection,
            DelegateUserRole,
            BlueBtn,
        },

        computed: {

            getDbList() {
                return this.storeGet().getDbList
            },

            getUserList() {
                return this.storeGet().getUserList
            },

            getDbTables() {
                return this.storeGet().getTableList
            },

            getDbRoles() {
                return this.storeGet().getDbRoles
            }
        },

        created() {

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

            getActionResponse(response) {},

            selectItemTest(data) {},

            testButton(name) {
               alert(name);
            },
        }
    }
</script>

<style>

    .bw .animeCustomBtn:hover {
        background: ghostwhite;
    }

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

    /*.td-field-input {*/
    /*width: 150px !important;*/
    /*border:1px #b0bed9 solid !important;*/
    /*}*/

    /*.td-field-input select{*/
    /*border-radius: 0px;*/
    /*width:100%;*/
    /*height: 100%;*/
    /*cursor:pointer*/
    /*}*/

    /*.table_col td {*/
    /*border-right: 20px solid white;*/
    /*border-left: 20px solid white;*/
    /*!* color: #8b8e91; *!*/
    /*color: grey !important;*/
    /*border-bottom: 1px grey solid;*/
    /*}*/

    /***********************************/
    /**** Simple Form Table ************/

    .input-text-class {
        width: 100%;
        outline: 0px #b0bed9 solid;
        border: 0px red solid;
        border-bottom: 1px gainsboro solid;
        height: 30px;
    }

    .baseControlPage .table_col {
        font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
        font-size: 14px;
        width: 80%;
        min-width: 400px;
        background: white;
        text-align: left;
        border-collapse: collapse;
        color: #3E4347;
        border: 0px red solid;
    }

    .baseControlPage .table_col th:first-child, .table_col td:first-child {
        color: #F5F6F6;
        border-left: none;
    }

    .baseControlPage .table_col th {
        font-weight: normal;
        border-bottom: 2px solid #b0bed9;
        border-right: 20px solid white;
        border-left: 20px solid white;
        padding: 4px;
    }

    .baseControlPage .table_col td {
        border-right: 20px solid white;
        border-left: 20px solid white;
        padding: 4px;
        /*color: #8b8e91;*/
        color: grey !important;
        border-bottom: 1px #0e4377 solid;
    }

    .baseControlPage .table_col input {
        width: 100% !important;
        border: 0px grey solid;
    }

    .baseControlPage .table_col select {
        width: 100%;
        border-radius: 0px;
        cursor: pointer;
    }

    .baseControlPage .deleteFieldBox {
        width: 50px;
        border: 1px gainsboro solid;
        margin: 2px;
        cursor: pointer;
        text-align: center
    }

    .baseControlPage .td-field-input div {
        width: 100% !important;
    }

    .baseControlPage .td-field-input {
        border: 0px blue solid;
    }

    /*****End Simple Form Tbale *******/

</style>
