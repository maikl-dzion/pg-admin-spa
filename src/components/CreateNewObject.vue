<template>
<div style="width:100%;" >

  <div style="display: flex" >
      <div class="my-form" style="width:480px; display: flex">
          <div class="my-form__elem-box" style="width:60%; ">
              <input v-model="newDbName" class="form__inp-text" type="text"  required="">
              <label class="form__inp-label" style="padding-left: 4px">Имя базы</label>
          </div>
          <div class="my-form__btn-box" style="width:40%; margin-left: 10px;" >
              <a @click="btnClick('create_db')" class="my-form__btn">
                  <span></span><span></span><span></span><span></span>
                  Добавить новую базу
              </a>
          </div>
      </div>
  </div><hr>

  <div style="display: flex">

    <!-----  Добавление пользователя ------>
    <div class="create-form-container" >

        <div class="my-form" >
            <div class="my-form__label">Добавить пользователя</div>
            <hr class="my-form__delimiter">
            <div class="my-form__container">

                <div class="my-form__elem-box">
                    <input v-model="newUser.name" class="form__inp-text" type="text" required="">
                    <label class="form__inp-label">Имя пользователя</label>
                </div>

                <div class="my-form__elem-box">
                    <input v-model="newUser.password" class="form__inp-text" type="text"  required="">
                    <label class="form__inp-label" >Пароль</label>
                </div>

                <div class="div-checkbox" >
                    <input v-model="newUser.superUser" type="checkbox" id="super-user-role">
                    <label for="super-user-role">
                        Права суперпользователя</label>
                </div>

                <div class="my-form__select-box" style="margin-top:10px !important;">
                    <label class="select-label" > Выбрать базу</label>
                    <select v-model="newUser.dbName" class="custom-select-elem" >
                        <option v-for="(db) in getDbList" :value="db.datname">
                            {{db.datname}}
                        </option>
                    </select>
                </div>

            </div>

            <hr class="my-form__delimiter">
            <div class="my-form__btn-box">
                <a @click="btnClick('create_user')" class="my-form__btn">
                    <span></span><span></span><span></span><span></span>
                    Сохранить
                </a>
            </div>

        </div>
    </div>
    <!-----  / Добавление пользователя ---->

    <!-----  Добавление таблиц ------------>
    <div class="create-form-container" style="margin-left:10px">
          <div class="my-form" >
              <div class="custom-btn-container" >
                  <button @click="pushTableToArray()" class="custom-btn" >
                      <i class="fa fa-plus-circle" ></i>
                  </button>
              </div>
              <div class="my-form__label" >Добавить таблиц</div>
              <hr class="my-form__delimiter" >
              <div class="my-form__container">

                  <div v-for="(item) in createTableList"
                       class="my-form__flex-box" >
                      <div class="my-form__elem-box">
                          <input v-model="item.name" class="form__inp-text" type="text" required="">
                          <label class="form__inp-label" >Имя таблицы</label>
                      </div>
                      <div class="margin-box"></div>
                      <div class="my-form__elem-box" style="width:40%">
                          <input v-model="item.idName" class="form__inp-text" type="text" required="">
                          <label class="form__inp-label" >Имя Id поля</label>
                      </div>
                  </div>

              </div>

              <br/><hr class="my-form__delimiter">
              <div class="my-form__btn-box">
                  <a @click="btnClick('create_table_list')" class="my-form__btn">
                      <span></span><span></span><span></span><span></span>
                      Сохранить
                  </a>
              </div>

          </div>
    </div>
    <!------ / Добавление таблиц  --------->

    <!-----  Добавление новых полей ------->
    <div class="create-form-container" style="margin-left:10px">
        <div class="my-form" >
            <div class="custom-btn-container" >
                <button @click="pushFieldToArray(true)" class="custom-btn" >
                     <i class="fa fa-plus-circle" ></i>
                </button>
            </div>
            <div class="my-form__label" >Добавить новые поля</div>
            <hr class="my-form__delimiter" >
            <div class="my-form__container">

                <div class="my-form__select-box" style="margin-bottom:10px !important;" >
                    <label class="select-label" > Выбрать таблицу </label>
                    <select v-model="selectTableName" class="custom-select-elem" >
                        <option v-for="(item) in getDbTables"
                                :value="item.table_name" >
                                {{item.table_name}}
                        </option>
                    </select>
                </div>

                <div v-for="(field) in newFieldsListSecond"
                     class="my-form__flex-box" >
                     <div class="my-form__elem-box">
                        <input v-model="field.name" class="form__inp-text" type="text" required="">
                        <label class="form__inp-label" >Имя поля</label>
                     </div>
                     <div class="margin-box"></div>
                     <div class="my-form__select-box-flex" style="width: 45%">
                        <label class="select-label" >Тип поля</label>
                        <select v-model="field.type" class="custom-select-elem" >
                            <option v-for="(item) in tableFieldTypes"
                                    :value="item.name">
                                    {{item.name}}
                            </option>
                        </select>
                     </div>
                </div>

            </div>

            <br/><br/>
            <hr class="my-form__delimiter">
            <div class="my-form__btn-box">
                <a @click="btnClick('create_fields')" class="my-form__btn">
                    <span></span><span></span><span></span><span></span>
                    Сохранить
                </a>
            </div>

        </div>
    </div>
    <!------ / Добавление новых полей ----->

  </div><!---- display flex box --->

  <hr/>

</div>
</template>

<script>
import SimpleBlueForm from '../components/SimpleBlueForm'
import SimpleButton from '../components/SimpleButton'
import BlueBtn from '../components/elements/BlueBtn'
export default {
  name: 'CreateNewObjects',
  created () {
    this.pushFieldToArray(true)
    this.pushTableToArray()
  },

  data: () => ({
    selectTableName: ''
  }),

  components: {
    SimpleBlueForm,
    SimpleButton,
    BlueBtn
  },

  computed: {

    getDbList () {
      return this.storeGet().getDbList
    },

    getUserList () {
      return this.storeGet().getUserList
    },

    getDbTables () {
      return this.storeGet().getTableList
    },

    getDbRoles () {
      return this.storeGet().getDbRoles
    }

  },

  methods: {
    btnClick (action) {
      switch (action) {
        case 'create_db' : this.addNewDb(); break
        case 'create_user' : this.createDbUser(); break
        case 'create_fields' :
          this.addNewFieldsForeach(this.newFieldsListSecond, this.selectTableName)
          break
        case 'create_table_list' :
          let table = {}
          for (let i in this.createTableList) {
            table = this.createTableList[i]
            this.createTableListFn(table.name, table.idName)
          }
          break
      }
      const param = { action }
      this.$emit('btn_click', param)
    }
  }
}
</script>

<style scoped>

    select, input {
        cursor: pointer;
    }

    .create-form-container {
        margin:0px; width:350px;
        border:2px lightslategrey solid; padding:4px;
        -webkit-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
        -moz-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
        box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
    }

    .custom-select {
        margin-top: 44px;
        border-radius: 0px;
        background: royalblue;
        color:white;
        cursor:pointer;
    }

</style>
