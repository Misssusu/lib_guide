import { Flex, Layout } from 'antd';
import { useOutlet, useRouteMeta, useTabMeta } from 'dumi';
import React from 'react';
import DocAnchor from '../../slots/DocAnchor';
import LibHeader from '../../slots/Header';
import PrevAndNext from '../../slots/PrevAndNext';
import SidebarLayout from '../SidebarLayout';
import styles from './index.module.scss';

const DocLayout: React.FC = () => {
  const outlet = useOutlet();
  const meta = useRouteMeta();
  const tab = useTabMeta();
  console.log('meta', meta);
  console.log('tab', tab);

  const { pathname, search } = location;
  const isHome = ['', 'index', '/'].includes(pathname);
  const { Header, Footer, Sider, Content } = Layout;

  return (
    <Flex gap="middle" wrap style={{ height: '100vh' }}>
      <Layout style={{ background: '#fff' }}>
        <Header className={styles['layout_header']}>
          <LibHeader></LibHeader>
        </Header>
        <Layout className={isHome ? styles['home'] : styles['components']}>
          {isHome && (
            <Content className={styles['layout_content']}>{outlet}</Content>
          )}
          {!isHome && (
            <>
              <Sider width="17%" className={styles['layout_sider']}>
                <SidebarLayout></SidebarLayout>
              </Sider>
              <Layout style={{ marginInlineStart: '18%' }}>
                <Header style={{ display: 'none' }}></Header>
                <Content className={styles['layout_content']}>
                  <section>
                    <Content className={styles['component_content']}>
                      {outlet}
                    </Content>
                    <DocAnchor></DocAnchor>
                  </section>
                  <PrevAndNext></PrevAndNext>
                </Content>
              </Layout>
            </>
          )}
        </Layout>
        <Footer style={{ textAlign: 'center' }}>Made with ❤ by SuYuan</Footer>
      </Layout>
    </Flex>
  );
};

export default DocLayout;
