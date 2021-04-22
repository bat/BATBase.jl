# This file is a part of BATBase.jl, licensed under the MIT License (MIT).

import Test

Test.@testset "Package BATBase" begin
    include("my_mv_distribution_density.jl")
    include("basetypes/test_basetypes.jl")
end # testset
