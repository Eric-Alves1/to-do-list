let id = 0;

function GetUniqueId() {
  return (id++).toString(10);
}

/**
 * @param {any} arg
 */
function AssertNotNullOrUndefined(arg) {
  if (arg == null) {
    throw new Error('Argument is null');
  }
  if (arg == undefined) {
    throw new Error('Argument is undefined');
  }
}

/** @param {any} arg */
function IsButton(arg) {
  if (arg instanceof HTMLButtonElement) {
    return arg;
  }
  throw new Error('Argument is not HTMLButtonElement');
}

/** @param {any} arg */
function IsDiv(arg) {
  if (arg instanceof HTMLDivElement) {
    return arg;
  }
  throw new Error('Argument is not HTMLDivElement');
}

/** @param {any} arg */
function IsH(arg) {
  if (arg instanceof HTMLHeadingElement) {
    return arg;
  }
  throw new Error('Argument is not HTMLHeadingElement');
}

/** @param {any} arg */
function IsInput(arg) {
  if (arg instanceof HTMLInputElement) {
    return arg;
  }
  throw new Error('Argument is not HTMLInputElement');
}

/** @param {any} arg */
function IsP(arg) {
  if (arg instanceof HTMLParagraphElement) {
    return arg;
  }
  throw new Error('Argument is not HTMLParagraphElement');
}

/** @param {any} arg */
function IsSelect(arg) {
  if (arg instanceof HTMLSelectElement) {
    return arg;
  }
  throw new Error('Argument is not HTMLSelectElement');
}
