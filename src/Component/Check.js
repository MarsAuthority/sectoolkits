import { useState, useEffect } from 'react';
import { Checkbox } from '@arco-design/web-react';

const CheckboxGroup = Checkbox.Group;

function Check({ options, onChange }) {
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(true);
    const [value, setValue] = useState([]); // 初始值为空数组

    // 使用 useEffect 来根据 options 设置默认选中值
    useEffect(() => {
        if (value.length === 0 && options.length > 0) {
            setValue(options.map((_, index) => index)); // 设置为所有选项的索引
            onChange(options.map((_, index) => index)); // 更新父组件中的值
            setCheckAll(true); // 默认全选
            setIndeterminate(false); // 不处于不确定状态
        }
    }, [options]); // 当 options 改变时重新计算

    function onChangeAll(checked) {
        if (checked) {
            const allValues = options.map((_, index) => index); // 全选时设置为所有选项的索引
            setValue(allValues);
            onChange(allValues); // 更新父组件中的值
            setIndeterminate(false);
            setCheckAll(true);
        } else {
            setValue([]); // 清空选择
            onChange([]); // 更新父组件中的值
            setIndeterminate(false);
            setCheckAll(false);
        }
    }

    function handleCheckboxChange(checkList) {
        setIndeterminate(!!(checkList.length && checkList.length !== options.length));
        setCheckAll(!!(checkList.length === options.length));
        setValue(checkList);
        onChange(checkList); // 更新父组件中的值
    }

    return (
        <div style={{ marginTop: 5 }}>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'left' }}>
                <Checkbox onChange={onChangeAll} checked={checkAll} indeterminate={indeterminate}>
                    {checkAll ? 'unCheck All' : 'Check All'}
                </Checkbox>
            </div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'left', textAlign: 'left' }}>
                <CheckboxGroup
                    value={value}
                    options={options.map((x, i) => ({
                        label: x,
                        value: i,
                    }))}
                    onChange={handleCheckboxChange} // 使用新的函数名来处理复选框变化
                />
            </div>
        </div>
    );
}

export default Check;