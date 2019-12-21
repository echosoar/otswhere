## OTSWhere

使阿里云表格存储 OTS 的条件过滤变得更简单

### Usage
```shell
$ npm i otswhere
```
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

### Operator
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


© MIT by echosoar 