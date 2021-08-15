const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/auth")
const Issue = require("../models/issue");
const Book = require("../models/book");





router.post("/issueRequest", (req, res) => {

   const { title,author,publisher,year,userId,bookId,userBranch,userName,isRecom } = req.body ;

    

    const book = new Issue({
        title,author,publisher,year,userId,bookId,userBranch,userName,isRecom
    })
    book.save().then(result => {
        res.status(201).json({
            message: "Done upload!",
            
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
 
})

router.get("/issuedBook", requireLogin ,(req,res)=>{
    Issue.find({ userId: req.user._id })
    .then((admins) => {
      res.json(admins);
    })
    .catch((err) => {
      console.log(err);
    });
})

router.get("/allIssuedBook" ,(req,res)=>{
    Issue.find()
    .then((admins) => {
      res.json(admins);
    })
    .catch((err) => {
      console.log(err);
    });
})


router.post("/issuedBookDelete" , async(req,res)=>{

     //const res = await Issue.findOneAndDelete({ bookId: req.body.postId }) ;
     const {postId} = req.body ;
     try {
        await Issue.findOneAndDelete({ bookId: req.body.postId }) ;
        const book = await Book.findOne({_id : postId}) ;

        book.copies += 1 ;
        await book.save();
        res.send("you successfully return the book")

     } catch (error) {
        console.log(error);
     }

   
})

router.post("/issuedReqAccept", async(req, res) => {

    const {bookId,postId} = req.body ;
    
    try {
        const issue = await Issue.findOne({_id : bookId})
        const book = await Book.findOne({_id : postId})
          book.copies -= 1 ;
          await book.save();
        issue.isIssue = true
        await issue.save()
        res.send('issue Delivered Successfully')
    } catch (error) {

        return res.status(400).json({ message: error});
        
    }
  
});

router.post("/issueReqDelete" , async(req,res)=>{
  
    try {
       await Issue.findOneAndDelete({ _id: req.body.postId }) ;
       
       res.send("you successfully return the book")

    } catch (error) {
       console.log(error);
    }

  
})

router.get("/allIssueRequest", (req, res) => {
    Issue.find().sort({ createdAt: -1 }).then(data => {
        res.status(200).json(
           data
        );
    });
});
   

router.post("/issuedBook", async(req, res) => {

    const postId = req.body.postId
    try {
        const book = await Book.findOne({_id : postId})
        console.log(book)
        book.isIssue = true
        await book.save()
        res.send('book issued Successfully')
    } catch (error) {

        return res.status(400).json({ message: error});
        
    }
  
});

router.post("/singleIssuedBook", async(req, res) => {

    const postId = req.body.postId
   
    try {
        const book = await Book.findOne({_id : postId});
  
        res.json(book)
        
    } catch (error) {

        return res.status(400).json({ message: error});
        
    }
  
});



module.exports = router;