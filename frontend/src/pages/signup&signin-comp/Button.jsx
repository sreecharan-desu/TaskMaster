export function Button({text, onclickFn}) {
  return (
    <button 
      onClick={onclickFn}
      className="w-full sm:w-auto px-6 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-300"
    >
      {text}
    </button>
  )
}