const NotificationBadge = ({ count }: { count: number }) => {
    if (count === 0) return null;
  
    return (
      <span className="relative ml-2">
        <span className="absolute inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
          {count}
        </span>
      </span>
    );
  };
  
  export default NotificationBadge;