import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Link, useLocation, useSidebarData } from 'dumi';
import React, { useLayoutEffect, useState } from 'react';
import styles from './index.module.scss';

const PrevAndNext: React.FC = () => {
  const sidebar = useSidebarData();
  console.log(sidebar);
  const { pathname } = useLocation();
  const [prev, setPrev] = useState<
    (typeof sidebar)[0]['children'][0] | undefined
  >(undefined);
  const [next, setNext] = useState<typeof prev>(undefined);

  // calculate the previous and next page
  useLayoutEffect(() => {
    if (sidebar) {
      const items = sidebar.reduce<(typeof sidebar)[0]['children']>(
        (ret: any, group: any) => ret.concat(group.children),
        [],
      );
      const current = items.findIndex((item: any) => item.link === pathname);

      setPrev(items[current - 1]);
      setNext(items[current + 1]);
    }
  }, [pathname, sidebar]);

  return (
    <nav className={styles['pre_and_next']}>
      {prev && (
        <Link to={prev.link} data-prev>
          <small className={styles['pre']}>
            <LeftOutlined />
          </small>
          {prev.title}
        </Link>
      )}
      {next && (
        <Link to={next.link} data-next>
          {next.title}
          <small className={styles['next']}>
            <RightOutlined />
          </small>
        </Link>
      )}
    </nav>
  );
};

export default PrevAndNext;
