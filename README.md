#RoyalScript

##Intro

RoyalScript is a functional programming languag that aims to combine the utility of popular functional programming languages with the mutable data structures found in object oriented languages. The language is also quickly compiled to compressed JavaScript, so it can be run in the browser, without having to download anything on your computer. Lastly, RoyalScript is also inter-operable with javascript functions. You can call native javascript functions from RoyalScirpt as well!

##Computational Functions

The major difference between RoyalScript and other functional languags lik Scheme is that RoyalScript functions do not *always* evaluate to some resulting value. They do not always return a value. Some functions, such as the `for` function loops over some list of values. Another example is the 

RoyalScript is meant to offer more options for computation than just recursion, although recursion is definitely usable. 

In fact, every RoyalScript program must have at least one or more functions, otherwise you will raise an error.

##Syntax

In RoyalScript, all statements abide by a concise function syntax as follows

```
<FUNCTION>(<ARGUMENT 1>, <ARGUMENT 2>....)

nested functions:

<FUNCTION 1>(<FUNCTION 2>(<ARGUEMNT 1>), <ARGUMENT 1>....)

series of functions:

<FUNCTION>(<ARGUMENT 1>, <ARGUMENT 2>...), <FUNCTION>()
```

So statements or programs in RoyalScript consist purely of functions and their arguments.

##Types

RoyalScript is a dynamically typed language. This means that variables do not have to be declared with a specific type, nor do functions need specified paramater or return types.

However, one of the goals of RoyalScript is to provide a stronger type system than JavaScript or other functional languages with the type and is functions, and the struct system RoyalScript has. 

###Literal

RoyalScript variables, function names, and struct names, or any name is represented as a literal. A literal is pure representation of data in UTF-8 format. For example,

```
=(a, 4)
```
This function binds the literal a to 4. Using a in any function call without binding it previously will throw an error.

###Primtive Types

RoyalScript has 5 primitive types

* Number
* String
* Boolean
* List(Array)
* Function

Additionally, the null type exists to represent a *none* or *void* type present in many other languages.

Strings in RoyalScript are implemented with backtick barriers, \`, as opposed to quotes \" with most languages. This is primarily due to the optimized method of parsing RoyalScript, which will be explained in another section.

###Struct Type

RoyalScript structs, grouped fields of data, create a new type for every different struct that is named and declared. These can be checked using the *type()* and *is()* functions, which are covered in more detail later.

##Arithmetic Functions

RoyalScript has several arithmetic functions that are used to perform such operations on numbers. RoyalScript numbers are identical to JavaScript numbers which represent both integers and floats.

###+(...)

The *+()* function adds an arbitrary number of arguments together. These can be numbers, or strings, which will be concatenated instead.

```
>> +(4, 4)
>> 8
>> +(1, 3, 2)
>> 6
>> +(`hello`, ` `, `world!`)
>> "hello world!"
```

RoyalScript does not allow trailing commas in function calls:

```
>> +(8, 7, )
>> SyntaxError
```

RoyalScript will coerce a number to a string type if they are both calld by the *+()* function.

```
>> +(100, `k`)
>> "100k"
```

###-(...)

The *-()* function subtracts an arbitrary number of integers. It is associative to the left most argument, meaning:

```
>> -(1, 1, 1)
>> -1
>> -(1, -1)
>> 2
```

###\*(...)

The *\*()* function multiplies an arbitrary number of integers. It is associative to the left most argument, meaning:

```
>> *(1, -1, 1)
>> -1
>> *(10, 2)
>> 20
```
###/(...)

The */()* function divides an arbitrary number of integers. It is left associative.

```
>> /(3, 5)
>> 0.6
>> /(3, 10)
>> 0.3
>> /(3, 11)
>> 0.2727272727272727
```

###//(...)

The *//()* function uses floor divsion, by rounding the result to the next lowest integer, on an arbitrary amount of numbers. It is left associative

```
>> //(1, 2)
>> 0
>> //(1, 10)
>> 0
>> //(55, 10)
>> 5

```

###%(...)

The *%()* function takes the remainder of an arbitrary amount of numbers. It is also left associative.

```
%(8, 3)
2
%(8, 1)
0
%(44, 8)
4
```
###\*\*(...)

The *\*\*()* function, called the exponent function raises some left hand number to the power of the right hand number.

```
**(2, 2)
4
```

###Nested Expressions

Arithmetic functions, like all functions in RoyalScript are nestable, you can call functions within functions to make for more powerful computability. See these examples:

```
>> +(4, -(2, 3), *(8, 8))
67
>> -(3,
..    +(3, 2)
.. )
2
>> **(2, %(3, 3))
1
```

As demonstrated, any function, such as the *-()* can stretch across multiple lines if you so chose to do so.

##Logical Functions

RoyalScript defines a series of logical functions for comparing numbers, strings, and boolans. RoyalScript also provides functions to compare collections list lists or specific types like structs.

Unlike the arithmetic functions, some of these functions only take 2 and only 2 arguments, otherwise throwing an error.

###==(arg1, arg2)

The *==()* function checks if two arguments are of the same type and same value, except for lists or structs, which will not properly compare using this function.

```
==(1, 1)
true
==(2, 1)
false
==(2, `2`)
false
==(2, +(2, 0))
true
```

###!=(arg1, arg2)

The *!=()* works exactly the same yet checks if two arguments are unequal to each other, or not the same type.

```
!=(1, 1)
false
!=(3, 3, 3)
Argument Error: Got improper arguments but expected 2.
!=(false, true)
true
```
###>(arg1, arg2)

###<(arg1, arg2)
