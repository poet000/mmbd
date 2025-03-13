import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import QuizCard from '../components/QuizCard'
import { judgeQuestions } from '../data/judgeQuestions'
import styled from '@emotion/styled'

const Container = styled.div`
  max-width: 800px;
  min-height: 80vh;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    min-height: 90vh;
    padding: 15px;
    margin: 10px;
    border-radius: 8px;
  }
`

const Progress = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 1.1rem;
  color: #666;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  margin: 10px 0;
  overflow: hidden;

  div {
    width: ${props => (props.progress * 100)}%;
    height: 100%;
    background: #1890ff;
    transition: width 0.3s ease;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    
    button {
      width: 100%;
    }
  }
`

const Button = styled.button`
  padding: 12px 32px;
  background: ${props => props.variant === 'primary' ? '#1890ff' : '#fff'};
  color: ${props => props.variant === 'primary' ? '#fff' : '#666'};
  border: 2px solid ${props => props.variant === 'primary' ? '#1890ff' : '#ddd'};
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:disabled {
    background: #f5f5f5;
    border-color: #ddd;
    color: #999;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`


const QuizCardWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const JudgeQuiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const navigate = useNavigate()
  
  const handleAnswer = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: answer
    }))
  }

  const handleNext = () => {
    if (currentIndex < judgeQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {

      alert('恭喜完成第一关！即将进入第二关...')
      navigate('/choice');
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  return (
    <Container>
      <Progress>
        第 {currentIndex + 1} 题 / 共 {judgeQuestions.length} 题
      </Progress>
      <ProgressBar progress={(currentIndex + 1) / judgeQuestions.length}>
        <div />
      </ProgressBar>
      
        <QuizCard
          question={judgeQuestions[currentIndex]}
          onAnswer={handleAnswer}
          selectedAnswer={answers[currentIndex]}
        />

      <ButtonGroup>
        <Button 
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          variant="secondary"
        >
          上一题
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={answers[currentIndex] === undefined}
          variant="primary"
        >
          {currentIndex === judgeQuestions.length - 1 ? '完成答题' : '下一题'}
        </Button>
      </ButtonGroup>
    </Container>
  )
}

export default JudgeQuiz 