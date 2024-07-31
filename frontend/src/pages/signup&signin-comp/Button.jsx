
export function Button({text,onclickFn}){
    return(<>
        <input type={'button'} value={text} className="cursor-pointer p-2 m-2 rounded-md bg-white text-black font-semibold border w-52 hover:bg-black hover:text-white" style={{border : '2px solid black'}}  onClick={onclickFn}/>
    </>)
}