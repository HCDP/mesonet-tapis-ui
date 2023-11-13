import styles from './Button.module.scss';

const Button: React.FC<{
    onClick: () => void;
    text: String;
  }> = ({ onClick, text }) => {
    return (
      <button className={styles['button']} onClick={onClick}>{text}</button>
    );
  }

export default Button;
