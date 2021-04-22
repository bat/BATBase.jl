# This file is a part of BATBase.jl, licensed under the MIT License (MIT).

__precompile__(true)

"""
    BATBase

Template for Julia packages.
"""
module BATBase

using Random

using ArraysOfArrays
using Distributions
using DocStringExtensions
using StatsBase
using ValueShapes

include("basetypes/basetypes.jl")
include("algotypes/algotypes.jl")

end # module
