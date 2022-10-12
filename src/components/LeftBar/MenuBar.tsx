import { AppstoreOutlined, CodeSandboxOutlined, LinkOutlined, CodepenOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Order', 'sub1', <CodeSandboxOutlined />, [getItem('Order lists', '1'), getItem('Order categories', '2')]),
    getItem('Product', '3', <CodepenOutlined />),
    getItem('Customer', '4', <AppstoreOutlined />),
    getItem(
        <a href="https://www.facebook.com/Harrypotterface/" target="_blank" rel="noopener noreferrer">
            Supports
        </a>,
        'link',
        <LinkOutlined />,
    ),
];

function MenuBar() {
    const navigate = useNavigate();
    const [current, setCurrent] = useState('1');

    const ChangeMenu: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
        switch (e.key) {
            case '1': {
                navigate('/order');
                break;
            }
            // case '2': {
            //     navigate('/order/category');
            //     break;
            // }
            case '3': {
                navigate('/product');
                break;
            }
            // case '4': {
            //     navigate('/customer');
            //     break;
            // }
            default: {
                navigate('/');
                break;
            }
        }
    };

    return (
        <>
            <Menu
                style={{ width: 250 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                selectedKeys={[current]}
                mode="inline"
                theme="dark"
                items={items}
                onClick={ChangeMenu}
            />
        </>
    );
}

export default MenuBar;
