import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import cn from "classnames";
import { useState } from "react";

import CloseIcon from "./close.svg";
import { ReviewFormProps } from "./ReviewForm.props";
import { IReviewForm, IReviewResponse } from "./ReviewForm.interface";
import { Input, Rating, Textarea, Button } from "../index";
import { API } from "../../helpers/api";

import styles from "./ReviewForm.module.css";

export const ReviewForm = ({productId, className, ...props}: ReviewFormProps): JSX.Element => {
  const {control, register, handleSubmit, formState: {errors}, reset} = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>('');

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const {data} = await axios.post<IReviewResponse>(API.review.createDemo, {
        ...formData,
        productId
      });

      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setIsError('Что-то пошло не так');
      }
    } catch(err) {
      if (err instanceof Error) {
        setIsError(err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input 
          {...register('title', {required: {
            value: true,
            message: 'Заполните заголовок'
          }})} 
          error={errors.title}
          placeholder='Заголовок отзыва' 
          className={styles.titleInput}/>
        <Input 
          {...register('name', {required: {
            value: true,
            message: 'Заполните имя'
          }})} 
          error={errors.name}
          placeholder='Имя' 
          className={styles.nameInput}/>
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name='rating'
            rules={{required: {
              value: true,
              message: 'Поставьте оценку'
            }}}
            render={({field}) => (
              <Rating 
                isEditable 
                ref={field.ref} 
                rating={field.value} 
                setRating={field.onChange}
                error={errors.rating}/>
            )}
          />
        </div>
        <Textarea 
          {...register('description', {required: {
            value: true,
            message: 'Заполните описание отзыва'
          }})} 
          error={errors.description}
          placeholder='Текст отзыва' 
          className={styles.textarea}/>
        <div className={styles.submit}>
          <Button appearance='primary'>Отправить</Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {
        isSuccess &&
        <div className={cn(styles.panel, styles.success)}>
          <p className={styles.successTitle}>Ваш отзыв отправлен</p>
          <p>Спасибо, ваш отзыв будет опубликован после проверки.</p>
          <CloseIcon className={styles.close} onClick={() => setIsSuccess(false)}/>
        </div>
      }
      {
        isError &&
        <div className={cn(styles.panel, styles.error)}>
          <p className={styles.errorTitle}>Ошибка</p>
          <p>Что-то пошло не так. Попробуйте обновить страницу.</p>
          <CloseIcon className={styles.close} onClick={() => setIsError('')}/>
        </div>
      }
    </form>
  );
};

