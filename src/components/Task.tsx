import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

import { SingleTaskType } from '../initial-data'


const Container = styled.div<ContainerProps>`
    background-color: ${props => (props.isDragging ? 'red' : 'white')};
    border: 1px solid lightgrey;
    border-radius: 2px;
    display: flex;
    margin-bottom: 8px;
    padding: 8px;
`

interface ContainerProps {
    isDragging: boolean
}

interface TaskProps {
    task: SingleTaskType
    index: number
}

const Task: React.FC<TaskProps> = ({ task, index }): React.ReactElement => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <Container 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}  
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    {task.content}
                </Container>
            )}
        </Draggable>
    )
}

export default Task
