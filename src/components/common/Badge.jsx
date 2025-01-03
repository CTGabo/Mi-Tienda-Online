const Badge = ({ children, variant = "primary" }) => {
    const variants = {
      primary: "bg-blue-100 text-blue-800",
      success: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800"
    };
  
    return (
      <span className={`
        ${variants[variant]}
        px-2.5 py-0.5 rounded-full text-xs font-medium
      `}>
        {children}
      </span>
    );
  };
  
  export default Badge;