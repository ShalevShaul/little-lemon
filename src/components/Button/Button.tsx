import './Button.css';

interface ButtonProps {
    text: string,
    type?: HTMLButtonElement['type'],
    onClick?: () => void
}

function Button({ text, type, onClick }: ButtonProps) {
    return (
        <button
            type={type || 'button'}
            role='button'
            className='buttonComponent'
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default Button;