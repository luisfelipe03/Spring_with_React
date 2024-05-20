interface FieldErrorProps {
    error: any | null;
}

export const FieldError: React.FC<FieldErrorProps> = ({error}) => {
    if(error){
        return (
            <span className="text-red-500 text-xs italic">{error}</span>
        )
    }

    return false;
}