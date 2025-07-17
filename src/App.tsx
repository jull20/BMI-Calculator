import Hero from './components/Hero'
import Results from './components/Results'
import Tips from './components/Tips'
import Limitations from './components/Limitations'
import './css/App.css'

export default function App() {

  return (
    <main className='pageContent'>
      <Hero/>
      <Results/>
      <Tips/>
      <Limitations/>
    </main>
  )
}



