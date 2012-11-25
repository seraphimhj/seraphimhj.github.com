--- 
title: Learn Vim Script
type: post 
status: publish 
tags: vim
layout: post 
description: 介绍VimScript语言的基本语法，变量，字符串，函数，列表和字典等，并列出一些参考页面。
keywords: Vim,vim-script,syntax,plugins,string,function,refer
--- 

## Motivation

I have been a vim user for years, usually take some configure by plugins or others' vimrc, never thought about learning the *VIM SCRIPT*.

But, one day suddenly i realize this is very aweson that you publish a plugin even just some snippets, and that is also ways to imporve your own impacts.

So, let's move on.

## Where to learn

In [Stack Overflow][], you can find many answers about the resources. And I picked some of useful,

First help in offical vim, ``:help usr_41.txt`` to view the basic syntax, and then ``:help function-list`` to list all the build-in functions.

Next [Learn Vimscript the Hard Way][] can be reference, also IBM [Scripting the Vim editor][] series.

## Some Notes

### Synatx 

Somelike shell, it is a procedure language.

### Variables

some kind of variable:

        s:name          variable local to this script
        b:name          variable local to a buffer
        w:name          variable local to a window
        g:name          global variable (also in a function)
        v:name          variable predefined by Vim, like v:version.

some kind of define variable

        let             define some variable
        unlet           free variable
        unlet!          safelly free variable
        exists          checks if variable has already been defined

What Vim calls true is anything that is not zero.

A string doesn't start with a digit, the resulting number is zero,

### String

See Examples:

        let name = '"perter"'
        echo name
        "perter"

        $NAME           environment variable
        &name           option (in vim)
        @name           register


        a =~ b          match with
        a !~ b          does not match with

        echo "foo" . "bar"
        forbar

### Executing a expression

        :execute "normal " . normal_commands

is equal to 

        :normal normal_commands

if don't want to execute a string but evaluate it to get its expression value, you can use the eval() function:

        :let optval = eval('&' . "path")

is equal to 

        :exe 'let optval = &' . "path"

### Function

Function is called with the ":call" command.

define a function

        function {name} ({arg1}, {arg2}, ...)
            {body}
        endfunction

        function Min(num1, num2)
            if (a:num1 < a:num2)
                return a:num1
            else
                return a:num2
        endfunction
        echo Min(5, 8)

if want to rewrite a function existed, use `function! {name}`

**USING RANGE**

        function {name} () range

This will pass a:firstline and a:lastline in the function, and called with:

        :5,50call {name}()

It will call the function once, and output the result;

Otherwise you define a function without "range", and if execute with

        :5,50call {name}()

The function will be called 46 times.

function reference:

        let Afunc = function('{name}')
        echo call(Afunc, [])

Note: must Captalize first name of function reference, or will be confused with builtin functions.

**VARABILE NUMBER OF ARGUMENTS**

The following defines a function that must have 1 argument (star) and can have up to 20 additional arguments:

        function Show(star, ...)

a:000 is a list of all the "..." arguments.

a:0 is the count of the "..." arguments.

a:1 is same with `a:000[0]`

### Lists & Dictionaries

list is defined by 

        let alist = []
        call add(alist, 'foo')
        call add(alist, 'bar')
        echo alist
        ['foo', 'bar']

concatenation is done by "+" or "call extend()"

Such method generate list range() getline()

- - - - - -

dictionary is defined by 

        let adict = {'one': 'foo', 'two': 'bar'}

Retreive key list by keys(adict) to loop over them.

Methods of dictionary

        echo adict['one']
        echo adict.one
        let adict.four = 'music'
        echo adict
        {'one': 'foo', 'two': 'bar', 'four': 'music'}

## End

Only a little about vim script.

**It is totally rely on your effort.**

Use it & Enjoy it

[Stack Overflow]:http://stackoverflow.com/
[Learn Vimscript the Hard Way]:http://learnvimscriptthehardway.stevelosh.com/
[Scripting the Vim editor]:http://www.ibm.com/developerworks/linux/library/l-vim-script-1/index.html


