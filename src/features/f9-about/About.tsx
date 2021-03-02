import React from 'react';
import s from './About.module.css';
import about1 from './../../assets/about/about-1.png';
import about2 from './../../assets/about/about-2.png';
import about3 from './../../assets/about/about-3.png';
import about4 from './../../assets/about/about-4.png';
import about5 from './../../assets/about/about-5.png';


export const About = () => {
  return <div className={s.aboutPage}>
    <h2 className={s.title}>
      The Smart Cards app is a great way to organize your learning process using flash cards
    </h2>
    <ol className={s.aboutList}>
      <li className={s.aboutItem}>
        <div className={s.aboutBox} style={{backgroundImage: `url(${about1})`}}>
          <div className={s.description}>
            <span className={s.text}>
              Create a new Pack with the name of subject that you want to train.
            New pack contains 0 cards. You can create unlimited quantity of Packs.
            </span>
          </div>
        </div>
      </li>

      <li className={s.aboutItem}>
        <div className={s.aboutBox} style={{backgroundImage: `url(${about2})`}}>
          <div className={s.description}>
             <span className={s.text}>
            Add Cards into new Pack with question and answer.
               You can add unlimited quantity of Packs.
             </span>
          </div>
        </div>
      </li>

      <li className={s.aboutItem}>
        <div className={s.aboutBox} style={{backgroundImage: `url(${about3})`}}>
          <div className={s.description}>
            <span className={s.text}>
            Press Learn button and start learning!
            </span>
          </div>
        </div>
      </li>

      <li className={s.aboutItem}>
        <div className={s.aboutBox} style={{backgroundImage: `url(${about4})`}}>
          <div className={s.description}>
            <span className={s.text}>
            After answer on the question you can estimate your knowledge.
            </span>
          </div>
        </div>
      </li>
      <li className={s.aboutItem}>
        <div className={s.aboutBox} style={{backgroundImage: `url(${about5})`}}>
          <div className={s.description}>
            <span className={s.text}>
            The questions with the lowest scores will fall out more often.
            This is done in order to improve the knowledge of those issues that you know worse.
            </span>
          </div>
        </div>
      </li>
    </ol>
  </div>
}