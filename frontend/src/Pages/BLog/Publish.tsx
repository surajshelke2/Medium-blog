import { AppBar } from "../../component/AppBar";
import TextEditor from "./TextEditor";



const Publish = () => {
  return (
    <div>
      <AppBar here={0} />
      <div className="flex justify-center md:w-10/12">
        <div className="title md:w-10/12 w-4/5 p-4 md:p-2 text-start text-pretty">
          
          <TextEditor placeholder={"Write Your thoughts"}/>
        </div>
      </div>
    </div>
  )
}



export default Publish;
