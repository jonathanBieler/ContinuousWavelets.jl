var documenterSearchIndex = {"docs":
[{"location":"spacing/#Wavelet-Frequency-Spacing","page":"Wavelet Frequency Spacing","title":"Wavelet Frequency Spacing","text":"","category":"section"},{"location":"spacing/","page":"Wavelet Frequency Spacing","title":"Wavelet Frequency Spacing","text":"Frequently, using a fixed ratio for scaling the wavelets results in too many large scale wavelets. There are several ways of dealing with this; in this package, the scaling factors have the form 2^x_0 +mx^^1_beta, for suitable choice of a,m, x_0, and beta. The user chooses beta and Q, and the rest are chosen to match the derivative at the last frequency to be ^1_Q, as in the figure.","category":"page"},{"location":"spacing/","page":"Wavelet Frequency Spacing","title":"Wavelet Frequency Spacing","text":"using ContinuousWavelets, Plots, Wavelets, FFTW, LaTeXStrings, Logging\nusing Plots;\ngr();\nPlots.reset_defaults();\ndRate = 4\nwaveType = Morlet()\nQ = 8\nnOct = 8\nΨ1 = wavelet(waveType, s=Q, β=dRate, averagingLength=2)\n# sketch of how the frequencies are chosen\nlocs = ContinuousWavelets.polySpacing(nOct, Ψ1)\na = ContinuousWavelets.getMinScaling(Ψ1) + Ψ1.averagingLength\nβ = Ψ1.β\nlastWavelet = Ψ1.Q * (nOct - a)\nb = 1 / Q * lastWavelet^((β - 1) / β)\nt = range(1, stop=length(locs), step=0.1)\ncurve = a .+ b .* (range(0, stop=lastWavelet, length=length(t))) .^ (1 / β)\nx = range(12, stop=22, step=0.5)\nycord(x) = locs[end] .+ b / β * lastWavelet .^ (1 / β - 1) .* (x .- length(locs)) * (lastWavelet - 1) / length(locs)\ny = ycord.(x)\n#Figure 3.1\nscatter(1:length(locs), locs, legend=:bottomright, label=\"mean log frequency\", xlabel=\"Wavelet Index (x)\", ylabel=\"log-Frequency (y)\", color=:black)\nscatter!(length(locs):length(locs), locs[end:end], markersize=8, markershape=:x, color=:black, facecolor=:black, label=:none)\nplot!(t, curve, color=:blue, line=:dash, label=L\"y=x_0 + mx^{^1/_\\beta}\", legend=:bottomright, legendfontsize=12, xrange=(0, length(locs) + 3), xticks=[1; 5:5:1+length(locs)...], yrange=(minimum(locs) - 1, maximum(locs) + 1), yticks=(range(floor(Int, minimum(locs)), ceil(Int, maximum(locs)), step=2), [L\"\\alpha\", (4:2:6)..., \"N.Octaves\"]))\nplot!(x, y, color=:black, line=1.5, label=:none)\nannotate!(length(locs) - 1 / 8, locs[end] + 7.5 / 16, Plots.text(L\"\\frac{\\mathrm{d}y}{\\mathrm{d}x}=^{1}/_{Q}\", 11, :black, :center))\nsavefig(\"plotOfLogCentralFrequencies.svg\")","category":"page"},{"location":"spacing/","page":"Wavelet Frequency Spacing","title":"Wavelet Frequency Spacing","text":"(Image: )","category":"page"},{"location":"spacing/","page":"Wavelet Frequency Spacing","title":"Wavelet Frequency Spacing","text":"If beta is 1, then we have a linear relation between the index and the log-frequency, and Q gives exactly the number of wavelets per octave throughout. As beta increases, the wavelets skew more and more heavily to high frequencies. The default value is 4.","category":"page"},{"location":"spacing/","page":"Wavelet Frequency Spacing","title":"Wavelet Frequency Spacing","text":"The user chooses β (the frequency decay), Q (the number of wavelets per octave at the last point), and aveLen (the number of octaves covered by the averaging function, here x_0), and then m, the number of wavelets N_w, and the spacing of x are chosen so that:","category":"page"},{"location":"spacing/","page":"Wavelet Frequency Spacing","title":"Wavelet Frequency Spacing","text":"The derivative fracmathrmdymathrmdx at the last point is ^1_Q, so the \"instantaneous\" number of wavelets x per octave y is Q. Each type of wavelet has a maximum scaling 2^N_Octaves returned by getNOctaves (generally half the signal length), so the final point N_w satisfies both y(N_w) = N_Octaves and y(N_w)=^1_Q.\nThe spacing is chosen so that there are exactly Q wavelets in the last octave.","category":"page"},{"location":"spacing/","page":"Wavelet Frequency Spacing","title":"Wavelet Frequency Spacing","text":"If you are interested in the exact computation, see the function polySpacing. As some examples of how the wavelet bank changes as we change beta:","category":"page"},{"location":"spacing/","page":"Wavelet Frequency Spacing","title":"Wavelet Frequency Spacing","text":"\nn=2047\nΨ1 = wavelet(morl, s=8, β=1)\nd1, ξ = ContinuousWavelets.computeWavelets(n,Ψ1)\nΨ2 = wavelet(morl, s=8, β =2)\nd2, ξ = ContinuousWavelets.computeWavelets(n,Ψ2)\nΨ4 = wavelet(morl, s=8, β =4)\nd4, ξ = ContinuousWavelets.computeWavelets(n,Ψ4)\nmatchingLimits = (minimum([d1 d2 d4]), maximum([d1 d2 d4]))#hide\nplot(heatmap(1:size(d1,2), ξ, d1, color=:Greys, yaxis = (L\"\\omega\", ), xaxis = (\"wavelet index\", ), title=L\"\\beta=1\"*\" (\"*L\"\\Psi1\"*\")\", colorbar=false, clims=matchingLimits),  heatmap(1:size(d2,2), ξ, d2, color=:Greys, yticks=[], xaxis = (\"wavelet index\", ), title=L\"\\beta=2\"*\" (\"*L\"\\Psi2\"*\")\", colorbar=false, clims=matchingLimits),  heatmap(1:size(d4,2), ξ, d4,color=:Greys, yticks=[], xticks=[1, 5, 10, 14, 18], xaxis = (\"wavelet index\", ), title=L\"\\beta=4\"*\" (\"*L\"\\Psi4\"*\")\"), layout=(1,3), clims=matchingLimits, colorbar_title=L\"\\widehat{\\psi_i}\")\nsavefig(\"changeBeta.png\") #hide","category":"page"},{"location":"spacing/","page":"Wavelet Frequency Spacing","title":"Wavelet Frequency Spacing","text":"(Image: )","category":"page"},{"location":"spacing/","page":"Wavelet Frequency Spacing","title":"Wavelet Frequency Spacing","text":"note that the low-frequency coverage increases drastically as we decrease beta.","category":"page"},{"location":"coreType/#Available-Wavelet-Families","page":"Available Wavelet Families","title":"Available Wavelet Families","text":"","category":"section"},{"location":"coreType/","page":"Available Wavelet Families","title":"Available Wavelet Families","text":"There are two tiers of wavelet types in this package. The most abstract is the ContWave type, representing a class of wavelets. This is split into several strictly continuous wavelets, and a ContOrtho<:ContWave type, which is a supertype of continuous versions of the orthogonal wavelets defined in Wavelets.jl.","category":"page"},{"location":"coreType/","page":"Available Wavelet Families","title":"Available Wavelet Families","text":"ContWave","category":"page"},{"location":"coreType/#ContinuousWavelets.ContWave","page":"Available Wavelet Families","title":"ContinuousWavelets.ContWave","text":"ContWave{Boundary,T}\n\nThe abstract type encompassing the various types of wavelets implemented in the package. The abstract type has parameters Boundary<:WaveletBoundary and T<:Number, which gives the element output type. Each has both a constructor, and a default predefined entry. These are:\n\nMorlet: A complex approximately analytic wavelet that is just a frequency   domain Gaussian with mean subtracted. Morlet(σ::T) where T<: Real. σ   gives the frequency domain variance of the mother Wavelet. As σ goes to   zero, all of the information becomes spatial. Default is morl which has   sigma=2pi.\npsihat(omega) propto textrme^-fracsigma^22big(textrme^-(sigma - omega)^2 -textrme^fracomega^2-sigma^22big)\nPaul{N}: A complex analytic wavelet, also known as Cauchy wavelets. pauln for n in 1:20 e.g. paul5\npsihat(omega) propto chi_omega geq 0 omega^Ntextrme^-omega\nDog{N}: Derivative of a Gaussian, where N is the number of   derivatives. dogn for n in 0:6. The Sombrero/mexican hat/Marr wavelet   is n=2.\npsihat(omega) propto omega^Ntextrme^-fracomega^22\nContOrtho{OWT}. OWT is some orthogonal wavelet of type OrthoWaveletClass   from Wavelets.jl. This uses an   explicit construction of the mother wavelet for these orthogonal wavelets   to do a continuous transform. Constructed via ContOrtho(o::W) where o   is from Wavelets.jl. Alternatively, you can get them directly as   ContOrtho objects via:\ncHaar Haar Wavelets\ncBeyl Beylkin Wavelets\ncVaid Vaidyanathan Wavelets\ncDbn Daubhechies Wavelets. n ranges from 1:Inf\ncCoifn Coiflets. n ranges from 2:2:8\ncSymn Symlets. n ranges from 4:10\ncBattn Battle-Lemarie wavelets. n ranges from 2:2:6\n\n\n\n\n\n","category":"type"},{"location":"coreType/","page":"Available Wavelet Families","title":"Available Wavelet Families","text":"using ContinuousWavelets, Plots, Wavelets, FFTW, Logging\nusing Plots; gr()\nPlots.reset_defaults()\nn= 2047;\nfunction mapTo(waveType, isReal=true,window=1:2047; d=1, kwargs...)\n\tif isReal\n\t\tc = wavelet(waveType; β=d, kwargs...)\n\t\twaves,ω = ContinuousWavelets.computeWavelets(n,c)\n\t\treturn circshift(irfft(waves,2*n,1),(1024,0))[window,:]\n\telse\n\t\tc = wavelet(waveType; β=d, kwargs...)\n\t\twaves,ω = ContinuousWavelets.computeWavelets(n,c)\n        waves = cat(waves, zeros(2047,size(waves,2)),dims=1)\n\t\treturn circshift(ifft(waves,1),(1024,0))[window,:]\n\tend\nend\ntmp = mapTo(Morlet(π),false;averagingLength=-0.2)[:,2]\np1=plot([real.(tmp) imag.(tmp)], title=\"Morlet\", labels=[\"real\" \"imaginary\"], ticks=nothing,linewidth=5)\ntmp = mapTo(paul2,false,averagingLength=-.5)[:,2]\np2=plot([real.(tmp) imag.(tmp)],title=\"Paul 2\", labels=[\"real\" \"imaginary\"],ticks=nothing,linewidth=5)\np3=plot(mapTo(dog2;averagingLength=-1.5)[:,2],title=\"derivative of gaussians (dog2)\",legend=false,ticks=nothing,linewidth=5)\np4=plot(mapTo(cHaar,true; averagingLength=1)[:,2],title=\"Haar\",legend=false,ticks=nothing,linewidth=5)\np5=plot(mapTo(cBeyl, true; d=1, averagingLength=-0)[:,2], title=\"Beylkin\", legend=false, ticks=nothing, linewidth=5)\np6=plot(mapTo(cVaid, true; d=1, averagingLength=-0)[:,2], title=\"Vaidyanathan\", legend=false, ticks=nothing, linewidth=5)\np7=plot(mapTo(cDb2;d=1,averagingLength=-0)[:,2],title=\"Daubechies 2\",legend=false,ticks=nothing,linewidth=5)\np8=plot(mapTo(cCoif2, true;d=1, averagingLength=-0)[:,2],title=\"Coiflet 2\",legend=false,ticks=nothing,linewidth=5)\np9=plot(mapTo(cSym4, true; d=1,averagingLength=-0)[:,2],title=\"Symlet 4\",legend=false,ticks=nothing,linewidth=5)\nk = 0600; p10=plot(mapTo(cBatt4, true, 1024-k:1024+k;d=1,averagingLength=-1)[:,2],title=\"Battle-Lemarie, 4\",legend=false,ticks=nothing,linewidth=5)\nplot(p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,layout=(2,5),size=300 .*(5, 2.2))\nsavefig(\"mothers.svg\")#hide","category":"page"},{"location":"coreType/","page":"Available Wavelet Families","title":"Available Wavelet Families","text":"(Image: ) Above are examples of every mother wavelet family defined in this package; the only analytic and/or complex wavelets are the Morlet and the Paul wavelet families. Once you have chosen a type of wavelet, this is used to construct the more specific CWT, which specifies more details of the transform, such as frequency spacing, whether to include an averaging filter or not, a frame upper bound, etc.","category":"page"},{"location":"bound/#Boundary-Conditions","page":"Boundary Conditions","title":"Boundary Conditions","text":"","category":"section"},{"location":"bound/","page":"Boundary Conditions","title":"Boundary Conditions","text":"WaveletBoundary\nPerBoundary\nZPBoundary\nSymBoundary","category":"page"},{"location":"bound/#ContinuousWavelets.WaveletBoundary","page":"Boundary Conditions","title":"ContinuousWavelets.WaveletBoundary","text":"the abstract type for the various types of boundaries\n\n\n\n\n\n","category":"type"},{"location":"bound/#ContinuousWavelets.PerBoundary","page":"Boundary Conditions","title":"ContinuousWavelets.PerBoundary","text":"PerBoundary() <: WaveletBoundary\n\nstandard periodic boundary assumption made by the fft. Aliases of NaivePer and Periodic.\n\n\n\n\n\n","category":"type"},{"location":"bound/#ContinuousWavelets.ZPBoundary","page":"Boundary Conditions","title":"ContinuousWavelets.ZPBoundary","text":"ZPBoundary() <: WaveletBoundary\n\nzero pads the signal before doing an fft, rounding up to the nearest power of two. Alias of padded.\n\n\n\n\n\n","category":"type"},{"location":"bound/#ContinuousWavelets.SymBoundary","page":"Boundary Conditions","title":"ContinuousWavelets.SymBoundary","text":"SymBoundary() <: WaveletBoundary\n\nsymmetric boundary, as in the DCT type II. Repeats the edge value, which alleviates derivative discontinuities. Alias of DEFAULT_BOUNDARY and SymBound.\n\n\n\n\n\n","category":"type"},{"location":"README/","page":"ContinuousWavelets","title":"ContinuousWavelets","text":"DocTestFilters = r\"\\@ ContinuousWavelets .*\"","category":"page"},{"location":"README/#ContinuousWavelets","page":"ContinuousWavelets","title":"ContinuousWavelets","text":"","category":"section"},{"location":"README/","page":"ContinuousWavelets","title":"ContinuousWavelets","text":"(Image: Build Status) (Image: Coverage) (Image: )","category":"page"},{"location":"README/","page":"ContinuousWavelets","title":"ContinuousWavelets","text":"This package is an offshoot of Wavelets.jl for the continuous wavelets. Thanks to Felix Gerick for the initial implementation there, with extension and further adaptation by David Weber and any other contributors listed on the right. Currently, it implements 1D continuous wavelet transforms with the following mother wavelets:","category":"page"},{"location":"README/","page":"ContinuousWavelets","title":"ContinuousWavelets","text":"(Image: Mothers)","category":"page"},{"location":"README/","page":"ContinuousWavelets","title":"ContinuousWavelets","text":"Which covers several standard continuous wavelet families, both real and analytic, as well as continuous versions of the orthogonal wavelet transforms implemented in Wavelets.jl.","category":"page"},{"location":"README/#Basic-Usage","page":"ContinuousWavelets","title":"Basic Usage","text":"","category":"section"},{"location":"README/","page":"ContinuousWavelets","title":"ContinuousWavelets","text":"Install via the package manager and load with using","category":"page"},{"location":"README/","page":"ContinuousWavelets","title":"ContinuousWavelets","text":"julia> Pkg.add(\"ContinuousWavelets\")\njulia> using ContinuousWavelets","category":"page"},{"location":"README/","page":"ContinuousWavelets","title":"ContinuousWavelets","text":"Basic usage example on a doppler test function.","category":"page"},{"location":"README/","page":"ContinuousWavelets","title":"ContinuousWavelets","text":"julia> using Random\n\njulia> Random.seed!(1234);\n\njulia> using ContinuousWavelets, Wavelets\n\njulia> n = 2047;\n\njulia> t = range(0, n / 1000, length=n); # 1kHz sampling rate\n\njulia> f = testfunction(n, \"Doppler\");\n\njulia> c = wavelet(Morlet(π), β=2)\n\njulia> res = ContinuousWavelets.cwt(f, c)\n┌ Warning: the lowest frequency wavelet has more than 1% its max at zero, so it may not be analytic. Think carefully\n│   lowAprxAnalyt = 0.06186323501016359\n└ @ ContinuousWavelets ~/work/ContinuousWavelets.jl/ContinuousWavelets.jl/src/sanityChecks.jl:6\n2047×31 Matrix{ComplexF64}:\n -2.84943e-6+3.86436e-19im  …   0.000109884+9.67013e-5im\n -2.84699e-6-6.11361e-20im      -8.24222e-5+0.000130545im\n -2.84212e-6+4.37411e-20im     -0.000153333-5.64666e-5im\n -2.83483e-6-3.11387e-19im       1.90839e-5-0.00016841im\n -2.82514e-6-1.31096e-19im      0.000172696-2.56466e-5im\n -2.81306e-6-3.38731e-19im  …    7.79501e-5+0.000162848im\n -2.79865e-6-9.8753e-19im      -0.000128919+0.000132755im\n -2.78192e-6+4.91292e-20im     -0.000172323-6.71036e-5im\n -2.76293e-6+5.80924e-19im      -9.39619e-6-0.000179998im\n -2.74172e-6+1.11752e-19im      0.000153988-8.14305e-5im\n            ⋮               ⋱              ⋮\n 0.000172941+2.7571e-19im       -2.59966e-6-7.0039e-7im\n 0.000171274+1.41585e-19im      -2.58362e-6-6.24181e-7im\n 0.000169814-7.90531e-21im  …   -2.56497e-6-5.41108e-7im\n 0.000168561-5.81895e-20im      -2.56135e-6-4.4822e-7im\n 0.000167516-3.07438e-19im      -2.57801e-6-3.83539e-7im\n 0.000166679-6.64104e-19im      -2.54192e-6-3.54776e-7im\n 0.000166051-1.45091e-18im       -2.4431e-6-2.37279e-7im\n 0.000165633+5.67188e-19im  …   -2.46986e-6-1.96881e-8im\n 0.000165423+1.25225e-18im      -2.63276e-6+4.61939e-8im\n\n","category":"page"},{"location":"README/","page":"ContinuousWavelets","title":"ContinuousWavelets","text":"As the cwt frame is redundant, there are many choices of dual/inverse frames. There are three available in this package, NaiveDelta(), PenroseDelta(), and DualFrames(). As a toy example, lets knock out the middle time of the bumps function and apply a high pass filter:","category":"page"},{"location":"README/","page":"ContinuousWavelets","title":"ContinuousWavelets","text":"using ContinuousWavelets, Wavelets\nf = testfunction(n, \"Bumps\");\nc = wavelet(dog2, β = 2)\nres = ContinuousWavelets.cwt(f, c)\n\n# output\n\n2047×27 Matrix{Float64}:\n 0.00262067   -0.00150482  -2.16134e-6  …  -3.11967e-8   -2.84659e-8\n 0.00262075   -0.00150528  -2.16503e-6     -2.27191e-8   -1.96643e-8\n 0.00262089   -0.00150621  -2.17246e-6     -1.22211e-8   -9.55694e-9\n 0.00262111   -0.0015076   -2.18368e-6     -5.16474e-9   -3.5861e-9\n 0.00262141   -0.00150945  -2.1988e-6      -2.13149e-9   -1.45404e-9\n 0.00262177   -0.00151176  -2.21794e-6  …  -1.26651e-9   -9.85913e-10\n 0.00262221   -0.00151453  -2.24129e-6     -1.11251e-9   -9.3166e-10\n 0.00262272   -0.00151775  -2.26904e-6     -1.11305e-9   -9.48609e-10\n 0.00262331   -0.00152143  -2.30144e-6     -1.13556e-9   -9.66579e-10\n 0.00262397   -0.00152557  -2.33879e-6     -1.1622e-9    -9.92573e-10\n ⋮                                      ⋱   ⋮\n 0.000849844  -2.6919e-6   -1.4791e-7      -8.33283e-11  -7.26309e-11\n 0.000849526  -2.65506e-6  -1.48303e-7     -8.21291e-11  -6.83873e-11\n 0.000849248  -2.62298e-6  -1.48649e-7  …  -8.51327e-11  -7.16104e-11\n 0.00084901   -2.59559e-6  -1.48948e-7     -1.08585e-10  -7.82972e-11\n 0.000848811  -2.57284e-6  -1.49199e-7     -2.322e-10    -1.48171e-10\n 0.000848652  -2.5547e-6   -1.494e-7       -6.57973e-10  -4.46048e-10\n 0.000848533  -2.54112e-6  -1.49552e-7     -1.64632e-9   -1.28368e-9\n 0.000848453  -2.53208e-6  -1.49653e-7  …  -3.11482e-9   -2.69659e-9\n 0.000848413  -2.52757e-6  -1.49704e-7     -4.30053e-9   -3.92791e-9","category":"page"},{"location":"README/","page":"ContinuousWavelets","title":"ContinuousWavelets","text":"using ContinuousWavelets, Wavelets\nf = testfunction(n, \"Bumps\");\nc = wavelet(dog2, β = 2)\nres = ContinuousWavelets.cwt(f, c)\n# dropping the middle peaks\nres[620:1100, :] .= 0\n# and smoothing the remaining peaks\nres[:, 10:end] .= 0\nfreqs = ContinuousWavelets.getMeanFreq(f, c)\ndropped = ContinuousWavelets.icwt(res, c, DualFrames())\n\n# output\n\n┌ Warning: the canonical dual frame is off by 3.8053445963886525e6, consider using one of the delta dual frames\n└ @ ContinuousWavelets ~/work/ContinuousWavelets.jl/src/sanityChecks.jl:37\n2047-element Vector{Float64}:\n  0.021353468263494175\n  0.021355106707309952\n  0.021358383142385133\n  0.0213632966799539\n  0.021369846027086553\n  0.02137802953320333\n  0.021387845249242986\n  0.021399290997235258\n  0.021412364447637153\n  0.021427063201564893\n  ⋮\n -0.006147601225469837\n -0.006147062558231826\n -0.006146592492113732\n -0.006146190563893243\n -0.006145856346051334\n -0.006145589459921974\n -0.006145389587395019\n -0.006145256480782908\n -0.006145189970537515","category":"page"},{"location":"README/","page":"ContinuousWavelets","title":"ContinuousWavelets","text":"It can also handle collections of examples at the same time, should you need to do a batch of transforms:","category":"page"},{"location":"README/","page":"ContinuousWavelets","title":"ContinuousWavelets","text":"julia> using Wavelets\n\njulia> exs = cat(testfunction(n, \"Doppler\"), testfunction(n, \"Blocks\"), testfunction(n, \"Bumps\"), testfunction(n, \"HeaviSine\"), dims=2);\n\njulia> c = wavelet(cDb2, β=2, extraOctaves=-0)\n\njulia> res = circshift(ContinuousWavelets.cwt(exs, c), (0, 1, 0))\n┌ Warning: the highest frequency wavelet has more than 1% its max at the end, so it may not be analytic. Think carefully\n│   highAprxAnalyt = 0.2677814440444114\n└ @ ContinuousWavelets ~/work/ContinuousWavelets.jl/ContinuousWavelets.jl/src/sanityChecks.jl:10\n2047×32×4 Array{Float64, 3}:\n[:, :, 1] =\n  1.89367e-5   0.000266033  0.000196408  …   4.6727e-5     2.99983e-6\n  8.33321e-5   0.000266913  0.000201712      1.56557e-5   -4.46419e-5\n -0.000103328  0.000267843  0.000207148     -8.95268e-5   -0.000218151\n -0.000354648  0.000268836  0.000212775     -0.000251492  -0.000256004\n -0.000189096  0.000269891  0.000218496     -0.000206374   5.48004e-5\n  0.000341582  0.000270994  0.000224054  …   0.000132569   0.000428554\n  0.000574352  0.000272142  0.000229273      0.000418284   0.000352239\n  0.000103119  0.000273352  0.000234229      0.000244307  -0.000205831\n -0.000603783  0.000274651  0.000239099     -0.000284486  -0.000639977\n -0.000707411  0.000276047  0.000243868     -0.000581431  -0.000390285\n  ⋮                                      ⋱   ⋮\n -4.89024e-6   0.0020357    0.00136985       1.37549e-6    1.01282e-6\n -3.99268e-6   0.00202884   0.0013532        1.47322e-6    1.13924e-6\n -3.08658e-6   0.00202194   0.00133647   …   1.66221e-6    1.36753e-6\n -2.1235e-6    0.00201502   0.00131965       1.96868e-6    1.72503e-6\n -1.08074e-6   0.00200808   0.00130275       2.40611e-6    2.2242e-6\n  4.79044e-8   0.00200111   0.00128576       2.97486e-6    2.86052e-6\n  1.248e-6     0.00199411   0.0012687        3.66092e-6    3.49912e-6\n  2.24677e-6   0.00198709   0.00125155   …   4.24042e-6    3.80685e-6\n  2.63848e-6   0.00198004   0.00123433       4.3791e-6     3.47575e-6\n\n[:, :, 2] =\n  7.81007e-18  0.0226754  0.00955729  …   3.03725e-18   3.68809e-18\n -3.47114e-18  0.022684   0.00950443     -1.73557e-18  -3.47114e-18\n -8.8948e-18   0.0226929  0.00944925     -9.11175e-18  -5.64061e-18\n -3.90503e-18  0.0227021  0.00939273     -7.81007e-18   1.73557e-18\n  5.20671e-18  0.0227115  0.00933463     -4.77282e-18   6.72534e-18\n  1.08473e-17  0.0227211  0.00927531  …   5.20671e-18   4.33893e-18\n  1.73557e-18  0.0227308  0.00921533     -2.16946e-19  -1.54574e-18\n -4.33893e-18  0.0227406  0.0091542      -4.12198e-18  -9.11175e-18\n -6.0745e-18   0.0227506  0.00909149     -6.94228e-18  -3.47114e-18\n  1.73557e-18  0.0227606  0.0090268      -1.95252e-18   1.51862e-18\n  ⋮                                   ⋱   ⋮\n -1.16366e-17  0.0336961  0.0110364      -1.02248e-17  -6.74285e-18\n -2.55726e-18  0.033762   0.0109992      -3.90631e-18  -4.61867e-18\n -7.6293e-18   0.0338274  0.010964    …  -2.21136e-18  -5.25095e-18\n -4.66963e-18  0.0338924  0.0109308       6.90007e-19  -4.72535e-18\n -3.30708e-18  0.033957   0.0108995       4.58688e-19  -7.19358e-18\n -7.6997e-18   0.0340217  0.0108677      -3.49203e-18  -6.23824e-18\n -1.03499e-17  0.0340864  0.0108359       9.12161e-19  -5.50979e-18\n -9.29595e-18  0.0341512  0.0108039   …  -3.40533e-18  -3.84208e-19\n  1.27592e-18  0.0342157  0.0107729       4.21959e-18  -1.7043e-18\n\n[:, :, 3] =\n -4.2736e-7   0.0059687   0.00256803  0.000892506  …  4.47839e-8  1.86209e-8\n -4.39691e-7  0.00596762  0.00256378  0.000882834     3.30771e-8  7.78201e-9\n -4.48084e-7  0.0059668   0.00256     0.000874593     2.24685e-8  2.3172e-9\n -4.51634e-7  0.00596629  0.00255675  0.000868429     1.71253e-8  2.13432e-9\n -4.53736e-7  0.00596616  0.00255388  0.00086509      1.66027e-8  3.47374e-9\n -4.5679e-7   0.00596647  0.00255141  0.000865675  …  1.76824e-8  4.08017e-9\n -4.6046e-7   0.0059673   0.00254963  0.000872086     1.84952e-8  4.09172e-9\n -4.64139e-7  0.00596883  0.0025489   0.000881343     1.88061e-8  4.06813e-9\n -4.67881e-7  0.00597128  0.00254952  0.000890693     1.89465e-8  4.11435e-9\n -4.71676e-7  0.00597491  0.00255138  0.000899523     1.91417e-8  4.16722e-9\n  ⋮                                                ⋱  ⋮\n -1.01175e-7  0.00335065  0.00169783  0.000148564     3.85114e-9  6.29523e-10\n -1.00662e-7  0.00335806  0.00169074  0.000151598     3.88963e-9  6.9526e-10\n -1.00081e-7  0.00336532  0.00168432  0.000154811  …  4.06365e-9  9.21894e-10\n -9.93313e-8  0.00337236  0.00167881  0.000158131     4.42412e-9  1.36627e-9\n -9.83556e-8  0.00337911  0.00167463  0.000161542     5.00834e-9  2.07275e-9\n -9.71063e-8  0.00338574  0.00167092  0.000165053     5.84663e-9  3.0828e-9\n -9.55338e-8  0.00339243  0.00166694  0.000168694     6.97634e-9  4.19423e-9\n -9.41123e-8  0.00339924  0.00166237  0.000172551  …  8.01012e-9  4.78652e-9\n -9.36079e-8  0.0034061   0.00165751  0.000176759     8.3188e-9   4.24252e-9\n\n[:, :, 4] =\n  0.000307454  -0.0150898   -0.00391724  …   0.000541871   0.000301757\n  6.05948e-5   -0.0152536   -0.00405883      0.000307363   8.45503e-5\n -0.000106628  -0.0154172   -0.00420221      9.46531e-5   -2.5274e-5\n -0.000176071  -0.0155806   -0.00434733     -1.28804e-5   -2.95235e-5\n -0.000215585  -0.0157438   -0.00449399     -2.40997e-5   -3.35174e-6\n -0.000273117  -0.0159068   -0.00464219  …  -3.33285e-6    8.1492e-6\n -0.000341921  -0.0160696   -0.00479189      1.20476e-5    7.73542e-6\n -0.000409873  -0.0162322   -0.00494306      1.73367e-5    6.59563e-6\n -0.000477985  -0.0163945   -0.00509565      1.91596e-5    6.82771e-6\n -0.000546078  -0.0165567   -0.00524962      2.20147e-5    7.16823e-6\n  ⋮                                      ⋱   ⋮\n  0.000680261  -0.00817263  -0.00224811     -2.28035e-5    7.23463e-7\n  0.000611918  -0.00808368  -0.00215646     -2.86981e-5   -8.84735e-6\n  0.00053323   -0.00799495  -0.0020629   …  -5.39545e-5   -4.14279e-5\n  0.000429829  -0.00790643  -0.00196748     -0.000105853  -0.000105146\n  0.000293499  -0.00781811  -0.00187021     -0.000189723  -0.000206338\n  0.000117459  -0.00773001  -0.00177109     -0.00030989   -0.000350925\n -0.000105351  -0.0076421   -0.0016701      -0.000471683  -0.000509964\n -0.000307094  -0.00755439  -0.00156729  …  -0.000619672  -0.000594673\n -0.000378125  -0.00746687  -0.00146262     -0.000663838  -0.00051676","category":"page"},{"location":"README/","page":"ContinuousWavelets","title":"ContinuousWavelets","text":"And the plot of these:","category":"page"},{"location":"README/","page":"ContinuousWavelets","title":"ContinuousWavelets","text":"There are also several boundary conditions, depending on the kind of data given; the default SymBoundary() symmetrizes the data, while PerBoundary() assumes it is periodic, and ZPBoundary pads with zeros. All wavelets are stored in the Fourier domain, and all transforms consist of performing an fft (possibly an rfft if the data is real) of the input, pointwise multiplication (equivalent to convolution in the time domain), and then returning to the time domain.","category":"page"},{"location":"README/","page":"ContinuousWavelets","title":"ContinuousWavelets","text":"Perhaps somewhat unusually, the averaging function, or father wavelet, is included as an option (the bottom row for the figure above). This can be either the paired averaging function or uniform in frequency (the Dirac averaging). The frequency coverage of the wavelets can be adjusted both in total frequency range both below by the averagingLength or above by the extraOctaves (caveat emptor with how well they will be defined in that case). The frequency density can be adjusted both in terms of the quality/scale factor Q, as well as how quickly this density falls off as the frequency goes to zero via β. Finally, depending on what kind of norm you want to preserve, p determines the norm preserved in the frequency domain (so p=1 maintains the 1-norm in frequency, while p=Inf maintains the 1-norm in time).","category":"page"},{"location":"README/#Possible-extensions","page":"ContinuousWavelets","title":"Possible extensions","text":"","category":"section"},{"location":"README/","page":"ContinuousWavelets","title":"ContinuousWavelets","text":"Higher dimensional wavelets have yet to be implemented.\nA DCT implementation of the symmetric boundary to halve the space and computational costs.","category":"page"},{"location":"installation/#Installation","page":"Install","title":"Installation","text":"","category":"section"},{"location":"installation/","page":"Install","title":"Install","text":"This package is registered in the general repository, so all you need to do is press ] and run","category":"page"},{"location":"installation/","page":"Install","title":"Install","text":"(@v9.9) pkg> add ContinuousWavelets","category":"page"},{"location":"CWTConstruction/#CWT-Construction","page":"CWT Construction","title":"CWT Construction","text":"","category":"section"},{"location":"CWTConstruction/","page":"CWT Construction","title":"CWT Construction","text":"CWT\nContinuousWavelets.wavelet(::WC) where {WC<:ContinuousWavelets.ContWaveClass}","category":"page"},{"location":"CWTConstruction/#ContinuousWavelets.CWT","page":"CWT Construction","title":"ContinuousWavelets.CWT","text":"CWT(wave::ContWaveClass, Q=8, boundary::WaveletBoundary=SymBoundary(),\naveragingType::Average = Father(), averagingLength::Int = 4, frameBound=1, p::N=Inf, β=4)\n\n\n\n\n\n","category":"type"},{"location":"CWTConstruction/#Wavelets.WT.wavelet-Tuple{WC} where WC<:ContinuousWavelets.ContWaveClass","page":"CWT Construction","title":"Wavelets.WT.wavelet","text":"wavelet(wave::ContWaveClass; Q=8, boundary::WaveletBoundary=DEFAULT_BOUNDARY,\naveragingType::Average = Father(), averagingLength = 4,\nframeBound=1, p=Inf, β=4, kwargs...)\n\nA constructor for the CWT type, using keyword rather than positional options.\n\n\n\n\n\n","category":"method"},{"location":"CWTConstruction/","page":"CWT Construction","title":"CWT Construction","text":"The ContWaveClass type defines the kind of mother and father wavelet function.  The CWT type, in contrast, defines everything else that goes into performing a continuous wavelet transform besides that choice. The function wavelet() has been overloaded to work with ContWaveClass in much the same way it works for the owts of Wavelets.jl. In more detail, the parameters, along with their defaults, are:","category":"page"},{"location":"CWTConstruction/","page":"CWT Construction","title":"CWT Construction","text":"wave::ContWaveClass: is a type of continuous wavelet, see the Available Wavelet Families.\nscalingFactor, s, or Q::Real=8.0: the number of wavelets between the octaves 2^J and 2^J+1 (defaults to 8, which is most appropriate for music and other audio). Valid range is (0infty).\nβ::Real=4.0: As using exactly Q wavelets per octave leads to excessively many low-frequency wavelets, β varies the number of wavelets per octave, with larger values of β corresponding to fewer low frequency wavelets(see Wavelet Frequency Spacing for details). Valid range is (1infty), though around β=6 the spacing is approximately linear in frequency, rather than log-frequency, and begins to become concave after that.\nboundary::WaveletBoundary=SymBoundary(): The default boundary condition is SymBoundary(), implemented by appending a flipped version of the vector at the end to eliminate edge discontinuities. See Boundary Conditions for the other possibilities. \naveragingType::Average=Father(): determines whether or not to include the averaging function, and if so, what kind of averaging. The options are\nFather: use the averaging function that corresponds to the mother Wavelet.\nDirac: use the sinc function with the appropriate width.\nNoAve: don't average. this has one fewer filters than the other averagingTypes\naveragingLength::Int=4:  the number of wavelet octaves that are covered by the averaging, \nframeBound::Real=1: gives the total norm of the whole collection, corresponding to the upper frame bound; if you don't want to impose a particular bound, set frameBound<0.\nnormalization or p::Real=Inf: the p-norm preserved as the scale changes, so if we're scaling by s, normalization has value p, and the mother wavelet is psi, then the resulting wavelet is s^1ppsi(^t_s). The default scaling, Inf gives all the same maximum value in the frequency domain. Valid range is (0infty, though p1 isn't actually preserving a norm.","category":"page"},{"location":"#ContinuousWavelets-Documentation","page":"basic usage","title":"ContinuousWavelets Documentation","text":"","category":"section"},{"location":"","page":"basic usage","title":"basic usage","text":"Originally included in Wavelets.jl, this is a fork containing the types and methods specifically for doing continuous wavelet transforms. Current methods only include 1D wavelet transforms and their inverses.","category":"page"},{"location":"","page":"basic usage","title":"basic usage","text":"The basic structure is similar to that of Wavelets.jl; first you choose one of the Available Wavelet Families of the ContWaveClass type, e.g. Morlet(2π). Then you set the general transform parameters via CWT Construction, which specifies such properties as whether to average, the scaling rate, or the boundary conditions. Finally, you perform the actual transform withcwt.","category":"page"},{"location":"","page":"basic usage","title":"basic usage","text":"using Plots; gr(); #hide\nPlots.reset_defaults(); #hide\nusing ContinuousWavelets, Plots, Wavelets, FFTW\nn=2047;\nf = testfunction(n, \"Doppler\");\np1=plot(f,legend=false,title=\"Doppler\",xlims=(0,2000));\nc = wavelet(Morlet(π), averagingType=NoAve(), β=2);\nres = ContinuousWavelets.cwt(f, c)\np2=heatmap(abs.(res)', xlabel= \"time index\",\n\tylabel=\"frequency index\",colorbar=false);\nl=@layout [a{.3h};b{.7h}]\nplot(p1,p2,layout=l);","category":"page"},{"location":"","page":"basic usage","title":"basic usage","text":"There are 4 warnings you may see with some regularity:","category":"page"},{"location":"","page":"basic usage","title":"basic usage","text":"julia> c = wavelet(Morlet(π), averagingType=NoAve(), β=2);\n\njulia> res = ContinuousWavelets.cwt(f, c);","category":"page"},{"location":"","page":"basic usage","title":"basic usage","text":"This comes from checking the value of the wavelets at 0 frequency. For quasi-analytic wavelets such as Morlet wavelets, this means that there is significant non-zero mass in the negative frequency domain, which causes significant distortion. Solvable either by increasing aveLen or increasing the mother wavelet mean frequency.","category":"page"},{"location":"","page":"basic usage","title":"basic usage","text":"julia> c = wavelet(Morlet(1.5π), averagingType=NoAve(), β=2,extraOctaves=10);\n\njulia> res = ContinuousWavelets.cwt(f, c);","category":"page"},{"location":"","page":"basic usage","title":"basic usage","text":"This occurs because some of the constructed wavelets have significant mass beyond above the frequency resolution achievable for this signal length. Usually solvable by simply decreasing extraOctaves.","category":"page"},{"location":"","page":"basic usage","title":"basic usage","text":"julia> c = wavelet(Morlet(1.5π), averagingType=NoAve(), p=1);\n\njulia> res = ContinuousWavelets.cwt(f, c);","category":"page"},{"location":"","page":"basic usage","title":"basic usage","text":"These two almost always occur together as having peaks sufficiently far apart is an easy way for some frequencies to have insufficient coverage. It is to some degree unavoidable for small values of p which governs which Fourier domain norm is preserved as we change the scale.","category":"page"},{"location":"","page":"basic usage","title":"basic usage","text":"","category":"page"},{"location":"inverse/","page":"Inversion","title":"Inversion","text":"using ContinuousWavelets, Plots, Wavelets, FFTW, Logging\nusing Plots; gr()\nPlots.reset_defaults()","category":"page"},{"location":"inverse/#Wavelet-Inversion","page":"Inversion","title":"Wavelet Inversion","text":"","category":"section"},{"location":"inverse/","page":"Inversion","title":"Inversion","text":"The continuous wavelet transform is a redundant shift-invariant frame transform. As such, there isn't a single inverse transform, although there is a canonical pseudo-inverse. For more see, for example, chapter 5 of A Wavelet Tour of Signal Processing.","category":"page"},{"location":"inverse/","page":"Inversion","title":"Inversion","text":"In this package, we have 3 pseudo-inverses:","category":"page"},{"location":"inverse/","page":"Inversion","title":"Inversion","text":"icwt","category":"page"},{"location":"inverse/#ContinuousWavelets.icwt","page":"Inversion","title":"ContinuousWavelets.icwt","text":"icwt(res::AbstractArray, cWav::CWT, inverseStyle::InverseType=PenroseDelta())\n\nCompute the inverse wavelet transform using one of three dual frames. The default uses delta functions with weights chosen via a least squares method, the PenroseDelta() below. This is chosen as a default because the Morlet wavelets tend to fail catastrophically using the canonical dual frame (the dualFrames() type).\n\nicwt(res::AbstractArray, cWav::CWT, inverseStyle::PenroseDelta)\n\nReturn the inverse continuous wavelet transform, computed using the simple dual frame β_jδ_ji, where β_j is chosen to solve the least squares problem Wβ-1_2^2, where W is the Fourier domain representation of the cWav wavelets. In both this case and NaiveDelta(), the fourier transform of δ is the constant function, thus this least squares problem.\n\nicwt(res::AbstractArray, cWav::CWT, inverseStyle::NaiveDelta)\n\nReturn the inverse continuous wavelet transform, computed using the simple dual frame β_jδ_ji, where β_j is chosen to negate the scale factor (^1_s)^^1_p. Generally less accurate than choosing the weights using PenroseDelta. This is the method discussed in Torrence and Compo.\n\nicwt(res::AbstractArray, cWav::CWT, inverseStyle::dualFrames)\n\nReturn the inverse continuous wavelet transform, computed using the canonical dual frame tildewidehatψ = fracψ_n(ω)_nψ_n(ω)^2. The algorithm is to compute the cwt again, but using the canonical dual frame; consequentially, it is the most computationally intensive of the three algorithms, and typically the best behaved. Will be numerically unstable if the high frequencies of all of the wavelets are too small however, and tends to fail spectacularly in this case.\n\n\n\n\n\n","category":"function"}]
}
