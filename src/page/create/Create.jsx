import { useState } from "react";
import useAxiosPublic from "../../hook/UseAxiosPublic";
import Swal from "sweetalert2";


const Create = () => {
    const [isCompleted, setIsCompleted] = useState(false);
    const axiosPublic = useAxiosPublic();
    const handleTask=async(data)=>{
        data.preventDefault();
        console.log('hi');
        const form=data.target;
        const title=form.title.value;
        const description=form.description.value;
        const taskItem={
            title,isCompleted,description
        }
        console.log(title,isCompleted,description);
        const postRes = await axiosPublic.post('/tasks', taskItem);
        //  console.log(postRes.data)
          if(postRes.data.insertedId){
              //show success popup
         
              Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `Task is created.`,
                  showConfirmButton: false,
                  timer: 1500
                });
                form.reset();
          }
    }
    return (
        <div className="flex h-screen items-center justify-center">
             <div className="mx-auto w-full max-w-xl ">
            <div className="rounded-lg bg-white px-10 pb-10 pt-8 shadow-md dark:bg-zinc-900">
                <div className="mb-6">
                    <h2 className="text-center text-2xl font-bold"> Add a Task</h2>
                    <p className="text-center text-zinc-500 dark:text-zinc-400">We&apos;d love to hear from you!</p>
                </div>
                <form onSubmit={handleTask} className="space-y-6">
                    <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
                        <label className="block font-bold" htmlFor="name">
                            Task Title
                        </label>
                        <input
                            className="h-10 w-full rounded border px-3 text-sm leading-tight focus:outline-none dark:border-zinc-700"
                            id="name"
                            placeholder="Enter title"
                            name="title"
                            type="text"
                        />
                    </div>
                    <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
                        <label className="font-bold mr-2" htmlFor="name">
                            Completed:
                        </label>
                        <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={(e) => setIsCompleted(e.target.checked)}
                        />
                    </div>
                    <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
                        <label className="block font-bold" htmlFor="_message">
                            Description
                        </label>
                        <textarea
                            className="min-h-[80px] w-full rounded border px-3 py-2 leading-tight focus:outline-none dark:border-zinc-700"
                            id="_message"
                            placeholder="Enter Details"
                            name="description"
                        />
                    </div>
                    <button className="rounded-md  bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700">Create Task</button>
                </form>

            </div>
        </div>

        </div>
       
    );
};

export default Create;