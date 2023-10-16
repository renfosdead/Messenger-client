import classNames from "classnames";
import styled from "styled-components";

const ExpandableGroup = ({
  label = "",
  index,
  expandedGroup,
  setExpanded,
  children = [],
}) => {
  const className = classNames({
    expanded: index === expandedGroup,
  });
  return (
    <StyledExpandableGroup className={className}>
      <div className="expandable-header" onClick={() => setExpanded(index)}>
        {label}
      </div>
      <div className="group-body">{children}</div>
    </StyledExpandableGroup>
  );
};

export default ExpandableGroup;

const StyledExpandableGroup = styled.div`
  .group-body {
    display: none;
    font-size: ${({ theme }) => theme.fontSizeSM};
  }

  .expandable-header {
    display: flex;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSizeSM};
    height: ${({ theme }) => theme.buttonHeight};
    font-weight: bold;
    position: relative;
    &:after {
      position: absolute;
      content: "▼";
      right: 0;
      transform: rotate(-90deg);
    }
  }

  &.expanded {
    .group-body {
      display: block;
    }
    .expandable-header:after {
      transform: rotate(-0);
    }
  }
`;
