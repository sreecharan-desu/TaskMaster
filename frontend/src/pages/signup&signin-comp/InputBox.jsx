
export function InputBox({type,text,onInputChange}){
    return(<>
        <input type={type} placeholder={text} className="p-2 m-2 rounded-md" style={{border : '2px solid black'}} onChange={onInputChange} />
    </>)
}