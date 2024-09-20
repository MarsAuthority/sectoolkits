import logo from './logo.svg';
import './App.css';
import "@arco-design/web-react/dist/css/arco.css";
import { useState } from 'react';
import {
  Layout,
  Menu,
  Form,
  Button,
  Divider
} from '@arco-design/web-react';

import { IconHome, IconCalendar } from '@arco-design/web-react/icon';
import { Grid } from '@arco-design/web-react';
import Check from './Component/Check'
import CodeDisplay from './Component/Code'
import contentData from './data/data.json'; // 导入 JSON 数据
import Content_02 from './data/02'; // 导入复杂内容组件
const Row = Grid.Row;
const Col = Grid.Col;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Sider = Layout.Sider;
const Content = Layout.Content;
const collapsedWidth = 60;
const normalWidth = 220;


function App() {
  const [form] = Form.useForm();
  const [selectedKey, setSelectedKey] = useState('1'); // 默认选中第一个菜单项
  const [collapsed, setCollapsed] = useState(false);
  const [siderWidth, setSiderWidth] = useState(normalWidth);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
    setSiderWidth(collapsed ? collapsedWidth : normalWidth);
  };

  const handleMoving = (_, { width }) => {
    if (width > collapsedWidth) {
      setSiderWidth(width);
      setCollapsed(!(width > collapsedWidth + 20));
    } else {
      setSiderWidth(collapsedWidth);
      setCollapsed(true);
    }
  };

  const handleMenuClick = (key) => {
    setSelectedKey(key); // 更新选中的菜单项
  };

  const renderContent = () => {
    const selectedContent = contentData[selectedKey]; // 根据 selectedKey 获取内容
    if (selectedContent.content === '02') {
      return (
        <Content_02 form={form} />
      );
    }
    return (
      <div>
        <h2>{selectedContent.title}</h2>
        <p>{selectedContent.content}</p>
      </div>
    );
  };

  return (
    <Layout className='byte-layout-collapse-demo'>
      <Sider
        collapsible
        theme='light'
        onCollapse={onCollapse}
        collapsed={collapsed}
        width={siderWidth}
        style={{ height: '100vh' }}
        resizeBoxProps={{
          directions: ['right'],
          onMoving: handleMoving,
        }}
      >
        <div className='logo' />
        <Menu theme='light' defaultOpenKeys={['layout']} style={{ width: '100%' }}>
          <MenuItem key='1' onClick={() => handleMenuClick('1')}>
            <IconHome />
            安全工具箱
          </MenuItem>
          <SubMenu
            key='layout'
            title={
              <span>
                <IconCalendar /> 应急响应
              </span>
            }
          >
            <MenuItem key='2' onClick={() => handleMenuClick('2')}>敏感信息扫描</MenuItem>
            <MenuItem key='3'>xx</MenuItem>
            <MenuItem key='4'>xx</MenuItem>
          </SubMenu>
        </Menu>
      </Sider>
      <Content style={{ background: 'rgb(240,255,255)', textAlign: 'center', padding: '30px' }}>
        {renderContent()}
      </Content>
    </Layout>
  );
}

export default App;