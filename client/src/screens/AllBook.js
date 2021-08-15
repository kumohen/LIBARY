import React,{useState,useEffect} from 'react';
import {getAllBook,filterBook} from "../actions/book_action"
import {issueABook} from "../actions/Issue_action"
import { useDispatch, useSelector } from 'react-redux'

const AllBook = () => {
    const dispatch = useDispatch() ;
    const [searchKey,setSearchKey] = useState("")
    
    useEffect(()=> {
        dispatch(getAllBook())
    },[])
   const {books} = useSelector(state => state.getAllBookReducer)
   const {currentUser} = useSelector(state => state.userLoginReducer)

   const userId = currentUser.user._id ;
  const  userBranch  =  currentUser.user.branch ;
  const userName = currentUser.user.name ;
   
    const postData = (book)=>{
        const {title,author,publisher,year,_id} = book ;
     
        const issueUser = {
            title,author,publisher,year,userId,bookId:_id,userBranch,userName
        }
        if(book.copies){
            dispatch(issueABook(issueUser))
        } else {
            alert("book not available")
        }
        // 
    }

    return (
        <div>
               <div className="col-md-10 m-auto" >
                  <h3 className='text-center bg-info p-2' style={{fontFamily:"sans-serif",}}>All AVAILABLE BOOk IN LIBARY</h3>
            </div>
            <div className="col-md-8 m-auto" style={{display:"flex"}}>
            <input type="text"  className="form-control" placeholder="search book by Name"  style
            ={{height:"50px"}}
            onChange={(e) => setSearchKey(e.target.value)} value={searchKey} />
            <button  onClick={() => dispatch(filterBook(searchKey))} className="btn btn-primary">Search  </button>
            </div>
            
            <div className="col-md-10 m-auto">

            <table  className='table table-bordered table-responsive-sm' style={{marginTop:"20px"}}>

              

<thead className='thead-dark' >
    <tr>
        <th>Serial No.</th>
        <th>Title</th>
        <th>Author</th>
        <th>Copies</th>
        <th>Status</th>
        <th>Actions</th>
    </tr>
</thead>
<tbody>
{books && books.map((book,index)=>{

    return <tr key={book._id}>
            <td>{index+1}</td>
        <td>{book.title}</td>
        <td>
            {book.author}
        </td>
        <td>{book.copies}</td>
        <td>{book.copies > 0 ? "AVAILABLE" : "NOT AVAILABLE"}</td>
        <td>
           
            {currentUser.user.isAdmin && (
                <i className='fa fa-trash m-1' onClick={()=> console.log("okk")}></i>
            )}
            {!currentUser.user.isAdmin && (
                <button onClick={() => postData(book)} className={`btn btn-success`}>Issue</button>
            )}
           
        </td>

    </tr>

})}
</tbody>

</table>
</div>
        </div>
    );
};

export default AllBook;