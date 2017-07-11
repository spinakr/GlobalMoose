module PortfolioManager
    
open FSharp.Configuration
open Portfolio
open StatusFileReader

type Settings = AppSettings<"App.config">

[<EntryPoint>]
let main argv =

    let statusUpdates = loadAllStatusUpdates Settings.FileDirectoryPath

    let firstFile = statusUpdates.[0]
    printf "\n File:    %A \n" firstFile

    let lines = firstFile.Rows
    printf "Lines:    %A \n" lines

    let firstItem = Seq.item 0 lines
    printf "Item:     %A \n" firstItem

    let firstProperty = firstItem.Amount
    printf "Amount:     %i \n" firstProperty



    
    0 // return an integer exit code
