import { React, useState } from 'react'
import EmptyState from '../components/EmptyState.js'
import CreateChallengeForm from '../components/CreateChallengeForm.js'

const challengeModel = {
  title: '',
  description: '',
  goal: '',
  goalDate: '',
  total: '',
  events: [{ amount: '', date: '' }],
  createdAt: '',
  updatedAt: '',
}

const updateChallenge = ({ challenges, setChallenges, index }) => {}

const Challenge = ({ challenge, index, challenges, setChallenges }) => {
  const [eventAmount, setEventAmount] = useState()

  const onSubmit = (event) => {
    event.preventDefault()
    var allEvents = challenges[index].events
    allEvents.push({
      amount: eventAmount,
      data: new Date(),
    })

    challenges[index] = {
      ...challenges[index],
      events: allEvents,
      total: challenges[index].total + parseInt(eventAmount),
    }

    setChallenges([...challenges])
    localStorage.setItem('challenges', JSON.stringify(challenges))
    setEventAmount('')
  }

  return (
    <div className="flex justify-between">
      <div>{challenge.title}</div>
      <div>
        {challenge.total}/{challenge.goal} (
        {((challenge.total / challenge.goal) * 100).toFixed(2)}%)
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="number"
          value={eventAmount}
          onChange={(event) => setEventAmount(event.target.value)}
        />
      </form>
    </div>
  )
}

const ChallengeList = ({ challenges, setChallenges }) => {
  return (
    <>
      {challenges &&
        challenges.map((challenge, index) => (
          <>
            <div className="text-2xl mb-16">Your challenges</div>
            <div key={`challenge-${index}`}>
              <Challenge
                challenge={challenge}
                index={index}
                challenges={challenges}
                setChallenges={setChallenges}
              />
            </div>
          </>
        ))}
    </>
  )
}

const Challenges = ({ challenges, setChallenges }) => {
  return (
    <>
      {challenges && challenges.length == 0 && <EmptyState />}
      <CreateChallengeForm
        challenges={challenges}
        setChallenges={setChallenges}
      />
      <ChallengeList challenges={challenges} setChallenges={setChallenges} />
    </>
  )
}

const fetchLocaleStorage = () => {
  var localChallenges
  if (typeof window !== 'undefined') {
    localChallenges = JSON.parse(localStorage.getItem('challenges'))
    if (!localChallenges) {
      localStorage.setItem('challenges', JSON.stringify([]))
      return []
    }
  }
  return localChallenges
}

const ChallengesWrapper = () => {
  const [challenges, setChallenges] = useState(fetchLocaleStorage())

  return (
    <div className="container mx-auto pt-12 pb-18">
      <div className="bg-gray-100 rounded shadow flex flex-col p-12">
        <Challenges challenges={challenges} setChallenges={setChallenges} />
      </div>
    </div>
  )
}

export default ChallengesWrapper
