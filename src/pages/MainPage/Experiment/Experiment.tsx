import { Tab, TabList, TabPanel, Tabs } from '@mui/joy'
import { MassSpringDamper } from './MassSpringDamper'
import { useSelector } from 'react-redux'
import { selectExperiment, setState } from '@slices/appSlice'
import { useAppDispatch } from '@hooks'
import { MSD, UAV } from '@constants'

export function Experiment() {
  const dispatch = useAppDispatch()

  const experiment = useSelector(selectExperiment)

  return (
    <Tabs
      aria-label="Basic tabs"
      value={experiment}
      onChange={(_, value) => dispatch(setState({ experiment: value as any }))}
    >
      <TabList>
        <Tab value={MSD}>Масса-пружина-демпфер</Tab>

        <Tab value={UAV}>Беспилотник</Tab>
      </TabList>

      <TabPanel value={MSD}>
        <MassSpringDamper />
      </TabPanel>

      <TabPanel value={UAV}>
        <b>Second</b> tab panel
      </TabPanel>
    </Tabs>
  )
}
