import { useState, type ChangeEvent, type FormEvent } from 'react'
import './css/App.css'

export default function App() {

  return (
    <main className='pageContent'>
      <Hero/>
      {/* <Results/> */}
      {/* <Tips/> */}
      {/* <Limitations/> */}
    </main>
  )
}

function Hero(){
  return(
    <section className="hero">
      <div className="logo"><img src="logo.svg" alt="logo" /></div>
      <div className="hero__content">
        <h1 className='hero__title'>Body Mass Index Calculator</h1>
        <p className="hero__description">
          Better understand your weight in relation to your height using our body mass index (BM) calculator. While BMI is not the sole determinant of a healthy weight, it offers a valuable starting point to evaluate your overall health and well-being.
        </p>
      </div>
      {/* <div className="hero__gradient"></div> */}
      <Calculator/>
    </section>
  )
}
function Results(){
  return(
    <section className="results">
      {/* <img src="image-man-eating.webp" alt="" />
      <h2>What your BMI result means</h2>
      <p>A BMI range of 18.5 to 24.9 is considered a 'healthy weight.' Maintaining a healthy weight may lower your chances of experiencing health issues later on, such as obesity and type 2 diabetes. Aim for a nutritious diet with reduced fat and sugar content, incorporating ample fruits and vegetables. Additionally, strive for regular physical activity, ideally about 30 minutes daily for five days a week.</p> */}
    </section>
  )
}
function Tips(){
  return(
    <section className="tips">
    </section>
  )
}
function Limitations(){
  return(
    <section className="limitations">
    </section>
  )
}

type unit = 'metric' | 'imperial';
type inputObj = {
    unit: string,
    type: string,
    id:   string
}
const height: inputObj[] = [
  {
    unit: 'metric',
    type: 'number',
    id:   'cm'
  },
  {
    unit: 'imperial',
    type: 'number',
    id:   'ft'
  },
  {
    unit: 'imperial',
    type: 'number',
    id:   'in'
  }
]
const weight: inputObj[] = [
  {
    unit: 'metric',
    type: 'number',
    id:   'kg'
  },
  {
    unit: 'imperial',
    type: 'number',
    id:   'st'
  },
  {
    unit: 'imperial',
    type: 'number',
    id:   'lbs'
  }
]

function Calculator(){
  const [unitOfMeasurement, setUnitOfMeasurement] = useState<unit>('metric');
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("lele")
    let formData = new FormData(event.currentTarget);
    let data = Object.fromEntries(formData)
    console.log(data)
  }
  return(
    <section className="calculator">
      <h3 className='calculator__title'>Enter your details below</h3>
      <form className='form' onSubmit={handleSubmit}>
          <Input
            type='radio'
            id='metric'
            name='unit'
            className='unitSelector-metric'
            checked={true}
            handler={()=>setUnitOfMeasurement('metric')}
          >Metric</Input>

          <Input 
            type='radio'
            id='imperial'
            name='unit' 
            className='unitSelector-imperial'
            checked={false}
            handler={()=>setUnitOfMeasurement('imperial')}
          >Imperial</Input>

          <fieldset className={"metrics__wrapper-height" + `-${unitOfMeasurement}`}>
              <legend className='metrics__name'>Height</legend>
              {
                height.map((value, index) => {return (
                  value.unit === unitOfMeasurement ?
                    <Input 
                      key={index}
                      type={value.type}
                      id={value.id}
                      className='metrics__height'
                      name={`height-${value.id}`}
                    >{value.id}</Input>
                  : null
                )})
              }
          </fieldset>
          <fieldset className={"metrics__wrapper-weight" + `-${unitOfMeasurement}`}>
              <legend className='metrics__name'>Weight</legend>
              {
                weight.map((value, index) => {return (
                  value.unit === unitOfMeasurement ?
                    <Input 
                      key={index}
                      type={value.type}
                      id={value.id}
                      className='metrics__weight'
                      name={`weight-${value.id}`}
                    >{value.id}</Input>
                  : null
                )})
              }

          </fieldset>
          <button type='submit'>kek</button>
      </form>

      <div className="calculator__result">
        <p>Your BMI is...</p>
        <p>23</p>
        <p>Your BMI suggests you’re a healthy weight. Your ideal weight is between 63.3kgs - 85.2kgs.</p>
      </div>
    </section>
  )
}




type InputType = {
  type:string,
  id: string,
  className: string,
  children:string,
  name: string,
  checked?:boolean,
  handler?:()=>void
}



function Input({type, id, className, children, name, checked, handler}: InputType){
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.name)
  }
  const inputAttribute = (type === 'radio') ? {'defaultChecked': checked} : {'placeholder': '0'};
  return(
    <label className={className + ' input'} htmlFor={id} onClick={handler}>
      <input 
        type={type} 
        id={id} 
        name={name} 
        className={'input-' + type} 
        {...inputAttribute}
        defaultValue={id}
        onChange={handleChange}
      />
      <span className={'content-' + type}>{children}</span>
    </label>
  )
}