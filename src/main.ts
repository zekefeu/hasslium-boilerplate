//# define HELLO Hello world !

console.log("HELLO");

//# ifdef DEV
console.log("dev");
//# endif

//# ifdef RELEASE
console.log("release");
//# endif