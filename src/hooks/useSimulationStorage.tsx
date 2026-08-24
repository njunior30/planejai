import type { SimulationFormData } from '@/data/simulation'
import type { InsightData } from '@/services/aiService'

const LOCAL_STORAGE_KEY = 'simulation-data'

export type SimulationRecord = SimulationFormData & {
  id: string
  insight?: InsightData
}

type SimulationUpdate = {
  [key in keyof SimulationFormData]?: SimulationFormData[key]
} & {
  insight?: InsightData
}

export const useSimulationStorage = () => {
  const saveFormData = (formData: SimulationFormData) => {
    const id = crypto.randomUUID()
    const record: SimulationRecord = { ...formData, id }
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const savedData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...savedData, record]),
    )

    return id
  }

  const getFormData = (id: string): SimulationRecord | null => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!storage) {
      return null
    }

    const savedData = JSON.parse(storage) as SimulationRecord[]
    return savedData.find((record) => record.id === id) ?? null
  }

  const updateSimulation = (id: string, data: SimulationUpdate) => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!storage) {
      return
    }

    const savedData = JSON.parse(storage) as SimulationRecord[]
    const updatedData = savedData.map((record) =>
      record.id === id ? { ...record, ...data } : record,
    )

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData))
  }

  return { saveFormData, getFormData, updateSimulation }
}
