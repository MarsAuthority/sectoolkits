
import "@arco-design/web-react/dist/css/arco.css";
import { useState } from 'react';
import {
  Layout,
  Menu,
  Input,
  Form,
  Button,
  Divider
} from '@arco-design/web-react';
import { Grid } from '@arco-design/web-react';
import Check from '../Component/Check'
import CodeDisplay from '../Component/Code'
const Row = Grid.Row;
const Col = Grid.Col;

const Content_02 = ({ form }) => {
    const [code, setCode] = useState('');
    const handleGenerateCode = () => {
        const newCode = `
find . -regextype posix-egrep -regex ".*\\.(yml|yaml|ini|conf|cnf|xml|cfg|properties|sql|log|sh|py|ts|tsx|md)" -type f -print0 | xargs -0 egrep -Hi "\\b(passwd|password|pwd|pass)\\s*[:=]\\s*[\\"']?\\w+[\\"']?\\b" | sort -u
        `;
        setCode(newCode);
    };
    return (
        <div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Row className='grid' style={{ marginBottom: 16 }}>
                    <Col span={24}>
                    <Form
                        form={form}
                        style={{ width: 600 }}
                        initialValues={{ name: 'admin' }}
                        autoComplete='off'
                        onValuesChange={(v, vs) => {
                        console.log(v, vs);
                        }}
                        onSubmit={(v) => {
                        console.log(v);
                        }}
                    >
                        <Form.Item label='Options' field='Options' rules={[{ required: true }]}>
                            <Check />
                        </Form.Item>
                        <Form.Item label='Extensions' field='Extensions' rules={[{ required: true }]}>
                            <Input allowClear  placeholder='Enter Filename extension' />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 0 }}>
                        <Button type='primary' style={{ marginRight: 24 }} onClick={handleGenerateCode}>
                            Generate
                        </Button>
                        <Button
                            style={{ marginRight: 24 }}
                            onClick={() => {
                            form.resetFields();
                            }}
                        >
                            Reset
                        </Button>
                        </Form.Item>
                    </Form>
                    </Col>
                </Row>
            </div>
            <Divider />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Row className='grid' style={{ marginBottom: 16 }}>
                <Col span={24}>
                    {code && <CodeDisplay codeString={code} />}
                </Col>
                </Row>
            </div>
        </div>
    );
};

export default Content_02;