module PortfolioManager

open Portfolio
open StatusFileReader

[<EntryPoint>]
let main argv =

    let statusUpdates = loadAllStatusUpdates()


    for status in statusUpdates do
        printf "%A" statusUpdates.[0].Rows
    
    



    
    0 // return an integer exit code
