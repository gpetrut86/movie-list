import "./Pagination.css";

const Pagination = ({page,loadMore,totalPages,changePage}) => {
    return (
        <div className="pagination">
        <button className="pagination-btn" disabled={ page > 1 ? false : true} onClick={()=>{loadMore(-1)}}>Prev</button>
        <p className="pagination-page"><input type="number" value={page}
         onChange={(e)=>{totalPages > 1 ? 
         changePage(e.target.value) : ""}}  /> / {totalPages}</p>

        <button className="pagination-btn" disabled={page===totalPages ? true : false} onClick={()=>{loadMore(+1)}}>Next</button>
        </div>
    );
    }

export default Pagination;