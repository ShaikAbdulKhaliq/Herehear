import React, { useState } from 'react';
import style from './Terms_Conditions.module.css';
import { useTranslation } from "react-i18next";

const Terms_Conditions = ({ onCancelClick, onAcceptClick }) => {
    const { t } = useTranslation();
    let {terms_conditions_title, p1, p2, p3, p4, p5, p6, p7, ul1, li1, li2, li3, li4, li5, li6, ul2, li7, li8, li9, li10, li11, li12, li13, li14, li15, li16, accept_btn, cancel_btn} = t("terms_conditions");

    const [AcceptBtnClicked, setAcceptBtnClicked] = useState(false);
    const [cancelBtnClicked, setCancelBtnClicked] = useState(false);

    const handleCancelClick = () => {
        setCancelBtnClicked(!cancelBtnClicked);
        setAcceptBtnClicked(false);
        onCancelClick();
    };

    const handleAcceptClick = () => {
        setAcceptBtnClicked(!AcceptBtnClicked);
        setCancelBtnClicked(false);
        onAcceptClick();
    };

    return (
        <div className={style.Terms_Conditions_Container}>
            <div className={style.TC_title}>
                <span>{terms_conditions_title}</span>
            </div>
            <div className={style.Para_block}>
                <p>{p1}</p>

                <p>{p2}</p>

                <p>{p3}</p>

                <p>{p4}</p>

                <p>{p5}</p>

                <p>{p6}</p>

                <p>{p7}</p>

                <ul>{ul1}
                    <li>{li1}</li>
                    <li>{li2}</li>
                    <li>{li3}</li>
                    <li>{li4}</li>
                    <li>{li5}</li>
                    <li>{li6}</li>
                </ul>

                <ul>{ul2}
                    <li>{li7}</li>
                    <li>{li8}</li>
                    <li>{li9}</li>
                    <li>{li10}</li>
                    <li>{li11}</li>
                    <li>{li12}</li>
                    <li>{li13}</li>
                    <li>{li14}</li>
                    <li>{li15}</li>
                    <li>{li16}</li>
                </ul>
            </div>

            <div className={style.buttons_block}>
                <button className={cancelBtnClicked ? style.btn_onclick : ''} onClick={handleCancelClick}>{cancel_btn}</button>
                <button className={`${style.btn_onclick}`} onClick={handleAcceptClick}>{accept_btn}</button>
            </div>
        </div>
    )
}

export default Terms_Conditions
