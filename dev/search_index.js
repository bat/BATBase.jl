var documenterSearchIndex = {"docs":
[{"location":"api/#API","page":"API","title":"API","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"DocTestSetup  = quote\n    using BATBase\nend","category":"page"},{"location":"api/#Modules","page":"API","title":"Modules","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Order = [:module]","category":"page"},{"location":"api/#Types-and-constants","page":"API","title":"Types and constants","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Order = [:type, :constant]","category":"page"},{"location":"api/#Functions-and-macros","page":"API","title":"Functions and macros","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Order = [:macro, :function]","category":"page"},{"location":"api/#Documentation","page":"API","title":"Documentation","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Modules = [BATBase]\nOrder = [:module, :type, :constant, :macro, :function]","category":"page"},{"location":"api/#BATBase.BATBase","page":"API","title":"BATBase.BATBase","text":"BATBase\n\nTemplate for Julia packages.\n\n\n\n\n\n","category":"module"},{"location":"api/#BATBase.AbstractDensity","page":"API","title":"BATBase.AbstractDensity","text":"abstract type AbstractDensity\n\nSubtypes of AbstractDensity (e.g. MyDensity) must implement the methods\n\nBATBase.eval_logval_unchecked(density::MyDensity)\n\nTo query the logarithm of the density for a given point/variate v, use the function logdensityof.\n\nFor likelihood densities, implementing `BATBase.evallogvalunchecked is typically sufficient, since shape, and variate bounds can be inferred from the prior.\n\nDensities with a known variate shape may also implement\n\nValueShapes.varshape(density::MyDensity)\n\nDensities with known variate bounds may also implement\n\nBAT.var_bounds(density::MyDensity)\n\nnote: Note\nOnly implement BAT.var_bounds in special cases. BAT.var_bounds is not part of the stable public BATBase.jl and BAT.jl APIs and subject to change without deprecation.\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.AbstractDensitySample","page":"API","title":"BATBase.AbstractDensitySample","text":"abstract type AbstractDensitySample\n\nAbstract type for samples drawn from an AbstractDensity.\n\nSubtypes (e.g. MyDensitySample) must support:\n\nBase.getproperty(s::MyDensitySample, :v)::Any: Variate value.\nBase.getproperty(s::MyDensitySample, :logd)::Real: Result of logdensityof(some_density)(v)\nBase.getproperty(s::MyDensitySample, :weight)::Real: Weight of the sample.\nBase.getproperty(s::MyDensitySample, :info)::Any: Additional info on the  provenance of the sample. Content depends on the sampling algorithm.\nBase.getproperty(s::MyDensitySample, :aux)::Any: Custom user-defined  information attached to the sample.\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.AbstractDensitySampleVector","page":"API","title":"BATBase.AbstractDensitySampleVector","text":"abstract type AbstractDensitySampleVector <: AbstractVector{<:AbstractDensitySample}\n\nAbstract type for multiple samples drawn from an AbstractDensity.\n\nSubtypes must support the Tables.jl API with access both as a vector of structs and a struct of vectors, and\n\nBase.getproperty(s::MyDensitySample, :v)::AbstractVector{<:Any}\nBase.getproperty(s::MyDensitySample, :logd)::AbstractVector{<:Real}\nBase.getproperty(s::MyDensitySample, :weight)::AbstractVector{<:Real}\nBase.getproperty(s::MyDensitySample, :info)::AbstractVector{<:Any}\nBase.getproperty(s::MyDensitySample, :aux)::AbstractVector{<:Any}\n\nSee AbstractDensitySample for the semantics of the columns.\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.AbstractDensityTransformTarget","page":"API","title":"BATBase.AbstractDensityTransformTarget","text":"abstract type AbstractDensityTransformTarget\n\nAbstract type for probability density transformation targets.\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.AbstractDistributionDensity","page":"API","title":"BATBase.AbstractDistributionDensity","text":"abstract type AbstractDistributionDensity <: DistLikeDensity\n\nA density that can be converted efficiently to a Distributions.Distribution.\n\nSubtypes (e.g. MyDistributionDensity) support, in addition to the DistLikeDensity interface, support:\n\nBase.convert(Distributions.Distribution, density::MyDistributionDensity)\n\nA d::ContinuousDistribution can be converted into (resp. wrapped in) an suitable subtype of DistLikeDensity via conv(AbstractDistributionDensity, d).\n\nnote: Note\nThis functionality is implemented in BAT.jl, not in BATBase.jl.\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.AbstractModeEstimator","page":"API","title":"BATBase.AbstractModeEstimator","text":"abstract type BAT.AbstractModeEstimator\n\nAbstract type for BAT optimization algorithms.\n\nA typical application for optimization in BAT is mode estimation (see bat_findmode),\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.AbstractSampleGenerator","page":"API","title":"BATBase.AbstractSampleGenerator","text":"abstract type AbstractSampleGenerator\n\nBAT-internal, not part of stable public API.\n\nAbstract super type for sample generators.\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.AbstractSamplingAlgorithm","page":"API","title":"BATBase.AbstractSamplingAlgorithm","text":"abstract type BAT.AbstractSamplingAlgorithm\n\nAbstract type for BAT sampling algorithms. See bat_sample.\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.AbstractTransformToInfinite","page":"API","title":"BATBase.AbstractTransformToInfinite","text":"abstract type AbstractTransformToInfinite <: AbstractDensityTransformTarget\n\nAbstract type for density transformation targets that specify are transformation into unbounded space.\n\nThe density that results from such a transformation must be unbounded in all dimensions and that should taper off to zero somewhat smoothly in any direction.\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.AbstractTransformToUnitspace","page":"API","title":"BATBase.AbstractTransformToUnitspace","text":"abstract type AbstractTransformToUnitspace <: AbstractDensityTransformTarget\n\nAbstract type for density transformation targets that specify a transformation into the unit hypercube.\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.AutocorLenAlgorithm","page":"API","title":"BATBase.AutocorLenAlgorithm","text":"abstract type AutocorLenAlgorithm\n\nAbstract type for integrated autocorrelation length estimation algorithms.\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.DensityIdentityTransform","page":"API","title":"BATBase.DensityIdentityTransform","text":"struct DensityIdentityTransform <: TransformAlgorithm\n\nA no-op density transform algorithm that leaves any density unchanged.\n\nConstructors:\n\nDensityIdentityTransform()\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.DifferentiationAlgorithm","page":"API","title":"BATBase.DifferentiationAlgorithm","text":"abstract type DifferentiationAlgorithm\n\nExperimental feature, not part of stable public API.\n\nAbstract type for integrated autocorrelation length estimation algorithms.\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.DistLikeDensity","page":"API","title":"BATBase.DistLikeDensity","text":"abstract type DistLikeDensity <: AbstractDensity\n\nA density that implements part of the Distributions.Distribution interface. Such densities are suitable for use as a priors.\n\nIn contrast to a distribution, the integral of a DistLikeDensity is not required to be normalized to one (but will be, in many cases).\n\nTypically, custom priors should be implemented as subtypes of Distributions.Distribution. BAT will automatically wrap them in a subtype of AbstractDistributionDensity, which is a subtype of DistLikeDensity.\n\nSubtypes of DistLikeDensity are required to support more functionality than an AbstractDensity, but less than a Distribution{Multivariate,Continuous}.\n\nA d::ContinuousDistribution can be converted into (wrapped in) an suitable subtype of AbstractDistributionDensity via conv(DistLikeDensity, d).\n\nThe following functions must be implemented for subtypes (e.g. MyDistLikeDensity), in addition to the mandatory AbstractDensity interface:\n\nValueShapes.varshape(density::MyDistLikeDensity)\nDistributions.sampler(density::MyDistLikeDensity)\n\nnote: Note\nThe function BAT.var_bounds is not part of the stable public BATBase.jl and BAT.jl APIs and subject to change without deprecation.\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.EffSampleSizeAlgorithm","page":"API","title":"BATBase.EffSampleSizeAlgorithm","text":"abstract type EffSampleSizeAlgorithm\n\nAbstract type for integrated autocorrelation length estimation algorithms.\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.FullDensityTransform","page":"API","title":"BATBase.FullDensityTransform","text":"struct FullDensityTransform <: TransformAlgorithm\n\nTransform the density as a whole a given specified target space. Operations that use the gradient of the density will require to the log(abs(jacobian)) of the transformation to be auto-differentiable.\n\nConstructors:\n\nFullDensityTransform()\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.InitvalAlgorithm","page":"API","title":"BATBase.InitvalAlgorithm","text":"abstract type BAT.InitvalAlgorithm\n\nAbstract type for BAT initial/starting value generation algorithms.\n\nMany algorithms in BAT, like MCMC and optimization, need initial/starting values.\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.IntegrationAlgorithm","page":"API","title":"BATBase.IntegrationAlgorithm","text":"abstract type IntegrationAlgorithm\n\nAbstract type for integration algorithms.\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.NoDensityTransform","page":"API","title":"BATBase.NoDensityTransform","text":"struct NoDensityTransform <: AbstractDensityTransformTarget\n\nThe identity density transformation target, specifies that densities should not be transformed.\n\nConstructors:\n\nNoDensityTransform()\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.PriorSubstitution","page":"API","title":"BATBase.PriorSubstitution","text":"struct PriorSubstitution <: TransformAlgorithm\n\nSubstitute the prior by a given distribution and transform the likelihood accordingly. The log(abs(jacobian)) of the transformation does not need to be auto-differentiable even for operations that use the gradient of the posterior.\n\nConstructors:\n\nPriorSubstitution()\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.PriorToGaussian","page":"API","title":"BATBase.PriorToGaussian","text":"struct PriorToGaussian <: AbstractTransformToInfinite\n\nSpecifies that posterior densities should be transformed in a way that makes their pior equivalent to a standard multivariate normal distribution with an identity covariance matrix.\n\nConstructors:\n\nPriorToGaussian()\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.PriorToUniform","page":"API","title":"BATBase.PriorToUniform","text":"struct PriorToUniform <: AbstractTransformToUnitspace\n\nSpecifies that posterior densities should be transformed in a way that makes their pior equivalent to a uniform distribution over the unit hypercube.\n\nConstructors:\n\nPriorToUniform()\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.TransformAlgorithm","page":"API","title":"BATBase.TransformAlgorithm","text":"abstract type TransformAlgorithm\n\nAbstract type for density transformation algorithms.\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.AnyDensityLike","page":"API","title":"BATBase.AnyDensityLike","text":"BAT.AnyDensityLike = Union{...}\n\nUnion of all types that BAT will accept as a probability density, resp. that convert(AbstractDensity, d) supports:\n\nAbstractDensity\nDistributions.Distribution\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.AnyIIDSampleable","page":"API","title":"BATBase.AnyIIDSampleable","text":"BAT.AnyIIDSampleable = Union{...}\n\nUnion of all distribution/density-like types that BAT can draw i.i.d. (independent and identically distributed) samples from:\n\nDistLikeDensity\nDistributions.Distribution\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.AnySampleable","page":"API","title":"BATBase.AnySampleable","text":"BAT.AnySampleable = Union{...}\n\nUnion of all types that BAT can sample from:\n\nAbstractDensity\nAbstractDensitySampleVector\nDistributions.Distribution\n\n\n\n\n\n","category":"type"},{"location":"api/#BATBase.argchoice_msg","page":"API","title":"BATBase.argchoice_msg","text":"argchoice_msg(f::Base.Callable, argname::Val, x)\n\nGenerates an information message regarding the choice of value x for argument argname of function f.\n\nThe value x will often be the result of bat_default.\n\n\n\n\n\n","category":"function"},{"location":"api/#BATBase.bat_default","page":"API","title":"BATBase.bat_default","text":"bat_default(f::Base.Callable, argname::Symbol, objective...)\nbat_default(f::Base.Callable, argname::Val, objective...)\n\nGet the default value for argument argname of function f to use for objective(s).\n\nobjective(s) are mandatory arguments of function f that semantically constitute it's main objective(s), and that that a good default choice of optional arguments (e.g. choice of algorithm(s), etc.) may depend on. Which arguments are considered to be objectives is function-specific.\n\nFor example:\n\nbat_default(bat_sample, :algorithm, density::PosteriorDensity) == MetropolisHastings()\nbat_default(bat_sample, Val(:algorithm), samples::DensitySampleVector) == OrderedResampling()\n\n\n\n\n\n","category":"function"},{"location":"api/#BATBase.bat_eff_sample_size","page":"API","title":"BATBase.bat_eff_sample_size","text":"bat_eff_sample_size(\n    v::Union{AbstractVector{<:Real},AbstractVectorOfSimilarVectors{<:Real}},\n    [algorithm::EffSampleSizeAlgorithm]\n)\n\nbat_eff_sample_size(\n    smpls::DensitySampleVector,\n    [algorithm::EffSampleSizeAlgorithm]\n)\n\nEstimate effective sample size estimation for variate series v, resp. density samples smpls, separately for each degree of freedom.\n\nReturns a NamedTuple of the shape\n\n(result = eff_sample_size, ...)\n\nResult properties not listed here are algorithm-specific and are not part of the stable public API.\n\nnote: Note\nDo not add add methods to bat_eff_sample_size, add methods to bat_eff_sample_size_impl instead.\n\n\n\n\n\n","category":"function"},{"location":"api/#BATBase.bat_findmedian","page":"API","title":"BATBase.bat_findmedian","text":"bat_findmedian(\n    samples::DensitySampleVector\n)\n\nThe function computes the median of marginalized samples.\n\nReturns a NamedTuple of the shape\n\n(result = v, ...)\n\nResult properties not listed here are algorithm-specific and are not part of the stable public API.\n\nnote: Note\nDo not add add methods to bat_findmedian, add methods to bat_findmedian_impl instead.\n\n\n\n\n\n","category":"function"},{"location":"api/#BATBase.bat_findmode","page":"API","title":"BATBase.bat_findmode","text":"bat_findmode(\n    target::BAT.AnySampleable,\n    [algorithm::BAT.AbstractModeEstimator]\n)::DensitySampleVector\n\nEstimate the global mode of target.\n\nReturns a NamedTuple of the shape\n\n(result = X::DensitySampleVector, ...)\n\nResult properties not listed here are algorithm-specific and are not part of the stable public API.\n\nnote: Note\nDo not add add methods to bat_findmode, add methods to bat_findmode_impl instead.\n\n\n\n\n\n","category":"function"},{"location":"api/#BATBase.bat_initval","page":"API","title":"BATBase.bat_initval","text":"bat_initval(\n    [rng::AbstractRNG,]\n    target::BAT.AnyDensityLike,\n    [algorithm::BAT.InitvalAlgorithm],\n)::V\n\nbat_initval(\n    [rng::AbstractRNG,]\n    target::BAT.AnyDensityLike,\n    n::Integer,\n    [algorithm::BAT.InitvalAlgorithm],\n)::AbstractVector{<:V}\n\nGenerate one or n random initial/starting value(s) suitable for target.\n\nAssuming the variates of target are of type T, returns a NamedTuple of the shape\n\n(result = X::AbstractVector{T}, ...)\n\nResult properties not listed here are algorithm-specific and are not part of the stable public API.\n\nnote: Note\nDo not add add methods to bat_initval, add methods likebat_initval_impl(rng::AbstractRNG, target::AnyDensityLike, algorithm::InitvalAlgorithm; kwargs...)\nbat_initval_impl(rng::AbstractRNG, target::AnyDensityLike, n::Integer, algorithm::InitvalAlgorithm; kwargs...)to bat_initval_impl instead.\n\n\n\n\n\n","category":"function"},{"location":"api/#BATBase.bat_integrate","page":"API","title":"BATBase.bat_integrate","text":"bat_integrate(\n    target::AnySampleable,\n    [algorithm::IntegrationAlgorithm]\n)::DensitySampleVector\n\nCalculate the integral (evidence) of target.\n\nReturns a NamedTuple of the shape\n\n(result = X::Measurements.Measurement, ...)\n\nResult properties not listed here are algorithm-specific and are not part of the stable public API.\n\nnote: Note\nDo not add add methods to bat_integrate, add methods to bat_integrate_impl instead.\n\n\n\n\n\n","category":"function"},{"location":"api/#BATBase.bat_integrated_autocorr_len","page":"API","title":"BATBase.bat_integrated_autocorr_len","text":"bat_integrated_autocorr_len(\n    v::Union{AbstractVector{<:Real},AbstractVectorOfSimilarVectors{<:Real}},\n    algorithm::AutocorLenAlgorithm = GeyerAutocorLen()\n)\n\nEstimate the integrated autocorrelation length of variate series v, separately for each degree of freedom.\n\nReturns a NamedTuple of the shape\n\n(result = integrated_autocorr_len, ...)\n\nResult properties not listed here are algorithm-specific and are not part of the stable public API.\n\nnote: Note\nDo not add add methods to bat_integrated_autocorr_len, add methods to bat_integrated_autocorr_len_impl instead.\n\n\n\n\n\n","category":"function"},{"location":"api/#BATBase.bat_sample","page":"API","title":"BATBase.bat_sample","text":"bat_sample(\n    [rng::AbstractRNG],\n    target::BAT.AnySampleable,\n    [algorithm::BAT.AbstractSamplingAlgorithm]\n)::DensitySampleVector\n\nDraw samples from target using algorithm.\n\nDepending on sampling algorithm, the samples may be independent or correlated (e.g. when using MCMC).\n\nReturns a NamedTuple of the shape\n\n(result = X::DensitySampleVector, ...)\n\nResult properties not listed here are algorithm-specific and are not part of the stable public API.\n\nnote: Note\nDo not add add methods to bat_sample, add methods to bat_sample_impl instead.\n\n\n\n\n\n","category":"function"},{"location":"api/#BATBase.bat_transform","page":"API","title":"BATBase.bat_transform","text":"bat_transform(\n    target::AbstractDensityTransformTarget,\n    density::AnyDensityLike,\n    [algorithm::TransformAlgorithm]\n)::AbstractDensity\n\nTransform density to another variate space defined/implied by target.\n\nReturns a NamedTuple of the shape\n\n(result = newdensity::AbstractDensity, trafo = vartrafo::AbstractVariateTransform, ...)\n\nResult properties not listed here are algorithm-specific and are not part of the stable public API.\n\nnote: Note\nDo not add add methods to bat_transform, add methods to bat_transform_impl instead.\n\n\n\n\n\n","category":"function"},{"location":"api/#BATBase.bat_valgrad","page":"API","title":"BATBase.bat_valgrad","text":"bat_valgrad(f::Function, [algorithm::DifferentiationAlgorithm])\n\nExperimental feature, not part of stable public API.\n\nGenerated a function that calculates both value and gradient of f at given points.\n\nThe function f must support ValueShapes.varshape(f) and ValueShapes.unshaped(f).\n\nReturns a NamedTuple of the shape\n\n(result = valgrad_f, ...)\n\nwith\n\nf_at_x, grad_of_f_at_x = valgrad_f(x)\n\ngrad_of_f_at_x = zero(x)\nf_at_x = valgrad_f(!, grad_of_f_at_x, x)\n\nResult properties not listed here are algorithm-specific and are not part of the stable public API.\n\nnote: Note\nDo not add add methods to bat_valgrad, add methods to bat_valgrad_impl instead.\n\n\n\n\n\n","category":"function"},{"location":"api/#BATBase.eval_logval_unchecked","page":"API","title":"BATBase.eval_logval_unchecked","text":"BATBase.eval_logval_unchecked(density::AbstractDensity, v::Any)\n\nCompute log of the value of a multivariate density function for the given variate/parameter-values.\n\nInput:\n\ndensity: density function\nv: argument, i.e. variate / parameter-values\n\nNote: If eval_logval_unchecked is called with an argument that is out of bounds, the behavior is undefined. The result for arguments that are not within bounds is implicitly -Inf, but it is the caller's responsibility to handle these cases.\n\n\n\n\n\n","category":"function"},{"location":"api/#BATBase.logdensityof","page":"API","title":"BATBase.logdensityof","text":"logdensityof(density::AbstractDensity, v)::Real\nlogdensityof(density::AbstractDensity)::Function\n\nComputes the logarithmic value of density at a given point, resp. returns a function that does so:\n\nlogdensityof(density, v) == logdensityof(density)(v)\n\nThe function returned by logdensityof(density) supports\n\n(- logdensityof(density))(v) == - logdensityof(density)(v)\n\nNote: This function should not be specialized for custom density types, implement BATBase.eval_logval_unchecked instead.\n\nnote: Note\nThis functionality is implemented in BAT.jl, not in BATBase.jl.\n\n\n\n\n\n","category":"function"},{"location":"api/#ValueShapes.totalndof-Tuple{AbstractDensity}","page":"API","title":"ValueShapes.totalndof","text":"ValueShapes.totalndof(density::AbstractDensity)::Union{Int,Missing}\n\nGet the number of degrees of freedom of the variates of density. May return missing, if the shape of the variates is not fixed.\n\n\n\n\n\n","category":"method"},{"location":"api/#ValueShapes.varshape-Tuple{AbstractDensity}","page":"API","title":"ValueShapes.varshape","text":"ValueShapes.varshape(\n    density::AbstractDensity\n)::Union{ValueShapes.AbstractValueShape,Missing}\n\nValueShapes.varshape(\n    density::DistLikeDensity\n)::ValueShapes.AbstractValueShape\n\nGet the shapes of the variates of density.\n\nFor prior densities, the result must not be missing, but may be nothing if the prior only supports unshaped variate/parameter vectors.\n\n\n\n\n\n","category":"method"},{"location":"LICENSE/#LICENSE","page":"LICENSE","title":"LICENSE","text":"","category":"section"},{"location":"LICENSE/","page":"LICENSE","title":"LICENSE","text":"using Markdown\nMarkdown.parse_file(joinpath(@__DIR__, \"..\", \"..\", \"LICENSE.md\"))","category":"page"},{"location":"#BATBase.jl","page":"Home","title":"BATBase.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Note: Integration of BATBase.jl with BAT.jl is not complete yet.","category":"page"},{"location":"","page":"Home","title":"Home","text":"BATBase.jl contains the core interface definition of BAT.jl.","category":"page"},{"location":"","page":"Home","title":"Home","text":"BATBase.jl will serve as a lightweight and low-dependency package that packages implementing BAT-compatible densities and algorithms can depend on instead of the full BAT.jl.","category":"page"}]
}