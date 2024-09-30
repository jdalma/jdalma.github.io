import React, { useEffect, useState } from "react";
import { Link, graphql } from "gatsby"
import kebabCase from "lodash.kebabcase"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import TOC from "../components/toc";
import Utterances from "../components/utterances"

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  const [tocHighlight, setTocHighlight] = useState(undefined);
  useEffect(() => {
    window.addEventListener("scroll", onScrollHandler);
    return () => window.removeEventListener("scroll", onScrollHandler); //메모리 누수 방지
  }, []);
  const onScrollHandler = e => {
    const currentOffsetY = window.pageYOffset;
    const headerElements = document.querySelectorAll(".anchor-header");
    for (const item of headerElements) {
      const { top } = item.getBoundingClientRect();
      const elemTop = top + currentOffsetY;
      const lastItem = headerElements[headerElements.length - 1];
      if (elemTop <= currentOffsetY) {
        //현재 아이템의 높이와 페이지 크기를 합친 것보다  현재 높이가 크면 props로 보내준다.
        setTocHighlight(item.href.split(window.location.origin)[1]);
      }
    }
  };
  return (
      <Layout location={location} title={siteTitle}>
            <article
              className="blog-post"
              itemScope
              itemType="http://schema.org/Article"
            >
              <header>
                <h1 itemProp="headline">{post.frontmatter.title}</h1>
                <p>수정일 {post.frontmatter.update}, 작성일 {post.frontmatter.date}</p>
              </header> 
              <div className="tags">
                <ul>
                  {post.frontmatter.tags ? post.frontmatter.tags.map(
                    tag => (
                      <li key={kebabCase(tag)}>
                          <Link to={`/tags/${kebabCase(tag)}`}>{kebabCase(tag)}</Link>
                      </li>
                    ))
                  : null}
                </ul>
              </div>
              <section
                dangerouslySetInnerHTML={{ __html: post.html }}
                itemProp="articleBody"
              />
              <hr />
              <footer>
                <Bio />
              </footer>
            </article>
            <nav className="blog-post-nav">
              <ul
                style={{
                  display: `flex`,
                  flexWrap: `wrap`,
                  justifyContent: `space-between`,
                  listStyle: `none`,
                  padding: 0,
                }}
              >
                <li>
                  {previous && (
                    <Link to={previous.fields.slug} rel="prev">
                      ← {previous.frontmatter.title}
                    </Link>
                  )}
                </li>
                <li>
                  {next && (
                    <Link to={next.fields.slug} rel="next">
                      {next.frontmatter.title} →
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
            <TOC post={post} headerUrl={tocHighlight}/>
            <Utterances repo='jdalma/jdalma.github.io' theme='github-light'/>
      </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        update(formatString: "YYYY-MM-DD")
        description
        tags
      }
      tableOfContents
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
