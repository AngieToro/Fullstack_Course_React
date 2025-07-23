const Course = ({ course }) => {

    return(
        <div>
            <h1>Web Development Curriculum</h1>
    
            {course.map((courseItem) => {
                console.log('Course Item: ', courseItem.name)
            
                const total = courseItem.parts.reduce((sum, part) =>  {
                    console.log('Part: ', part.name, ' - ', part.exercises, 'exercises')
                    console.log('Sum: ', sum)
                    return sum + part.exercises
                }, 0)
                
                console.log('Total for ', courseItem.name,' :',  total)  
        
            return (
                    <div key={courseItem.id}>
                        <h2>{courseItem.name}</h2>
                        {courseItem.parts.map((part) => (
                            <p key={part.id}>
                                {part.name} - {part.exercises} exercises
                            </p>
                        ))}
                    <p><strong>Total of {total} exercises</strong></p>
                    </div>
                )
            })}
        </div>
    )
}

export default Course