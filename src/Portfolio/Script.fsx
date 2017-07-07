#load "Portfolio.fs"
#load "Rebalancing.fs"
open Portfolio 
open Rebalancing

let funds = [FundAmount("DNB Global Indeks", 14014.); FundAmount("DNB Teknologi", 6091.); FundAmount("KLP fremvoksende m", 0.)]
let distribution = 
    Map.empty
        .Add("DNB Global Indeks", 70.)
        .Add("DNB Teknologi", 10.)
        .Add("KLP fremvoksende m", 20.)
let portfolio = Portfolio(funds, distribution)

let actions = getRebalanceActions portfolio

printfn "Total assets: %f" (sumOfAssets funds)

