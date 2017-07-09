module PortfolioManager

open Portfolio
open StatusFileReader

[<EntryPoint>]
let main argv =

    let funds = [FundAmount("fund1", 1000.); FundAmount("fund2", 2000.); FundAmount("fund3", 3000.)]
    printfn "Total assets: %f" (sumOfAssets funds)

    let transactions = StatusUpdate.Load("transactions.csv")

    let firstrow = transactions.Rows |> Seq.head
    printfn "%A" firstrow
    
    
    0 // return an integer exit code
