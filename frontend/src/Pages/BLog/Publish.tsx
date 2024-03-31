import { AppBar } from "../../component/AppBar";
import TextEditor from "./TextEditor";


const Publish = () => {
  return (
    <div>
      <AppBar here={0} />
      <div className="flex justify-center md:w-10/12">
        <div className="title md:w-10/12 w-4/5 p-4 md:p-2 text-start text-pretty">
          <input className="placeholder:italic placeholder:text-2xl placeholder:text-slate-400 bg-white w-full md:py-1 py-4 lg:mt-5 lg:text-2xl lg:font-semibold lg:placeholder:font-normal pl-9 md:pl-2 pr-3 shadow-sm focus:outline-none sm:text-sm text-xl" placeholder="Title..." type="text" />
          <TextEditor />
        </div>
      </div>
    </div>
  )
}



export default Publish;
