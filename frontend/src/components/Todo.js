import styled from 'styled-components/macro'
import Button from './Button'
import {Link} from "react-router-dom";


export default function Todo({ todo, onDelete, onAdvance, detailView}) {
  return (
    <Wrapper>
      <section>
          <Description>{todo.description}</Description>
      </section>

        {!detailView && (
                <section>
                    <Button onClick={() => onDelete(todo)}>Delete</Button>

                     <Link to={'/todo/'+todo.id}>
                        <Button color="primary">Details</Button>
                    </Link>
                    {/*
                    <Button color="primary" component={Link} to={`/todo/${todo.id}`}>
                        Details
                    </Button>
                    */}


                    {onAdvance && (
                        <Button primary onClick={() => onAdvance(todo)}>
                            Advance
                        </Button>
                    )}
                </section>
            )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
`

const Description = styled.span`
  grid-column: span 2;
  font-weight: 600;
`
