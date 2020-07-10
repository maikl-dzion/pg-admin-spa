<template>

    <table style="width:1000px">

        <!--<tr>-->
            <!--<th>Company</th>-->
            <!--<th>Q1</th>-->
            <!--<th>Q2</th>-->
            <!--<th>Q3</th>-->
            <!--<th>Q4</th>-->
        <!--</tr>-->

        <tr v-for="(item, fname) in fields" :key="fname" >

            <td style="color:black; width:50px !important;">{{fname}}</td>

            <template v-if="!isAutoField(item)" >

                <td style="width:300px; padding: 0px !important; margin: 0px !important;">
                    <input @change="changeFieldName(fname, fields[fname]['column_name'], table_name)"
                           v-model="fields[fname]['column_name']"
                           class="input-text-class" style="" type="text" />
                </td>

                <td style="width:80px;" >
                    <CustomSelect
                        style="width:100%; padding:2px;"
                        title=""
                        name="name"
                        label="name"
                        hover="1"
                        :field_name="fname"
                        :selected_value="fields[fname]['input_type']"
                        :items="tableFieldTypes"
                        @select_item="selectChangeType"
                    ></CustomSelect>
                </td>

                <td style="width:20px !important; color:white;background: red" >
                    <i @click="commonDeleteField(fname, table_name)" class="fa fa-times"
                       style="color:white;font-size: 16px; cursor:pointer;"></i>
                </td>

                <!--<td>40.3</td>-->

            </template>
            <template v-else >

                <td>
                    <input :value="fname" type="text" style="width:100%;"
                           class="input-text-class" disabled="true"/>
                </td>

                <td>{{fields[fname]['default_value']}}</td>
                <td></td>
                <!--<td></td>-->

            </template>

        </tr>

    </table>

</template>

<script>
export default {
    name: "TableFieldsEdit",
    props: ['fields', 'table_name'],
    methods : {
        selectChangeType(data) {
            const newValue = data.value
            const fname    = data.field_name
            this.changeFieldType(fname, newValue, this.table_name)
        }
    }
}
</script>

<style scoped>

    table {
        font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
        font-size: 14px;
        border-collapse: collapse;
        text-align: center;
        width: 100%;
    }

    table td {
        padding: 0px;
        margin: 0px;
    }

    .input-text-class {
        width: 100%;
        height: 100%;
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
</style>
