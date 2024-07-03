import { useEffect, useState } from "react";
import useTask from "../../hook/UseTask";
import Swal from "sweetalert2";
import { TiInputCheckedOutline } from "react-icons/ti";
import { ImCheckboxChecked } from "react-icons/im";
import useAxiosPublic from "../../hook/UseAxiosPublic";




const AllTasks = () => {
    const [allTask] =useTask();
    const axiosPublic = useAxiosPublic();
 
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {

        const fetchData = async () => {
     
          setFilteredData(allTask); // Initialize filtered data with all data
        };
   // refetch();
        fetchData();
      }, [allTask]);
    console.log(allTask);
    const handleDelete= (id) =>{
    
        const proceed =confirm('Are you sure ?you want to delete?')
        if(proceed){
            fetch(`http://localhost:5300/tasks/${id}`,{
                method:'DELETE'
            })
            .then( res =>res.json())
            .then(data =>{
                console.log(data);
                if(data.deletedCount > 0)
                {
                    Swal('Delete successfully');
                    const remaining= filteredData.filter(task=>task._id!==id )
                    setFilteredData(remaining);
                }
            })
        }
     
  
  
  }
  const handleComplete = task =>{
    axiosPublic.patch(`/tasks/${task._id}`)
    .then(res =>{
        //console.log(res.data)
        if(res.data.modifiedCount > 0){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Task is complete Now!`,
                showConfirmButton: false,
                timer: 1500
              });
        }
    })
}
    return (
        <div className=" flex justify-center mt-24">
            <div className=" grid grid-cols-1   md:grid-cols-3 gap-8">
                {
                    allTask.map( task =>
                    <div key={task._id} className="card bg-[#e0dff1] w-96 shadow-xl">
                        <div className="card-body">
                        <button  onClick={()=>handleDelete(task._id)}  className=" text-xl font-bold hover:text-red-600 text-end p-2">X</button>
                        <div className="card-actions justify-start">
                         
                           {task.isCompleted?  <button><ImCheckboxChecked color="green" /><span className=" text-gray-400">Completed</span></button> : <button
                                            onClick={() => handleComplete(task)}
                                            className="">
                                    <TiInputCheckedOutline size={"2rem"} color="red"/>
                                        </button>}
                          </div>
                          <h2 className="card-title">{task.title}</h2>
                          <p>{task.description}</p>
                         
                        </div>
                      </div>
                      )
                }

            </div>
        </div>
    );
};

export default AllTasks;