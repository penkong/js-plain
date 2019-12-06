// like any but different
let userInput: unknown;
let userName: string;
userInput = 5;
userInput = "ml";
// it work but with any
// userName = userInput;
if (typeof userInput === "string") {
  userName = userInput;
}

// =================================
// never type
function generateErr(message: string, code: number): never {
  // its' never produce value event undefined.
  // its crash
  // while(true) {} or error
  throw { message: message, error: code };
}

generateErr("ufff", 500);
