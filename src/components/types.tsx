export type calcResultType = {
  BMI: string,
  min: string | {st: string, lbs: string},
  max: string | {st: string, lbs: string},
}

export type inputNumberType = {
  id:       string,
  name:     string,
  children: string,
  updateFormData: (key:string, value:number)=>void
}

export type inputRadioType = {
  id:      string,
  name:    string,
  children:string,
  checked: boolean,
  handleClick: (unitName: string)=>void
}

export type cardDataType = {
    img: string,
    title: string, 
    description: string
};

export type formDataType = { cm: number, kg: number } | { ft: number, in: number, st: number, lbs: number }
export type inputObjType = { unit: string, type: string, name: string }