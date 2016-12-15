#RoyalScript

*A functional programming language for the web that's Royal!*

##Intro

RoyalScript is a special functional programming language that transcompiles to compressed JavaScript. It's purpose is to build on the fundamentals of functional programming by adding in extendable lists, mutable data, structs, loops, and much more. You can make functions with recursion, looping, or just use a lambda. It even has a type system!

RoyalScript also emphasizes the nature of simplicity, the entire language is all functions, aside from the comments. 

##Installation and Setup

To install RoyalScript, you can use npm by typing the command:

```
$ npm install -g pike
```
RoyalScript, when run natively uses `.royal` files. To compile a RoyalScrpt file to javascript, use

```
royalscript -j path/to/royalscriptfile
```
This will output the transcompiled, compressed javascript in your terminal. To compile and run a royalscript file, you can use

```
royalscript -e path/to/royalscriptfile
```

##Quick Start 

You can use this small interpreter below to try `RoyalScript` out.

####Syntax

In RoyalScript, all statements abide by a concise function syntax as follows

```
<FUNCTION>(<ARGUMENT 1>, <ARGUMENT 2>....)

nested functions:

<FUNCTION 1>(<FUNCTION 2>(<ARGUEMNT 1>), <ARGUMENT 1>....)

series of functions:

<FUNCTION>(<ARGUMENT 1>, <ARGUMENT 2>...), <FUNCTION>()
```

So statements or programs in RoyalScript consist purely of functions and their arguments.

####Types

RoyalScript has primitive types and custom or reference types created by structs

#####Primtiive Types

* Number
* String
* Boolean
* List(Array)
* null
* function

Numbers represented both integers and floats, as JavaScript numbers do.

To check a type in RoyalScript, you can use the type function `type()`.

```
>> type(4)
>> 'Number'
```

######Numbers

Numbers can be manipulated using RoyalScript's set of arithmetic functions as follows

```
>> +(1, 1, 1)
>> 3
>> -(5, 4)
>> 1
>> +(4, *(3, 4))
>> 16
>> **(2, 2)
>> 4
>> /(90, 90)
>> 1
```

There is additionally a random function with produces a random number between the first and second argument

```
>> random(0, 8)
>> 3
```

######Strings

Strings in RoyalScript are denoted by backticks `, as opposed to quotation markers in other languages ". Strings can be concatenated using the + or & functions.

```
>> +(`hello`, `world`)
>> "helloworld"
```

When RoyalScript is evaluated in javascript after being compiled, the back ticks are switched back to javascript string markers.

######Booleans

Booleans are representd by true and false. Many expressions in RoyalScript evaluate to Booleans as well, such as with using the && and || (and or) functions.

```
>> &&(true, false)
>> false
>> ||(true, false)
>> true
```
