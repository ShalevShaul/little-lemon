import './CustomButton.css';

interface CustomButtonProps {
    text: string,
    type?: HTMLButtonElement['type'],
    onClick?: () => void
}

function CustomButton({ text, type, onClick }: CustomButtonProps) {
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

export default CustomButton;