import { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

const PageContainer = ({ children }: PageContainerProps) => {
  return <div style={{ margin: "20px 10px 0", width: "100%"}}>{children}</div>;
};

export default PageContainer;
