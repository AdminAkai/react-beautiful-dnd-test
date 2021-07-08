import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import InnerList from './InnerList'
import { SingleColumnsType, SingleTaskType } from '../initial-data'

const Container = styled.div`
    background-color: white;
    display: flex;
    flex-flow: column nowrap;
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 220px;
`

const Title = styled.h3`
    padding: 0.8rem;
`

const TaskList = styled.div<TaskListProps>`
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')}
    flex-grow: 1;
    min-height: 10rem;
    padding: 0.8rem;
    transition: background-color 0.2s ease;
`

interface TaskListProps {
    isDraggingOver: boolean
}

interface ColumnProps {
    column: SingleColumnsType
    index: number
    tasks?: SingleTaskType[]
}

const Column: React.FC<ColumnProps> = ({ column, index, tasks }): React.ReactElement => {

    const MemoizeInnerList = useMemo(() => <InnerList tasks={tasks} />, [tasks])

    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided) => (
                <Container
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <Title {...provided.dragHandleProps}>{column.title}</Title>
                    <Droppable droppableId={column.id} type="task">
                        {(provided, snapshot) => (
                            <TaskList 
                                {...provided.droppableProps} 
                                ref={provided.innerRef}
                                   isDraggingOver={snapshot.isDraggingOver}
                            >
                                {MemoizeInnerList}
                                {provided.placeholder}
                            </TaskList>
                        )}
                    </Droppable>
                </Container>
            )}
        </Draggable>
    )
}

export default Column
