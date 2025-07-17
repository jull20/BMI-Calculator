import { useState, type ChangeEvent, type FormEvent } from 'react'
import type {calcResultType, inputNumberType, inputRadioType, formDataType, inputObjType} from './types'

const MIN_BMI: number = 18.5;
const MAX_BMI: number = 25;
const defaultMetricData:   formDataType = { cm: 0, kg: 0 }
const defaultImperialData: formDataType = { ft: 0, in: 0, st: 0, lbs: 0 }

const height: inputObjType[] = [
  { unit: 'metric',   type: 'number', name: 'cm' },
  { unit: 'imperial', type: 'number', name: 'ft' },
  { unit: 'imperial', type: 'number', name: 'in' }
]
const weight: inputObjType[] = [
  { unit: 'metric',   type: 'number', name: 'kg' },
  { unit: 'imperial', type: 'number', name: 'st' },
  { unit: 'imperial', type: 'number', name: 'lbs'}
]

const defaultCalcResult: calcResultType = {
  BMI: '',
  min: {st: '', lbs: ''},
  max: {st: '', lbs: ''},
}

export default function Calculator(){
  const [unitOfMeasurement, setUnitOfMeasurement] = useState<string>('metric');
  const [formData, setFormData] = useState<formDataType>(unitOfMeasurement === 'metric' ? defaultMetricData : defaultImperialData);
  const [countingResult, setCountingResult] = useState<calcResultType>(defaultCalcResult);

  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.currentTarget.requestSubmit();
  }

  const updateUnit = (unitName: string) => {
    setUnitOfMeasurement(unitName);
    setFormData(unitName === 'metric' ? defaultMetricData : defaultImperialData)
  }

  const updateFormData = (key: string, value: number) => {
    setFormData({
      ...formData,
      [key]: value
    })
  }

  const isFormEmpty = (data: {[k: string]: FormDataEntryValue | number } ) : boolean => {
    let flag = false;
    for(let el in data){
        if((typeof data[el] === 'number' && data[el] === 0) || data[el] === '') flag = true;
    }
    return flag;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let data:{[k: string]: FormDataEntryValue} = Object.fromEntries(new FormData(event.currentTarget));
    if(!isFormEmpty(data)){
      let result: calcResultType = (data.unit === 'metric')
      ? calcMetricBMI(Number(data.cm), Number(data.kg))
      : calcImperialBMI(Number(data.ft), Number(data.in), Number(data.st), Number(data.lbs));
      setCountingResult(result);
    }
  }
  return(
    <section className="calculator">
      <h3 className='calculator__title'>Enter your details below</h3>
      <form className='form' onSubmit={handleSubmit} onChange={handleChange}>
          <InputRadio
            id='metric'
            name='unit'
            checked={true}
            handleClick={updateUnit}
          >Metric</InputRadio>

          <InputRadio 
            id='imperial'
            name='unit' 
            checked={false}
            handleClick={updateUnit}
          >Imperial</InputRadio>

          <fieldset className={"metrics__wrapper-height" + `-${unitOfMeasurement}`}>
              <legend className='metrics__name'>Height</legend>
              {
                height.map((value, index) => {return (
                  value.unit === unitOfMeasurement ?
                    <InputNumber 
                      key={index}
                      id={`height-${value.name}`}
                      name={value.name}
                      updateFormData={updateFormData}
                    >{value.name}</InputNumber>
                  : null
                )})
              }
          </fieldset>
          <fieldset className={"metrics__wrapper-weight" + `-${unitOfMeasurement}`}>
              <legend className='metrics__name'>Weight</legend>
              {
                weight.map((value, index) => {return (
                  value.unit === unitOfMeasurement ?
                    <InputNumber 
                      key={index}
                      id={`weight-${value.name}`}
                      name={value.name}
                      updateFormData={updateFormData}
                    >{value.name}</InputNumber>
                  : null
                )})
              }

          </fieldset>
      </form>
      <div className="calculator__resultGreeting-wrapper">
        {
          isFormEmpty(formData)
          ? <Greeting />
          : <CalculatorResults 
              unitOfMeasurement={unitOfMeasurement}
              countingResult={countingResult}
            />
        }
      </div>
    </section>
  )
}

function calcMetricBMI(height: number, weight: number): calcResultType{
    const heightCoefficient: number = Math.pow(height/100, 2);
    return {
        BMI: (weight  / heightCoefficient).toFixed(1), 
        min: (MIN_BMI * heightCoefficient).toFixed(1), 
        max: (MAX_BMI * heightCoefficient).toFixed(1)
    };
}

function calcImperialBMI(ft_height: number, in_height: number, st_weight: number, lbs_weight: number): calcResultType{
    const ftToInCoeff: number = 12, stToLbsCoeff: number = 14;
    const height: number =  Number(ft_height) * ftToInCoeff  + Number(in_height);
    const weight: number = (Number(st_weight) * stToLbsCoeff + Number(lbs_weight)) * 703;
    const heightCoefficient: number = Math.pow(height, 2);
    let minWeightInches = MIN_BMI * heightCoefficient / 703;
    let maxWeightInches = MAX_BMI * heightCoefficient / 703;
    return {
        BMI: (weight / heightCoefficient).toFixed(1), 
        min: {
          st:  String(Math.floor(minWeightInches/stToLbsCoeff)),
          lbs: String(Math.floor(minWeightInches%stToLbsCoeff))
        },
        max: {
          st:   String(Math.floor(maxWeightInches/stToLbsCoeff)),
          lbs:  String(Math.floor(maxWeightInches%stToLbsCoeff))
        }
    };
}

function Greeting(){
  return(
    <div className="greeting">
      <h3 className="greeting__title">Welcome!</h3>
      <p className="greeting__description">Enter your height and weight and you’ll see your BMI result here</p>
    </div>
  )
}

function CalculatorResults({unitOfMeasurement, countingResult}: {unitOfMeasurement: string, countingResult: calcResultType}){
  return(
    <div className="calculator__result">
      <div className="BMI-value">
        <h3 className='BMI-value__title'>Your BMI is...</h3>
        <p className='BMI-value__value'>{countingResult?.BMI}</p>
      </div>
      <p className="BMI-description">
        Your BMI suggests you’re a healthy weight. Your ideal weight is between
        <span className='BMI-recommendations'>
          {unitOfMeasurement === 'imperial' && typeof countingResult?.min === 'object' && typeof countingResult?.max === 'object'
          ? ` ${countingResult?.min?.st}st ${countingResult?.min?.lbs}lbs - ${countingResult?.max?.st}st ${countingResult?.max?.lbs}lbs`
          : ` ${countingResult?.min}kgs - ${countingResult?.max}kgs`}
        </span>
      </p>
    </div>
  )
}

function InputRadio({id, name, children, checked, handleClick}: inputRadioType){
  return(
      <label className={`input unitSelector-${id}`} htmlFor={id} onClick={() => handleClick(id)}>
        <input 
          type          ='radio'
          className     ='input-radio' 
          id            ={id} 
          name          ={name} 
          defaultValue  ={id}
          defaultChecked={checked}
        />
        <span className='content-radio'>{children}</span>
      </label>
  )
}

function InputNumber({id, name, children, updateFormData}: inputNumberType){
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    updateFormData(target.name, Number(target.value));
  }
  return(
      <label className={`input unitSelector-${id}`} htmlFor={id} >
        <input 
          type        ='number'
          className   ='input-number' 
          id          ={id} 
          name        ={name} 
          defaultValue={id}
          placeholder ='0'
          onInput={handleInput}
        />
        <span className='content-number'>{children}</span>
      </label>
  )
}

