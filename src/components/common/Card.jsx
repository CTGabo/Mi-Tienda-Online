const Card = ({ children, className = "" }) => {
    return (
      <div className={`
        bg-white rounded-lg shadow-md p-6
        hover:shadow-lg transition-shadow
        ${className}
      `}>
        {children}
      </div>
    );
  };
  
  export default Card;