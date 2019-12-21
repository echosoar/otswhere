const OTSWhere = require('../src');
const TableStore = require('tablestore');
const assert = require('assert');
describe('otswhere', () => {
    it('a= & b=', async () => {
        const result = OTSWhere('name=test & age=1');
        assert(
            result.combinator === TableStore.LogicalOperator.AND &&
            result.sub_conditions &&
            result.sub_conditions.length === 2 &&
            result.sub_conditions[0].columnName === 'name' &&
            result.sub_conditions[0].columnValue === 'test' &&
            result.sub_conditions[1].columnName === 'age' &&
            result.sub_conditions[1].columnValue === '1'
        );
    });
    it('a= | (b< & c>)', async () => {
        const result = OTSWhere('name=test | (age<10 & a > 5)');
        assert(
            result.combinator === TableStore.LogicalOperator.OR &&
            result.sub_conditions &&
            result.sub_conditions.length === 2 &&
            result.sub_conditions[0].columnName === 'name' &&
            result.sub_conditions[0].columnValue === 'test' &&
            result.sub_conditions[1].combinator === TableStore.LogicalOperator.AND &&
            result.sub_conditions[1].sub_conditions &&
            result.sub_conditions[1].sub_conditions.length === 2
        );
    });
});