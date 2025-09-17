import './CustomButton.css';

interface CustomButtonProps {
    text: string,
    color: 'primary' | 'secondary',
    type?: HTMLButtonElement['type'],
    onClick?: () => void
}

function CustomButton({ text, type, color, onClick }: CustomButtonProps) {
    return (
        <button
            type={type || 'button'}
            role='button'
            className={`buttonComponent
            ${color === 'primary' ? 'primary' : ''}
            ${color === 'secondary' ? 'secondary' : ''}`}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default CustomButton;