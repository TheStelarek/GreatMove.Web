import { ReactElement } from 'react';
import styles from '@/styles/Recipe.module.scss';
import Layout from '@/components/core/layout/Layout';

export default function Recipe() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.background}>
          <div className={styles.title}>
            Chocolate and peanut butter overnight oats
          </div>
          <div className={styles.timeInfo}>
            <div className={styles.time}>
              <div className={styles.textTime}> Total time </div>
              <div className={styles.white}> 10m </div>
            </div>
            <div className={styles.time}>
              <div className={styles.textTime}> Prep time </div>
              <div className={styles.white}> 10m </div>
            </div>
            <div className={styles.time}>
              <div className={styles.textTime}> Cook time</div>
              <div className={styles.white}> 0m </div>
            </div>
            <div className={styles.time}>
              <div className={styles.textTime}>5 reviews</div>
              <img
                className={styles.img}
                alt="evaluation of the recipe"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/1_stars.svg/2560px-1_stars.svg.png"
              />
            </div>
            <div className={styles.share}>
              <div className={styles.textTime}>share</div>
              <img
                alt="share button"
                className={styles.icon}
                src="https://cdn.iconscout.com/icon/free/png-256/share-2451538-2082548.png"
              />
            </div>
            <div className={styles.print}>
              <div className={styles.textTime}>print</div>
              <img
                alt="print button"
                className={styles.icon}
                src="https://www.svgrepo.com/show/68134/print-button.svg"
              />
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.leftBox}>
            <p className={styles.desc}>
              Want a treat for breakfast? Give these overnights oast a try,
              it&apos;s like eating a dessert for brekkie. The combination of
              peanute butter and cocoa is amazing. just don&apos;t add to much
              cocoa as it&apos;s quite bitter.
            </p>
            <div className={styles.Nurtilion}>
              <div className={styles.subTitle}>Nurtilion per savings</div>
              <div className={styles.time}>
                <div className={styles.nurPerSav}>Calories</div>
                <div>165</div>
              </div>

              <div className={styles.time}>
                <div className={styles.nurPerSav}>Protein</div>
                <div>5.2g</div>
              </div>

              <div className={styles.time}>
                <div className={styles.nurPerSav}>Carbs</div>
                <div>22g</div>
              </div>

              <div className={styles.time}>
                <div className={styles.nurPerSav}>Fats</div>
                <div>6.4g</div>
              </div>

              <div className={styles.time}>
                <div className={styles.nurPerSav}>Fibre</div>
                <div>7.78g</div>
              </div>
            </div>

            <div className={styles.subTitle}>Tips</div>
            <div className={styles.time}>
              <div>
                1. bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
                bla bla bla bla bla bla bla bla bla bla bla bla
              </div>
              <div>
                2. bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
                bla bla bla bla bla bla bla
              </div>
              <div>3. bla bla bla bla bla bla bla</div>
              <div>4. bla bla bla bla bla bla bla</div>
              <div>5. bla bla bla bla bla bla bla</div>
              <div>6. bla bla bla bla bla bla bla</div>
              <div>6. bla bla bla bla bla bla bla</div>
              <div>6. bla bla bla bla bla bla bla</div>
              <div>6. bla bla bla bla bla bla bla</div>
              <div>6. bla bla bla bla bla bla bla</div>
              <div>6. bla bla bla bla bla bla bla</div>

              <div className={styles.subTitle}>How to make it?</div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
              <div className={styles.how}>
                1. asjdouij asoidfosiadfoaisjd foiasjdfoiasdj foisajdfasoidjf
                asoidfj asoidj faos
              </div>
            </div>
          </div>

          <div className={styles.foods}>
            <img
              className={styles.foodIMG}
              alt="finished product"
              src="https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/5AEDC2E2-CFA3-4947-ADCE-725FDCB49ACA/Derivates/D1074D58-56AB-493C-8A33-A225B25DFA9C.jpg"
            />
            <div className={styles.gray}>
              <div className={styles.subTitle}>Ingredients</div>
              <div className={styles.savages}>
                <img
                  className={styles.icon}
                  alt="It's minus icon decreasing the number of servings"
                  src="https://iconape.com/wp-content/png_logo_vector/minus-circle.png"
                />
                <div className={styles.servingsNUM}>1 savage</div>
                <img
                  className={styles.icon}
                  alt="It's plus icon increasing the number of servings"
                  src="https://cdn.iconscout.com/icon/premium/png-256-thumb/plus-2359070-1970930.png"
                />
              </div>
              <div className={styles.ingredient}>
                <div>
                  <img
                    className={styles.dot}
                    alt="It's dot before the ingredient name"
                    src="https://cdn3.iconfinder.com/data/icons/objects/512/Dot-512.png"
                  />
                  45g rolled oats
                </div>
                <div>
                  <img
                    className={styles.dot}
                    alt="It's dot before the ingredient name"
                    src="https://cdn3.iconfinder.com/data/icons/objects/512/Dot-512.png"
                  />
                  40g soya yogurt
                </div>
                <div>
                  <img
                    alt="It's dot before the ingredient name"
                    className={styles.dot}
                    src="https://cdn3.iconfinder.com/data/icons/objects/512/Dot-512.png"
                  />
                  15g penaut butter
                </div>
                <div>
                  <img
                    alt="It's dot before the ingredient name"
                    className={styles.dot}
                    src="https://cdn3.iconfinder.com/data/icons/objects/512/Dot-512.png"
                  />
                  15g penaut butter
                </div>
                <div>
                  <img
                    alt="It's dot before the ingredient name"
                    className={styles.dot}
                    src="https://cdn3.iconfinder.com/data/icons/objects/512/Dot-512.png"
                  />
                  15g penaut butter
                </div>
                <div>
                  <img
                    alt="It's dot before the ingredient name"
                    className={styles.dot}
                    src="https://cdn3.iconfinder.com/data/icons/objects/512/Dot-512.png"
                  />
                  15g penaut butter
                </div>
                <div>
                  <img
                    alt="It's dot before the ingredient name"
                    className={styles.dot}
                    src="https://cdn3.iconfinder.com/data/icons/objects/512/Dot-512.png"
                  />
                  15g penaut butter
                </div>
                <div>
                  <img
                    alt="It's dot before the ingredient name"
                    className={styles.dot}
                    src="https://cdn3.iconfinder.com/data/icons/objects/512/Dot-512.png"
                  />
                  15g penaut butter
                </div>
                <div>
                  <img
                    alt="It's dot before the ingredient name"
                    className={styles.dot}
                    src="https://cdn3.iconfinder.com/data/icons/objects/512/Dot-512.png"
                  />
                  15g penaut butter
                </div>
                <div>
                  <img
                    alt="It's dot before the ingredient name"
                    className={styles.dot}
                    src="https://cdn3.iconfinder.com/data/icons/objects/512/Dot-512.png"
                  />
                  15g penaut butter
                </div>
                <div>
                  <img
                    alt="It's dot before the ingredient name"
                    className={styles.dot}
                    src="https://cdn3.iconfinder.com/data/icons/objects/512/Dot-512.png"
                  />
                  15g penaut butter
                </div>
                <div>
                  <img
                    alt="It's dot before the ingredient name"
                    className={styles.dot}
                    src="https://cdn3.iconfinder.com/data/icons/objects/512/Dot-512.png"
                  />
                  15g penaut butter
                </div>
                <img
                  alt="It's dot before the ingredient name"
                  className={styles.dot}
                  src="https://cdn3.iconfinder.com/data/icons/objects/512/Dot-512.png"
                />
                15g penaut butter
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Recipe.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
