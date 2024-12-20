import { Tab, TabList, TabPanel, Tabs } from '@mui/joy'
import { MassSpringDamper } from './MassSpringDamper'
import { useSelector } from 'react-redux'
import { selectExperiment, setExperiment } from '@slices/appSlice'
import { useAppDispatch } from '@hooks'
import { MSD, UAV } from '@constants'
import { KalmanFilter } from './KalmanFilter'

export function Experiment() {
  const dispatch = useAppDispatch()

  const experiment = useSelector(selectExperiment)

  return (
    <Tabs
      aria-label="Basic tabs"
      value={experiment}
      onChange={(_, value) => dispatch(setExperiment(value as any))}
    >
      <TabList>
        <Tab value={MSD}>Масса-пружина-демпфер</Tab>

        <Tab value={UAV}>Простой</Tab>
      </TabList>

      <TabPanel value={MSD}>
        <MassSpringDamper />

        <KalmanFilter />
      </TabPanel>

      <TabPanel value={UAV}>
        <KalmanFilter />
      </TabPanel>
    </Tabs>
  )
}
