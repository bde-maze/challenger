import { React, useState } from 'react'
import EmptyState from '../components/EmptyState.js'

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
    <div>
      {challenge.title} - {challenge.total}/{challenge.goal} (
      {((challenge.total / challenge.goal) * 100).toFixed(2)}%){' '}
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
    <div>
      {challenges &&
        challenges.map((challenge, index) => (
          <div key={`challenge-${index}`}>
            <Challenge
              challenge={challenge}
              index={index}
              challenges={challenges}
              setChallenges={setChallenges}
            />
          </div>
        ))}
    </div>
  )
}

const Challenges = ({ challenges, setChallenges }) => {
  return (
    <div>
      <div className="text-2xl mb-16">Your challenges</div>
      {challenges && (
        <ChallengeList challenges={challenges} setChallenges={setChallenges} />
      )}
    </div>
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
    <div className="container mx-auto pt-24 pb-28">
      <div className="bg-gray-100 rounded shadow flex justify-center flex-col items-center p-12">
        <EmptyState createChallenge={createChallenge} />
        <Challenges challenges={challenges} setChallenges={setChallenges} />
      </div>
    </div>
  )
}

export default ChallengesWrapper
