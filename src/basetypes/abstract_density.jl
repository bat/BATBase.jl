# This file is a part of BATBase.jl, licensed under the MIT License (MIT).


"""
    abstract type AbstractDensity

Subtypes of `AbstractDensity` (e.g. `MyDensity`) must implement the methods

* `BATBase.eval_logval_unchecked(density::MyDensity)`

To query the logarithm of the density for a given point/variate `v`, use
the function [`logdensityof`](@ref).

For likelihood densities, implementing `BATBase.eval_logval_unchecked is
typically sufficient, since shape, and variate bounds can be inferred from
the prior.

Densities with a known variate shape may also implement

* `ValueShapes.varshape(density::MyDensity)`

Densities with known variate bounds may also implement

* `BAT.var_bounds(density::MyDensity)`

!!! note

    Only implement `BAT.var_bounds` in special cases. `BAT.var_bounds` is not
    part of the stable public BATBase.jl and BAT.jl APIs and subject to change
    without deprecation.
"""
abstract type AbstractDensity end
export AbstractDensity

Base.convert(::Type{AbstractDensity}, d::ContinuousDistribution) = convert(AbstractDistributionDensity, d)


"""
    BATBase.eval_logval_unchecked(density::AbstractDensity, v::Any)

Compute log of the value of a multivariate density function for the given
variate/parameter-values.

Input:

* `density`: density function
* `v`: argument, i.e. variate / parameter-values

Note: If `eval_logval_unchecked` is called with an argument that is out of bounds,
the behavior is undefined. The result for arguments that are not within
bounds is *implicitly* `-Inf`, but it is the caller's responsibility to handle
these cases.
"""
function eval_logval_unchecked end


"""
    ValueShapes.totalndof(density::AbstractDensity)::Union{Int,Missing}

Get the number of degrees of freedom of the variates of `density`. May return
`missing`, if the shape of the variates is not fixed.
"""
@inline function ValueShapes.totalndof(density::AbstractDensity)
    shape = varshape(density)
    ismissing(shape) ? missing : ValueShapes.totalndof(shape)
end


"""
    ValueShapes.varshape(
        density::AbstractDensity
    )::Union{ValueShapes.AbstractValueShape,Missing}

    ValueShapes.varshape(
        density::DistLikeDensity
    )::ValueShapes.AbstractValueShape

Get the shapes of the variates of `density`.

For prior densities, the result must not be `missing`, but may be `nothing` if
the prior only supports unshaped variate/parameter vectors.
"""
ValueShapes.varshape(density::AbstractDensity) = missing



"""
    logdensityof(density::AbstractDensity, v)::Real
    logdensityof(density::AbstractDensity)::Function

Computes the logarithmic value of `density` at a given point, resp. returns a
function that does so:

```julia
logdensityof(density, v) == logdensityof(density)(v)
```

The function returned by `logdensityof(density)` supports

```julia
(- logdensityof(density))(v) == - logdensityof(density)(v)
```

Note: This function should *not* be specialized for custom density types,
implement [`BATBase.eval_logval_unchecked`](@ref) instead.

!!! note

    This functionality is implemented in BAT.jl, not in BATBase.jl.
"""
function logdensityof end
export logdensityof


# Implemented in BAT.jl:
# logdensityof(density::AbstractDensity, v::Any) = ...
# logdensityof(density::AbstractDensity) = ...


# ToDo, move to BAT.jl:
#=

logdensityof(density::AbstractDensity, v::Any) = eval_logval(density, v, default_dlt())

logdensityof(density::AbstractDensity) = LogDensityOf(density)


struct LogDensityOf{D<:AbstractDensity} <: Function
    density::D
end

@inline (lvd::LogDensityOf)(v::Any) = logdensityof(lvd.density, v)

(Base.:-)(lvd::LogDensityOf) = NegLogDensityOf(lvd.density)

ValueShapes.varshape(lvd::LogDensityOf) = varshape(lvd.density)
ValueShapes.unshaped(lvd::LogDensityOf) = LogDensityOf(unshaped(lvd.density))


struct NegLogDensityOf{D<:AbstractDensity} <: Function
    density::D
end

@inline (lvd::NegLogDensityOf)(v::Any) = - logdensityof(lvd.density, v)

(Base.:-)(lvd::NegLogDensityOf) = LogDensityOf(lvd.density)

ValueShapes.varshape(lvd::NegLogDensityOf) = varshape(lvd.density)
ValueShapes.unshaped(lvd::NegLogDensityOf) = NegLogDensityOf(unshaped(lvd.density))
=#



"""
    abstract type DistLikeDensity <: AbstractDensity

A density that implements part of the `Distributions.Distribution` interface.
Such densities are suitable for use as a priors.

In contrast to a distribution, the integral of a `DistLikeDensity` is not
required to be normalized to one (but will be, in many cases).

Typically, custom priors should be implemented as subtypes of
`Distributions.Distribution`. BAT will automatically wrap them in a subtype of
[`AbstractDistributionDensity`](@ref), which is a subtype of
`DistLikeDensity`.

Subtypes of `DistLikeDensity` are required to support more functionality
than an [`AbstractDensity`](@ref), but less than a
`Distribution{Multivariate,Continuous}`.

A `d::ContinuousDistribution` can be converted into (wrapped
in) an suitable subtype of [`AbstractDistributionDensity`](@ref) via
`conv(DistLikeDensity, d)`.

The following functions must be implemented for subtypes (e.g.
`MyDistLikeDensity`), in addition to the mandatory [`AbstractDensity`](@ref)
interface:

* `ValueShapes.varshape(density::MyDistLikeDensity)`

* `Distributions.sampler(density::MyDistLikeDensity)`

!!! note

    The function `BAT.var_bounds` is not part of the stable public BATBase.jl
    and BAT.jl APIs and subject to change without deprecation.
"""
abstract type DistLikeDensity <: AbstractDensity end
export DistLikeDensity

Base.convert(::Type{DistLikeDensity}, d::ContinuousDistribution) = convert(AbstractDistributionDensity, d)



"""
    abstract type AbstractDistributionDensity <: DistLikeDensity

A density that can be converted efficiently to a `Distributions.Distribution`.

Subtypes (e.g. `MyDistributionDensity`) support, in addition to the
[`DistLikeDensity`](@ref) interface, support:

* `Base.convert(Distributions.Distribution, density::MyDistributionDensity)`

A `d::ContinuousDistribution` can be converted into (resp. wrapped in) an
suitable subtype of `DistLikeDensity` via `conv(AbstractDistributionDensity, d)`.

!!! note

    This functionality is implemented in BAT.jl, not in BATBase.jl.
"""
abstract type AbstractDistributionDensity <: DistLikeDensity end
export AbstractDistributionDensity

# Implemented in BAT.jl:
# Base.convert(::Type{AbstractDistributionDensity}, d::ContinuousDistribution) = ...



"""
    BAT.AnyDensityLike = Union{...}

Union of all types that BAT will accept as a probability density, resp. that
`convert(AbstractDensity, d)` supports:
    
* [`AbstractDensity`](@ref)
* `Distributions.Distribution`
"""
const AnyDensityLike = Union{
    AbstractDensity,
    Distributions.ContinuousDistribution
}
export AnyDensityLike



"""
    BAT.AnySampleable = Union{...}

Union of all types that BAT can sample from:

* [`AbstractDensity`](@ref)
* [`AbstractDensitySampleVector`](@ref)
* `Distributions.Distribution`
"""
const AnySampleable = Union{
    AbstractDensity,
    AbstractDensitySampleVector,
    Distributions.Distribution
}
export AnySampleable



"""
    BAT.AnyIIDSampleable = Union{...}

Union of all distribution/density-like types that BAT can draw i.i.d.
(independent and identically distributed) samples from:

* [`DistLikeDensity`](@ref)
* `Distributions.Distribution`
"""
const AnyIIDSampleable = Union{
    DistLikeDensity,
    Distributions.Distribution
}
export AnyIIDSampleable
