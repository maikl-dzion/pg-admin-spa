<template>
    <div class="dataListPage">

        <section class="breadcrumbs">
            <div class="container-fluid">
                <div class="d-flex justify-content-between align-items-center">

                    <!--<div class="link__div_flex">-->
                    <!--<div v-for="(title, fname) in panelSettingsMenu"-->
                    <!--@click="commonAction(fname, $event, 'link_item_active')" class="link_div">-->
                    <!--<div class="link_item">{{title}}</div>-->
                    <!--</div>-->
                    <!--</div>-->

                </div>
            </div>
        </section>

        <!--<pre>{{tableData}}</pre>-->

        <section class="blog" style="margin:0px; padding:0px;">
            <div class="sidebar" style="padding: 4px; margin:0px;">
                <div class="sidebar-item tags" style="margin:0px;">
                    <ul>
                        <li v-for="(item) in getDbTables"
                            @click="loadingDataList(item.table_name)" >
                            <a @click="setActiveElement ($event, 'menu-item-active')"
                               :id="'list-menu-item-' + item.table_name" class="list-menu-item" >
                                {{item.table_name}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- ======= Page Section ======= -->
        <section class="data-section blog" style="margin:0px; padding:0px;">
            <div style="display: flex">

                <!--<div class="data-list-left-panel">-->
                <!--<div v-for="(item) in getDbTables" >-->
                <!--<div>{{item.table_name}}</div>-->
                <!--</div>-->
                <!--</div>-->

                <div class="data-list-center-panel">
                    <table class="data-table">
                        <tr><th class="data-table-header"
                                v-for="(item, fname) in tableData[0]">{{fname}}
                        </th></tr>

                        <tr class="data-table-row-tr" v-for="(item) in tableData">
                            <td class="data-table-col-td" v-for="(value, fname) in item">
                                <input @change="editItem(fname, item)" v-model="item[fname]"
                                       class="data-table-input" type="text"/>
                            </td>
                        </tr>
                    </table>
                </div>

            </div>

        </section>

    </div>
</template>

<script>

    // import LeftPanel from './BaseControlLeftPanel'

    export default {
        name: 'DataList',
        data: () => ({}),
        components: {},
        computed: {
            getDbTables() {
                return this.storeGet().getTableList
            },
            getDataList() {
                return this.storeGet().getDataList
            },
        },

        created() {
            this.storeFetch('fetchTableList')
        },
        methods: {

            loadingDataList(tableName) {
                this.tableName = tableName
                this.getTableData(tableName)
            },

            getFirstItemData() {
                const tableName = this.getDbTables
                for(let tabName in this.getDbTables) {
                    this.tableName = tableName
                    this.getTableData(tabName)
                    const elem = this.getElement('#list-menu-item-' + tabName)
                    elem.classList.add('menu-item-active')
                    return true;
                }
            },

            getElement(selector) {
                return document.querySelector(selector)
            },

        },
        mounted() {
            this.getFirstItemData()
        },
    }
</script>

<style scoped>

    .data-list-left-panel,
    .data-list-center-panel {
        border: 0px red solid;
        width: 100%;
        padding:1px;
    }

    .data-list-left-panel {
        width: 20%;
    }

    .data-list-center-panel {

    }

    table {
        font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
        font-size: 14px;
        border-collapse: collapse;
        text-align: center;
        width: 100%;
    }

    th, td:first-child {
        background: #AFCDE7;
        color: white;
        padding: 10px 20px;
    }

    th, td {
        border-style: solid;
        border-width: 0 1px 1px 0;
        border-color: white;
    }

    td {
        background: #D8E6F3;
    }

    th:first-child, td:first-child {
        text-align: left;
    }

    .data-table-header {
        color: black
    }

    /*  поля и строки таблицы */
    .data-table-row-tr {
        border:0px red solid;
    }

    .data-table-col-td {
        margin:0px;
        padding: 0px !important;
        border:0px gainsboro solid !important;
    }

    .data-table-input {
        border:1px gainsboro solid;
        width:100%;
    }

    .data-table-row-tr:hover .data-table-input{
        background: gainsboro;
        cursor: pointer;
    }
    /* .поля и строки таблицы */

    .menu-item-active {
        background: #b0bed9;
        color:black !important;
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

</style>
