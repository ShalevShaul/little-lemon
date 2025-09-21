import './CustomButton.scss';

interface CustomButtonProps {
    text: string,
    color: 'primary' | 'secondary',
    disabled?: boolean;
    type?: HTMLButtonElement['type'],
    onClick?: () => void
}

function CustomButton({ text, type, color, disabled, onClick }: CustomButtonProps) {
    return (
        <button
            type={type || 'button'}
            role='button'
            className={`buttonComponent
            ${color === 'primary' ? 'primary' : ''}
            ${color === 'secondary' ? 'secondary' : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default CustomButton;