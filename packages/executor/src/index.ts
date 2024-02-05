import {RuntimeNodeContext} from '@isc-logic-flow/types';

export const executor = (code: string, context: RuntimeNodeContext, args: never[]) => {
  const {this: __this = {}, ...__context} = context;
  return (new Function('__context', '$args', `return (async function() { with(__context) {\n${code}\n} })()`)).call(__this, __context, args);
}