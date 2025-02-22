import { useState } from 'react'
import styled from '@emotion/styled'
import { choiceQuestions } from '../data/choiceQuestions'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
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

const QuestionCard = styled.div`
  padding: 20px;
  margin: 20px 0;
  border: 1px solid #eee;
  border-radius: 8px;
`

const Question = styled.h3`
  margin-bottom: 20px;
  color: #333;
`

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Option = styled.button`
  padding: 15px;
  text-align: left;
  background: ${props => props.selected ? '#e6f7ff' : '#fff'};
  border: 2px solid ${props => props.selected ? '#1890ff' : '#ddd'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f0f9ff;
    border-color: #69c0ff;
  }
`

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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

const ChoiceQuiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleSelectOption = (optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < choiceQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    Object.entries(answers).forEach(([questionIndex, answer]) => {
      if (choiceQuestions[questionIndex].correctAnswer === answer) {
        correct++;
      }
    });
    return (correct / choiceQuestions.length) * 100;
  };

  if (showResult) {
    return (
      <Container>
        <h2>测试结果</h2>
        <p>得分：{calculateScore()}%</p>
        {Object.entries(answers).map(([index, answer]) => (
          <div key={index} style={{ margin: '20px 0', padding: '10px', border: '1px solid #eee' }}>
            <p><strong>题目 {Number(index) + 1}：</strong>{choiceQuestions[index].question}</p>
            <p>你的选择：{choiceQuestions[index].options[answer]}</p>
            <p>正确答案：{choiceQuestions[index].options[choiceQuestions[index].correctAnswer]}</p>
            <p style={{ color: '#666' }}>解释：{choiceQuestions[index].explanation}</p>
          </div>
        ))}
        <Button 
          onClick={() => {
            setShowResult(false);
            setCurrentIndex(0);
            setAnswers({});
          }}
          variant="primary"
        >
          重新测试
        </Button>
      </Container>
    );
  }

  const currentQuestion = choiceQuestions[currentIndex];

  return (
    <Container>
      <Progress>
        第 {currentIndex + 1} 题 / 共 {choiceQuestions.length} 题
      </Progress>
      <ProgressBar progress={(currentIndex + 1) / choiceQuestions.length}>
        <div />
      </ProgressBar>

      <QuestionCard>
        <Question>{currentQuestion.question}</Question>
        <OptionList>
          {currentQuestion.options.map((option, index) => (
            <Option
              key={index}
              selected={answers[currentIndex] === index}
              onClick={() => handleSelectOption(index)}
            >
              {option}
            </Option>
          ))}
        </OptionList>
      </QuestionCard>

      <NavigationButtons>
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
          {currentIndex === choiceQuestions.length - 1 ? '提交答案' : '下一题'}
        </Button>
      </NavigationButtons>
    </Container>
  );
};

export default ChoiceQuiz; 