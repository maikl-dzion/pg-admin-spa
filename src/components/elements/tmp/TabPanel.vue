<template>
    <div class="tabs">

        <!--<input type="radio" name="tab-btn" id="tab-btn-1" value="" checked>-->

        <template v-for="(item, i) in tabs" >
            <input v-if="item.active"   type="radio" name="tab-btn" :id="'tab-btn-' + (i+1)" value="" checked>
            <input v-else="item.active" type="radio" name="tab-btn" :id="'tab-btn-' + (i+1)" value="">
            <label :id="'tab-label-' + (i+1)" :for="'tab-btn-' + (i+1)">{{item.label}}</label>
        </template>

        <template v-for="(item, i) in tabs" >
            <div :id="'content-' + (i+1)" style="margin-top: -8px;">
                <slot :name="'content-' + (i+1)"/>
            </div>
        </template>

    </div>
</template>

<script>
export default {
   name: "TabPanel",
   props:['tabs'],
}
</script>

<style scoped>

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    .tabs {
        font-size: 0;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
    }

    .tabs>input[type="radio"] {
        display: none;
    }

    .tabs > div {
        /* скрыть контент по умолчанию */
        display: none;
        border: 0px solid #e0e0e0;
        border-top: 1px solid #e0e0e0;
        padding: 10px 2px 2px 2px;
        font-size: 16px;
    }

    /* отобразить контент, связанный с вабранной радиокнопкой (input type="radio") */
    #tab-btn-1:checked~#content-1,
    #tab-btn-2:checked~#content-2,
    #tab-btn-3:checked~#content-3 {
        display: block;
    }

    .tabs > label {
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        user-select: none;
        background-color: #f5f5f5;
        border: 1px solid #e0e0e0;
        padding: 2px 14px;
        font-size: 16px;
        line-height: 1.5;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
        cursor: pointer;
        position: relative;
        top: 1px;
        /*margin-left: 20px;*/
    }

    .tabs >label:not(:first-of-type) {
        border-left: none;
    }

    #tab-label-1 {
        /*border: 2px red solid;*/
        margin-left: 4px;
    }

    .tabs > input[type="radio"]:checked+label {
        background-color: #fff;
        border-bottom: 1px solid #fff;
    }

</style>
