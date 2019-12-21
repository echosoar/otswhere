const format = require('../format');
const assert = require('assert');
describe('format', () => {
    it('row', async () => {
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
        assert(row && row.name === 'test row' && row.age === 24);
    });

    it('row filter', async () => {
        const row = format.row({
            primaryKey: [
                { name: 'name', value: 'test row'},
                { name: 'id', value: 123456 }
            ],
            attributes: [
                { columnName: 'age', columnValue: 24 },
                { columnName: 'address', columnValue: 'HangZhou,China' },
            ]
        }, { id: true });
        assert(row && row.name && !row.id);
    });

    it('rows', async () => {
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
            ]
        });
        assert(rows.list && rows.list.length === 2);
    });
});