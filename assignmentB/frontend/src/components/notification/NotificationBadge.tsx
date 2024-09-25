const NotificationBadge = ({ count }: { count: number }) => {
    if (count === 0) return null;
  
    return (
      <span
        className="absolute top-0 right-0 z-50 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full"
        style={{ transform: 'translate(50%, -50%)' }}
        >
        {count}
      </span>
    );
  };
  
  export default NotificationBadge;