# This file is a part of BATBase.jl, licensed under the MIT License (MIT).


"""
    abstract type AbstractDensitySample

Abstract type for samples drawn from an [`AbstractDensity`](@ref).

Subtypes (e.g. `MyDensitySample`) must support:

* `Base.getproperty(s::MyDensitySample, :v)::Any`: Variate value.

* `Base.getproperty(s::MyDensitySample, :logd)::Real`: Result of
  `logdensityof(some_density)(v)`

* `Base.getproperty(s::MyDensitySample, :weight)::Real`: Weight of the sample.

* `Base.getproperty(s::MyDensitySample, :info)::Any`: Additional info on the
   provenance of the sample. Content depends on the sampling algorithm.

* `Base.getproperty(s::MyDensitySample, :aux)::Any`: Custom user-defined
   information attached to the sample.
"""
abstract type AbstractDensitySample end
export AbstractDensitySample

# ToDo: Document and mock-test
# * `AbstractDensitySample(v = ..., logd = ..., weight = ..., info = ..., aux = ...)`
# * `density_sample_type(P, T, W, R, Q)`
# Actual implementation will be in BAT.jl.


"""
    abstract type AbstractDensitySampleVector <: AbstractVector{<:AbstractDensitySample}

Abstract type for multiple samples drawn from an [`AbstractDensity`](@ref).

Subtypes must support the [Tables.jl](https://github.com/JuliaData/Tables.jl)
API with access both as a vector of structs and a struct of vectors, and

* `Base.getproperty(s::MyDensitySample, :v)::AbstractVector{<:Any}`
* `Base.getproperty(s::MyDensitySample, :logd)::AbstractVector{<:Real}`
* `Base.getproperty(s::MyDensitySample, :weight)::AbstractVector{<:Real}`
* `Base.getproperty(s::MyDensitySample, :info)::AbstractVector{<:Any}`
* `Base.getproperty(s::MyDensitySample, :aux)::AbstractVector{<:Any}`

See [`AbstractDensitySample`](@ref) for the semantics of the columns.
"""
abstract type AbstractDensitySampleVector end
export AbstractDensitySampleVector

# ToDo: Document and mock-test
# * `AbstractDensitySampleVector(v = ..., logd = ..., weight = ..., info = ..., aux = ...)`
# * `density_sample_vector_type(PV, TV, WV, RV, QV)`
# Actual implementation will be in BAT.jl.
