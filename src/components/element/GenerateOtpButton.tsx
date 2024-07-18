
import React, { useState } from "react";


interface GenerateOtpButtonProps {
    onClickFunction: () => Promise<void>;
  }

const GenerateOtpButton: React.FC<GenerateOtpButtonProps> = ({onClickFunction}) => {
	const [loading, setLoading] = useState(false);
	const [timer, setTimer] = useState<number | null>(null);

	const handleClick = async () => {
		if (timer) return; // Prevent multiple clicks during the timer
		setLoading(true);

         onClickFunction()

		// // Simulate OTP generation process
		// setTimeout(() => {
		// 	setLoading(false);
		// 	startTimer();
		// }, 2000); // Simulate OTP generation delay

        setLoading(false);
			startTimer();
	};

	const startTimer = () => {
		const otpTimer = 120; // 2 minutes
		setTimer(otpTimer);

		const interval = setInterval(() => {
			setTimer((prev) => {
				if (prev === null || prev <= 0) {
					clearInterval(interval);
					return null;
				}
				return prev - 1;
			});
		}, 1000);
	};

	const getButtonText = () => {
		if (loading) {
			return (
				<>
					<span className="animate-spin mr-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="24px"
							viewBox="0 -960 960 960"
							width="24px"
							fill="#434343"
						>
							<path d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z" />
						</svg>
					</span>
					Generating...
				</>
			);
		}
		if (timer) {
			return `Re generate in ${timer}s`;
		}
		return "Generate OTP";
	};

	return (
		<><button
        className={`border p-3 rounded-md flex items-center ${
            loading || timer ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={handleClick}
        disabled={loading || timer !== null}
    >
        {getButtonText()}
    </button>
    
    </>
	);
};

export default GenerateOtpButton;
