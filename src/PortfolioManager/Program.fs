open System
open Portfolio

[<EntryPoint>]
let main argv =
    printfn "Program started"

    let funds = [FundAmount("fund1", 1000); FundAmount("fund2", 2000); FundAmount("fund3", 3000)]
    printfn "Sum of assest %d" (sumOfAssets funds)

    0 // return an integer exit code
