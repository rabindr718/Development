import classes from "../Forms/Forms"
const Form =()=>{
    return <form className={classes.custom}>
          <div className="mb-1">
    <label for="exampleInputEmail1" className="form-label">Guest name</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">Here enter Guest Name.</div>
  </div>
  <div className="mb-1">
    <label for="exampleInputEmail1" className="form-label">Mobile Number</label>
    <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">Here enter Mobile number.</div>
  </div>    <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Event name</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">Here enter Event Name.</div>
  </div>
  <div className="mb-1">
    <label for="exampleInputEmail1" className="form-label">Venue</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">Here enter Venue Name.</div>
  </div>
  
  
  <div className="mb-1 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
       
 

    </form>

}

export default Form;