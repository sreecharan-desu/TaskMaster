export function InputBox({text, type, onInputChange}) {
  return (
    <div className="mb-6">
      <input 
        type={type} 
        placeholder={text}
        onChange={onInputChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 outline-none transition-all"
      />
    </div>
  )
}