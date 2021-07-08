import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components'

import initialData from './initial-data';
import Column from './components/Column'

const Container = styled.div`
  display: flex;
`

const App: React.FC<unknown> = (): React.ReactElement => {

  const [state, setState] = useState(initialData)

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId 
      && 
      destination.index === source.index 
    ) {
      return
    }

    if (type === 'column') {
      const newColumnOrder = [...state.columnOrder]
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)

      const newState = {
        ...state,
        columnOrder: newColumnOrder
      }

      setState(newState)
      return
    }

    const startColumn = state.columns[source.droppableId]
    const finishColumn = state.columns[destination.droppableId]

    if (startColumn === finishColumn) {
      const newTaskIds = [...startColumn.taskIds]
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)
      
      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds
      }
      
      const newState = {
        ...state,
        columns: {
          [newColumn.id]: newColumn
        }
      }
      
      setState(newState)
      return
    }

    const startTaskIds = [...startColumn.taskIds]
    startTaskIds.splice(source.index, 1)
    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds
    }

    const finishedTaskIds = [...finishColumn.taskIds]
    finishedTaskIds.splice(destination.index, 0, draggableId)
    const newFinishColumn = {
      ...finishColumn,
      taskIds: finishedTaskIds
    }

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn
      }
    }

    setState(newState)
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Container
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {state.columnOrder.map((columnId, index) => {
              const column = state.columns[columnId]
              if (column.taskIds.length !== 0) {
                const tasks = column.taskIds.map(taskId => state.tasks[taskId])
                return <Column key={column.id} column={column} index={index} tasks={tasks} />
              }
              return <Column key={column.id} index={index} column={column} />
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
