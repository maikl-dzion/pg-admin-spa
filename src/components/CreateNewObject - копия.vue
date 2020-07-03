<template>
<div style="width:100%;" >

  <div style="display: flex; width:100%;" >

    <div class="card" style="width: 50%" >
        <div class="card-body" style="margin:0px; padding:10px;">
            <p class="h6 text-center" style="margin-bottom:10px;">Создать новую базу</p><hr>
            <div style="margin:0px; padding:0px;" >
                <div class="md-form" style="margin:0px; padding:0px;">
                    <i class="fas fa-database prefix green-text" ></i>
                    <input type="text" class="form-control" >
                    <label class="font-weight-light">Имя базы</label>
                </div>

                <div class="text-center" style="margin:0px; padding:0px;">
                    <button class="btn btn-mdb-color waves-effect"
                            style="width:98%;" >Сохранить</button>
                </div>
            </div>
    </div></div>

    <div class="card" style="width: 50%; margin-left:10px;" >
          <div class="card-body" style="margin:0px; padding:10px;">
              <p class="h6 text-center" style="margin-bottom:10px;">
                  Создать нового пользователя</p><hr>
              <div style="margin:0px; padding:0px;" >
                  <div class="md-form" style="margin:0px; padding:0px;">
                      <i class="fas fa-address-card prefix green-text" ></i>
                      <input type="text"  class="form-control" >
                      <label class="font-weight-light">Имя пользователя</label>
                  </div>

                  <div class="text-center" style="margin:0px; padding:0px;">
                      <button class="btn btn-mdb-color waves-effect"
                              style="width:98%;" >Сохранить</button>
                  </div>
              </div>
      </div></div>

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
export default {
  name: 'CreateNewObjects',
  created () {
    this.pushFieldToArray(true)
  }
}
</script>

<style scoped>

</style>
