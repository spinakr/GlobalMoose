module PortfolioManager

open Portfolio
open StatusFileReader

[<EntryPoint>]
let main argv =

    let statusUpdates = loadAllStatusUpdates()

    let statusUpdates = loadAllStatusUpdates()
    let firstFile = statusUpdates.[0]
    printf "\n File:    %A \n" firstFile

    let lines = firstFile.Rows
    printf "Lines:    %A \n" lines

    let firstItem = Seq.item 0 lines
    printf "Item:     %A \n" firstItem

    // let firstProperty = firstItem.Amount
    // printf "Prop:     %i \n" firstProperty
    
    



    
    0 // return an integer exit code
