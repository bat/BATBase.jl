# This file is a part of BATBase.jl, licensed under the MIT License (MIT).

using BATBase
using Test


@testset "hello_world" begin
    @test BATBase.hello_world() == 42
end
