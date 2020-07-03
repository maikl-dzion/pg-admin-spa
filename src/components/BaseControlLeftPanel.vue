<template>
    <div>
        <ul class="controlLeftPanelUl" >
            <li v-for="(item) in items" class="leftPanelLi"
                :key="item[title]" >

                <div @click="selectEmit(item, $event)"
                     class="leftPanelContentBox" >
                    <div class="leftPanelIcon">
                        <i :class="icon + ' myCustomIcon'"></i>
                    </div>
                    <div class="leftPanelTitle">
                         {{item[title]}}
                    </div>
                </div>

                <template v-if="rulesDeleteItem(item, action)">
                    <div @click="deleteEmit(item[title], $event)" class="leftPanelDeleteBox" >
                        <i class="far fa-trash-alt" style="color:red;"></i>
                    </div>
                </template>
                <template v-else >
                    <div class="leftPanelDeleteBoxEmpty" >
                        <!--<i class="fas fa-prescription-bottle-alt"></i>-->
                    </div>
                </template>

        </li></ul>
    </div>
</template>

<script>
export default {
  name: 'BaseControlLeftPanel',
  props: ['items', 'icon', 'title', 'action'],
  data: () => ({
    activeClass: 'leftPanelContentBoxActive'
  }),
  methods: {
    selectEmit (item, event) {
      this.setActiveElement(event, this.activeClass)
      this.$emit('select_item', item)
    },
    deleteEmit (name, event) {
      // this.setActiveElement(event, this.activeClass)
      this.$emit('delete_item', name)
    }
  }
}
</script>

<style scoped>

  .controlLeftPanelUl{
      border: 0px gainsboro solid;
      width: 100%;
      list-style: none;
      padding:0px;
  }
  .leftPanelLi {
      display: flex;
      width: 100%;
  }
  .leftPanelContentBox {
      width: 90%;
      display: flex;
      cursor:pointer;
  }

  .leftPanelContentBoxActive {
      color:white;
      border-bottom: 1px #326690 solid;
      background: lightsteelblue;
  }

  .leftPanelDeleteBox,
  .leftPanelDeleteBoxEmpty{
      width: 50px;
      border: 1px gainsboro solid;
      margin:2px;
      cursor:pointer;
      text-align:center
  }

  .leftPanelDeleteBoxEmpty {
      cursor:default;
  }

  .leftPanelContentBox:hover {
      color:mediumseagreen;
      border-bottom: 1px #326690 solid;
      /*background: ghostwhite;*/
  }

  .leftPanelDeleteBox:hover {
      /*background: red;*/
      opacity: 0.5;
      color:gainsboro !important;
      border: 1px red solid;
  }

  .leftPanelIcon,
  .leftPanelTitle{
      border: 0px green solid;
      margin:2px;
  }

  .leftPanelIcon {
     width:50px;

     text-align: center;
  }
  .leftPanelTitle {
      width:80%;
  }
  .myCustomIcon {
     color:mediumseagreen;
  }
</style>
