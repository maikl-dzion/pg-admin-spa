<template><div class="dlg-container">

    <div class="dlg-title">
        {{title}}
    </div>

    <hr style="margin: 7px 0px 2px 0px"/>

    <div class="dlg-item-name">
        <div class="dlg-name">
            <!--<div style="text-align:left; font-style: italic; font-size: 12px;">Пользователь</div>-->
            <!--<div>{{userName}}</div>-->

            <CustomSelect
                    style="width:100%; padding:2px;"
                    title="Выбрать пользователя"
                    name="usename"
                    label="usename"
                    hover="1"
                    :items="user_list"
                    @select_item="d => userName = d.value"
            ></CustomSelect>

        </div>
        <div class="dlg-name" >
            <!--<div style="text-align:left; font-style: italic; font-size: 12px;">База</div>-->
            <!--<div>{{dataName}}</div>-->
            <CustomSelect
                style="width:100%; padding:2px;"
                title="Выбрать базу"
                name="datname"
                label="datname"
                hover="1"
                :items="db_list"
                @select_item="d => dataName = d.value"
            ></CustomSelect>
        </div>
    </div>

    <!--<hr style="margin: 0px 0px 10px 0px"/>-->

    <!--<ul class="menu" >-->
        <!--<li><a>Пользователи</a>-->
            <!--<ul>-->
                <!--<li><a style="text-align: center; background: #b8daff">Пользователи</a></li>-->
                <!--<li v-for="(item) in user_list">-->
                    <!--<a @click="userName = item['usename']">-->
                        <!--{{item['usename']}}-->
                    <!--</a>-->
                <!--</li>-->
            <!--</ul>-->
        <!--</li>-->
        <!--<li><a class="brd" >Базы данных</a>-->
            <!--<ul>-->
                <!--<li><a style="text-align: center; background: #b8daff">Базы</a></li>-->
                <!--<li v-for="(item) in db_list" >-->
                    <!--<a @click="dataName = item['datname']">-->
                        <!--{{item['datname']}}-->
                    <!--</a>-->
                <!--</li>-->
            <!--</ul>-->
        <!--</li>-->
    <!--</ul>-->

    <hr style="margin: 5px 0px 2px 0px"/>

    <div class="my-form dlg-button-box">
        <a @click="actionClick('delete')" class="my-form__btn">
            <span></span><span></span><span></span><span></span>
            Удалить
        </a>

        <a @click="actionClick('set')" class="my-form__btn">
            <span></span><span></span><span></span><span></span>
            Установить
        </a>
    </div>



    <!--<ul class="menu" >-->
        <!--<li><a>Пользователи</a>-->
            <!--<ul>-->
                <!--<li><a href="linkr1.html">Бефстроганов</a></li>-->
                <!--<li><a href="linkr2.html">Гусь с яблоками</a></li>-->
                <!--<li><a href="linkr3.html">Крупеник новгородский</a></li>-->
                <!--<li><a href="linkr4.html" class="brd">Раки по-русски</a></li>-->
            <!--</ul>-->
        <!--</li>-->
        <!--<li><a class="brd" >Базы данных</a>-->
            <!--<ul>-->
                <!--<li><a href="linku1.html">Вареники</a></li>-->
                <!--<li><a href="linku2.html">Жаркое по-харьковски</a></li>-->
                <!--<li><a href="linku3.html">Капустняк черниговский</a></li>-->
                <!--<li><a href="linku4.html" class="brd">Потапцы с помидорами</a></li>-->
            <!--</ul>-->
        <!--</li>-->
    <!--</ul>-->

</div></template>

<script>
    export default {
        name  : "delegateUserRole",
        props : ['user_list', 'db_list'],
        data: () => ({
            title : 'Управление правами пользователя',
            userName : '',
            dataName : '',
        }),
        methods : {
            actionClick(action) {
               const userName = this.userName;
               const dbName   = this.dataName;
               this.$emit('delegate_action', {userName, dbName, action});
            },
        }
    }
</script>

<style scoped >

    .dlg-container {
        border: 1px gainsboro solid;
        padding:0px;
        width: 340px;
        background: ghostwhite;
        padding: 2px;
    }

    .dlg-title {
        /*font-weight: bold;*/
        text-align: center;
        padding-top: 3px;
        font-size: 17px;
        color: grey;
    }

    .dlg-button-box {
        height: 40px; display: flex; padding: 0px
    }

    .dlg-item-name {
        display: flex;
    }

    .dlg-item-name .dlg-name {
        width: 50%;
        border-bottom:2px cornflowerblue solid;
        padding:2px;
        margin:2px 2px 8px 2px;
    }

    .my-form__btn {
        width: 50%;
        margin:8px 2px 2px 2px;
        font-size: 12px;
        height: 30px;
    }


    ul {
        width: 100%; /* Ширина меню */
        list-style: none; /* Для списка убираем маркеры */
        margin: 0; /* Нет отступов вокруг */
        padding: 0; /* Убираем поля вокруг текста */
        font-family: Arial, sans-serif; /* Рубленый шрифт для текста меню */
        font-size: 10pt; /* Размер названий в пункте меню */
    }
    li ul {
        width: 220px;
        position: absolute; /* Подменю позиционируются абсолютно */
        display: none; /* Скрываем подменю */
        margin-left: 100px; /* Сдвигаем подменю вправо */
        margin-top: -2em; /* Сдвигаем подменю вверх */
        z-index: 55;
    }
    li a {
        display: block; /* Ссылка как блочный элемент */
        padding: 5px; /* Поля вокруг надписи */
        text-decoration: none; /* Подчеркивание у ссылок убираем */
        color: #666; /* Цвет текста */
        border: 1px solid #ccc;/* Рамка вокруг пунктов меню */
        background-color: #f0f0f0; /* Цвет фона */
        border-bottom: none; /* Границу снизу не проводим */
    }
    li a:hover {
        /*color: #ffe; !* Цвет текста активного пункта *!*/
        color:white !important;
        background-color: #5488af; /* Цвет фона активного пункта */
    }
    li:hover ul {
        display: block; /* При выделении пункта курсором мыши отображается подменю */
    }
    .brd {
        border-bottom: 1px solid #ccc; /* Линия снизу */
    }


    /*.dlg-item-title {*/
        /*text-align: center;*/
    /*}*/


    /*.dlg-flex-box {*/
        /*width:100%;*/
        /*display: flex;*/
    /*}*/

    /*.dlg-item-box {*/
        /*width:50%;*/
        /*!*height: 20px;*!*/
        /*border: 1px red solid;*/
        /*padding: 0px;*/
        /*position: relative;*/
        /*!*margin:2px;*!*/
    /*}*/

    /*.dlg-item-absolute {*/
        /*position:absolute;*/
        /*z-index: 35;*/
        /*background: red;*/
        /*width: 100%;*/
        /*margin:0px;*/
        /*margin-top:-3px;*/
        /*display: block;*/
    /*}*/

    /*.dlg-item-list {*/
        /*width:100%;*/
        /*margin:2px;*/
        /*border: 0px blue solid;*/
        /*cursor:pointer;*/
    /*}*/

    /*.dlg-title:hover .dlg-item-absolute {*/
        /*color:red;*/
    /*}*/

    /*.dlg-item-list:hover {*/
        /*background: #0d47a1;*/
        /*color: white;*/
    /*}*/

</style>
