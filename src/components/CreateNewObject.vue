<template>
<div style="width:100%;" >

  <!--<CustomSelect></CustomSelect>-->

  <div style="display: flex; width:100%;" >

      <div class="login-box" style="width:300px; padding:0px 5px 0px 5px;">
          <div>
              <div class="div-row-flex" style="border:0px red solid;">
                  <div class="user-box" style="width:7%; border:0px red solid" >
                      <i class="fas fa-database" ></i>
                  </div>
                  <div class="user-box" style="width:93%; border:0px red solid">
                      <input v-model="newDbName" type="text" required="">
                      <label style="padding-left:8px; padding-top:16px">Имя базы</label>
                  </div>
              </div>
              <hr style="background:#03e9f4; height: 1px;">
              <a @click="btnClick('create_db')"
                  style="margin:0px 0px 0px 0px; padding:0px; width:100%;
                         text-align:center; border:0px red solid; color:white" >
                  <span></span><span></span><span></span><span></span>
                  Создать новую базу
              </a>
          </div>
      </div>

      <div class="login-box" style="margin-left:10px; width:350px; padding:0px 5px 0px 5px;">
          <div>
              <div class="div-row-flex" style="border:0px red solid;">
                  <div class="user-box" style="width:7%; border:0px red solid" >
                      <i class="fas fa-address-card" ></i>
                  </div>
                  <div class="user-box" style="width:93%; border:0px red solid">
                      <input v-model="newUser.name" type="text" required="">
                      <label style="padding-left:8px; padding-top:16px">Имя пользователя</label>
                  </div>
              </div>

              <div class="div-row-flex" style="border:0px red solid;">
                  <div class="user-box" style="width:7%; border:0px red solid" >
                      <i class="fas fa-lock-open"></i>
                  </div>
                  <div class="user-box" style="width:93%; border:0px red solid">
                      <input v-model="newUser.password" type="text" required="">
                      <label style="padding-left:8px; padding-top:16px">Пароль</label>
                  </div>
              </div>

              <div class="div-row-flex" style="border:0px red solid; margin-top:10px;">
                  <div class="user-box" style="width:7%; border:0px red solid" >
                      <i class="fas fa-database" style="padding-top: 0px" ></i>
                  </div>
                  <div class="user-box1" style="width:93%; border:0px red solid">
                      <label style="font-style: italic; font-size: 13px;
                                    color:white; padding-left:7px; padding-top:6px;">Выбрать базу</label><br>
                      <select v-model="newUser.dbName"
                              style="width:98%; background: transparent; height: 30px;
                                     border: 1px white solid; color:white" >
                              <option v-for="(db) in getDbList" :name="db.datname"
                                      style="background: #63759d;" >
                                     {{db.datname}}
                              </option>
                      </select>

                  </div>
              </div>

              <div class="div-row-flex" style="border:0px red solid; padding-top:15px">
                  <div class="checkbox" style="border: 0px white solid; padding-top:6px;
                                               padding-left:0px  ">
                      <input v-model="newUser.superUser" type="checkbox" id="super_user_role">
                      <label for="super_user_role"
                             style="margin: 0px 0px 0px -10px; font-style: italic; font-size: 13px">
                             Права суперпользователя</label>
                  </div>
              </div>

              <hr style="background:#03e9f4; height: 1px;">

              <a @click="btnClick('create_user')"
                 style="margin:0px 0px 0px 0px; padding:0px; width:100%;
                         text-align:center; border:0px red solid; color:white" >
                  <span></span><span></span><span></span><span></span>
                  Создать нового пользователя
              </a>
          </div>
      </div>

  </div><hr/>

  <div style="display: flex; width: 100%" >

      <!---- Форма добавления новых полей --->
      <div class="login-box" style="margin-left:0px; width:380px; padding:0px 5px 0px 5px;">
          <div>
              <div style="text-align: center; color:white; padding: 4px;" >
                  Добавление новых полей
              </div>
              <hr style="background:#03e9f4; height: 1px; margin: 0px" >

              <div class="div-row-flex" style="border:0px red solid; margin-top:2px;">

                  <div class="user-box1" style="width:70%; border:0px red solid">
                      <label style="font-style: italic; font-size: 13px;
                                    color:white; padding-left:7px; padding-top:6px;">
                              Выбрать таблицу
                      </label><br>
                      <select v-model="selectTableName"
                              style="width:98%; background: transparent; height: 30px;
                                     border: 1px white solid; color:white" >
                          <option v-for="(item) in getDbTables" :name="item.table_name"
                                  style="background: #63759d;" >
                                  {{item.table_name}}
                          </option>
                      </select>
                  </div>

                  <div style="position:absolute; width:45px; height:45px;
                          border: 0px red solid; margin-left:85%; margin-top:19px;">
                      <button @click="pushFieldToArray(true)" class="custom-btn"
                              style="height: 100%; width: 100%;">
                          <i class="fa fa-plus-circle"></i>
                      </button>
                  </div>

              </div>

              <hr style="background:#03e9f4; height: 1px;" >

              <template v-for="(field, i) in newFieldsListSecond" >

                  <div class="div-row-flex" style="border:0px red solid;">

                      <div class="user-box" style="width:7%; border:0px red solid" >
                          <i class="fab fa-microsoft"></i>
                      </div>

                      <div class="user-box" style="width:50%; border:0px red solid">
                          <input v-model="field.name" type="text" required="">
                          <label style="padding-left:8px; padding-top:16px">Имя поля</label>
                      </div>

                      <div class="user-box1" style="width:43%; margin:20px 0px 0px 4px;
                                                    border:0px red solid" >
                          <label style="font-style: italic; font-size: 13px;
                                    color:white; padding-left:7px; padding-top:6px;">
                                 Тип поля
                          </label><br>
                          <select v-model="field.type"
                                  style="width:98%; background: transparent; height: 30px;
                                     border: 1px white solid; color:white" >
                              <option v-for="(item) in tableFieldTypes" :name="item.name"
                                      style="background: #63759d;" >
                                  {{item.name}}
                              </option>
                          </select>
                      </div>
                  </div>

              </template>

              <hr style="background:#03e9f4; height: 1px; margin: 20px 0px 20px 0px" >

              <a @click="btnClick('create_fields')"
                 style="margin:0px 0px 0px 0px; padding:0px; width:100%;
                         text-align:center; border:0px red solid; color:white" >
                  <span></span><span></span><span></span><span></span>
                  Сохранить
              </a>

          </div>
      </div>
      <!---- / Форма добавления новых полей --->

      <!---- Форма добавления таблиц --->
      <div class="login-box" style="margin-left:20px; width:350px; padding:0px 5px 0px 5px;"><div>

              <div style="position:absolute; width:45px; height:45px;
                          border: 0px red solid; margin-left:98.7%;">
                  <button @click="pushTableToArray()" class="custom-btn"
                          style="height: 100%; width: 100%;">
                          <i class="fa fa-plus-circle"></i>
                  </button>
              </div>

              <div style="text-align: center; color:white; padding: 4px;" >
                  Добавление таблиц
              </div>
              <hr style="background:#03e9f4; height: 1px; margin: 0px" >

              <div v-for="(item) in createTableList" class="div-row-flex" style="border:0px red solid;">
                  <div class="user-box" style="width:7%; border:0px red solid" >
                      <i class="fa fa-table" aria-hidden="true"></i>
                  </div>
                  <div class="user-box" style="width:55%; border:0px red solid">
                      <input v-model="item.name" type="text" required="">
                      <label style="padding-left:8px; padding-top:16px">Имя таблицы</label>
                  </div>

                  <div class="user-box" style="width:38%; border:0px red solid">
                      <input v-model="item.idName" type="text" required="">
                      <label style="padding-left:8px; padding-top:16px">Поле Id</label>
                  </div>
              </div>

              <hr style="background:#03e9f4; height: 1px;">
              <a @click="btnClick('create_table_list')"
                 style="margin:0px 0px 0px 0px; padding:0px; width:60%;
                        text-align:center; border:0px red solid; color:white" >
                  <span></span><span></span><span></span><span></span>
                  Сохранить
              </a>

      </div></div>
      <!--- / Форма добавления таблиц -->

  </div><hr/>

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
          this.addNewFieldsForeach(this.newFieldsListSecond)
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

    .login-box i {
        color:white; font-size: 20px; padding-top:80%
    }

    .custom-select {
        margin-top: 44px;
        border-radius: 0px;
        background: royalblue;
        color:white;
        cursor:pointer;
    }

    .login-box {
        position: relative;
        margin-top: 10px;
        /*top: 100%;*/
        /*left: 50%;*/
        width: 100%;
        padding: 20px;
        /*transform: translate(-50%, -50%);*/
        background: royalblue;
        /*background: #63759d;*/
        box-sizing: border-box;
        /*box-shadow: 0 12px 20px rgba(0, 0, 0, .5);*/
        box-shadow: 0 2px 4px rgba(0, 0, 0, .5);
        border-radius: 2px;
        z-index: 33;
    }

    .login-box h2,
    .login-box h4,
    .login-box h5 {
        padding: 0;
        color: #fff;
        text-align: center;
    }

    .login-box .div-row-flex {
        display: flex;
        width: 100%;
    }

    .login-box .user-box {
        position: relative;
        margin:2px;
        margin-top:10px;
    }

    .login-box .user-box input {
        width: 100%;
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
        margin-bottom: 2px;
        border: none;
        border-bottom: 1px solid #fff;
        outline: none;
        background: transparent;
    }

    .login-box .user-box label {
        position: absolute;
        top: 0; left: 0;
        padding: 18px 0;
        font-size: 12px;
        color: #fff;
        pointer-events: none;
        transition: .5s;
        font-style: italic;
    }

    .login-box .user-box input:focus ~ label,
    .login-box .user-box input:valid ~ label {
        top: -20px;
        left: 0;
        color: #03e9f4;
        font-size: 12px;
    }

    .login-box a {
        position: relative;
        display: inline-block;
        color: #03e9f4;
        font-size: 13px;
        text-decoration: none;
        text-transform: uppercase;
        overflow: hidden;
        transition: .5s;
        letter-spacing: 4px;
        height: 32px;
        padding: 7px 0px 0px 0px !important;
    }

    .login-box a:hover {
        background: #03e9f4;
        color: #fff;
        border-radius: 2px;
        box-shadow: 0 0 5px #03e9f4,
        0 0 0px red,
        0 0 10px gainsboro,
        0 0 12px #03e9f4;
    }

    .login-box a span {
        position: absolute;
        display: block;
    }

    .login-box a span:nth-child(1) {
        top: 0;
        left: -100%;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #03e9f4);
        animation: btn-anim1 1s linear infinite;
    }

    @keyframes btn-anim1 {
        0% {
            left: -100%;
        }
        50%, 100% {
            left: 100%;
        }
    }

    .login-box a span:nth-child(2) {
        top: -100%;
        right: 0;
        width: 2px;
        height: 100%;
        background: linear-gradient(180deg, transparent, #03e9f4);
        animation: btn-anim2 1s linear infinite;
        animation-delay: .25s
    }

    @keyframes btn-anim2 {
        0% {
            top: -100%;
        }
        50%, 100% {
            top: 100%;
        }
    }

    .login-box a span:nth-child(3) {
        bottom: 0;
        right: -100%;
        width: 100%;
        height: 2px;
        background: linear-gradient(270deg, transparent, #03e9f4);
        animation: btn-anim3 1s linear infinite;
        animation-delay: .5s
    }

    @keyframes btn-anim3 {
        0% {
            right: -100%;
        }
        50%, 100% {
            right: 100%;
        }
    }

    .login-box a span:nth-child(4) {
        bottom: -100%;
        left: 0;
        width: 2px;
        height: 100%;
        background: linear-gradient(360deg, transparent, #03e9f4);
        animation: btn-anim4 1s linear infinite;
        animation-delay: .75s
    }

    @keyframes btn-anim4 {
        0% {
            bottom: -100%;
        }
        50%, 100% {
            bottom: 100%;
        }
    }

    /* Кастомизация чекбокса */

    .checkbox input[type="checkbox"] {
        opacity: 0;
        cursor: pointer;
    }

    .checkbox label {
        position: relative;
        display: inline-block;
        padding-left: 32px;
        color:white;
        border: 0px white solid;
        cursor: pointer;
    }

    .checkbox label::before,
    .checkbox label::after {
        position: absolute;
        content: "";
        display: inline-block;
    }

    .checkbox label::before{
        height: 19px;
        width: 19px;
        border: 1px white solid;
        left: 0px;
        top: 1px;
    }

    .checkbox label::after {
        height: 7px;
        width: 11px;
        border-left: 2px solid;
        border-bottom: 2px solid;
        transform: rotate(-45deg);
        left: 4px;
        top: 4px;
    }


    .checkbox input[type="checkbox"] + label::after {
        content: none;
    }

    .checkbox input[type="checkbox"]:checked + label::after {
        content: "";
    }

    .checkbox input[type="checkbox"]:focus + label::before {
        outline: rgb(59, 153, 252) auto 5px;
    }

    /*Кастомизация select */

    /* Кастомизация кнопки */
    .custom-btn {
        background-color: DodgerBlue;
        border: none;
        color: white;
        padding: 8px 12px 6px 12px;
        font-size: 16px;
        cursor: pointer;
    }

    .custom-btn i {
        padding: 0px;
    }

    .custom-btn:hover {
        border:2px  #0b51c5 solid;
    }

</style>
