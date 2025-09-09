import './Button.css';

interface ButtonProps {
    paddingY: number,
    paddingX: number,
    text: string,
    type?: HTMLButtonElement['type'],
    onClick?: () => void
}

function Button({ paddingY, paddingX, text, type, onClick }: ButtonProps) {
    return (
        <button
            type={type || 'button'}
            role='button'
            className='buttonComponent'
            style={{ padding: `${paddingY}px ${paddingX}px` }}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default Button;