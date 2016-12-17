#RoyalScript


[Playground](https://jweinst1.github.io/Royalscript/playground)

[REPL](https://jweinst1.github.io/Royalscript/repl)



##Intro

RoyalScript is a functional programming languag that aims to combine the utility of popular functional programming languages with the mutable data structures found in object oriented languages. The language is also quickly compiled to compressed JavaScript, so it can be run in the browser, without having to download anything on your computer. Lastly, RoyalScript is also inter-operable with javascript functions. You can call native javascript functions from RoyalScirpt as well!

RoyalScript is a both a compiled or interpreted language, this depends on the javascript environment that RoyalScript is run in.

 

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

You can also use the `Main.Compile` function in your node programs.

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

##Comments

Comments are the only feature of RoyalScript that are not functions or function calls. They are always denoted by semicolons, *;*, and can extend multiple lines or even be in the middle of code.

```
>> +(1, 2) ;this is a comment;
3
>> +(1, ;you can put them in the middle of code too; 2)
3
```

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

The *>()* function, also called the greater than function compares two numbers and returns true if the left hand argument is greater than the right hand argument.

###<(arg1, arg2)

The *<()* function, also called the less than function compares two numbers and returns true if the left hand argument is less than the right hand argument.

###<=(arg1, arg2)

The *<=()* function, also called the less than or qual to  function compares two numbers and returns true if the left hand argument is less than or equal to the right hand argument.

###>=(arg1, arg2)

The *>=()* function, also called the less than or qual to  function compares two numbers and returns true if the left hand argument is less than or equal to the right hand argument.

Here are some examples:

```
>> <(3, 5)
true
>> <(3, **(2, 6))
true
>> ==(
..  ==(1, 3), >(200, 4) 
.. )
false
```

### ||(...)

The *||()* function is the logical OR function. It takes an arbitrary number of expressions that evaluate to booleans or boolean values themselves. If any of the arguments evaluates to true, the function will evaluate to true.

```
>> ||(==(4, 3), 5)
5
>> ||(==(4, 3), true)
true
>> ||(==(4, 3), false)
false
```

### &&(...)

The *&&()* function is the logical AND function. It takes an arbitrary number of expressions that evaluate to booleans or boolean values themselves. If all of the arguments evaluates to true, the function will evaluate to true. If one is false, it evaluates to false.

```
>> &&(true, false, true)
false
>> &&(==(9, 9), true, true)
true
>> &&(
..   ||(==(3, 4), <=(1, 5)), true
.. )
true
```

###not(arg1)

The *not()* function is the logical NOT function. It takes in an expression that evaluates to a boolean or a boolean itself and returns the opposite boolean to that argument

```
>> not(8)
false
>> not(false)
true
>> not(&&(true, false))
true
```

###same(arg1, arg2)

The *same()* function compares two arguments and checks if their string representation is equal to each other. This is similar to the *==()* function but this also works on lists and structs, for which the *==()* does not.


```
>> same(1, 2)
false
>> same(1, 1)
true
>> same(1, `1`)
false
>> same(list(1, 2), list(1, 2))
true
>> ==(list(1, 2), list(1, 2))
false
```

###random(arg1, arg2)

The *random()* function takes two numbers as arguments, and returns a random number between the arguments.

```
>> random(1, 90)
67
```

##Variables

In RoyalScript, variables are assigned to literals using the *=()* function. You can only assign one variable in each call to the function. You can use any variable name that starts with a letter, *$*, or *_*, and has the same characters or digits after that. For example:

```
>> =(r, 3)
undefined
>> do(r)
3
>> =(r,e,3)
Argument Error: Got improper arguments but expected 2.
>> =(r,2)
undefined
>> do(r)
2
>> =($$$$, 1000000)
undefined
>> =(%%%, `this is a bad variable name`)
SyntaxError: Unexpected token %
```

You can however reassign an existing variable. If you want to declare a variable with no actual value initially, you can assign it to *null* or *undefined*.

##Grouping Functions

RoyalScript has 2 special functions that are considered "grouping functions". They do not alter the behavior of their arguments, or compute them in anyway. Their purpose it to allow for arguments to other functions to be grouped to override a single argument requirement, or for executing a series of statements in the call of a single function.

###do(...)

The *do()* function essentially groups function calls or values togther to be executed or evaluated. It's practicularly useful for displaying a value as a result since all RoyalScript programs require at least one function:

```
>> do(6)
6
>> do(true)
true
>> do(+(2, 3))
5
>> do(=(r, 3), =(r, +(r, r)))
undefined
>> do(=(r, 3), =(r, +(r, r)), r)
6
```

It can also be used to put multiple statements in a loop, though this will be discussed in the loops section.

###args(...)

The *args()* function allows the grouping of values, to be called by a function that normally only taks a specific number of arguments. The *args()* function cannot be used to call a series of functions, only to group values.

##Printing

When RoyalScript is run in the browser, one prints arguments by logging them to the console. When RoyalScript is run locally via the NodeJS package, it prints values directly to ther terminal.

###$(...)

The *$()* function prints an arbitrary number of values. Here are some examples. Note you wont see this on the playground or REPL as it will go to the console.

```
>> $(1)
1
undefined
>> $(1, 2, 3)
1 2 3
undefined
```

##String Functions

Strings in RoyalScript are types that represent a series of characters or bytes for textual data. They are immutable, but have a series of functions they can be used with for meaningful computation.

**Warning**: Strings in RoyalScript cannot contain newlines, otherwise an error will be raised.

###&(arg1, arg2)

The *&()* function takes two string or list operands (also works on lists) and concats them, returning or evaluating to a new string or list.

```
>> &(`h`, `e`)
"he"
>> &(`1`, `2`, `3`)
Argument Error: Got improper arguments but expected 2.
>> &(`12`)
Argument Error: Got improper arguments but expected 2.
```

###str(arg1)

The *str()* function converts a number or an expression that evaluates to a number to a string.

```
>> str(4)
"4"
>> str(+(1, 2, 3, 4))
"10"
>> str(+(1, 2, 3, 4), 3)
Argument Error: Got improper arguments but expected 1.
```

###num(arg1)

The *num()* function takes one string argument and converts it to a number.

```
>> num(`4`)
4
>> num(str(4))
4
```

###get(string, index)

The get function, which works for structs and lists as well, takes a string argument and index argument (must be a number for strings) and returns the one character string present at the index. Like other languages, strings are 0-indexed. If the index is out of range, the function evaluates to *undefined*. This behavior can be handled via conditionals which is in a later section.

```
>> =(s, `foo`)
undefined
>> get(s, 1)
"o"
>> get(s, 0)
"f"
>> get(s, 7)
undefined
```

###len(string)

The *len()* function gets the length of the string in terms of the number of characters in it.

```
>> len(`foo`)
3
```

###cut(string, start, end)

The *cut()* function takes a string, a starting index, and ending index and returns a substring or slice of a string between those indexes. The ending parameter can also be a negative number to specify a reverse index from the end of the string.

```
>> cut(`abcdefgh`, 0, 4)
"abcd"
>> cut(`abcdefgh`, 0, 2)
"ab"
>> cut(`abcdefgh`, 0, -1)
"abcdefg"
>> cut(`abcdefgh`, 0, -4)
"abcd"
```

###find(string, substr)

The *find()* function takes a string and substr argument(a string smaller than the first argument), and checks if that substr is in the first argument. If it is, it returns the starting index for it. If it's not in the string, it returns -1.

```
>> find(`appleswafflesavocadoes`, `waffles`)
6
>> find(`appleswafflesavocadoes`, `apples`)
0
>> find(`appleswafflesavocadoes`, `fruits`)
-1
```

###~(string, regex)

The *~()* function takes a string argument and a string that represents a regex pattern and perfroms a regex match. It returns true or false if the string is a match or not.

```
>> ~(`hello world!`, `.*`)
true
>> ~(`hello world!`, `.`)
true
>> ~(`hello world!`, `^.$`)
false
>> ~(`hello world!`, `^[a-z !]+$`)
true
>> ~(`hello world!`, `^[a-z]+$`)
false

```

##List Functions

RoyalScript, unlike other functional languages employes the use of mutablee data. One feature of mutable data are lists. Lists are ordered, indexable, collections of multiple types of values.

However, the language allows you to use lists in an immutable fashion as well, which will be explained below.

###list(...)

the *list()* function takes an arbitrary number of arguments and returns a list of those arguments. If no arguments are specified, it returns an empty list. Lists can also be nested

```
>> list(1, 2, 3)
[1,2,3]
>> list(1, 2, +(3, 4))
[1,2,7]
>> list(1, true, +(3, 4))
[1,true,7]
>> list(list(3, list()))
[[3,[]]]
```

###range(start, end)

The *range()* function creates a list of numbers that start at some value and end at some high value. The start number must be lower than the end number.

```
>> range(0, 5)
[0,1,2,3,4]
>> range(0, 10)
[0,1,2,3,4,5,6,7,8,9]
>> range(0, 0)
[]
```
Ranges can also be used to check if a number is in the indexes of some list.

```
>> in(1, range(0, 5))
true
```
Note though, the *in()* function checkes the keys of a list, not it's values. To find if a value is in a list, use the *find()* function.

###make(arg1, amount)

The *make()* function takes one argument and a number, to return a list containing the first argument repeated some specified number of times. This function must have 2 arguments otherwise an error is raised.

```
>> make(true, 5)
[true,true,true,true,true]
>> make(null, 5)
[null,null,null,null,null]
>> make(0, 50)
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
>> make(1)
Argument Error: Got improper arguments but expected 2.
```

###rep(list)

The *rep()* function takes a list as an argument and returns a copy of that list. This means that changes to this copy wont effect the previous list. Here is a little example for this behavior.

```
>> =(a, list(1, 2,3))
undefined
>> =(b, rep(a))
undefined
>> do(a)
[1,2,3]
>> do(b)
[1,2,3]
>> put(b, 1)
4
>> do(b)
[1,1,2,3]
>> do(a)
[1,2,3]
```

The rep function is useful for using lists in an immutable fashion. There are also other list functions that return a new copy of the list.

###len(list)

Returns the amount of items in the list.

###cut(list, start, end)

Identical functionality to *cut()* being used on strings, returns a smaller list of the items between the specified start and end index.

###get(list, index)

The *get()* function, much like for strings, takes a list and index arguments, and returns the item in the list present at that index.

```
>> =(a, list(1, 2,3))
undefined
>> get(a, 1)
2
>> get(a, 0)
1
>> get(a, 6)
undefined
```

###set(list, index, value)

The *set()* function takes a list, a number index, and a value to set the index of the list equal to the value. Setting the value of an index beyond the length of the list still works, and the values in between will be set to *null*.

```
>> =(e, range(0, 5))
undefined
>> set(e, 2, 60)
60
>> do(e)
[0,1,60,3,4]
>> set(e, 10, 60)
60
>> do(e)
[0,1,60,3,4,null,null,null,null,null,60]
```

**warning**: To prevent unintended behavior, *set()*, and a few other functions in RoyalScript are considered non-nestable. This means since they aren't meant to evaluate to something, you cannot use them as arguments to other functions, such as:

```
>> str(set(e, 10, 60))
SyntaxError: missing ) after argument list
```

However, this only applies to functions that expect a value. For functions that execute, like conditionals or loops, you can call un-nestable functions like *set()* in their execution spots.

###append(list, arg1)

The *append()* function takes a list and another argument and places that argument at the end of the list. It, like set is a non-nestable function

```
>> =(r, list())
undefined
>> append(r, 4)
1
>> do(r)
[4]
```

Even though it only takes one argument to append, it can be extended with the special grouping function called *args()*:

```
>> append(r, args(1, 2, 3))
4
>> do(r)
[4,1,2,3]
```

###put(list, arg1)

The *put()* functin appends one argument, to the left or beginning of a list. It can be extended with *args()*. It is non-nestable.

```
>> =(a, range(0, 7))
undefined
>> put(a, 4), do(a)
[4,0,1,2,3,4,5,6]
```

###insert(list, index, value)

The *insert()* function takes a list, a number index, and a value, to insert that value at that index, while moving all other values one over to accomodate for the new value. It is non-nestable

```
>> =(a, list(1, 2, 3))
undefined
>> insert(a, 1, true)
[]
>> do(a)
[1,true,2,3]
```

###remove(list, index)

Takes a list and a number index, to remove the value at that index and also return it in a new list of it's own. Is nestable.

```
>> =(a, list(1, 2, 34))
undefined
>> remove(a, 1)
[2]
>> do(a)
[1,34]
```

###find(list, arg1)

Takes a list and one othr argument, and checks if the argument is a value in the list. If it is, it will return the first index of it recurring. Otherwise, it will return -1. Cannot be extended with *args()*.

```
>> =(a, list(1, 2, true, false, true))
undefined
>> find(a, true)
2
>> find(a, 3)
-1
```

###&(list1, list2)

The *&()* function takes two lists as arguments and fuses them together and returns a new list. Cannot be extended with *args()*.

```
>> =(first, list(1))
undefined
>> &(first, list(4))
[1,4]
>> do(first)
[1]
```

##Conditional Functions

RoyalScript employs several unique conditonal functions to facilitate control flow in programs.

###?(arg1, arg2)

The *?()* function takes one argument that is or evaluates to a boolean, and another function call of any kind. If that first argument is true, it will execute the second argument, if it's false, nothing happens. Here are some examples:

```
>> ?(true, +(3, 3))
6
>> ?(false, +(1, 3))
undefined
>> =(e, 1)
undefined
>> ?(>(e, 0), =(e, +(e, 2)))
undefined
>> do(e)
3
```

These can also nested and called in a nest.

```
>> ?(==(3, 3),
..     ?(>=(3, 1),
..           list(1, 2, 3)
..            )
..       )
[1,2,3]
```

###if(bool_exp, true\_call, false\_call)

The *if()* function takes a boolean expression, a call/statement to execute if the expression is true, and a third parameter to execute if the expression is false. You must provide 3 arguments or else an error will be raised.

```
>> if(false, 3, 2)
2
>> if(==(1, 1), 3, 2)
3
>> if(==(1, 1),
..      list(1, 1, 1),
..      ?(1, $(1, 2, 3))
..  )
[1,1,1]
```

###ifs(bool_exp, true\_call...)

The *ifs()* function takes a series of arguments that go by the pattern of one bool expression and one execution to process. The list of arguments should thus be even. This function will execute every statement that has a boolean expression that evaluates to true. Every boolean expression that does not evaluate to true will not be executed.

The *ifs()* is meant to act as an advanced switch statement that works on boolean expressions as opposed to pure pattern matching.


```
>> =(d, 33)
undefined
>> ifs(
..   ==(d, 32), 5,
..   ==(d, 33), $(4),
..   >(d, 10), =(d, +(d, 1))
.. )
4
undefined
>> do(d)
34
```

###ife(bool_exp, true\_call..., else\_call)

The *ife()* function works similarly to the *ifs()* function except it executes one and only one statement. Meaning, it will go through each boolean expression, checking if it is true, and if it is, will execute that statement and stop looking through the other pairs. If none of the pairs are true, it executes the else call.

```
>> =(lst, list())
>> ife(
..   >(len(lst), 2), put(lst, true),
..   ==(len(lst), 0), append(lst, list(2)),
..   !=(len(lst), 0), append(lst, 3),
..   $(`all false`)
..  )
>> do(lst)
[[2]]
```

###switch([value], case, call\_exp...)

The *switch()* function in RoyalScript facilitates pattern matching, its similar to a series of *==()* functions, but is faster, especcially for numbers.

The switch statements do not fall through between each case pair, meaning the first case that matches will executes, terminating the progression to further cases. There is also no default block for RoyalScript switch statements.

```
>> =(e, `foobar`)
undefined
>> switch(e, 
..   0, `good`,
..   `bar`, 5,
..    `foobar`, list(1, 2, 3),
..    1, `r`
..  )
[1,2,3]

```

##Procs(1 or 2 argument functions)

RoyalScript has both general, full length functions that can be defined, but it also has smaller, anonymously created functions called Procs. They are similar to lambdas in other languages. 

###@(parameter, call\_exp)

The *@()* function creates and evaluates to an unnamed, one argument function with only a single execution statement. These are very useful for loops and quick, small areas you need to update values and compute values.

```
>> =(e, @(first, +(first, 3)))
undefined
>> e(3)
6
>> e(8)
11
>> =(e, @(first, +(first, 3), -(first, 3)))
Argument Error: Got improper arguments but expected 2.
```

Procs made with *@()* always return their statement, so you do not need to specify a *return()* function.

Because there first statement is returned, you cannot extend them with *do()*.

###@@(param1, param2, call\_exp)

The *@@()* works identically to the *@()* except that it evaluates to a proc the has two parameters and returns its only execution statement.

```
>> =(add, @@(a, b, +(a, b)))
undefined
>> add(1, 2)
3
>> add(1, add(1, 3))
5
```

Double parameter procs can also be nested.

###!@(parameter, call\_exp)

The *!@()* function produces a proc very similarly to the *@()* function except it does not return or evaluate to any value when the proc is called. It's specifically meant to modify mutable arguments like lists or structs, or be used in a loop.

```
>> =(attach, !@(a, append(a, 3)))
undefined
>> =(test, make(4, 10))
undefined
>> attach(test)
undefined
>> do(test)
[4,4,4,4,4,4,4,4,4,4,3]
>> attach(list(1, 2 ,3))
undefined ;does not return the list;
```

Unlike the other procs, however, *!@()* can be extended with *do()*, as in the example below

```
>> =(fnc, !@(a,
..         do(
..            append(a, 1),
..            remove(a, 0),
..            put(a, 3)
..            )
..          )
..      )
undefined
>> =(lst, list(1, 2))
undefined
>> fnc(lst), do(lst)
[3,2,1]
```

##Loop Functions

Unlike most other functional programming languages, RoyalScript has loops, a conditional loop and a for loop. These exist to add more flexibility in writing RoyalScript than purely using recursion as the primary tool of computation.

###loop(bool\_exp, call\_exp)

The *loop()* function in RoyalScript repeatedly calls a single statement while the boolean expression, also called a condition evaluates to true. The call expression, like that in *!@()* can be extended with the *do()* function.

Here is a small, RoyalScript program that uses a loop to sum the values in a list. This is a compiled program, as opposed to the REPL used in the previous examples.

```
=(l, list(1, 2, 3)),
=(i, 0),
=(total, 0),

loop(<(i, len(l)),
      do(
         =(total, +(total, get(l, i))),
         =(i, +(i, 1))
        )
     ),
do(total)
;The result is 6;
```

###for(list, function_proc)

The *for()* function in RoyalScript allows one to loop over lists, by calling some function or proc once on each item in the list. 

RoyalScript uses a for every type of loop as opposed to traditional C-style type for loops because a functional programming language needs to be able to use functions more than just blocks of code in different arrays of a program. 

This is a program that loops over a range and inserts the numbers greater than 3 in reverse order in a new list.

```
=(r, list()),

for(range(0, 10),
         !@( elem,
             do(
                ?(>(elem, 3), insert(r, 0, elem))
                )
             )
         ),
do(r)
;[9,8,7,6,5,4];
```

You can also use functions you define yourself in for loops, which will be explained in the function section.

Something important to understand is that unless directly accessing the name of a list, the for loop cannot modify the list it is iterating over. See this example:

```
=(lst, list(1, 2, 3)),
for(lst, 
    !@(elem, +(elem, 2))
    )
,do(lst)
;[1,2,3];
```

##List Construction and Comprehension

In previous examples, lists were constructed in a mutable fashion with loops or functions that had to be specified to filter and/or modify a list. In python, a popular object oriented programming language, it is possible to construct lists through the use of list comprehensions. RoyalScript implements a very similar concept through the *map()* and *filter()* functions, with even more powerful options if you chain them together.

###map(list, function_proc)

The *map()* function takes a list and a function or proc(cannot use !@, must return value), and returns a new list that has every element in the old list applied to it. The old list that is called with map is not changed.

Here is an example using a single parameter proc that gets the squares from a range:

```
map(range(0, 10),
         @(x, **(x, 2))
         )
;[0,1,4,9,16,25,36,49,64,81];
```
A double parameter proc, *@@()* can also be used for this:

```
map(range(0, 10),
         @@(a, b, list(a, b))
         )
;[[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[8,8],[9,9]];
```

###filter(list, function_proc -> Boolean)

The *filter()* function in RoyalScript takes a list and a function or proc that takes one argument and returns a boolean value. It goes through a list, and checks if eahc value returns true or false from the proc or function. It then returns a new list for all the values that made the function or proc return true.

This is a program that filters a list for only the even numbers.

```
filter(range(0, 20),
            @(item, ==(0, %(item, 2)))
            )
;[0,2,4,6,8,10,12,14,16,18];
```

To make these more powerful, you can also chain map and filter calls to make a list comprehension function.

```
map(
    filter(
           range(0, 20), 
           @(item, ==(0, %(item, 2)))),
    @(elem, //(elem, 3))
    )

;[0,0,1,2,2,3,4,4,5,6];
```
This is a chain using the previous filter and mapping that list to a new list with all the elements in the previous list floor divided by 3.

##Defining Functions

RoyalScript allows you to define your own full size functions, which take any amount of parameters and have any amount of statements you want. RoyalScript also uses a special function, *return()*, which allows you to return nothing, one value, or multiple values in a list.

###def(name, args\_exp, call\_exp...)

The *def()* function is the function which defines new named functions. Functions are much more flexible and powerful than procs, because they are named, they can have any amount of parameters, any amount of call expressions, and either return a value, or not, or have multiple return statements in different parts of the function, such as with control flow.

This is a simple function with calculates the factorial of some number recursively.

```
def(factorial,
    args(n),
    if(==(n, 1),
         return(1),
         return(
                *(n, factorial(-(n, 1)))
                )
         )
    )
,do(factorial(5))
;120;
```

You can also define functions with no parameters:

```
def(noparams,
    args(),
    return(true, true)
    )
, do(noparams())
;[true,true];
```

However, you can't define a function that is already a standard library function in RoyalScript.

```
def(range,
    args(),
    return(list())
    )
, do(noparams())
;Illegal Name Error: Cannot choose reserved function name;
```

You can also use a _ if you are using a function for a loop or map or filter that you don't need the name of.

Here is an example using a larger function for mapping

```
map(range(0, 10),
         def(_, args(a),
                ;prints the value to console;
                $(a),
                return(a, +(a, 1))
                )
         )
;1
2
3
4
5
6
7
8
9;
;[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10]];
```

##Structs

Perhaps the most unique feature to RoyalScript are structs. Structs are groups of data fields that don't have a specified type in each field, but are named. They are mutable, and can be passed around as references between functions. You create structs with the *new()* function. Every struct also has it's own type callable with the *type()* function.

###struct(name, field...)

The *struct()* function defines a new struct that can be initialized. Each struct can have any amount of fields. You don't have to initialize a struct with all it's field called either. However, like the defined functions you cannot use a name that is already taken by a native RoyalScript function.

```
struct(food,
       calories, protein, fat, carbs
       ),
new(food, 100, `5g`, `1g`, `10g`)

;{"calories":100,"protein":"5g","fat":"1g","carbs":"10g"};
```

Or with no fields argued.

```
struct(food,
       calories, protein, fat, carbs
       ),
new(food),
;{};
```

You can also put procs or functions on a struct:

```
struct(bank,
       deposit, balance
       ),
=(a, new(bank, @(a, a), 50)),
do(
   get(a, `balance`)
   )
;50;
```

###new(name, arg...)

The *new()* function creates a new instance of a struct. You must use a previously defined struct, as RoyalScript does not support generic objects or keyed-value collections. Lists can accept a string as a key, but this behavior is not recommended or type/method safe.

You can also have functions return new instances of structs

```
def(factory,
    args(amount, size),
    struct(machine, size, built),
    return(
           make(new(machine, size, true), amount)
           )
    ),
factory(5)
;[{"built":true},{"built":true},{"built":true},{"built":true},{"built":true}];
```

###type(struct_instance)

The *type()* function checks the type of some struct instantance, returning it as a string value.

```
struct(bank,
       deposit, balance
       ),
=(a, new(bank, @(a, a), 50)),
type(a)
;"bank";
```

Another technique is also to use a switch statement with the type function called on some argument, so you can handle different types of structs much quicker and faster.

**Warning**: It's recommended not to use the *type()* function on primtive types in RoyalScript, such as lists or numbers, because primitive types do not have constructors like structs do.

