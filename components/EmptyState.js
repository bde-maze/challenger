import { React, useState } from 'react'

const EmptyState = ({ createChallenge }) => {
  const [formContent, setFormContent] = useState([
    {
      label: 'Title',
      value: '',
      type: 'text',
      name: 'title',
      placeholder: 'Mediation',
    },
    {
      label: 'Description',
      value: '',
      type: 'text',
      name: 'description',
      placeholder: '',
    },
    {
      label: 'Goal',
      value: 0,
      type: 'number',
      name: 'goal',
      placeholder: '',
    },
    {
      label: 'Goal date',
      value: '',
      type: 'date',
      name: 'goalDate',
      placeholder: '',
    },
  ])

  return (
    <div>
      <div className="text-2xl mb-16">
        You have no challenges
        <br />
        create the first one now!
      </div>
      <form className="mb-12" onSubmit={(event) => createChallenge(event)}>
        {formContent.map((input, index) => (
          <div className="mb-6">
            <label>
              <div>{input.label}</div>
              <input
                key={`input-${index}`}
                className="rounded w-full"
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                onChange={(event) => {
                  var copy = formContent
                  copy[index].value = event.target.value
                  setFormContent([...copy])
                }}
              />
            </label>
          </div>
        ))}
        <input
          type="submit"
          value="create"
          className="py-2 px-3 rounded-sm bg-indigo-600 active:bg-indigo-700 cursor-pointer text-white shadow"
        />
      </form>
    </div>
  )
}

export default EmptyState
