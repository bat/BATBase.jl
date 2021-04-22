# This file is a part of BATBase.jl, licensed under the MIT License (MIT).

using BATBase

using Distributions, ValueShapes


struct MyMvDistributionDensity{D<:Distribution{Multivariate,Continuous}} <: AbstractDistributionDensity
    d::D
end

Base.convert(::Type{Distribution}, density::MyMvDistributionDensity) = density.d

BATBase.eval_logval_unchecked(density::MyMvDistributionDensity, v::AbstractVector{<:Real}) =
    logpdf(convert(Distribution, density), v)

ValueShapes.varshape(density::MyMvDistributionDensity) = varshape(density.d)

Distributions.sampler(density::MyMvDistributionDensity) = sampler(convert(Distribution, density))

# Note: Only for testing. Normally implemented generically in BAT.jl, not in BATBase.jl:
Base.convert(::Type{AbstractDistributionDensity}, d::Distribution{Multivariate,Continuous}) =
    MyMvDistributionDensity(d)

# Note: Only for testing. Normally implemented generically in BAT.jl, not in BATBase.jl:
BATBase.logdensityof(density::MyMvDistributionDensity, v::AbstractVector{<:Real}) =
    BATBase.eval_logval_unchecked(density, v)

# Note: Only for testing. Normally implemented generically in BAT.jl, not in BATBase.jl:
BATBase.logdensityof(density::MyMvDistributionDensity) = v -> logdensityof(density, v)
