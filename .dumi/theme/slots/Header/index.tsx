import type { MenuProps } from 'antd';
import { Col, Menu, Row } from 'antd';
import { Link, useNavigate } from 'dumi';
import DumiSearchBar from 'dumi/theme-default/slots/SearchBar';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.module.scss';

const LibHeader: React.FC = () => {
  const { pathname, search } = location;
  const [current, setCurrent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentInit = pathname.includes('components') ? 'components' : '';
    setCurrent(currentInit);
  }, [pathname]);

  const isHome = ['', 'index', 'index-cn'].includes(pathname);

  const colProps = isHome
    ? [{ flex: 'none' }, { flex: 'auto' }]
    : [
        { xxl: 4, xl: 5, lg: 6, md: 6, sm: 24, xs: 24 },
        { xxl: 20, xl: 19, lg: 18, md: 18, sm: 0, xs: 0 },
      ];

  const items: MenuProps['items'] = [
    {
      label: <Link to="/components/foo">组件</Link>,
      key: 'components',
    },
  ];

  const onClick = useCallback(({ key }: any) => {
    setCurrent(key);
  }, []);

  return (
    <div className={styles['header_wrapper']}>
      <Row style={{ flexFlow: 'nowrap', height: 64 }}>
        <Col {...colProps[0]} style={{ textAlign: 'center' }}>
          <span className={styles['lib_title']} onClick={() => navigate('/')}>
            LibGuide
          </span>
        </Col>
        <Col {...colProps[1]}>
          <div className={styles['menuRow']}>
            <DumiSearchBar />
            <Menu
              mode="horizontal"
              selectedKeys={[current]}
              className={styles.nav}
              disabledOverflow
              items={items}
              onClick={onClick}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LibHeader;
