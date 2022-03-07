import React, { useState, useEffect } from 'react'
import '../styles/FaqStyle/FaqStyle.css'

export default function FaqPage() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    let [car, setCar] = useState(true)
    let [buy, setBuy] = useState(false)
    let [sell, setSell] = useState(false)
    let [privacy, setPrivacy] = useState(false)

    let [carFilterOptions1, setCarFilterOptions1] = useState(false)
    let [carFilterOptions2, setCarFilterOptions2] = useState(false)
    let [carFilterOptions3, setCarFilterOptions3] = useState(false)
    let [buyFilterOptions4, setBuyFilterOptions4] = useState(false)
    let [buyFilterOptions5, setBuyFilterOptions5] = useState(false)
    let [buyFilterOptions6, setBuyFilterOptions6] = useState(false)
    let [sellFilterOptions7, setSellFilterOptions7] = useState(false)
    let [privacyFilterOptions8, setPrivacyFilterOptions8] = useState(false)

    const closeOptions = (e) => {
        if (e.target.id == 1) {
            setCarFilterOptions1(carFilterOptions1 => !carFilterOptions1)
        }
        else if (e.target.id == 2) {
            setCarFilterOptions2(carFilterOptions2 => !carFilterOptions2)
        }
        else if (e.target.id == 3) {
            setCarFilterOptions3(carFilterOptions3 => !carFilterOptions3)
        }
        else if (e.target.id == 4) {
            setBuyFilterOptions4(buyFilterOptions4 => !buyFilterOptions4)
        }
        else if (e.target.id == 5) {
            setBuyFilterOptions5(buyFilterOptions5 => !buyFilterOptions5)
        }
        else if (e.target.id == 6) {
            setBuyFilterOptions6(buyFilterOptions6 => !buyFilterOptions6)
        }
        else if (e.target.id == 7) {
            setSellFilterOptions7(sellFilterOptions7 => !sellFilterOptions7)
        }
        else if (e.target.id == 8) {
            setPrivacyFilterOptions8(privacyFilterOptions8 => !privacyFilterOptions8)
        }
        if (e.target.parentElement.children[1].className === 'optionsOpen') {
            e.target.parentElement.children[1].style.cssText += 'margin-top: -30px'
            setTimeout(() => {
                e.target.parentElement.children[1].style.cssText += 'display: none'
            }, 500);
        }
        else {
            e.target.parentElement.children[1].style.cssText += 'display: block'
            setTimeout(() => {
                e.target.parentElement.children[1].style.cssText += 'margin-top: 0px'
            }, 10);
        }
    }

    return (
        <div>
            <div className="faqPage">
                <div className="header">
                    <h1>FAQ</h1>
                    <p>Homepage - FAQ</p>
                </div>
                <div className="mainSection">
                    <div className="secondHeader">
                        <h1>FREQUENTLY ASKED QUESTION</h1>
                        <h2>Et proin eu, ut lectus nibh nullam tortor mi. </h2>
                    </div>
                    <div className="secondSection">
                        <div className="menu">
                            <p onClick={() => {
                                setCar(true)
                                setBuy(false)
                                setSell(false)
                                setPrivacy(false)
                            }} className={car ? 'menuItemSelected' : 'menuItem'}>Car</p>
                            <p onClick={() => {
                                setCar(false)
                                setBuy(true)
                                setSell(false)
                                setPrivacy(false)
                            }} className={buy ? 'menuItemSelected' : 'menuItem'}>Buy</p>
                            <p onClick={() => {
                                setCar(false)
                                setBuy(false)
                                setSell(true)
                                setPrivacy(false)
                            }} className={sell ? 'menuItemSelected' : 'menuItem'}>Sell</p>
                            <p onClick={() => {
                                setCar(false)
                                setBuy(false)
                                setSell(false)
                                setPrivacy(true)
                            }} className={privacy ? 'menuItemSelected' : 'menuItem'}>Privacy</p>
                        </div>
                        <div className='content'>
                            {car && <div className='selectSections' >
                                <div className="selectSection">
                                    <div onClick={closeOptions} id="1" className="selectHeader">
                                        <h3>How to compare car?</h3>
                                        {carFilterOptions1 ? <img className='arrow' src="../assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
                                    </div>
                                    <div className={carFilterOptions1 ? 'optionsOpen' : 'optionsClosed'} >
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores magnam distinctio animi fugiat minus ab ea unde consequatur? Harum fuga dolor fugiat ipsum voluptatem qui dignissimos aspernatur quaerat! Repudiandae, odio?</p>
                                    </div>
                                </div>
                                <div className="selectSection">
                                    <div onClick={closeOptions} id="2" className="selectHeader">
                                        <h3>Where to find car review?</h3>
                                        {carFilterOptions2 ? <img className='arrow' src="../assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
                                    </div>
                                    <div className={carFilterOptions2 ? 'optionsOpen' : 'optionsClosed'} >
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores magnam distinctio animi fugiat minus ab ea unde consequatur? Harum fuga dolor fugiat ipsum voluptatem qui dignissimos aspernatur quaerat! Repudiandae, odio?</p>
                                    </div>
                                </div>
                                <div className="selectSection">
                                    <div onClick={closeOptions} id="3" className="selectHeader">
                                        <h3>What cause the web error?</h3>
                                        {carFilterOptions3 ? <img className='arrow' src="../assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
                                    </div>
                                    <div className={carFilterOptions3 ? 'optionsOpen' : 'optionsClosed'} >
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores magnam distinctio animi fugiat minus ab ea unde consequatur? Harum fuga dolor fugiat ipsum voluptatem qui dignissimos aspernatur quaerat! Repudiandae, odio?</p>
                                    </div>
                                </div>
                            </div>}
                            {buy && <div className='selectSections' >
                                <div className="selectSection">
                                    <div onClick={closeOptions} id="4" className="selectHeader">
                                        <h3>Lorem text 1?</h3>
                                        {buyFilterOptions4 ? <img className='arrow' src="../assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
                                    </div>
                                    <div className={buyFilterOptions4 ? 'optionsOpen' : 'optionsClosed'} >
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores magnam distinctio animi fugiat minus ab ea unde consequatur? Harum fuga dolor fugiat ipsum voluptatem qui dignissimos aspernatur quaerat! Repudiandae, odio?</p>
                                    </div>
                                </div>
                                <div className="selectSection">
                                    <div onClick={closeOptions} id="5" className="selectHeader">
                                        <h3>Lorem text 2?</h3>
                                        {buyFilterOptions5 ? <img className='arrow' src="../assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
                                    </div>
                                    <div className={buyFilterOptions5 ? 'optionsOpen' : 'optionsClosed'} >
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores magnam distinctio animi fugiat minus ab ea unde consequatur? Harum fuga dolor fugiat ipsum voluptatem qui dignissimos aspernatur quaerat! Repudiandae, odio?</p>
                                    </div>
                                </div>
                                <div className="selectSection">
                                    <div onClick={closeOptions} id="6" className="selectHeader">
                                        <h3>Lorem text 3?</h3>
                                        {buyFilterOptions6 ? <img className='arrow' src="../assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
                                    </div>
                                    <div className={buyFilterOptions6 ? 'optionsOpen' : 'optionsClosed'} >
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores magnam distinctio animi fugiat minus ab ea unde consequatur? Harum fuga dolor fugiat ipsum voluptatem qui dignissimos aspernatur quaerat! Repudiandae, odio?</p>
                                    </div>
                                </div>
                            </div>}
                            {sell && <div className='selectSections' >
                                <div className="selectSection">
                                    <div onClick={closeOptions} id="7" className="selectHeader">
                                        <h3>Lorem text 1?</h3>
                                        {sellFilterOptions7 ? <img className='arrow' src="../assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
                                    </div>
                                    <div className={sellFilterOptions7 ? 'optionsOpen' : 'optionsClosed'} >
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores magnam distinctio animi fugiat minus ab ea unde consequatur? Harum fuga dolor fugiat ipsum voluptatem qui dignissimos aspernatur quaerat! Repudiandae, odio?</p>
                                    </div>
                                </div>
                            </div>}
                            {privacy && <div className='selectSections' >
                                <div className="selectSection">
                                    <div onClick={closeOptions} id="8" className="selectHeader">
                                        <h3>Lorem text 1?</h3>
                                        {privacyFilterOptions8 ? <img className='arrow' src="../assets/upload.png" alt="" /> : <img className='arrow' src="./assets/down-arrow.png" alt="" />}
                                    </div>
                                    <div className={privacyFilterOptions8 ? 'optionsOpen' : 'optionsClosed'} >
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores magnam distinctio animi fugiat minus ab ea unde consequatur? Harum fuga dolor fugiat ipsum voluptatem qui dignissimos aspernatur quaerat! Repudiandae, odio?</p>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
