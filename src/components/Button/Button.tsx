import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import ArrowIcon from './arrow.svg';
import cn from 'classnames';
import { motion, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';

export const Button = ({ arrow = 'none', appearance, children, className, ...props }: ButtonProps): JSX.Element => {
	return (
		<motion.button
			whileHover={{ scale: 1.05 }}
			className={cn(styles.button, className, {
				[styles.primary]: appearance === 'primary',
				[styles.ghost]: appearance === 'ghost'
			})}
			{...props}
		>
			{children}
			{arrow !== 'none' && <span className={cn(styles.arrow, {
				[styles.down]: arrow === 'down'
			})}>
				<ArrowIcon />

			</span>}
		</motion.button >
	);
};