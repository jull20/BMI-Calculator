import type {cardDataType} from './types'

export default function Limitations(){
    return(
        <section className="limitations container">
            <div className="limitations__text-wrapper">
                <h2 className="limitations__title">Limitations of BMI</h2>
                <p className="limitations__description">
                    Although BMI is often a practical indicator of healthy weight, it is not suited for every person. Specific groups should carefully consider their BMI outcomes, and in certain cases, the measurement may not be beneficial to use.
                </p>
                <div className="limitations_line-img"><img src="pattern-curved-line-right.svg" alt="" /></div>
            </div>
            <div className="limitations__cards">
                {
                    cardData.map((obj:cardDataType, index:number) => {
                        return <Card key={index} img={obj.img} title={obj.title}>{obj.description}</Card>
                    })
                }
            </div>
        </section>
    )
}

const cardData: cardDataType[] = [
    {
        img: 'icon-gender.svg', title: 'Gender',
        description: "The development and body fat composition of girls and boys vary with age. Consequently, a child's age and gender are considered when evaluating their BMI."
    },
    {
        img: 'icon-age.svg', title: 'Age',
        description: "In aging individuals, increased body fat and muscle loss may cause BMI to underestimate body fat content."
    },
    {
        img: 'icon-muscle.svg', title: 'Muscle',
        description: "BMI may misclassify muscular individuals as overweight or obese, as it doesn't differentiate muscle from fat."
    },
    {
        img: 'icon-pregnancy.svg', title: 'Pregnancy',
        description: "Expectant mothers experience weight gain due to their growing baby. Maintaining a healthy pre-pregnancy BMI is advisable to minimise health risks for both mother and child."
    },
    {
        img: 'icon-race.svg', title: 'Race',
        description: "Certain health concerns may affect individuals of some Black and Asian origins at lower BMIs than others. To learn more, it is advised to discuss this with your GP or practice nurse."
    }
]

function Card({img, title, children}: cardDataType){
    return(
        <div className={"card " + title.toLowerCase()}>
            <div className="card__title-wrapper">
                <img className="card__img" src={img} alt="" />
                <h4 className="card__title">{title}</h4>
            </div>
            <p className="card__description">{children}</p>
        </div>
    )
}