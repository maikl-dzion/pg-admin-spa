<template><div>
    <!--<pre>{{items}}</pre>-->
    <!--{{label}}-->
    <div v-if="selectLabel" class="selected-label-show">
        {{selectLabel}}
    </div>
    <ul class="menu">
        <li><a class="brd" >{{title}}</a>
            <ul>
                <li v-for="(item) in items">
                    <a @click="selectItem(item, item[name])" >{{item[label]}}</a>
                </li>
            </ul>
        </li>
    </ul>

</div></template>

<script>
    export default {
        name: "Select",
        props: ['items', 'title', 'name', 'label'],
        data: () => ({
           selectLabel : '',
           selectValue : ''
        }),

        methods : {
            selectItem(item, value) {
                this.selectLabel = item[this.label]
                this.selectValue = value;
                this.$emit('select_item', {item, value});
            }
        }
    }
</script>

<style scoped >

    .selected-label-show {

    }

    ul {
        width: 100%; /* Ширина меню */
        list-style: none; /* Для списка убираем маркеры */
        margin: 0; /* Нет отступов вокруг */
        padding: 0; /* Убираем поля вокруг текста */
        font-family: Arial, sans-serif; /* Рубленый шрифт для текста меню */
        font-size: 10pt; /* Размер названий в пункте меню */
        z-index:38;
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
