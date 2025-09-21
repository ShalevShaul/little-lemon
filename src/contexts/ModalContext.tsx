import { useContext, useState, createContext, ReactNode } from "react";
import CustomModal from "../components/CustomModal/CustomModal";

interface ModalContextType {
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
    isModalOpen: boolean;
}

interface ModalContextProviderProps {
    children: ReactNode;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: ModalContextProviderProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<ReactNode>('');

    const openModal = (content: ReactNode) => {
        setIsModalOpen(true);
        setModalContent(content);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const value: ModalContextType = {
        openModal,
        closeModal,
        isModalOpen
    }

    return (
        <ModalContext.Provider value={value}>
            {children}
            {isModalOpen && <CustomModal children={modalContent} />}
        </ModalContext.Provider>
    )
}

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);

    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}