<template>
    <div class="new-create-form-container">

        <div class="new-create-form-header">

            <div style="border-right:1px gainsboro solid;
                   padding-top:4px; color:grey;
                   text-align:center; width:100%">Добавление таблиц
            </div>

            <a @click="pushTableToArray()"
               class="btn btn-primary"
               style="width: 40px; height: 35px;
                      margin:0px 0px 0px 3px; border-radius: 0px">
                <i class="fa fa fa-plus" aria-hidden="true"></i>
            </a>

        </div>

        <!--<pre>{{createTableList}}</pre>-->

        <div class="new-create-form-content" style="margin-top:10px;">

            <template v-for="(item, i) in createTableList">
                <div class="create-form-item-box" style="padding-top:7px;">

                    <div style="display: flex">
                        <div class="vFieldContainer" style="width:60%">
                            <input v-model="item.name" style="outline: none"
                                   class="vInputText" type="text" required>
                            <label>Имя таблицы</label>
                        </div>
                        <div class="vFieldContainer" style="width:35%; margin-left:3px;">
                            <input v-model="item.idName" style="outline: none"
                                   class="vInputText" type="text" required>
                            <label>Поле Id</label>
                        </div>
                        <a @click="pushNewField(i)"
                           class="btn btn-primary"
                           style="width: 32px; height: 32px;
                                    padding: 2px 0px 0px 0px;
                                    margin:0px 2px 0px 3px; border-radius: 100%">
                            <i class="fa fa fa-plus" aria-hidden="true" style="font-size:12px"></i>
                        </a>
                    </div>

                    <div v-if="item.fields.length"
                         style="border:0px grey solid; padding:1px; margin:1px 0px 1px 10px">
                        <div v-for="(field) in item.fields" style="margin-top:10px;">
                            <div style="display: flex">
                                <div class="vFieldContainer" style="width:65%">
                                    <input v-model="field.name" style="outline: none"
                                           class="vInputText" type="text" required>
                                    <label>Имя поля</label>
                                </div>

                                <v-select
                                        style="width:35%; margin-left:3px;"
                                        title="Тип поля"
                                        :items="tableFieldTypes"
                                        label="title"
                                        name="name"
                                        :param="{width: 120, fname : '', value : ''}"
                                        @select_item="selectedItem"
                                ></v-select>

                            </div>
                        </div>
                    </div>

                </div>
                <div style="height: 2px; border-top:3px grey dashed; margin:2px 0px 4px 0px"></div>
                <p/>
            </template>

            <div class="my-form">
                <div class="my-form__btn-box">
                    <a @click="addTableList" class="my-form__btn">
                        <span></span><span></span><span></span><span></span>
                        Сохранить
                    </a>
                </div>
            </div>

        </div>


    </div>
</template>

<script>
    export default {
        name: "CreateTableSet",

        data: () => ({
            // tabFieldsList : {},
        }),

        created() {
            this.pushFieldToArray(true)
            this.pushTableToArray()
        },

        methods: {

            pushNewField(index) {
                this.createTableList[index]['fields'].push({name: '', type: 'varchar'})
                console.log(this.createTableList);
            },

            addTableList() {
                let table = {}
                let tableList = Object.assign({}, this.createTableList)
                for (let i in tableList) {
                    table = tableList[i]
                    this.createTableListFn(table.name, table.idName, () => {
                        this.addNewFieldsForeach(table.fields, table.name)
                    })
                }
            },
        },
    }
</script>

<style>

    .new-create-form-container {
        border: 1px gainsboro solid;
        width: 340px;
        background: ghostwhite;
    }

    .new-create-form-header {
        display: flex;
        padding: 3px;
        height: 43px;
        border-bottom: 3px #326690 solid;
    }

</style>
