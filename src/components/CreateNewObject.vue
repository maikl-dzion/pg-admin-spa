<template>
<div style="width:100%;" >

  <div style="display: flex; width:100%;" >

      <!--<div class="login-box" style="width:800px;-->
                                    <!--height: 70px;-->
                                    <!--padding:0px 5px 0px 5px;">-->
          <!--<div class="div-row-flex" >-->
              <!--<div class="user-box" style="width:7%;" >-->
                  <!--<i class="fas fa-database" ></i>-->
              <!--</div>-->
              <!--<div class="user-box" style="width:50%;">-->
                  <!--<input v-model="newDbName" type="text" required="">-->
                  <!--<label style="padding-left:8px; padding-top:16px ">Имя базы</label>-->
              <!--</div>-->

              <!--<div class="user-box" style="width:43%; border-bottom: 0px" >-->
                  <!--&lt;!&ndash;<SimpleButton></SimpleButton>&ndash;&gt;-->
                  <!--<BlueBtn-->
                      <!--title="Создать новую базу"-->
                      <!--@btn_click="test1"-->
                  <!--&gt;</BlueBtn>-->

              <!--</div>-->
          <!--</div>-->
      <!--</div>-->

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
                      <i class="fab fa-sourcetree" ></i>
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
                              style="width:98%; background: transparent; border: 1px white solid" >
                              <option v-for="(db) in getDbList" :name="db.datname">
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

      <!--<div style="width:300px; margin:4px; border:0px orange solid">-->

          <!--<div  style="width:180px; border:0px green solid" >-->
              <!--<BlueBtn-->
                  <!--title="Сохранить"-->
                  <!--@btn_click="test1"-->
              <!--&gt;</BlueBtn>-->
          <!--</div>-->

      <!--</div>-->

  </div> <hr>

  <div style="display: flex; width:100%;" >

        <div class="card" style="width: 50%" >
            <div class="card-body" style="margin:0px; padding:10px;">
                <p class="h6 text-center" style="margin-bottom:10px;">
                    Создать новую таблицу</p><hr>
                <div style="margin:0px; padding:0px;" >

                    <div class="md-form" style="margin:0px; padding:0px;">
                        <i class="far fa-credit-card prefix green-text" ></i>
                        <input type="text"  class="form-control" >
                        <label class="font-weight-light">Имя таблицы</label>
                    </div>

                    <div style="display: flex" >

                        <div class="md-form" style="width: 90%; margin:0px; padding:0px;">
                            <i class="fab fa-buffer prefix green-text" ></i>
                            <input type="text"  class="form-control" >
                            <label class="font-weight-light">Имя id поля</label>
                        </div>

                        <div style="width: 10%;" >
                            <a class="btn-floating btn-sm btn-mdb-color" style="width:100%">
                                <i class="fas fa-plus-circle"
                                   style="height:100%;width:75%;
                                          text-align:center; color:white; " ></i>
                            </a>
                        </div>
                    </div>

                    <div class="text-center" style="margin:0px; padding:0px;">
                        <button class="btn btn-mdb-color waves-effect"
                                style="width:98%;" >Сохранить</button>
                    </div>
                </div>
            </div></div>

        <div class="card" style="width: 50%; height: 100%; margin-left:10px;" >
            <div class="card-body" style="margin:0px; padding:10px;">

                <div style="width: 35px; position: absolute; top:5px; right:8px;" >
                    <a @click="pushFieldToArray(true)"
                        class="btn-floating btn-sm btn-mdb-color"
                        style="width:100%; padding:9px 5px 5px 5px;">
                        <i class="fas fa-plus-circle"
                           style="width:100%;text-align:center;
                                  color:white; font-size:20px;" ></i>
                    </a>
                </div>

                <p class="h6 text-center" style="margin-bottom:10px;">
                    Создать новое поле</p><hr>

                <div style="margin:0px; padding:0px;" >

                    <template v-for="(list) in newFieldsListSecond" >
                        <div  style="display: flex" :key="list.name" >

                            <div class="md-form" style="width:67%; margin:0px; padding:0px;">
                                <i class="fab fa-buffer prefix green-text" ></i>
                                <input v-model="list.name" type="text" class="form-control" />
                                <label class="font-weight-light">Имя поля</label>
                            </div>

                            <select v-model="list.type" placeholder="Тип поля"
                                    class="browser-default custom-select"
                                    style="margin-left:10px; border-radius:0px; cursor:pointer; width:30%;">
                                    <option v-for="(item) in tableFieldTypes"
                                        :value="item.name" class="form-control">
                                        {{item.name}}
                                    </option>
                            </select>

                        </div>
                    </template>

                    <div class="text-right" style="margin:0px; padding:0px;">
                        <button class="btn btn-mdb-color waves-effect"
                                style="width:60%;" >Сохранить</button>
                    </div>
                </div>
            </div></div>

    </div>

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
  },
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

    /*Outer box of the fake checkbox*/
    .checkbox label::before{
        height: 19px;
        width: 19px;
        border: 1px white solid;
        left: 0px;
        top: 1px;
    }

    /*Checkmark of the fake checkbox*/
    .checkbox label::after {
        height: 7px;
        width: 11px;
        border-left: 2px solid;
        border-bottom: 2px solid;
        transform: rotate(-45deg);
        left: 4px;
        top: 4px;
    }

    /*Hide the checkmark by default*/
    .checkbox input[type="checkbox"] + label::after {
        content: none;
    }

    /*Unhide on the checked state*/
    .checkbox input[type="checkbox"]:checked + label::after {
        content: "";
    }

    /*Adding focus styles on the outer-box of the fake checkbox*/
    .checkbox input[type="checkbox"]:focus + label::before {
        outline: rgb(59, 153, 252) auto 5px;
    }

</style>
