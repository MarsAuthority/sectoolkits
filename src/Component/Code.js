import React, { useState } from 'react';
import { Card, Button, Message } from '@arco-design/web-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyToClipboard from 'react-copy-to-clipboard';

const CodeDisplay = ({ codeString }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        Message.success('代码已复制到剪贴板');
    };

    return (
        <div style={{ width: '100%', margin: '20px auto' }}>
            <Card style={{ width: '100vh', margin: '20px auto' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                    <CopyToClipboard text={codeString} onCopy={handleCopy}>
                    <Button type="text" size="small">
                        {copied ? '已复制' : '复制'}
                    </Button>
                    </CopyToClipboard>
                </div>
                <SyntaxHighlighter language="javascript" style={solarizedlight}>
                {codeString}
                </SyntaxHighlighter>
            </Card>
        </div>
    );
};

export default CodeDisplay;