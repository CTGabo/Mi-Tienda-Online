function Button({
  children,
  type = "button",
  className = "",
  disabled = false,
  onClick,
  variant = "primary"
}) {
  const baseStyles = "px-4 py-2 rounded-md transition-colors duration-200 font-medium";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-300",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white disabled:bg-gray-300",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:border-gray-300 disabled:text-gray-300"
  };

  const handleClick = (e) => {
    if (type !== "submit") {
      e.preventDefault();
    }
    onClick && onClick(e);
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;