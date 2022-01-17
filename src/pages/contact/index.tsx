import { yupResolver } from '@hookform/resolvers/yup';
import emailjs from 'emailjs-com';
import { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '@/components/core/button/Button';
import Input from '@/components/core/input/Input';
import TextArea from '@/components/core/textArea/TextArea';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import styles from '@/pages/contact/Contact.module.scss';

interface ContactFormValue {
   name: string;
   email: string;
   phone?: string;
   message: string;
}

const ContactValidationSchema = yup.object({
   name: yup.string().required(`Name is required`),
   email: yup.string().email(`Email must be a valid email`).required(`Email is required`),
   phone: yup.string(),
   message: yup.string().required(`Message is required`),
});

const Contact = () => {
   const [isSending, setIsSending] = useState<boolean>(false);
   const [success, setSuccess] = useState<string>(``);
   const [error, setError] = useState<string>(``);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<ContactFormValue>({
      mode: `onSubmit`,
      resolver: yupResolver(ContactValidationSchema),
      defaultValues: {
         phone: ``,
      },
   });

   const onSubmit = (data: ContactFormValue) => {
      setIsSending(true);
      emailjs.send(`service_vkhknwj`, `template_m1hrorp`, { ...data }, `user_X7RyNFOPTjaPyCD9vuzQs`).then(
         (res) => {
            setSuccess(`Message was sent!`);
            setIsSending(false);
            reset();
         },
         (err) => {
            setError(`Message failed to be sent`);
            setIsSending(false);
         },
      );
   };

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <h1 className={styles.heading}>Get in touch!</h1>
            <p className={styles.info}>
               Do you have any questions? Having trouble with something on our site? Feel free to contact us using the
               form below
            </p>

            <form className={styles.contactForm} onSubmit={handleSubmit(onSubmit)}>
               <div className={styles.inputsWrapper}>
                  <div className={styles.left}>
                     <div className={styles.inputWrapper}>
                        <Input
                           variant="gray"
                           type="text"
                           placeholder="Your name"
                           label="Name"
                           size="big"
                           {...register(`name`)}
                           radius={5}
                        />
                        {errors?.name && <p className="error">{errors?.name?.message}</p>}
                     </div>
                     <div className={styles.inputWrapper}>
                        <Input
                           variant="gray"
                           type="text"
                           placeholder="Your email"
                           label="Email"
                           size="big"
                           {...register(`email`)}
                           radius={5}
                        />
                        {errors?.email && <p className="error">{errors?.email?.message}</p>}
                     </div>
                     <div className={styles.inputWrapper}>
                        <Input
                           variant="gray"
                           type="text"
                           placeholder="Your phone number"
                           label="Phone"
                           size="big"
                           {...register(`phone`)}
                           radius={5}
                        />
                        {errors?.phone && <p className="error">{errors?.phone?.message}</p>}
                     </div>
                  </div>

                  <div className={styles.right}>
                     <div className={styles.inputWrapper}>
                        <TextArea
                           variant="gray"
                           placeholder="Your message"
                           size="full"
                           label="Message"
                           {...register(`message`)}
                           radius={5}
                        />
                        {errors?.message && <p className="error">{errors?.message?.message}</p>}
                     </div>
                  </div>
               </div>

               <div className={styles.btnWrapper}>
                  {error && <p className="error">{error}</p>}
                  {success && <p className="success">{success}</p>}
                  <Button
                     type="submit"
                     borderRadius={10}
                     size="large"
                     isFullWidth
                     isDisabled={!!errors.email || !!errors.name || !!errors.message}
                     isLoading={isSending}
                  >
                     Send message
                  </Button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Contact;

Contact.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout fullWidth>{page}</MainLayout>;
};
