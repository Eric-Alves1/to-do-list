let id = 0;

/**
 * Returns an id that is unique during the lifetime of the program. It's very
 * simple, but it works for what we need. We increment a number and convert it
 * to string.
 */
export function GetUniqueId() {
  return (id++).toString(10);
}

/**
 * Throws an error if the argument is null or undefined.
 * @param {any} arg
 */
export function AssertNotNullOrUndefined(arg) {
  if (arg == null) {
    throw new Error('Argument is null');
  }
  if (arg == undefined) {
    throw new Error('Argument is undefined');
  }
}

/** @param {any} arg */
export function IsButton(arg) {
  if (arg instanceof HTMLButtonElement) {
    return arg;
  }
  throw new Error('Argument is not HTMLButtonElement');
}

/** @param {any} arg */
export function IsDiv(arg) {
  if (arg instanceof HTMLDivElement) {
    return arg;
  }
  throw new Error('Argument is not HTMLDivElement');
}

/** @param {any} arg */
export function IsH(arg) {
  if (arg instanceof HTMLHeadingElement) {
    return arg;
  }
  throw new Error('Argument is not HTMLHeadingElement');
}

/** @param {any} arg */
export function IsInput(arg) {
  if (arg instanceof HTMLInputElement) {
    return arg;
  }
  throw new Error('Argument is not HTMLInputElement');
}

/** @param {any} arg */
export function IsP(arg) {
  if (arg instanceof HTMLParagraphElement) {
    return arg;
  }
  throw new Error('Argument is not HTMLParagraphElement');
}

/** @param {any} arg */
export function IsSelect(arg) {
  if (arg instanceof HTMLSelectElement) {
    return arg;
  }
  throw new Error('Argument is not HTMLSelectElement');
}
