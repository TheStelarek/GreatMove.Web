import { ReactElement } from 'react';
import styles from '@/pages/faq/Faq.module.scss';
import Accordion from '@/components/core/accordion/Accordion';
import MainLayout from '@/layouts/mainLayout/MainLayout';

const accordionData = [
   {
      title: `Can I contact you about my workouts to get some advice?`,
      content: `Of course, we will always answer and advise you if it is possible.`,
   },
   {
      title: `Is it free to use our app?`,
      content: `We do not anticipate entering any payments at this time.`,
   },
   {
      title: `What plans do you have for expanded applications?`,
      content: `Introducing modules such as measuring body circumference, calorie counting, meal planning, detailed statistics on workouts performed and advice on how to improve them. In the future we will create a system that will automatically create menus and training plans for users based on their goals and progress.`,
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
