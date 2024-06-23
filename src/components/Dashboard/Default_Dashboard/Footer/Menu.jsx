import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Menu.module.css'
import { Footer } from '../../../../Images/Image';


const Menu = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [transform, setTransform] = useState('translate(-100%, -100%) rotate(-50deg)');
  const [favouriteImg, setFavouriteImg] = useState(Footer.favourite);
  const [ticketImg, setTicketImg] = useState(Footer.TicketClicked);
  const [calendarImg, setCalendarImg] = useState(Footer.calender);

  const navigate = useNavigate();


  const toggleOpen = () => {
    setIsOpen(!isOpen)
    setTransform('translate(-100%, -100%) rotate(-50deg)');
  }

  const handleClick = (rotation, imgName) => {
    setIsOpen(true);
    setTransform(`translate(-100%, -100%) rotate(${rotation}deg)`);
    setTimeout(() => {
      if (imgName === 'favourite') {
        setFavouriteImg(Footer.favouriteClicked);
        setTicketImg(Footer.Ticket);
        setCalendarImg(Footer.calender);
      } else if (imgName === 'ticket') {
        setFavouriteImg(Footer.favourite);
        setTicketImg(Footer.TicketClicked);
        setCalendarImg(Footer.calender);
      } else if (imgName === 'calendar') {
        setFavouriteImg(Footer.favourite);
        setTicketImg(Footer.Ticket);
        setCalendarImg(Footer.calenderClicked);
      }
    }, 800);

    setTimeout(() => {
      if (imgName === 'favourite') {
        navigate('/dashboard/favourites');
      } else if (imgName === 'ticket') {
        navigate('/dashboard/confirmed_tickets');
      } else if (imgName === 'calendar') {
        navigate('/dashboard/alleventsv1');
      }
    }, 1500);
  }

  return (
    <div className={`${styles.base} ${isOpen ? styles.close : ''}`}>
      <div className={styles.menu} onClick={toggleOpen}>
        <img src={Footer.menu} alt="menu icon" className={styles.menu_icon} />
      </div>
      <div className={styles.icons}>
        <img src={favouriteImg} alt="favourite_img" className={styles.favourite_img} onClick={() => handleClick(-80, 'favourite')} />
        <img src={ticketImg} alt="ticket_img" className={styles.ticket_img} onClick={() => handleClick(-50, 'ticket')} />
        <img src={calendarImg} alt="calendar_img" className={styles.calendar_img} onClick={() => handleClick(-22, 'calendar')} />
      </div>
      <div className={styles.section}>
        <div className={styles.cover1} style={{ transform: transform }}>
          <div className={styles.cover2}>
            <a className={styles.content} href="#calender"></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
