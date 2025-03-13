import { Link, useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { useState, useEffect } from 'react';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 2.5em;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
`

const GameInfo = styled.div`
  margin-bottom: 30px;
  
  p {
    color: #666;
    font-size: 1.1em;
    line-height: 1.6;
  }
`

const LevelContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`

const LevelButton = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: ${props => props.disabled ? '#f5f5f5' : '#1890ff'};
  color: ${props => props.disabled ? '#999' : 'white'};
  text-decoration: none;
  border-radius: 8px;
  min-width: 200px;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.disabled ? '#e8e8e8' : '#1890ff'};
  
  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-5px)'};
    box-shadow: ${props => props.disabled ? 'none' : '0 5px 15px rgba(0,0,0,0.2)'};
  }

  .level-number {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 10px;
    opacity: ${props => props.disabled ? 0.7 : 1};
  }

  .level-description {
    font-size: 0.9em;
    opacity: ${props => props.disabled ? 0.7 : 0.9};
  }

  .status-icon {
    margin-top: 10px;
    font-size: 1.2em;
  }
`

const CompletedIcon = styled.span`
  color: #52c41a;
  margin-top: 10px;
`

const LockIcon = styled.span`
  color: #d9d9d9;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &::after {
    content: '未解锁';
    font-size: 0.8em;
  }
`

const Home = () => {
  const [level1Completed, setLevel1Completed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 从 localStorage 读取第一关完成状态
    const completed = localStorage.getItem('level1Completed') === 'true';
    setLevel1Completed(completed);
  }, []);

  const handleLevelClick = (e, level) => {
    if (level === 2 && !level1Completed) {
      e.preventDefault();
      alert('请先完成第一关！');
    }
  };

  return (
    <Container>
      <Title>魅力男人宝典</Title>
      <GameInfo>
        <p>开始你的魅力提升之旅！完成所有关卡来提升你的魅力指数</p>
        <p>当前进度：{level1Completed ? '1' : '0'}/2关</p>
      </GameInfo>
      <LevelContainer>
        <LevelButton to="/judge">
          <span className="level-number">第1关</span>
          <span className="level-description">判断题挑战</span>
          <span>测试你的基础认知</span>
          {level1Completed && <CompletedIcon className="status-icon">✅</CompletedIcon>}
        </LevelButton>
        <LevelButton 
          to="/choice" 
          onClick={(e) => handleLevelClick(e, 2)}
          disabled={!level1Completed}
        >
          <span className="level-number">第2关</span>
          <span className="level-description">选择题挑战</span>
          <span>深入理解关键细节</span>
          {!level1Completed && <LockIcon className="status-icon">🔒</LockIcon>}
        </LevelButton>
      </LevelContainer>
    </Container>
  )
}

export default Home 