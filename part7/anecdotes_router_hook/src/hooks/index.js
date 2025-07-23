import { useState } from 'react'

export const useField = ( type ) => {

    const [ value, setValue ] = useState('')

    console.log('Type input: ', type)
    console.log('Value inpunt: ', value)

    const reset = () => {

        setValue('')
    }
    

    const onChange = ( event ) => {

        setValue(event.target.value)
    }

    return {
        inputProps: {
            type,
            value,
            onChange
        },
        reset
    }
}