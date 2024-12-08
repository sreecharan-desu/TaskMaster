export function Message({text, background}) {
  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg text-white text-sm font-medium
      ${background ? 'bg-green-500' : 'bg-red-500'} 
      transition-all duration-500 ease-in-out`}>
      {text}
    </div>
  )
}