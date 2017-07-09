#r "..\..\packages\FSharp.Data\lib\\net40\FSharp.Data.dll"
#load "StatusFileReader.fs"
open System.IO

open StatusFileReader

open FSharp.Data

let transactions = loadAllTransactions()

let firstrow = transactions.[0].Rows |> Seq.toList
printfn "%A" transactions



