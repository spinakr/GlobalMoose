module PortfolioManager

open Portfolio

[<EntryPoint>]
let main argv =
    let funds = [FundAmount("fund1", 1000.); FundAmount("fund2", 2000.); FundAmount("fund3", 3000.)]
    printfn "Total assets: %f" (sumOfAssets funds)
    
    0 // return an integer exit code
