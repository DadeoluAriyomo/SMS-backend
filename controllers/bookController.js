let{books}= require('../DATA/data');
//Get all books
const getAllBooks=(req,res)=>{
    try{
        return res.json({
        data: books,
    })

    }catch(error){
        console.log("Error fetching users:",error)
    }
}

//Get a book by id
const getBooksById=(req,res)=>{
    
    try{
        const bookIdString=req.params.id ;
        const bookId=parseInt(bookIdString)
        if(!bookId){
            return res.status(400).json({
                error:"Invalid book ID"

            })
        }
        const foundBook= books.find((book)=> book.id===bookId);
        if(!foundBook){
            return res.status(404).json({
                error:"Book not found"
            })
        }
        return res.json({
            data: foundBook
        })

    }catch(error){
        console.log("Error fetching Book by ID:",error)
    }
}
//Create a new Book
const createBooks=(req,res)=>{
    try{
        const requestData=req.body;
        {
            const title=requestData.title;
            const author=requestData.author;
            const published=requestData.published;
            if(!title){
                return res.status(400).json({
                    error:"Title is required"
                })
            }
            if(!author){
                return res.status(400).json({
                    error:"Author is required"
                })
            }
            if(!published){
                return res.status(400).json({
                    error:"Published date is required"
                })

            }
            const booksLength= books.length;
            books.push({
            id:booksLength+1,
            title:title,
            author:author,
            published:published
            })
        }
        return res.json({
                message:"data is saved successfully",
                data: books
        })
    }catch(error){
        console.log("Error creaating new user:",error)
    }
}
// Update a book
    const updateBook=(req,res)=>{
        try{
            const bookidString=req.params.id;
            const bookid=parseInt(bookidString);
            const book=books.find((b)=>b.id===bookid);
            if(!book){
                return res.status(404).json({
                    error:"Book not found"
                })
            }
            const {title,author,published}=req.body;
            const updatedTitle=title ||book.title;
            const updatedAuthor=author ||book.author;
            const updatedPublished=published ||book.published;

            book.title=updatedTitle;
            book.author=updatedAuthor;
            book.published=updatedPublished;
            return res.json({
                message:"book updated successfully",
                data: book
            })
        }catch(error){
            console.log("Error updating books")
        }
    }
//Delete a book
const deleteBook=(req,res)=>{
    try{
        const bookIdString=req.params.id;
        const bookId= parseInt(bookIdString);
        const book=books.find(b=>b.id===bookId);
        if(!book){
            return res.status(404).json({
                error:"Book not found"
            })
        }
        books=books.filter((b)=>b.id!==bookId);
        return res.json({
            message:"Book deleted successfully",
            data:books
        })

    }catch(error){
        console.log("Error deleting book")
    }
}
// export default getAllUser\
module.exports={
getAllBooks,getBooksById,createBooks,updateBook,deleteBook
}
