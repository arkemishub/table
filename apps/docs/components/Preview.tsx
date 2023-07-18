"use client";

import React, { PropsWithChildren } from "react";
import { Tabs } from "@arkejs/ui";
import examples from "@/config/examples";
import { notFound } from "next/navigation";

function Preview({
  id,
  children,
}: PropsWithChildren<{
  id: string;
}>) {
  const Component = examples.find((item) => item.id === id)?.component;

  if (!Component) {
    return notFound();
  }

  return (
    <>
      <Tabs className="docs__tabs__list">
        <Tabs.Tab>Preview</Tabs.Tab>
        <Tabs.Tab>Code</Tabs.Tab>
        <Tabs.TabPanel>
          <div className="rounded-theme bg-background-400 h-[300px] overflow-auto p-8 md:h-[600px]">
            <Component />
          </div>
        </Tabs.TabPanel>
        <Tabs.TabPanel>
          <div className="rounded-theme bg-background-400 max-h-[300px] overflow-y-auto md:max-h-[600px]">
            {children}
          </div>
        </Tabs.TabPanel>
      </Tabs>
    </>
  );
}

export default Preview;
