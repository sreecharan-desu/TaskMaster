import './App.css'


//frontendurl(deployment): https://task-master-rose.vercel.app/
//backendurl (deployment): https://task-master-kohl.vercel.app/

//backend endpoints : 
  //users
    // http://localhost:5000/api/v1/user/signup (POST)
    // http://localhost:5000/api/v1/user/signin (POST)
    // http://localhost:5000/api/v1/user/gettodos (GET)
    // http://localhost:5000/api/v1/user/getusername (GET)
    // http://localhost:5000/api/v1/user/addtodo (POST)
    // http://localhost:5000/api/v1/user/markasdone (POST)
    // http://localhost:5000/api/v1/user/update (PUT)
    // http://localhost:5000/api/v1/user/updatetodo (PUT)
    // http://localhost:5000/api/v1/user/removetodo (DELETE)


  //admin
    // http://localhost:5000/api/v1/admin/signup (POST)
    // http://localhost:5000/api/v1/admin/signin (POST)
    // http://localhost:5000/api/v1/admin/details (GET)
    // http://localhost:5000/api/v1/admin/getusers (GET)
    // http://localhost:5000/api/v1/admin/deleteuser (DELETE) 
    // http://localhost:5000/api/v1/admin/update (PUT) 



function App() {
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold">Hello, SreeCharan</h1>
        <p className="text-gray-700">Tailwind Configuration Completed! <br /> Start Coding . . .</p>
      </div>
    </div>
    </>
  )
}

export default App
