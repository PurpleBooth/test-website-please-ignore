import React, { FunctionComponent } from "react";

const Loading: FunctionComponent = () => (<div className="flex items-center justify-center  my-10 space-x-2 animate-pulse">
  <div className="w-8 h-8 bg-indigo-200 rounded-full"></div>
  <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
  <div className="w-8 h-8 bg-indigo-900 rounded-full"></div>
</div>);
export default Loading;
