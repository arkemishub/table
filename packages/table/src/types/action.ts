import { ReactNode } from "react";

type Action = {
  content: ((data: Record<string, unknown>) => ReactNode) | ReactNode;
  onClick?: (data: Record<string, unknown>) => void;
};

export type { Action };
