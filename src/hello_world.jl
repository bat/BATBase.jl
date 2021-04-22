# This file is a part of BATBase.jl, licensed under the MIT License (MIT).


"""
    BATBase.hello_world()

Prints "Hello, World!" and returns 42.

```jldoctest
using BATBase

BATBase.hello_world()

# output

Hello, World!
42
```
"""
function hello_world()
    println("Hello, World!")
    return 42
end
