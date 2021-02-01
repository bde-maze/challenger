import { React, useState } from 'react'
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

  const countDays = (startDate) => {
    const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
    const result = Math.round(
      Math.abs((Date.parse(startDate) - new Date()) / oneDay)
    )
    return result
  }

  const estimateEndDate = () => {
    const currentDays = countDays(challenge.createdAt)
    const amountPerDay =
      parseInt(challenge.total) / (currentDays == 0 ? 1 : currentDays)
    return Math.round(parseInt(challenge.goal) / amountPerDay)
  }

  const situationnalMessage = () => {
    if (challenge.total >= challenge.goal)
      return <div>You completed your goal, congrats!!! 🎉</div>
    else if (estimateEndDate() > countDays(challenge.goalDate))
      return <div>Chop chop!!</div>
    else return <div>You are on schudule, keep going!</div>
  }

  return (
    <div className="flex justify-between bg-indigo-600 rounded shadow mb-6 p-6 text-white">
      <div className="w-1/5">{challenge.title}</div>
      <div>
        <div>Started {countDays(challenge.createdAt)} days ago</div>
        <div>Deadline in {countDays(challenge.goalDate)} days</div>
        <div>Completion estimated in {estimateEndDate()} days</div>
        {situationnalMessage()}
      </div>
      <div>
        {challenge.total}/{challenge.goal} {challenge.unit} (
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
      <div className="text-2xl mb-16">Your challenges</div>
      {challenges &&
        challenges.map((challenge, index) => (
          <>
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
      {challenges && challenges.length == 0 && (
        <div className="text-2xl mb-16">
          You have no challenges
          <br />
          create the first one now!
        </div>
      )}
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
