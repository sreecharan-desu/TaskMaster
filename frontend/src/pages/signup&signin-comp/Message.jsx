export function Message({text,background}){
    const backgroundColor=(background == null)?'transparent':(background==true)?'green':'red';
    return(
        <>
            <div className="mt-10 rounded-md p-3 text-center text-white font-semibold text-base" style={{backgroundColor : backgroundColor}}>
                {text}
            </div>
        </>
    )
}