import React from "react";
import PropTypes from "prop-types";

const PageContainer = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: any;
}) => (
  <div>
      <title>{title}</title>
      <meta name="description" content={description} />
    {children}
  </div>
);

PageContainer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

export default PageContainer;
