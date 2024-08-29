import type { GetProp, MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link, useSidebarData } from 'dumi';
import React, { useCallback, useEffect, useState } from 'react';
import { extractNameFromPath } from '../../utils';
import styles from './index.module.scss';

const SidebarLayout: React.FC = () => {
  const { pathname, search } = location;
  type MenuItem = GetProp<MenuProps, 'items'>[number];
  const sidebar = useSidebarData();
  const [current, setCurrent] = useState('foo');

  useEffect(() => {
    const currentInit = extractNameFromPath(pathname);
    setCurrent(currentInit);
  }, [pathname]);

  const items: MenuItem[] = sidebar.map((group) => {
    const children = group.children.map((item) => {
      return {
        key: extractNameFromPath(item.link),
        label: <Link to={item.link}>{item.title}</Link>,
      };
    });
    return {
      key: group.title,
      label: group.title,
      type: 'group',
      children,
    };
  });

  // const items: MenuItem[] = [
  //   {
  //     key: '通用',
  //     label: '通用',
  //     type: 'group',
  //     children: [
  //       {
  //         key: 'button',
  //         label: <Link to="/components/button">Button</Link>,
  //       },
  //       {
  //         key: 'checkbox',
  //         label: <Link to="/components/checkbox">Checkbox</Link>,
  //       },
  //       {
  //         key: 'foo',
  //         label: <Link to="/components/foo">Foo</Link>,
  //       },
  //       {
  //         key: 'guitext',
  //         label: <Link to="/components/gui-text">GUIText</Link>,
  //       },
  //     ],
  //   },
  // ];

  const onClick = useCallback(({ key }: any) => {
    setCurrent(key);
  }, []);

  return (
    <Menu
      items={items}
      inlineIndent={30}
      mode="inline"
      theme="light"
      selectedKeys={[current]}
      onClick={onClick}
      className={styles['sidebar_menu']}
    />
  );
};

export default SidebarLayout;
