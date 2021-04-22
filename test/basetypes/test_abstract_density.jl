# This file is a part of BATBase.jl, licensed under the MIT License (MIT).

using BATBase
using Test

using Distributions


@testset "abstract_density" begin
    dist = MvNormal(float([1, 2, 3]))

    @test @inferred(MyMvDistributionDensity(dist)) isa AbstractDistributionDensity
    @test @inferred(MyMvDistributionDensity(dist)) isa DistLikeDensity
    @test @inferred(MyMvDistributionDensity(dist)) isa AbstractDensity

    density = MyMvDistributionDensity(dist)
    v = rand(dist)

    @test @inferred(convert(Distribution, density)) == dist
    @test @inferred BATBase.eval_logval_unchecked(density, v) == logpdf(dist, v)
    @test @inferred(varshape(density)) == ArrayShape{Real}(3)
    @test @inferred(totalndof(density)) == 3
    @test @inferred(sampler(density)) == sampler(dist)

    @test @inferred(convert(AbstractDistributionDensity, dist)) == density
    @test @inferred(convert(DistLikeDensity, dist)) == density
    @test @inferred(convert(AbstractDensity, dist)) == density

    @test @inferred(logdensityof(density, v)) == logpdf(dist, v)
    @test @inferred(logdensityof(density)(v)) == logpdf(dist, v)
end
