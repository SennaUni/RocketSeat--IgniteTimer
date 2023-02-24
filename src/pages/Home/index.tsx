import * as zod from 'zod'

import { useContext } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

import {
  StartCountdownButton,
  StopCountdownButton,
  HomeContainer,
} from './styles'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a task'),
  minutesAmount: zod
    .number()
    .min(1, 'O cilo precisa ser de no minimo 5 minutos')
    .max(60, 'O cilo precisa ser de no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export const Home = () => {
  const { activeCycle, createNewCycle, interrutCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <>
            <StopCountdownButton onClick={interrutCurrentCycle} type="button">
              <HandPalm size={24} />
              Interromper
            </StopCountdownButton>
          </>
        ) : (
          <>
            <StartCountdownButton disabled={isSubmitDisabled} type="submit">
              <Play size={24} />
              Começar
            </StartCountdownButton>
          </>
        )}
      </form>
    </HomeContainer>
  )
}
