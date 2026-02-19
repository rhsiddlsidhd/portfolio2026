import { TooltipProvider } from '@/components/atoms/tooltip'
import { HomePage } from '@/pages/HomePage'

function App() {
  return (
    <TooltipProvider>
      <HomePage />
    </TooltipProvider>
  )
}

export default App
