import './Button.css';

interface ButtonProps {
    paddingY: number,
    paddingX: number,
    text: string,
    onClick?: () => void
}

function Button({ paddingY, paddingX, text, onClick }: ButtonProps) {
    return (
        <button
            className='buttonComponent'
            style={{ padding: `${paddingY}px ${paddingX}px` }}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default Button;