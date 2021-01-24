import { React, useState } from 'react'

const CreateChallengeForm = ({ challenges, setChallenges }) => {
  const [formVisible, setFormVisible] = useState(false)
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

  const createChallenge = (event) => {
    event.preventDefault()
    const newChallenge = {
      title: event.target.title.value,
      description: event.target.description.value,
      goal: event.target.goal.value,
      goalDate: event.target.goalDate.value,
      total: 0,
      eta: '',
      events: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    let updatedChallenges = challenges
    updatedChallenges.push(newChallenge)
    setChallenges([...updatedChallenges])
    localStorage.setItem('challenges', JSON.stringify(challenges))
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center mb-12">
        <div
          className={`py-2 px-3 rounded cursor-pointer bg-indigo-600 text-white ${
            formVisible ? `hidden` : `block`
          }`}
          onClick={() => {
            setFormVisible(!formVisible)
          }}
        >
          Create a challenge
        </div>
        <div
          className={`self-end flex justify-center items-center w-8 h-8 rounded-full cursor-pointer bg-red-600 text-white  ${
            formVisible ? `block` : `hidden`
          }`}
          onClick={() => {
            setFormVisible(!formVisible)
          }}
        >
          X
        </div>
        <div className={formVisible ? `block` : `hidden`}>
          <form
            className="mb-12 w-full"
            onSubmit={(event) => createChallenge(event)}
          >
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
              className="float-right py-2 px-3 rounded-sm bg-indigo-600 active:bg-indigo-700 cursor-pointer text-white shadow"
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateChallengeForm
