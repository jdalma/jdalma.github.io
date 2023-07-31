import React from "react"

const TableOfContents = ({ content }) => {
  return (
    <div className="toc-container">
      <div className="toc-wrapper">
        <div className="toc-content">
          <div className="toc" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>    
  )
}

export default TableOfContents