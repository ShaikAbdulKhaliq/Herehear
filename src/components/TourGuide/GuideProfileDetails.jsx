import React from "react";
import styles from "./GuideProfileDetails.module.css";

const GuideProfileDetails = () => {
  return (
    <div className={styles.details_con}>
      <div className={styles.main_body}>
        <div className={styles.profile_img}>
          <div className={styles.profile_img_con}>
            <img
              src="/svgs/profile_1.svg"
              alt=""
              className={styles.imag_icon}
            />
          </div>
        </div>
        <div className={styles.profile_name}>
          <div className={styles.profile_name_block}>
            <div className={styles.prof_text_img1}>
              <div className={styles.prof_text}>Madhav Baliga</div>
              <div className={styles.prof_img}>
                <img
                  src="/svgs/profile_icon.svg"
                  alt=""
                  className={styles.prof_img_icon}
                />
              </div>
            </div>
          </div>
          <div className={styles.profile_name_block1}>
            <div className={styles.prof_text_img2}>
              <div>Experience</div>
              <div>Price</div>
            </div>
          </div>
          <div className={styles.profile_name_block2}>
            <div className={styles.prof_text_img3}>
              <div className={styles.prof_text1}>8 years</div>
              <div className={styles.prof_text1}>$50/ adult</div>
            </div>
          </div>
        </div>
        <div className={styles.profile_des}>
          Hello, my name is Madhav Baliga and I am excited to be your host in
          the city of Cartagena, Colombia. As a former Canadian airline pilot,
          certified Colombian tour guide, I have had the opportunity to explore
          many different cultures and historic sites around the world. But I
          have to say that Cartagena de Indias is one of my favorite
          destinations. The city is full of life, colour, and history. Cartagena
          was founded in 1533 by the Spanish, and its fortifications have been
          designated a UNESCO World Heritage Site. As your friend in a new city,
          I am committed to making your experience as enjoyable and informative
          as possible. Whether you are a history buff, a culture enthusiast, or
          simply looking for a fun unique experience, I am confident that you
          will enjoy this adventure. But it’s not just history that makes
          Cartagena special. The city is alive with culture, music, and art.
          We’ll explore and sample delicious food and listen to live music in
          the streets. Thank you for choosing to explore Cartagena with me. I
          look forward to sharing this journey with you and creating memories
          that will last a lifetime.
        </div>
        <div className={styles.profile_details}>
          <div className={styles.profile_details1}>
            <div className={styles.profile_details11}>
              <div className={styles.lan_text}>Languages</div>
              <div className={styles.languages}>
                Hindi, English, Japanese, Spanish
              </div>
            </div>
            <div className={styles.profile_details11}>
              <div className={styles.icon_text}>
                <img src="/svgs/web.svg" alt="" className={styles.web_images} />
                <div className={styles.lan_text1}>madhavb.com</div>
              </div>
              <div className={styles.icon_text}>
                <img
                  src="/svgs/telephone.svg"
                  alt=""
                  className={styles.web_images}
                />
                <div className={styles.languages1}>Tel: 123-456-7890</div>
              </div>
              <div className={styles.icon_text}>
                <img src="/svgs/Map.svg" alt="" className={styles.web_images} />
                <div className={styles.languages}>
                  500 Terry Francine St.San Francisco CA 94158
                </div>
              </div>
            </div>
            {/* <div className={styles.profile_details2}>
         
           
          </div> */}
          </div>
          {/* <div> */}

          <div className={styles.profile_details121}>
            <div className={styles.profile_details12}>
              <div className={styles.lan_text}>Mother Tongue</div>
              <div className={styles.languages}>Hindi</div>
            </div>
            <div className={styles.languages2}>
              <div className={styles.lan_text_tag}>Follow me</div>
              <div className={styles.social_media_div}>
                <div className={styles.social_media}>
                  <img
                    src="/svgs/FaceBook.svg"
                    alt=""
                    className={styles.social_media_icon_f}
                  />
                </div>
                <div className={styles.social_media}>
                  <img
                    src="/svgs/Frame.svg"
                    alt=""
                    className={styles.social_media_icon}
                  />
                </div>
                <div className={styles.social_media}>
                  <img
                    src="/svgs/mdi_instagram.svg"
                    alt=""
                    className={styles.social_media_icon}
                  />
                </div>
                <div className={styles.social_media}>
                  <img
                    src="/svgs/mdi_linkedin.svg"
                    alt=""
                    className={styles.social_media_icon}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
        <button className={styles.book_button}>Book</button>
      </div>
    </div>
  );
};

export default GuideProfileDetails;
