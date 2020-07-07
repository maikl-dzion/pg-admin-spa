export default {
    // --- Data
    data: () => ({
         tableInfoList : [],
    }),

    // --- Create
    created () {

    },

    // --- Methods
    methods: {

        schemeMenuAction (actionName, event = null, activeClass = 'activeClass') {

            let title = ''
            this.commonActionName = actionName
            // let tableList = this.getDbTables

            switch (this.commonActionName) {
                case 'users'     : title = 'Пользователи'; break
                case 'tables'    :
                    title = 'Таблицы';
                    this.tableInfoList = []
                    let tableList = this.getDbTables
                    let ch = 1;
                    let left = 10
                    let right = 120
                    let zIndex = 1
                    for(let i in tableList) {
                        ch++
                        zIndex++
                        left = left + 50
                        right = right + 50
                        let item = tableList[i];
                        let tableName = item.table_name
                        this.getTableFieldsForm(tableName, { left, right, zIndex})
                    }
                    break

                case 'databases' : title = 'Базы'; break
                case 'get_roles' : title = 'Роли'
                    // this.sqlCommandRun(actionName)
                    break
            }

            this.commonTitle = title
            if (event)
                this.setActiveElement(event, activeClass)
        },

        // Получить поля таблицы
        async getTableFieldsForm(tableName, pos) {
            let url = 'GET_TABLE_FIELDS/' + tableName
            let fields = await this.http(url);
            let json = {
                name : tableName,
                fields : fields,
                left : pos.left,
                right: pos.right,
                zIndex : pos.zIndex
            }
            this.tableInfoList.push(json)
        },
    },
}
