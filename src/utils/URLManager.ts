export function joinPath(parts: string[]) {
  let pathComponents: string[] = parts.reduce(
    (acc: string[], value: string, i: number) => {
      let partComponents = value.split('/');
      //if not the last element in the parts array strip empty component from the end if it exists (remove trailing /)
      if (
        i < parts.length - 1 &&
        partComponents[partComponents.length - 1] === ''
      ) {
        partComponents.pop();
      }
      return acc.concat(partComponents);
    },
    []
  );
  let path = pathComponents.join('/');
  return path;
}
