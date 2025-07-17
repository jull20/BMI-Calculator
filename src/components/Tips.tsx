export default function Tips(){
  return(
    <section className="tips">
        <div className="tips__wrapper container">
            <Tip img={'icon-eating.svg'} title={'Healthy eating'}>
                Healthy eating promotes weight control, disease prevention, better digestion, immunity, mental clarity, and mood.
            </Tip>
            <Tip img={'icon-exercise.svg'} title={'Regular exercise'}>
                Exercise improves fitness, aids weight control, elevates mood, and reduces disease risk, fostering wellness and longevity.
            </Tip>
            <Tip img={'icon-sleep.svg'} title={'Adequate sleep'}>
                Sleep enhances mental clarity, emotional stability, and physical wellness, promoting overall restoration and rejuvenation.
            </Tip>
        </div>
        <div className="tips__gradient" />
    </section>
  )
}

function Tip({img, title, children}: {[k:string]:string}){
    return(
        <div className="tip">
            <div className="logo"><img src={img} alt="the tip icon" /></div>
            <div className="tip__text-wrapper">
                <h3 className="tip__title">{title}</h3>
                <p className="tip__description">{children}</p>
            </div>
        </div>
    )
}
