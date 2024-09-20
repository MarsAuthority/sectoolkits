import { useState } from 'react';
import { Checkbox } from '@arco-design/web-react';

const CheckboxGroup = Checkbox.Group;
const options = ['Option 1', 'Option 2', 'Option 3'];

function Check() {
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(true);
    const [value, setValue] = useState([0, 1, 2]); // 默认勾选所有复选框
  
    function onChangeAll(checked) {
      if (checked) {
        setIndeterminate(false);
        setCheckAll(true);
        setValue([0, 1, 2]);
      } else {
        setIndeterminate(false);
        setCheckAll(false);
        setValue([]);
      }
    }
  
    function onChange(checkList) {
      setIndeterminate(!!(checkList.length && checkList.length !== options.length));
      setCheckAll(!!(checkList.length === options.length));
      setValue(checkList);
    }
  
    return (
      <div style={{ marginTop: 5 }}>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'left' }}>
          <Checkbox onChange={onChangeAll} checked={checkAll} indeterminate={indeterminate}>
            {checkAll ? 'unCheck All' : 'Check All'}
          </Checkbox>
        </div>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'left' }}>
          <CheckboxGroup
            value={value}
            options={options.map((x, i) => ({
              label: x,
              value: i,
            }))}
            onChange={onChange}
          />
        </div>
      </div>
    );
}

export default Check;