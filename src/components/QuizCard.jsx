import styled from '@emotion/styled'

const Card = styled.div`
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 1px;
`

const Button = styled.button`
  margin: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: ${props => props.selected ? '#1890ff' : '#f0f0f0'};
  color: ${props => props.selected ? 'white' : 'black'};
  
  &:hover {
    opacity: 0.8;
  }
`

const QuizCard = ({ question, onAnswer, selectedAnswer }) => {
  return (
    <Card>
      <h3>{question.text}</h3>
      
      {question.type === 'judge' ? (
        // 判断题
        <div>
          <Button
            selected={selectedAnswer === true}
            onClick={() => onAnswer(true)}
          >
            对
          </Button>
          <Button
            selected={selectedAnswer === false}
            onClick={() => onAnswer(false)}
          >
            错
          </Button>
        </div>
      ) : (
        // 选择题
        <div>
          {question.options.map(option => (
            <Button
              key={option.id}
              selected={selectedAnswer === option.id}
              onClick={() => onAnswer(option.id)}
            >
              {option.text}
            </Button>
          ))}
        </div>
      )}
    </Card>
  )
}

export default QuizCard 