<template><div class="dlg-container">





    <ul class="menu">
        <li><a href="russian.html">Русская кухня</a>
            <ul>
                <li><a href="linkr1.html">Бефстроганов</a></li>
                <li><a href="linkr2.html">Гусь с яблоками</a></li>
                <li><a href="linkr3.html">Крупеник новгородский</a></li>
                <li><a href="linkr4.html" class="brd">Раки по-русски</a></li>
            </ul>
        </li>
        <li><a href="ukrainian.html">Украинская кухня</a>
            <ul>
                <li><a href="linku1.html">Вареники</a></li>
                <li><a href="linku2.html">Жаркое по-харьковски</a></li>
                <li><a href="linku3.html">Капустняк черниговский</a></li>
                <li><a href="linku4.html" class="brd">Потапцы с помидорами</a></li>
            </ul>
        </li>
        <li><a href="caucasus.html">Кавказская кухня</a>
            <ul>
                <li><a href="linkc1.html">Суп-харчо</a></li>
                <li><a href="linkc2.html">Лилибдж</a></li>
                <li><a href="linkc3.html">Чихиртма</a></li>
                <li><a href="linkc4.html" class="brd">Шашлык</a></li>
            </ul>
        </li>
        <li><a href="asia.html" class="brd">Кухня Средней Азии</a></li>
    </ul>









    <div class="dlg-title">
        {{title}}
    </div>

    <div class="dlg-flex-box" >

        <div class="dlg-item-box">
            <div class="dlg-item-title">Пользователи</div>
            <div class="dlg-item-absolute">
                 <div v-for="(item) in user_list"
                      class="dlg-item-list">
                      {{item['usename']}}
                 </div>
            </div>
        </div>

        <div class="dlg-item-box">
            <div class="dlg-item-title">Базы данных</div>
            <div class="dlg-item-absolute">
                <div v-for="(item) in db_list"
                     class="dlg-item-list">
                     {{item['datname']}}
                </div>
        </div></div>

    </div>

    <div class="dlg-button my-form"
         style="height: 40px">
         <div class="my-form__btn-box" style="margin-left: 0px;" >
            <a  class="my-form__btn">
                <span></span><span></span><span></span><span></span>
                Сохранить
            </a>
         </div>
    </div>

</div></template>

<script>
    export default {
        name: "delegateUserRole",
        data: () => ({
            title : 'Управление правами пользователя',
            user_list : [
                {
                    "usename": "postgres",
                    "usesysid": 10,
                    "usecreatedb": true,
                    "usesuper": true,
                    "userepl": true,
                    "usebypassrls": true,
                    "passwd": "********",
                    "valuntil": null,
                    "useconfig": null
                },
                {
                    "usename": "w1user",
                    "usesysid": 16392,
                    "usecreatedb": false,
                    "usesuper": true,
                    "userepl": false,
                    "usebypassrls": false,
                    "passwd": "********",
                    "valuntil": null,
                    "useconfig": null
                },
            ],

            db_list : [
                {
                    "datname": "template1",
                    "datdba": 10,
                    "encoding": 0,
                    "datcollate": "C",
                    "datctype": "C",
                    "datistemplate": true,
                    "datallowconn": true,
                    "datconnlimit": -1,
                    "datlastsysoid": 12372,
                    "datfrozenxid": "613",
                    "datminmxid": "1",
                    "dattablespace": 1663,
                    "datacl": "{=c/postgres,postgres=CTc/postgres}"
                },
                {
                    "datname": "template0",
                    "datdba": 10,
                    "encoding": 0,
                    "datcollate": "C",
                    "datctype": "C",
                    "datistemplate": true,
                    "datallowconn": false,
                    "datconnlimit": -1,
                    "datlastsysoid": 12372,
                    "datfrozenxid": "613",
                    "datminmxid": "1",
                    "dattablespace": 1663,
                    "datacl": "{=c/postgres,postgres=CTc/postgres}"
                }
            ],
        }),
    }
</script>

<style scoped>
    .dlg-container {
        border: 1px red solid;
        padding:0px;
        width: 400px;
    }

    .dlg-title {
        text-align: center;
    }

    .dlg-item-title {
        text-align: center;
    }

    .dlg-button {

    }

    .dlg-flex-box {
        width:100%;
        display: flex;
    }

    .dlg-item-box {
        width:50%;
        /*height: 20px;*/
        border: 1px red solid;
        padding: 0px;
        position: relative;
        /*margin:2px;*/
    }

    .dlg-item-absolute {
        position:absolute;
        z-index: 35;
        background: red;
        width: 100%;
        margin:0px;
        margin-top:-3px;
        display: block;
    }

    .dlg-item-list {
        width:100%;
        margin:2px;
        border: 0px blue solid;
        cursor:pointer;
    }

    .dlg-title:hover .dlg-item-absolute {
        color:red;
    }

    .dlg-item-list:hover {
        background: #0d47a1;
        color: white;
    }






    ul {
        width: 180px; /* Ширина меню */
        list-style: none; /* Для списка убираем маркеры */
        margin: 0; /* Нет отступов вокруг */
        padding: 0; /* Убираем поля вокруг текста */
        font-family: Arial, sans-serif; /* Рубленый шрифт для текста меню */
        font-size: 10pt; /* Размер названий в пункте меню */
    }
    li ul {
        position: absolute; /* Подменю позиционируются абсолютно */
        display: none; /* Скрываем подменю */
        margin-left: 165px; /* Сдвигаем подменю вправо */
        margin-top: -2em; /* Сдвигаем подменю вверх */
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
        color: #ffe; /* Цвет текста активного пункта */
        background-color: #5488af; /* Цвет фона активного пункта */
    }
    li:hover ul {
        display: block; /* При выделении пункта курсором мыши отображается подменю */
    }
    .brd {
        border-bottom: 1px solid #ccc; /* Линия снизу */
    }
</style>
