import React from 'react'

import { SingleTaskType } from '../initial-data'
import Task from './Task'

interface InnerListProps {
    tasks?: SingleTaskType[]
}


const InnerList: React.FC<InnerListProps> = ({ tasks }): React.ReactElement => {

    const generateTasks = tasks?.map((task, index) => { return(<Task key={task.id} task={task} index={index} />) })
    
    return (
        <>
            {generateTasks}
        </>
    )
}

export default InnerList