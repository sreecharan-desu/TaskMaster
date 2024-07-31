

export function Navbar(){
    return(<>
        <div className="flex justify-between align-middle place-content-center -ml-5 -mt-5 -mr-8">
            <h1 className="font-bold text-2xl first-letter:text-4xl ">
                TaskMaster
            </h1>
            <div className=" flex justify-around place-content-center ml-">
                <h1 className="text-lg m-2 font-semibold">
                    Hello
                </h1>
                <div className="bg-blue-400 rounded-full w-10 h-10 text-3xl mr-2 text-white cursor-pointer" title="Account">
                    S
                </div>
                <div className="bg-red-600 rounded-full w-10 h-10 text-3xl cursor-pointer" title="Logout">
                    ⊝
                </div>
            </div>
        </div>
    </>)
}