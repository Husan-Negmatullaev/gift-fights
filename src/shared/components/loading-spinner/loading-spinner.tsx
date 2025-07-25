type LoadingSpinnerProps = {
	className?: string;
};

export const LoadingSpinner = (props: LoadingSpinnerProps) => {
	const { className } = props;

	return (
		<div className={`relative ${className} w-61.5 h-66.5 animate-bounce`}>
			<div className="absolute inset-0 size-full animate-pulse">
				<div className="w-full h-full rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-75 blur-md" />
			</div>

			{/* Main spinner */}
			<div className="relative w-full h-full flex items-center justify-center">
				<img
					alt="Loading"
					style={styles}
					src="assets/images/flask.webp"
					className="w-32 h-40 drop-shadow-lg"
				/>
			</div>

			<div className="absolute inset-0 size-full rounded-full bg-blue-400 opacity-20 blur-xl animate-ping" />
		</div>
	);
};

const styles = {
	filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))",
	// animation: 'spin 2s linear infinite, glow 2s ease-in-out infinite alternate',
};
