import './CustomButton.scss';

interface CustomButtonProps {
    text: string,
    color: 'primary' | 'secondary',
    disabled?: boolean;
    type?: HTMLButtonElement['type'],
    onClick?: () => void
    ariaLabel?: string;
}

function CustomButton({ text, type, color, disabled, onClick, ariaLabel }: CustomButtonProps) {
    return (
        <button
            type={type || 'button'}
            role='button'
            className={`buttonComponent
            ${color === 'primary' ? 'primary' : ''}
            ${color === 'secondary' ? 'secondary' : ''}`}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel || text}
        >
            {text}
        </button>
    )
}

export default CustomButton;