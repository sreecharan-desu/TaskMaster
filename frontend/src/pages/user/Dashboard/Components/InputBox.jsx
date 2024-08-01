

export function InputBox({Inputtype,placeholderText,onchangeFn}){
    return(<>
        <input type={Inputtype} placeholder={placeholderText} onChange={onchangeFn} className="m-2 p-2" style={{border : '2px solid black'}}/>
        <br />
    </>)
}