import React from "react";
import "../toc.css";
import styled from "styled-components";

const Box = styled.div`
    position: sticky;
    top: 5rem;
    width: 250px;
    a {
      color: #838383;
    }
    a[href="${props => props.headerUrl}"] {
      color: #1b1b1b;
      font-weight: bold;
    }
    a:hover {
      color: #1b1b1b;
    }
  `;
function TOC({ post, headerUrl }) {
  return (
    <div className="blog-post-tablecontent">
      <Box
        dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
        headerUrl={headerUrl}
      />
    </div>
  );
}

export default TOC;