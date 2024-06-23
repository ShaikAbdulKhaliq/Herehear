import React from 'react';
import { useNavigate } from 'react-router-dom';
import './base.css';
import './embla.css';
import './sandbox.css';
import EmblaCarousel from './EmblaCarousel';
import EmblaHeader from './EmblaHeader';
import { useGlobalInfo } from '../../../../context/globalContext';
import { useSwipeable } from 'react-swipeable';
import { dropdownScroller } from '../../../../Images/Image';

const LOOP = true

const WheelScrollerMain = () => {

    const { toggleScroller, showScroller,events } = useGlobalInfo();
    const navigate = useNavigate();
    // const handlers = useSwipeable({
    //     onSwipedDown: () => {
    //         console.log('swiped');
    //         toggleScroller()
    //         setTimeout(() => {
    //             navigate('/dashboard');
    //         }, 500);
    //     },
    // });

    return (
        <main className="sandbox" style={{ transform: showScroller ? 'translateY(0%)' : 'translateY(101%)' }} /*{...handlers}*/>
            <div className='border'></div>
            <EmblaHeader />
            <section className="sandbox__carousel">
                <EmblaCarousel loop={LOOP} />
                <div className='arrow_container_right'><img src={dropdownScroller.rightArrow} alt="arrow" /></div>
                <div className='arrow_container_left'><img src={dropdownScroller.leftArrow} alt="arrow" /></div>
            </section>
        </main>
    )
}

export default WheelScrollerMain
