# OTSWhere

使阿里云表格存储 OTS 的条件过滤与数据格式化变得更简单

## Usage
```shell
$ npm i otswhere
```

### where 条件过滤
```js

const OTSWhere = require('otswhere');
const tbCondition = OTSWhere('(name=test&age>20)|age<18');

const params = {
    tableName: 'test',
    direction: TableStore.Direction.BACKWARD,
    inclusiveStartPrimaryKey: [{ id: TableStore.INF_MAX }],
    exclusiveEndPrimaryKey: [{ id: TableStore.IN_MIN }],
    columnFilter: tbCondition // where condition
};
```

#### Operator
| operator | comment |
| --- | --- |
| = | TableStore.ComparatorType.EQUAL |
| != | TableStore.ComparatorType.NOT_EQUAL |
| > | TableStore.ComparatorType.GREATER_THAN |
| >= | TableStore.ComparatorType.GREATER_EQUAL |
| < | TableStore.ComparatorType.LESS_THAN |
| <= | TableStore.ComparatorType.LESS_EQUAL |
| & | TableStore.LogicalOperator.AND |
| \| | TableStore.LogicalOperator.OR |

### 数据格式化
将表格存储 getRange 与 getRow 返回的数据进行格式化，分别变为列表与对象：
```js
const format = require('otswhere/format');

// for getRow
const row = format.row({
    primaryKey: [
        { name: 'name', value: 'test row'},
        { name: 'id', value: 123456 }
    ],
    attributes: [
        { columnName: 'age', columnValue: 24 },
        { columnName: 'address', columnValue: 'HangZhou,China' },
    ]
});

console.log(row);
// {
//   name: 'test row',
//   id: 123456,
//   age: 24,
//   address: 'HangZhou,China'
// }


// for getRange
const rows = format.rows({
    rows: [
        {
            primaryKey: [ { name: 'name', value: '1' }],
            attributes: [ { columnName: 'age', columnValue: 24 }]
        },
        {
            primaryKey: [ { name: 'name', value: '2' }],
            attributes: [ { columnName: 'age', columnValue: 23 }]
        }
    ],
    next_start_primary_key: [
        { name: 'name', value: 3 }
    ]
});

console.log(rows);
// {
//   list: [
//      { name: '1', age: 24' },
//      { name: '2', age: 23 },
//   ],
//   next: {
//      name: 3
//   }
// }
```



© MIT by echosoar 