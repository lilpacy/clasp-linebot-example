import { messagePush } from "./Code";

declare const global: {
  [x: string]: any;
};

global.messagePush = function(e: any) {
  return messagePush();
};
