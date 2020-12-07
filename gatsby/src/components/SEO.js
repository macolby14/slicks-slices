import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

export default function SEO({ children, location, description, title, image }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitter
        }
      }
    }
  `);
  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{title}</title>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="alternate icon" href="/favicon.ico" />
      {/* Meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      <meta name="description" content={site.siteMetadata.description} />
      {/* Open Graph */}
      {location && <meta location="og:url" content={location.href} />}
      <meta property="og:image" content={image || '/logo.svg'} />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta
        property="og:sitename"
        content={site.siteMetadata.title}
        key="ogsitename"
      />
      <meta
        property="og:description"
        content={description || site.siteMetadata.description}
        key="ogdesc"
      />
      {children}
    </Helmet>
  );
}
