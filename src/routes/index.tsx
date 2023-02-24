import { Routes as RoutesContainer, Route } from 'react-router-dom'

import { DefaultLayout } from '../layouts/DefaultLayout'
import { History } from '../pages/History/History'
import { Home } from '../pages/Home'

export const Routes = () => {
  return (
    <RoutesContainer>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </RoutesContainer>
  )
}
