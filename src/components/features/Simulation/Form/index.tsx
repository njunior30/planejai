import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { type SimulationFormData, simulationFormSteps } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'

import { FormStep } from '../FormStep'
import { StepProgress } from '../Progress'

export function SimulationForm() {
  const navigate = useNavigate()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [formData, setFormData] = useState<SimulationFormData>(
    {} as SimulationFormData,
  )
  const { saveFormData } = useSimulationStorage()
  const totalSteps = simulationFormSteps.length
  const currentStep = simulationFormSteps[currentStepIndex]

  const handleNextStep = (value: string) => {
    const updatedFormData = {
      ...formData,
      [currentStep.id]: value,
    }

    setFormData(updatedFormData)

    if (currentStepIndex + 1 >= totalSteps) {
      const id = saveFormData(updatedFormData)
      void navigate(`/resultado/${id}`)
      return
    }

    setCurrentStepIndex((previousStep) => previousStep + 1)
  }

  const handlePreviousStep = () => {
    if (currentStepIndex === 0) {
      return
    }

    setCurrentStepIndex((previousStep) => previousStep - 1)
  }

  return (
    <section aria-label="Formulário de simulação">
      <StepProgress
        currentStep={currentStepIndex + 1}
        totalSteps={totalSteps}
      />
      <FormStep
        key={currentStep.id}
        {...currentStep}
        onBack={handlePreviousStep}
        onNext={handleNextStep}
        hideBackButton={currentStepIndex === 0}
      />
    </section>
  )
}
