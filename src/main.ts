//# define HELLO Hello world !

console.log("HELLO");

//# ifdef DEV
console.log("Started in dev mode.");
//# endif

//# ifdef RELEASE
console.log("Started in release mode.");
//# endif