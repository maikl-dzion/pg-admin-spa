const BaseMixin = {

    install(Vue, options) {
        Vue.mixin({

            data: function () {
                var itemTest = {
                    'user': 'w1user',
                    'password': '1234567',
                    'dbname': 'maikldb',
                    'status': true,
                    'comment': ''
                }

                var itemTestModel = {
                    'user': {type: 'select', pos: 'row', title: 'Пользователь', width: '35%', value: ''},
                    'password': {type: 'text', pos: '', title: 'Пароль', width: '35%', value: ''},
                    'status': {type: 'checkbox', pos: 'end', title: 'Статус', width: '30%', value: ''},
                    'comment': {type: 'textarea', pos: '', title: 'Комментарий', width: '100%', value: ''},
                    'dbname': {type: 'select', pos: '', title: 'Выбрать базу', width: '100%', value: ''}
                }

                var selectTestDb = [
                    {id: 'maikldb', name: 'maikldb'},
                    {id: 'reestrsrv', name: 'reestrsrv'},
                    {id: 'reestrdb', name: 'reestrdb'}
                ]

                var selectTestUser = [
                    {id: 'w1user', name: 'w1user'},
                    {id: 'maikl_super', name: 'maikl_super'},
                    {id: 'test_user', name: 'test_user'}
                ]

                var dbConf = {
                    'host': '',
                    'dbname': '',
                    'user': '',
                    'passwd': '',
                    'driver': 'pgsql',
                    'port': 5432
                }

                var newUser = {
                    name: '',
                    password: '',
                    dbName: '',
                    superUser: false
                }

                return {

                    alertMessageShow: false,
                    alertMessage: '',

                    commonActionName: 'tables',
                    commonTitle: 'Таблицы',
                    commonItem: [],
                    commonItemName: '',

                    usersList: [],
                    userName: '',
                    userPassword: '',
                    userItem: {},
                    currentDbUser: [],
                    fileUsersConfig: [],
                    curUserInfo: {},
                    addUserFlag: false,
                    selectRole: '',

                    currentDatabase: '',
                    selectDbName: '',
                    newDbName: '',
                    dbItem: {},
                    databaseList: [],
                    curConfig: {},
                    addDbFlag: false,

                    newUser,
                    dbConf,
                    dbConfPrint: [],

                    remoteUrl: '',

                    itemTestModel,
                    itemTest,
                    selectTestDb,
                    selectTestUser,

                    sqlCommand: '',
                    sqlCommandType: 'query',
                    freeSqlCommandResult: [],

                    dbRoles: [],

                    dataShowType: 'row',

                    selectFieldType: 'VARCHAR',

                    tableFieldTypes: [
                        {name: 'integer', title: 'Число'  , size: ''},
                        {name: 'varchar', title: 'Строка'  , size: '255'},
                        {name: 'text'   , title: 'Textarea', size: ''},
                        {name: 'SERIAL' , title: 'Serial'  , size: ''}
                    ],

                }
            }, // Data

            created() {

                // this.getDbUsersList()      // usersList
                // this.getCurrentDbUser()    // currentDbUser
                // this.showDatabaseList()    // databaseList
                // this.getCurrentDatabase()  // currentDatabase
                // this.getCurConfig()        // получаем текущий конфиг
                // this.getFileUsersConfig(); // пользователи

                // this.newUser.dbName = this.currentDatabase;
                // setUserPrivileges/w1user/reestrsrv   установить привилегии к базе
                // setSuperUser/w1user  установить супер статус
            },

            methods: {

                // ######################################
                // Общие Функции

                isNumber(n) {
                    return /^-?[\d.]+(?:e-?\d+)?$/.test(n)
                },

                elemListUpdated(selector, attr, newValue, type = 'style') {
                    var oldValue = ''
                    var elementList = document.querySelectorAll(selector)
                    for (var i in elementList) {
                        if (this.isNumber(i)) {
                            let elem = elementList[i]
                            if (attr in elem[type]) {
                                oldValue = elem[type][attr] = newValue
                                elem[type][attr] = newValue
                            }
                        }
                    }
                    return oldValue
                },

                elemUpdated(event, attr, newValue, type = 'style') {
                    let el = event.currentTarget
                    // var selector = '#' + target.id;
                    // var el = target;
                    // var el = document.querySelector(target.parentNode);
                    let oldValue = el[type][attr]
                    el[type][attr] = newValue
                    return oldValue
                },

                htmlElementsRender(event, attrName, oldValue, newValue, type = 'style') {
                    let el = event.currentTarget
                    let classArr = el.className.split(' ')
                    let selector = '.' + classArr[classArr.length - 1]
                    // let selector = '.' + el.className;
                    this.elemListUpdated(selector, attrName, oldValue, type)
                    this.elemUpdated(event, attrName, newValue, type)
                },

                // переключение переменных
                toggleVar(varName) {
                    if (this[varName]) this[varName] = false
                    else this[varName] = true
                },

                alertMessageClose() {
                    this.alertMessageShow = false
                    this.alertMessage = ''
                },

                alertMessageOpen(message) {
                    this.alertMessageShow = true
                    this.alertMessage = message
                },

                alertStart(message = 'Успешное сохранение', type = 1) {
                    const item = {type, message}
                    this.sendEventBus('response_alert_message', item)
                },

                alertOpen(message) {
                    this.alertMessageShow = true
                    this.alertMessage = message
                },

                alertSuccess(text) {
                    alert(text)
                },

                getFormDataTest(data) {
                    let item = data.item
                    let fname = data.fname
                    this.itemTest = item
                },

                sqlCommandRun(type) {
                    var command = ''
                    var paramName = ''
                    switch (type) {
                        case 'get_roles' :
                            command = 'SELECT * FROM pg_roles'
                            paramName = 'dbRoles'
                            break
                    }

                    if (command) {
                        // this.commonActionName = ''
                        this.sqlCommand = command
                        this.execSqlCommand(paramName)
                    }
                },

                sqlQueryResult(resp) {
                    this.freeSqlCommandResult = resp.result
                },

                sqlButtonClick() {
                    if (this.sqlCommand) {
                        this.execSqlCommand('freeSqlCommandResult')
                    }
                },

                changeUserPassword(userName, newPassword) {
                    let url = 'CHANGE_USER_PASSWORD/' + userName + '/' + newPassword
                    return this.http(url)
                },

                // Выполняем sql команды
                execSqlCommand(paramName = '', callback = null) {
                    var url = 'EXEC_SQL_COMMAND/' + this.sqlCommand + '/' + this.sqlCommandType + '/' + this.tableName
                    this.http(url).then(resp => {
                        if (paramName) {
                            this[paramName] = resp
                        }
                        if (callback) {
                            callback(resp)
                        }
                    })
                },

                // устанавливаем настройки по умолчанию
                setDefaultConfig() {
                    var url = 'SET_DEFAULT_CONFIG'
                    this.http(url).then(resp => {
                        alert('Настройки по умолчанию установлены')
                        var res = resp
                        this.http('GET_TABLE_LIST').then(response => {
                            this.getTableListSheme()
                            this.tableList = response
                            for (var tabName in this.tableList) {
                                let item = this.tableList[tabName]
                                this.getTableFields(tabName)
                                this.commonForm(item, 'tables')
                                break
                            }
                        })
                    })
                },

                commonAction(actionName, event = null, activeClass = 'activeClass') {
                    this.commonItem = []
                    this.dbRoles = []
                    this.commonItemName = ''
                    this.freeSqlCommandResult = ''
                    this.commonActionName = actionName
                    let title = 'Левая панель'

                    switch (actionName) {
                        case 'users' :
                            title = 'Пользователи';
                            break
                        case 'tables' :
                            title = 'Таблицы';
                            break
                        case 'databases' :
                            title = 'Базы';
                            break
                        case 'get_roles' :
                            title = 'Роли'
                            this.sqlCommandRun(actionName)
                            // this.sqlCommand = 'SELECT * FROM pg_roles'
                            // this.execSqlCommand('dbRoles', response => {})
                            break
                    }

                    this.commonTitle = title
                    if (event) {
                        this.setActiveElement(event, activeClass)
                    }
                },

                commonForm(item, fname = null) {
                    let itemName = ''
                    this.commonItem = Object.assign(item, {})
                    // this.commonItem = item

                    switch (this.commonActionName) {
                        case 'users' :
                            itemName = item.usename
                            this.userName = itemName
                            break

                        case 'databases' :
                            itemName = item.datname
                            this.selectDbName = itemName
                            break

                        case 'get_roles' :
                        case 'db_roles' :
                            itemName = item.rolname
                            this.selectRole = itemName
                            break

                        case 'tables' :
                            itemName = item.table_name
                            this.tableName = itemName
                            this.fetchTableFields (this.tableName)
                            this.getTableFields(this.tableName, tableFields => {
                                this.commonItem = tableFields
                            })
                            break
                    }

                    this.commonItemName = itemName
                },

                commonDeleteField(fieldName, tableName = null) {
                    if (!tableName)
                        tableName = this.tableName
                    const url = 'DELETE_FIELD/' + tableName + '/' + fieldName
                    this.deleteField(fieldName, true, tableName).then(resp => {
                        this.fetchTableList ()
                        this.fetchTableFields (tableName)
                        this.getTableFields(tableName, resp => {
                            this.commonItem = resp
                            this.alertShow('Поле таблицы удалено')
                        })
                    })
                },

                commonDeleteTable(tableName = '') {
                    if (!tableName && !this.tableName) {
                        this.warn('Не выбрана таблица')
                        return false
                    }

                    if (!tableName) {
                        tableName = this.tableName
                    }

                    let param = tableName
                    var isDelete = confirm('Вы точно хотите удалить таблицу: ' + param + '?')
                    if (!isDelete) return false

                    var url = 'DELETE_TABLE/' + tableName
                    this.http(url).then(resp => {
                        this.tableName = ''
                        this.fetchTableList()
                        this.getTableListSheme()
                        this.http('GET_TABLE_LIST').then(resp => {
                            this.tableList = resp
                            this.commonItem = []
                            this.alertShow('Успешное удаление таблицы')
                        })
                    })
                },

                changeFieldName(fieldName, newName, tableName = null) {
                    if (!tableName) tableName = this.tableName
                    let url = 'RENAME_FIELD/' + tableName + '/' + fieldName + '/' + newName
                    this.http(url).then(resp => {
                        this.getTableFields(tableName, resp => {
                            this.commonItem = resp
                            this.alertShow('Успешное изменение поля')
                        })
                    })
                },

                changeFieldType(fieldName, newType, tableName = null) {
                    if (!tableName) tableName = this.tableName
                    let url = 'changeFieldType/' + tableName + '/' + fieldName + '/' + newType
                    this.http(url).then(resp => {
                        this.fetchTableFields (tableName)
                        this.getTableFields(tableName, resp => {
                            this.commonItem = resp
                            this.alertShow('Тип поля изменен')
                        })
                    })
                },

                checkName(item, fname, message) {
                    if (!item) {
                        if (!this[fname]) {
                            alert(message)
                            return false
                        }
                        item = this[fname]
                    }
                    return item
                },

                // ######################################
                // Функции для управлениями пользователя

                // все пользователи
                getDbUsersList() {
                    var url = 'getDbUsersList'
                    this.http(url).then(resp => {
                        this.usersList = resp
                        this.getFileUsersConfig(this.combineUsersParams)
                    })
                },

                combineUsersParams(files) {
                    var fileUsers = files
                    var users = this.usersList
                    for (let i in users) {
                        let userName = users[i]['usename']
                        let item = users[i]
                        if (userName in fileUsers) {
                            let us = fileUsers[userName]
                            let passwd = us['passwd']
                            for (var f in us) {
                                item[f] = us[f]
                            }
                            users[i] = item
                        }
                    }
                    this.usersList = users
                },

                getCurrentDbUser() {
                    const url = 'CURRENT_DB_USER'
                    this.http(url).then(resp => {
                        this.currentDbUser = resp
                        let len = this.currentDbUser.length
                        this.curUserInfo = this.currentDbUser[len - 1];

                        const currentUser = this.curUserInfo.usename;
                        const currentDb   = this.curUserInfo.datname;

                        this.setStoreParam ({ name : 'currentUser',   value : currentUser})
                        this.setStoreParam ({ name : 'currentDb',     value : currentDb})
                        this.setStoreParam ({ name : 'currentConfig', value : this.curUserInfo})
                    })
                },

                getFileUsersConfig(callback = null) {
                    var url = 'GET_FILE_USERS_CONFIG'
                    this.http(url).then(resp => {
                        this.fileUsersConfig = resp
                        if (callback) callback(this.fileUsersConfig)
                    })
                },

                selectUserPassword(userName, users = null) {
                    if(!users) users = this.usersList
                    for (let i in users) {
                        let name = users[i]['usename']
                        if (userName == name) {
                            let passwd = users[i]['passwd']
                            this.dbConf['passwd'] = passwd
                            return true
                        }
                    }
                },

                createDbUser() {
                    var funcName = 'createUser'
                    let name = this.newUser.name
                    let password = this.newUser.password
                    if (!name || !password) {
                        this.warn('Нет обязательных полей')
                        return false
                    }
                    let dbname = this.newUser.dbName
                    let superState = this.newUser.superUser
                    if (!dbname) dbname = this.currentDatabase
                    if (!dbname) dbname = 0
                    let url = funcName + '/' + name + '/' + password + '/' + dbname + '/' + superState

                    this.http(url).then(resp => {
                        this.storeFetch('fetchUserList')
                        this.alertShow('Пользователь успешно создан')
                        this.getDbUsersList()
                    })
                },

                setUserName(item) {
                    this.userItem = item
                    this.userName = item.usename
                },

                deleteDbUser(userName = '') {
                    let message = 'Не выбран пользователь'
                    let name = this.checkName(userName, 'userName', message)
                    if (!name) return false

                    var url = 'deleteDbUser/' + name
                    this.http(url).then(resp => {
                        this.userName = ''
                        this.fetchUserList()
                        this.alertShow('Пользователь удален')
                        this.getDbUsersList()
                    })
                },

                // Установить привилегии к базе
                setUserPrivileges(userName, dbName) {
                    const url = 'setUserPrivileges/' + userName + '/' + dbName
                    this.http(url).then(resp => {
                        const message = 'Пользователь ' + userName + ': Права к базе ' + dbName + ' установлены'
                        this.alertShow(message);
                        this.fetchDbList()
                        this.fetchUserList()
                    })
                },

                // Удалить привилегии к базе
                delUserPrivileges(userName, dbName) {
                    const url = 'delUserPrivileges/' + userName + '/' + dbName
                    this.http(url).then(resp => {
                        const message = 'Пользователь ' + userName + ': Права к базе ' + dbName + ' удалены'
                        this.alertShow(message);
                        this.fetchDbList()
                        this.fetchUserList()
                    })
                },

                // установить супер статус пользователя
                setUserSuperStatus(userName) {
                    if (!userName) {
                        alert('Не выбран пользователь')
                        return false
                    }
                    var url = 'setSuperUser/' + userName
                    this.http(url).then(resp => {
                        alert('Пользователь ' + userName + ': Права суперпользователя установлены')
                        let res = resp
                    })
                },

                // удалить права супер статус пользователя
                delUserSuperStatus(userName) {
                    if (!userName) {
                        alert('Не выбран пользователь')
                        return false
                    }
                    var url = 'delSuperUser/' + userName
                    this.http(url).then(resp => {
                        alert('Пользователь ' + userName + ': Права суперпользователя удалены')
                        let res = resp
                    })
                },

                // ###################################
                // Функции для работы с базой данных
                showDatabaseList() {
                    var url = 'SHOW_DATABASE_LIST/'
                    this.http(url).then(resp => {
                        this.databaseList = resp
                    })
                },

                getCurrentDatabase() {
                    var url = 'CURRENT_DATABASE'
                    this.http(url).then(resp => {
                        this.currentDatabase = resp[0]['current_database']
                    })
                },

                // Создаем новый конфиг базы
                saveConfig() {
                    var isDelete = confirm('Вы точно хотите изменить настройки базы?')
                    if (!isDelete) return false

                    let url = 'SAVE_CONFIG'
                    let postData = this.dbConf

                    this.http(url, postData, 'post').then(resp => {
                        alert('Конфигурация базы успешно изменена,страница перезагрузиться')
                        let href = document.location.href
                        window.location.reload(href)
                    })
                },

                //
                getCurConfig() {
                    var url = 'GET_CUR_CONFIG'
                    this.http(url).then(resp => {
                        this.curConfig = resp
                        this.dbConf    = resp
                        this.dbConfPrint = Object.assign({}, resp)
                    })
                },

                selectDbItem(item) {
                    this.selectDbName = item.datname
                    this.dbItem = item
                },

                addNewDb() {
                    if (!this.newDbName) {
                        this.warn('Нет имени базы')
                        return false
                    }
                    var url = 'addNewDb/' + this.newDbName
                    this.http(url).then(response => {
                        this.newDbName = ''
                        this.alertShow('Новая база создана')
                        this.$store.dispatch('fetchDbList')
                        this.showDatabaseList()
                    })
                },

                deleteDb(dbName) {
                    let message = 'Не выбрана база'
                    let name = this.checkName(dbName, 'selectDbName', message)
                    if (!name) return false

                    let param = dbName
                    var isDelete = confirm('Вы точно хотите удалить базу: ' + param + '?')
                    if (!isDelete) return false

                    var url = 'deleteDb/' + name
                    this.http(url).then(resp => {
                        this.alertShow('База "' + dbName + '" удалена')
                        this.$store.dispatch('fetchDbList')
                        this.showDatabaseList()
                    })
                },

                // ---
                getDbDump(userName, userPassword, dbName) {
                    var remoteUrl = 'http://185.63.191.96'
                    var apiUrl = this.apiUrl
                    this.apiUrl = remoteUrl
                    var url = 'pg_dump.php?user=' + userName + '&password=' + userPassword + '&dbname=' + dbName
                    this.http(url).then(resp => {
                        this.apiUrl = apiUrl
                        this.remoteUrl = remoteUrl + '/' + resp
                        alert('Дамп базы выполнен')
                        let res = resp
                    })
                }

            } // Methods

        })
    }
}

export default BaseMixin
