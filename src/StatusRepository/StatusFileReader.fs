module StatusFileReader

open FSharp.Data
open System.IO
    
type StatusUpdate = CsvProvider<"statusUpdate.csv">

let parseTransactionFile = 
    (Path.GetFullPath >> StatusUpdate.Load >> (fun (s:StatusUpdate) -> s.Rows |> Seq.toList))

let loadAllStatusUpdates fileDirectory = 
    match Directory.GetFiles(fileDirectory, "*.csv") with
    | [||] -> [||]
    | files -> files |> Array.map parseTransactionFile
    |> List.concat
