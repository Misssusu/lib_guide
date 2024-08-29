import { Button } from 'antd';
import { useNavigate } from 'dumi';
import React from 'react';
import styles from './index.module.scss';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles['homePage']}>
      <h1 className={styles['title']}>LibGuide</h1>
      <p className={styles['des']}>A component library developed with dumi</p>
      <Button
        type="primary"
        size="large"
        onClick={() => navigate('/components/foo')}
      >
        开始使用
      </Button>
    </div>
  );
};

export default HomePage;
