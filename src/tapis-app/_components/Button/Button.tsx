import styles from './Button.module.scss';

const Button: React.FC<{
  onClick: () => void;
  text: String;
  className?: string;
}> = ({ onClick, text, className }) => {
  return (
    <button className={className ? className : styles['button']} onClick={onClick}>{text}</button>
  );
}

export default Button;
