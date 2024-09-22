
import "@arco-design/web-react/dist/css/arco.css";
import { useState } from 'react';
import {
  Collapse,
  Typography,
  Input,
  Form,
  Button,
  Divider
} from '@arco-design/web-react'
import { Grid } from '@arco-design/web-react'
import Check from '../Component/Check'
import CodeDisplay from '../Component/Code'
import data from './sensitive.json';
const Row = Grid.Row;
const Col = Grid.Col;
const CollapseItem = Collapse.Item;
const { Title, Paragraph, Text } = Typography;

const Content_02 = ({ form }) => {
    const [code, setCode] = useState('');
    const handleGenerateCode = () => {
        const values = form.getFieldsValue();
        const Directory = values.Directory;
        const Ext = values.Extensions;
        const Rules = values.Rules || [];
        const extractedRules = Rules.map(index => data[index].Pattern);
        let newCode = "";
        extractedRules.forEach(item => {
            item = item.replaceAll('"','\\"')
            newCode += `
find {Directory} -regextype posix-egrep -regex ".*\\.({Ext})" -type f -print0 | xargs -0 egrep -Hi "`+item+`" | sort -u
        `;
        });
        newCode = newCode.replaceAll("{Directory}",Directory).replaceAll("{Ext}",Ext);
        setCode(newCode);
    };
    const options = data.map(item => item.Caption);
    const handleCheckboxChange = (checkedValues) => {
        form.setFieldsValue({ Rules: checkedValues });
    };
    return (
        <div>
            <Collapse>
                <CollapseItem header='Introduction' name='1'>
                <Typography style={{ textAlign: 'left' }}>
                    <Paragraph>1. When a host is compromised and emergency response is initiated, it is necessary to scan for sensitive information on the host to prevent related data from being exploited by hackers.</Paragraph>
                    <Paragraph>2. The MITRE Corporation provides a catalog of Common Weakness Enumerations (CWE), documenting issues that should be avoided.
                    <ul>
                        <li><a href="https://cwe.mitre.org/data/definitions/798.html" rel="nofollow">CWE-798 - Use of Hardcoded Credentials</a></li>
                        <li><a href="https://cwe.mitre.org/data/definitions/259.html" rel="nofollow">CWE-259 - Use of Hardcoded Password</a></li>
                        <li><a href="https://cwe.mitre.org/data/definitions/321.html" rel="nofollow">CWE-321 - Use of Hardcoded Cryptographic Key</a></li>
                        <li><a href="https://cwe.mitre.org/data/definitions/257.html" rel="nofollow">CWE-257 - Storing Password in a Recoverable Format</a></li>
                        <li><a href="https://cwe.mitre.org/data/definitions/312.html" rel="nofollow">CWE-312 - Cleartext Storage of Sensitive Information</a></li>
                        <li><a href="https://cwe.mitre.org/data/definitions/327.html" rel="nofollow">CWE-327 - Use of Broken or Risky Cryptographic Algorithm</a></li>
                        <li><a href="https://cwe.mitre.org/data/definitions/338.html" rel="nofollow">CWE-338 - Use of Cryptographically Weak Pseudo-Random Number Generator (PRNG)</a></li>
                        <li><a href="https://cwe.mitre.org/data/definitions/615.html" rel="nofollow">CWE-615 - Information Exposure Through Comments</a></li>
                        <li><a href="https://cwe.mitre.org/data/definitions/546.html" rel="nofollow">CWE-546 - Suspicious Comments</a></li>
                        <li><a href="https://cwe.mitre.org/data/definitions/521.html" rel="nofollow">CWE-521 - Weak Password Requirements</a></li>
                    </ul>
                    </Paragraph> 
                    <Paragraph>
                        3. Reference
                        <ul>
                            <li><a href="https://github.com/americanexpress/earlybird" rel="nofollow">https://github.com/americanexpress/earlybird</a></li>
                            <li><a href="https://github.com/Skyscanner/whispers" rel="nofollow">https://github.com/Skyscanner/whispers</a></li>
                        </ul>  
                    </Paragraph>
                </Typography> 
                </CollapseItem>
                <CollapseItem header='Rules' name='2'>
                <Paragraph style={{ textAlign: 'left' }}>
                    <CodeDisplay codeString={JSON.stringify(data, null, 2)} />
                </Paragraph>
                </CollapseItem>
            </Collapse>
            <Divider />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Row className='grid' style={{ marginBottom: 16 }}>
                    <Col span={24}>
                    <Form
                        form={form}
                        style={{ width: 600 }}
                        initialValues={{
                            Extensions: 'yml|yaml|ini|conf|cnf|xml|cfg|properties|sql|log|sh|py|ts|tsx|md', // 设置初始值
                            Directory: '.',
                            Rules: []
                        }}
                        autoComplete='off'
                        onValuesChange={(v, vs) => {
                        console.log(v, vs);
                        }}
                        onSubmit={(v) => {
                        console.log(v);
                        }}
                    >
                        <Form.Item label='Rules' field='Rules' rules={[{ required: true }]}>
                            <Check options={options} onChange={handleCheckboxChange} />
                        </Form.Item>
                        <Form.Item label='Directory' field='Directory' rules={[{ required: true }]}>   
                            <Input
                                placeholder='Enter Directory'
                            />
                        </Form.Item>
                        <Form.Item label='Extensions' field='Extensions' rules={[{ required: true }]}>   
                            <Input.TextArea
                                placeholder='Enter File Extensions'
                                wrapperStyle={{ width: 300 }}
                            />
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