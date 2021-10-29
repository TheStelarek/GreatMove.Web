import React from 'react';
import Rating from 'react-rating';
import styles from '@/components/recipe/recipeReview/RecipeReview.module.scss';
import { Line } from 'rc-progress';
import Star from '@/public/recipe/star.svg';
import Up from '@/public/recipe/up.svg';
import Down from '@/public/recipe/down.svg';
import Flag from '@/public/recipe/flag.svg';

interface RecipeReviewProps {
   rate: number;
   email: string;
   date: string;
   comment: string;
   upVote: number;
   downVote: number;
}

const RecipeReview: React.FC<RecipeReviewProps> = ({ rate, email, date, comment, upVote, downVote }) => (
   <div className={styles.reviewContainer}>
      <div className={styles.title}>Reviews</div>
      <div className={styles.upContainer}>
         <div className={styles.description}>Explore other opinions or leave your own!</div>
         <div className={styles.ratingContainer}>
            <div className={styles.ratingWraper}>
               <div className={styles.rating}>
                  <p className={styles.rate}>{rate}</p>
                  <p className={styles.maxRate}>/5</p>
               </div>
               <div className={styles.stars}>
                  <Rating
                     emptySymbol={
                        <img
                           src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/1088px-Five-pointed_star.svg.png"
                           className={styles.star}
                        />
                     }
                     fullSymbol={
                        <img
                           src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Star_red.svg/557px-Star_red.svg.png"
                           className={styles.star}
                        />
                     }
                  />
                  <p className={styles.amount}>10 reviews</p>
               </div>
            </div>
            <div className={styles.progressBars}>
               <div className={styles.progressBar}>
                  <p className={styles.text}>5</p>
                  <Star className={styles.icon} />
                  <Line
                     className={styles.progress}
                     percent={40}
                     strokeColor="Yellow"
                     trailColor="Gray"
                     gapPosition="bottom"
                     prefixCls="bottom"
                  />
                  <p className={styles.text}>4</p>
               </div>
               <div className={styles.progressBar}>
                  <p className={styles.text}>4</p>
                  <Star className={styles.icon} />
                  <Line
                     className={styles.progress}
                     percent={10}
                     strokeColor="Yellow"
                     trailColor="Gray"
                     gapPosition="bottom"
                     prefixCls="bottom"
                  />
                  <p className={styles.text}>1</p>
               </div>
               <div className={styles.progressBar}>
                  <p className={styles.text}>3</p>
                  <Star className={styles.icon} />
                  <Line
                     className={styles.progress}
                     percent={30}
                     strokeColor="Yellow"
                     trailColor="Gray"
                     gapPosition="bottom"
                     prefixCls="bottom"
                  />
                  <p className={styles.text}>3</p>
               </div>
               <div className={styles.progressBar}>
                  <p className={styles.text}>2</p>
                  <Star className={styles.icon} />
                  <Line
                     className={styles.progress}
                     percent={0}
                     strokeColor="Yellow"
                     trailColor="Gray"
                     gapPosition="bottom"
                     prefixCls="bottom"
                  />
                  <p className={styles.text}>2</p>
               </div>
               <div className={styles.progressBar}>
                  <p className={styles.text}>1</p>
                  <Star className={styles.icon} />
                  <Line
                     className={styles.progress}
                     percent={0}
                     strokeColor="Yellow"
                     trailColor="Gray"
                     gapPosition="bottom"
                     prefixCls="bottom"
                  />
                  <p className={styles.text}>0</p>
               </div>
            </div>
         </div>
      </div>

      <div className={styles.commentBox}>
         <div className={styles.commentBoxHeader}>
            <Rating
               emptySymbol={
                  <img
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/1088px-Five-pointed_star.svg.png"
                     className={styles.star}
                  />
               }
               fullSymbol={
                  <img
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Star_red.svg/557px-Star_red.svg.png"
                     className={styles.star}
                  />
               }
            />

            <div className={styles.author}>
               {email} - {date}
            </div>
         </div>
         <div className={styles.comment}>{comment}</div>
         <div className={styles.commentFooter}>
            <div>
               <button type="button" className={styles.button}>
                  <p>{upVote}</p>
                  <Up className={styles.icon} />
               </button>
            </div>
            <div className={styles.downButton}>
               <button type="button" className={styles.button}>
                  <p>{downVote}</p>
                  <Down className={styles.icon} />
               </button>
            </div>
            <div className={styles.reportButtonBox}>
               <button type="button" className={styles.reportButton}>
                  <p>Report</p>
                  <Flag className={styles.iconFlag} />
               </button>
            </div>
         </div>
      </div>

      <div className={styles.commentBox}>
         <div className={styles.commentBoxHeader}>
            <Rating
               emptySymbol={
                  <img
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/1088px-Five-pointed_star.svg.png"
                     className={styles.star}
                  />
               }
               fullSymbol={
                  <img
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Star_red.svg/557px-Star_red.svg.png"
                     className={styles.star}
                  />
               }
            />

            <div className={styles.author}>
               {email} - {date}
            </div>
         </div>
         <div className={styles.comment}>{comment}</div>
         <div className={styles.commentFooter}>
            <div>
               <button type="button" className={styles.button}>
                  <p>{upVote}</p>
                  <Up className={styles.icon} />
               </button>
            </div>
            <div className={styles.downButton}>
               <button type="button" className={styles.button}>
                  <p>{downVote}</p>
                  <Down className={styles.icon} />
               </button>
            </div>
            <div className={styles.reportButtonBox}>
               <button type="button" className={styles.reportButton}>
                  <p>Report</p>
                  <Flag className={styles.iconFlag} />
               </button>
            </div>
         </div>
      </div>
   </div>
);

export default RecipeReview;
