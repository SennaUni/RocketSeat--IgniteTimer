import { createContext, ReactNode, useEffect, useReducer, useState } from 'react'

import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {  addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CycleConxtexType {
  cycles: Cycle[]
  amountSecondsPassed: number
  activeCycleId: string | null
  activeCycle: Cycle | undefined
  interrutCurrentCycle: () => void
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
}

export const CyclesContext = createContext({} as CycleConxtexType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContextProvider = ({
  children,
}: CyclesContextProviderProps) => {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  }, (initialState) => {
    const storaedStateJson = localStorage.getItem('@igniteTimer:CyclesState-1.0.0')

    if (storaedStateJson) return JSON.parse(storaedStateJson)

    return initialState
  })

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(() => {
    if (activeCycle) 
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))

    return 0
  })

  function createNewCycle(data: CreateCycleData) {
    const { minutesAmount, task } = data
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function interrutCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  useEffect(() => {
    const stateJson = JSON.stringify(cyclesState)

    localStorage.setItem('@igniteTimer:CyclesState-1.0.0', stateJson)
  }, [cyclesState])

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        createNewCycle,
        interrutCurrentCycle,
        setSecondsPassed,
        markCurrentCycleAsFinished,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
