

export function Button({onclickFn}){
    return(<>
        <input type={'button'} value={'Update'} onClick={onclickFn} className="m-2 p-2 cursor-pointer rounded-md w-24 bg-black text-white font-bold hover:bg-white hover:text-black" style={{border : '2px solid black'}}/>
        <br />
    </>)
}