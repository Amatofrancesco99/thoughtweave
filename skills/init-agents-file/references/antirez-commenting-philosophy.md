# Writing system software: code comments.

For quite some time I've wanted to record a new video talking about code comments for my "writing system software" series on YouTube. However, after giving it some thought, I realized that the topic was better suited for a blog post, so here we are. In this post I analyze Redis comments, trying to categorize them. Along the way I try to show why, in my opinion, writing comments is of paramount importance in order to produce good code, that is maintainable in the long run and understandable by others and by the authors during modifications and debugging activities.

Not everybody thinks likewise. Many believe that comments are useless if the code is solid enough. The idea is that when everything is well designed, the code itself documents what the code is doing, hence code comments are superfluous. I disagree with that vision for two main reasons:

1. Many comments don't explain what the code is doing. They explain what you can't understand just from what the code does. Often this missing information is \*why\* the code is doing a certain action, or why it's doing something that is clear instead of something else that would feel more natural.

2. While it is not generally useful to document, line by line, what the code is doing, because it is understandable just by reading it, a key goal in writing readable code is to lower the amount of effort and the number of details the reader should take into her or his head while reading some code. So comments can be, for me, a tool for lowering the cognitive load of the reader.

## Classification of comments

During my research I identified nine types of comments:

- Function comments
- Design comments
- Why comments
- Teacher comments
- Checklist comments
- Guide comments
- Trivial comments
- Debt comments
- Backup comments

The first six are, in my opinion, mostly very positive forms of commenting, while the final three are somewhat questionable.

**Function comments** - The goal of a function comment is to prevent the reader from reading code in the first place. After reading the comment, it should be possible to consider some code as a black box that should obey certain rules. Normally function comments are at the top of functions definitions, but they may be at other places, documenting classes, macros, or other functionally isolated blocks of code that define some interface. Function comments are actually a form of in-line API documentation.

**Design comments** - While a function comment is usually located at the start of a function, a design comment is more often located at the start of a file. The design comment basically states how and why a given piece of code uses certain algorithms, techniques, tricks, and implementation. It is a higher level overview of what you'll see implemented in the code.

**Why comments** - Explain the reason why the code is doing something, even if what the code is doing is crystal clear. These comments explain what you can't infer from the code alone.

**Teacher comments** - Don't try to explain the code itself or certain side effects we should be aware of. They teach instead the \*domain\* (for example math, computer graphics, networking, statistics, complex data structures) in which the code is operating, that may be one outside of the reader skills set, or is simply too full of details to recall all them from memory.

**Checklist comments** - Sometimes because of language limitations, design issues, or simply because of the natural complexity arising in systems, it is not possible to centralize a given concept or interface in one piece, so there are places in the code that tell you to remember to do things in some other place of the code.

**Guide comments** - A guide comment babysits the reader, assists him or her while processing what is written in the source code by providing clear division, rhythm, and introducing what you are going to read. Guide comments' sole reason to exist is to lower the cognitive load of the programmer reading some code.

**Trivial comments** - A trivial comment is a guide comment where the cognitive load of reading the comment is the same or higher than just reading the associated code. For example: `array_len++; /* Increment the length of our array. */`

**Debt comments** - Technical debts statements hard coded inside the source code itself: FIXME, TODO, XXX, "This is a hack", are all forms of debt comments.

**Backup comments** - Comments where the developer comments older versions of some code block or even a whole function, because she or he is insecure about the change that was operated in the new one.

## Comments as an analysis tool

Comments are rubber duck debugging on steroids, except you are not talking with a rubber duck, but with the future reader of the code, which is more intimidating than a rubber duck, and can use Twitter. So in the process you really try to understand if what you are stating \*is acceptable\*, honorable, good enough. And if it is not, you make your homework, and come up with something more decent.

It is the same process that happens while writing documentation: the writer attempts to provide the gist of what a given piece of code does, what are the guarantees, the side effects. This is often a bug hunting opportunity. It is very easy while describing something to find that it has holes... You can't really describe it all because you are not sure about a given behavior: such behavior is just emerging from complexity, at random. You really don't want that, so you go back and fix it all.

## Writing good comments is harder than writing good code

You may think that writing comments is a lesser noble form of work. After all you \*can code\*! However consider this: code is a set of statement and function calls, or whatever your programming paradigm is. Sometimes such statements do not make much sense, honestly, if the code is not good. Comments require always to have some design process ongoing, and to understand the code you are writing in a deeper sense. On top of that, in order to write good comments, you have to develop your writing skills. The same writing skills will assist you writing emails, documentation, design documents, blog posts, and commit messages.

I write code because I have an urgent sense to share and communicate more than anything else. Comments coadiuvate the code, assist it, describe our efforts, and after all I love writing them as much as I love writing code itself.
