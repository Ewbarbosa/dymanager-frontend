import style from './styles.module.scss'

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    name: string;    
    options: Option[];
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({ name, options, value, onChange }: SelectProps) {
    return (
        <select            
            className={style.select}
            name={name}
            value={value}
            onChange={onChange}
        >
            {options.map((option, index) => (
                <option key={index} value={option.value} className={style.option}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}