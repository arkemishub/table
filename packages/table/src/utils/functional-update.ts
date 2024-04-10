import * as React from "react";

export function functionalUpdate<T>(
  updater: React.SetStateAction<T>,
  input: T
): T {
  return typeof updater === "function"
    ? (updater as (input: T) => T)(input)
    : updater;
}
