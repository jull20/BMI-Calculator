import Calculator from './Calculator'

export default function Hero(){
  return(
    <section className="hero">
      <div className="hero__wrapper container">
        <div className="logo"><img src="logo.svg" alt="logo" /></div>
        <div className="hero__content">
          <h1 className='hero__title'>
            <p>Body Mass</p>
            Index Calculator
          </h1>
          <p className="hero__description">
            Better understand your weight in relation to your height using our body mass index (BM) calculator. While BMI is not the sole determinant of a healthy weight, it offers a valuable starting point to evaluate your overall health and well-being.
          </p>
        </div>
        <Calculator/>
      </div>
      <div className="hero__gradient" />
    </section>
  )
}