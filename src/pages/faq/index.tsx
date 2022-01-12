import Accordion from '@/components/core/accordion/Accordion';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import { ReactElement } from 'react';
import styles from '@/pages/faq/Faq.module.scss';

const accordionData = [
   {
      title: `Lorem ipsum dolor sit amet consectetur adipisicing elit. `,
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
     laborum cupiditate possimus labore, hic temporibus velit dicta earum
     suscipit commodi eum enim atque at? Et perspiciatis dolore iure
     voluptatem.`,
   },
   {
      title: `Section 2`,
      content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia veniam
     reprehenderit nam assumenda voluptatem ut. Ipsum eius dicta, officiis
     quaerat iure quos dolorum accusantium ducimus in illum vero commodi
     pariatur? Impedit autem esse nostrum quasi, fugiat a aut error cumque
     quidem maiores doloremque est numquam praesentium eos voluptatem amet!
     Repudiandae, mollitia id reprehenderit a ab odit!`,
   },
   {
      title: `Section 3`,
      content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
     quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
     dolor ut sequi minus iste? Quas?`,
   },
];

const Faq = () => (
   <div className={styles.wrapper}>
      <h4 className={styles.heading}>Frequently asked questions</h4>
      <div className={styles.accordionWrapper}>
         {accordionData.map(({ title, content }) => (
            <Accordion key={title} title={title} content={content} />
         ))}
      </div>
      <div className={styles.questionsWrapper}>
         <h5>Still have a questions?</h5>
         <p className={styles.description}>
            If you cannot find answer to your question in our FAQ, you can always contact us. We will answer to you
            shortly!
         </p>
      </div>
   </div>
);

export default Faq;

Faq.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};
