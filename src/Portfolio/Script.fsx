#load "PortfolioTypes.fs"
#load "Portfolio.fs"
open Portfolio

let funds = [FundAmount("DNB Global Indeks", 3000.); FundAmount("DNB Teknologi", 2000.); FundAmount("KLP fremvoksende m", 1000.)]
let distribution = 
    Map.empty
        .Add("DNB Global Indeks", 80.)
        .Add("DNB Teknologi", 10.)
        .Add("KLP fremvoksende m", 10.)
let portfolio = Portfolio(funds, distribution)

let actions = getRebalanceActions portfolio 10000.

printfn "Total assets: %f" (sumOfAssets funds)

