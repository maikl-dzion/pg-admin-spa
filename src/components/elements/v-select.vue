<template><div class="v-select-container"
               :style="'width:' +width+ 'px'">

    <div class="vFieldContainer" style="width:100%;">
        <!--@mousemove="inputFocus"-->
        <input @focus="inputFocus" style="outline: none"
               v-model="selectLabel"
               :class="inputClassName" type="text" required >
        <label>{{title}}</label>
    </div>

    <template >
        <ul v-if="showState"
            class="v-select-ul-menu"
            :style="'width:' +width+ 'px'" >
            <li v-for="(item) in items"
                class="v-select-li-item">
                <a @click="selectItem(item, item[name])" >
                    {{item[label]}}
                </a>
            </li>
        </ul>
    </template>

</div></template>

<script>
    export default {
        name: "v-Select",
        props: ['items', 'label', 'name','title', 'param'],
        data: () => ({
           showState : false,
           width: 220,
           currentValue : '', // Переданное значение
           selectLabel  : '', // Описание значения
           selectValue  : '', // Выбранное значение
           hover        : false,
           inputClassName : 'vInputText',

           // ulMenuWidth : 300,
           // randNum     : 0,
        }),

        created() {

            // debugger;
            this.getParam('width', 'width')
            this.getParam('value', 'currentValue')
            this.getParam('hover', 'hover')

            this.setInitSelectedValue();
        },

        methods : {

            inputFocus() {
                this.showState = true;
            },

            hideSelect($event) {

                const target = $event.target;
                const className = target.className;
                if(className !== this.inputClassName)
                   this.showState = false;
            },

            getParam(fname, localName = null) {
                let result = '';
                if(this.param[fname])
                   result = this.param[fname];

                if(localName)
                    this[localName] = result;
                return result;
            },

            selectItem(item, value) {
                const fname = this.getParam('fname')
                this.showState = false;
                this.selectLabel = item[this.label]
                this.selectValue = value;
                this.$emit('select_item', {item, value, fname});
            },

            setInitSelectedValue(){
                const selectedValue = this.getParam('value')
                if(!selectedValue) return false

                for(let i in this.items) {
                    let item = this.items[i]
                    if(item[this.name] == selectedValue) {
                        this.selectLabel = item[this.label]
                        this.selectValue = item[this.name]
                        return true
                    }
                }
            },
        },

        mounted() {
            // debugger
            // const elemId = document.querySelector('#select-elem-box-' + this.randNum)
            // const width  = elemId.style.width;
            // alert(width);

            document.addEventListener('click', this.hideSelect.bind(this), true)
        },

        beforeDestroy() {
            document.removeEventListener('click', this.hideSelect)
        }
    }
</script>

<style scoped >

    .v-select-container input::after {
        content:'';
    }

    .v-select-ul-menu  {

        width: 100%; /* Ширина меню */
        /*height:100%;*/
        list-style: none; /* Для списка убираем маркеры */
        margin: 0; /* Нет отступов вокруг */
        padding: 0; /* Убираем поля вокруг текста */
        font-family: Arial, sans-serif; /* Рубленый шрифт для текста меню */
        font-size: 10pt; /* Размер названий в пункте меню */
        z-index:45;
        border-bottom: 1px solid #ccc; /* Линия снизу */

        position: absolute; /* Подменю позиционируются абсолютно */
        display : block;      /* Скрываем подменю */
        margin-left: 0px;   /* Сдвигаем подменю вправо */
        margin-top: -1px;   /* Сдвигаем подменю вверх */
        width: 300px;
        border: 1px gainsboro solid;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    .v-select-li-item {
        background: aliceblue;
        border: 0px #ccc solid;
        padding:0px 5px 0px 5px;
    }

    .v-select-li-item a {
        display: block; /* Ссылка как блочный элемент */
        padding: 5px; /* Поля вокруг надписи */
        text-decoration: none; /* Подчеркивание у ссылок убираем */
        color: #666; /* Цвет текста */
        border: 0px solid #ccc;/* Рамка вокруг пунктов меню */
        background-color: aliceblue; /* Цвет фона */
        border-bottom: none; /* Границу снизу не проводим */

        height: 30px;
        padding: 2px 2px 2px 4px;
        font-size: 14px;
        text-align: left;
    }

    .brd {
        border-bottom: 1px solid #ccc; /* Линия снизу */
    }

    .v-select-li-item a:hover {
        color: #ffe; /* Цвет текста активного пункта */
        background-color: #5488af; /* Цвет фона активного пункта */
        /*background: #777;*/
        /*box-shadow:10px 10px 10px rgba(0,0,0,0.8);*/
    }


</style>
