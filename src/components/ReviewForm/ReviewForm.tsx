import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSendResponse } from './ReviewForm.interface';
import { API } from '../../helpers/api';
import { useState } from 'react';
import axios from 'axios';


export const ReviewForm = ({ producktId, className, ...props }: ReviewFormProps): JSX.Element => {

	const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>();

	const [isSucces, setIsSucces] = useState<boolean>(false);
	const [isError, setIsError] = useState<string>();

	const onSubmit = async (formdata: IReviewForm) => {

		try {
			const { data } = await axios.post<IReviewSendResponse>(API.review.createDemo, { formdata, producktId });
			if (data.message) {
				setIsSucces(true);
				reset();
			} else {
				setIsError('Что-то пошло не так');
			}
		} catch (e) {
			if (e instanceof Error) {
				setIsError(e.message);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)}
				{...props}
			>
				<Input {...register('name', { required: { value: true, message: 'Заполните имя' } })}
					placeholder='Имя'
					error={errors.name}

				/>
				<Input {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
					placeholder='Заголовок отзыва'
					className={styles.title}
					error={errors.title}
				/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name='rating'
						rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
						render={({ field }) => (
							<Rating
								isEditable
								rating={field.value}
								ref={field.ref}
								setRating={field.onChange}
								error={errors.rating}
							/>
						)}
					/>
				</div>
				<Textarea {...register('description', { required: { value: true, message: 'Заполните описание' } })}
					placeholder='Текст отзыва'
					className={styles.description}
					error={errors.description}
				/>
				<div className={styles.submit}>
					<Button appearance='primary' >Отправить</Button>
					<span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div >
			{isSucces && <div className={cn(styles.success, styles.panel)}>
				<div className={styles.successTitle}>Ваш отзыв отправлен</div>
				<div>
					Спасибо, ваш отзыв будет опубликован после проверки
				</div>
				<CloseIcon className={styles.close} onClick={() => setIsSucces(false)} />
			</div>}
			{isError && <div className={cn(styles.error, styles.panel)}>
				Что-то пошло не так, попробуйте обновить страницу
				<CloseIcon className={styles.close} onClick={() => setIsError(undefined)} />
			</div>}
		</form>
	);
};