import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import cn from 'classnames';
import Logo from '../logo.svg';
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';



export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {

	const [isOpened, setIsOpened] = useState<boolean>(false);
	const route = useRouter();

	useEffect(() => {
		setIsOpened(false);
	}, [route]);

	const variants = {
		opened: {
			opacity: 1,
			x: 0,
			transition: {
				stiffnes: 20
			}
		},
		cloused: {
			opacity: 0,
			x: '100%'
		}
	}

	return (
		<header className={cn(className, styles.header)} {...props}>
			<Logo />
			<ButtonIcon appearance='white' icon='menu' onClick={() => setIsOpened(true)} />
			<motion.div
				className={styles.mobileMenu}
				variants={variants}
				initial={'cloused'}
				animate={isOpened ? 'opened' : 'cloused'}
			>
				<Sidebar />
				<ButtonIcon className={styles.menuClouse} appearance='white' icon='clouse' onClick={() => setIsOpened(false)} />
			</motion.div>
		</header>
	);
};