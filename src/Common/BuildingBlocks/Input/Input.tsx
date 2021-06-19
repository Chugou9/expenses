import * as React from "react";

/**
 * Собственные свойства компонента ввода.
 */
interface IOwnProps {
    step?: number;
    className?: string;
    value: number | string | null;
    onChange: (value: string | null) => void;
    placeholder?: string;
    type?: string;
}


/**
 * Кастомный компонент для ввода.
 */
export function Input({
    step,
    className = '',
    value = null,
    onChange,
    placeholder = '',
    type = 'string'
}: IOwnProps) {

    /**
     * Обработчик ввода значения.
     *
     * @param {React.SyntheticEvent<HTMLInputElement>} e React-событие.
     */
    const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        
        typeof onChange === 'function' && onChange(value ? value : null);
    };

    return (
        <input
            type={type}
            step={step}
            className={className ? className : ''}
            placeholder={placeholder}
            value={value as number}
            onChange={handleChange}
        />
    );
}
