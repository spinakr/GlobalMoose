module PortfolioConsole

open FSharp.Configuration
open StatusFileReader
open System
open Charting
open Calculation

type Settings = AppSettings<"App.config">

let getUserCommand() =
    printfn "1 : Chart value per fund"
    printfn "2 : Chart total portfolio value"
    printfn "\n"
    printfn "q : Exit"

    System.Console.ReadKey().Key
 
let showResult result = 
    Console.Clear()
    result |> printfn "%s"
    System.Console.ReadKey().Key |> ignore

let rec run() =
    let statusUpdates = loadAllStatusUpdates Settings.FileDirectoryPath 

    printfn "Total value: %i" (totalValue statusUpdates)
    printfn "Total profit: %i (%.1f %%)" (totalProfit statusUpdates) (totalProfitInPercent statusUpdates)
    printfn "\n"

    let key = getUserCommand()
    Console.Clear()
    match key with
        | System.ConsoleKey.D1 -> chartFunds statusUpdates
        | System.ConsoleKey.D2 -> chartSumOfFunds statusUpdates
        | System.ConsoleKey.Q -> ()
        | _ -> printfn "Unknown command"

    if key <> System.ConsoleKey.Q then run()