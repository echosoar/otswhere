const matchPrefix = '#otswhere#';
const prefixReg = new RegExp('^' + matchPrefix + '(\\d+)');
const kuoReg = /\(([^\)]*)\)/ig;
const andReg = /\s*&\s*/;
const orReg = /\s*\|\s*/;
const equalReg = /([!<>]?=|[<>])/;

class OTSWhere {
  constructor(options) {
    options = options || {};
    this.matchMap = {};
    this.matchIndex = 0;
    this.TableStore = options.TableStore || require('tablestore');
    this.equalMap = {
      '=': this.TableStore.ComparatorType.EQUAL,
      '!=': this.TableStore.ComparatorType.NOT_EQUAL,
      '>': this.TableStore.ComparatorType.GREATER_THAN,
      '>=': this.TableStore.ComparatorType.GREATER_EQUAL,
      '<': this.TableStore.ComparatorType.LESS_THAN,
      '<=': this.TableStore.ComparatorType.LESS_EQUAL
    };
  }

  formatItem(str) {
    str = this.trim(str);
    if (prefixReg.test(str)) {
      return this.matchMap[prefixReg.exec(str)[1]];
    } else if (equalReg.test(str)){
      const ComparatorType = equalReg.exec(str)[1];
      const [key, value] = str.split(ComparatorType);
      return new this.TableStore.SingleColumnCondition(this.trim(key), this.trim(value), this.equalMap[ComparatorType], false);
    }
  }

  trim(str) {
    return str.replace(/^\s*|\s*$/ig, '')
  }

  format(str) {
    if (kuoReg.test(str)) {
      str = str.replace(kuoReg, (_, match) => {
        const currentIndex = this.matchIndex++;
        this.matchMap[currentIndex] = this.format(match);
        return matchPrefix + currentIndex;
      });
    }
  
    let condition = null;
    let split = null;
    let logicalOperator = null;
    if (andReg.test(str)) {
      split = andReg;
      logicalOperator = this.TableStore.LogicalOperator.AND;
    } else if (orReg.test(str)) {
      split = orReg;
      logicalOperator = this.TableStore.LogicalOperator.OR;
    }
  
    if (split) {
      const splitStr = str.split(split);
      if (splitStr.length > 1) {
        condition = new this.TableStore.CompositeCondition(logicalOperator);
        splitStr.forEach(item => {
          condition.addSubCondition(this.formatItem(item));
        });
      } else {
        const item = splitStr[0];
        condition = this.formatItem(item);
      }
    } else {
      condition = this.formatItem(str);
    }
    return condition;
  }
}

module.exports = (where, options) => {
  const f = new OTSWhere(options);
  return f.format(where);
};