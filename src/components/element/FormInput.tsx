import React from "react";

interface FormInputProps {
	label: string;
	type: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	icon?: React.ReactNode;
	icon2?: React.ReactNode;
	disabled?: boolean; // Add the disabled prop
}

const FormInput: React.FC<FormInputProps> = ({
	label,
	type,
	value,
	onChange,
	icon,
	icon2,
	disabled = false,
}) => {
	return (
		<div>
			<div className="flex-column">
				<label>{label}</label>
			</div>
			<div className="inputForm">
				{icon}
				<input
					type={type}
					className="input"
					placeholder={`Enter your ${label}`}
					value={value}
					onChange={onChange}
					disabled={disabled}
				/>
				{icon2}
			</div>
		</div>
	);
};

export default FormInput;
