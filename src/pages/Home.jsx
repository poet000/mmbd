import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`

const Button = styled(Link)`
  display: inline-block;
  margin: 10px;
  padding: 15px 30px;
  background: #1890ff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  
  &:hover {
    opacity: 0.8;
  }
`

const Home = () => {
  return (
    <Container>
      <h1>魅力男人宝典</h1>
      <div>
        <Button to="/judge">开始判断题</Button>
        <Button to="/choice">开始选择题</Button>
      </div>
    </Container>
  )
}

export default Home 