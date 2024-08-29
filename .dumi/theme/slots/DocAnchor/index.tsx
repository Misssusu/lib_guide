import { Anchor } from 'antd';
import type { AnchorLinkItemProps } from 'antd/es/anchor/Anchor';
import classNames from 'classnames';
import { useRouteMeta, useTabMeta } from 'dumi';
import React from 'react';
import styles from './index.module.scss';

interface DocAnchorProps {
  showDebug?: boolean;
  debugDemos?: string[];
}

interface AnchorItem {
  id: string;
  title: string;
  children?: AnchorItem[];
}

const DocAnchor: React.FC<DocAnchorProps> = ({
  showDebug,
  debugDemos = [],
}) => {
  const meta = useRouteMeta();
  const tab = useTabMeta();
  console.log('meta', meta);
  console.log('tab', tab);

  const renderAnchorItem = (item: AnchorItem): AnchorLinkItemProps => ({
    href: `#${item.id}`,
    title: item.title,
    key: item.id,
    children: item.children
      ?.filter((child) => showDebug || !debugDemos.includes(child.id))
      .map<AnchorLinkItemProps>((child) => ({
        key: child.id,
        href: `#${child.id}`,
        title: (
          <span
            className={classNames({
              'toc-debug': debugDemos.includes(child.id),
            })}
          >
            {child?.title}
          </span>
        ),
      })),
  });

  const anchorItems = React.useMemo<AnchorItem[]>(
    () =>
      (tab?.toc || meta.toc).reduce<AnchorItem[]>((result: any, item: any) => {
        if (item.depth === 2) {
          result.push({ ...item });
        } else if (item.depth === 3) {
          const parent = result[result.length - 1];
          if (parent) {
            parent.children = parent.children || [];
            parent.children.push({ ...item });
          }
        }
        return result;
      }, []),
    [tab?.toc, meta.toc],
  );

  if (!meta.frontmatter.toc) {
    return null;
  }

  return (
    <section className={styles.tocWrapper}>
      <Anchor
        affix={false}
        className={styles.anchorToc}
        showInkInFixed
        items={anchorItems.map<AnchorLinkItemProps>(renderAnchorItem)}
      />
    </section>
  );
};

export default DocAnchor;
