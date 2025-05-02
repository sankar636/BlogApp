import React, {useId} from 'react'

const Select = ({
    options,
    label,
    className,
    ...props
}, ref) => {
    const id = useId()
  return (
    <div>
        <div className='w-full'>
            {label && <label htmlFor={id} className='inline-block mb-1 pl-1'>{label}</label>}
            <select {...props} id={id}
            ref={ref}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
            >
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
            </select>
        </div>
    </div>
  )
}

export default React.forwardRef(Select)

// if there is no element in optionn field then it will crass so we optionally mapping this part

// input.jsx is type-1 of writing component using forwordRef and this i.e select.jsx is type-2 of writing forwordRef 